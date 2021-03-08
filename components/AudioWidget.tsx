import { useEffect, useState } from 'react';
import styles from '@/styles/audio-widget.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import { useMedia } from '@/utils/media';

interface AudioProps {
  audioURL: string;
}

export default function AudioWidget() {
  const [volume, setVolume] = useState(0.2);
  const {
    active,
    loading,
    setAudioLoaded,
    audRef,
    songTime,
    setSongTime,
    audio,
    loop,
    audioURL
  } = useMedia();

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!loading) {
      if (active) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [active]);

  useEffect(() => {
    if (audioURL && audio) {
      audio.load();
      audio.volume = volume;
      setSongTime(audio.currentTime);
    }
  }, [audioURL]);

  const playbackChange = (e: any) => {
    audio.currentTime = songTime;
    audio.play();
  };

  const changeCapture = (e: any) => {
    setSongTime(e.target.value);
    audio.currentTime = e.target.value;
  };

  return (
    <div className={styles.widgetContainer}>
      <audio
        loop={loop}
        onCanPlay={() => setAudioLoaded(true)}
        ref={audRef}
        src={audioURL}
        onTimeUpdate={() => {
          setSongTime(audio.currentTime);
        }}
      />
      <div className={styles.inputContainer}>
        <h3 className={styles.h3}>{Math.floor(volume * 100)}</h3>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon
            aria-label="volume"
            className={styles.speakerIcons}
            icon={
              !active
                ? faVolumeMute
                : volume > 0.25
                ? faVolumeUp
                : volume > 0
                ? faVolumeDown
                : faVolumeOff
            }
          />
        </div>
        <input
        className={styles.input}
          aria-label="volume"
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={(e: React.ChangeEvent<any>) => setVolume(e.target.value)}
        ></input>
      </div>
      <div className={styles.inputContainer}>
        <h3 className={styles.h3}>{formatTime(songTime)}</h3>
        <div className={styles.iconContainer}>
        <FontAwesomeIcon className={styles.speakerIcons} icon={faClock} />
        </div>
        <input
        className={styles.input}
          aria-label="playback time"
          type="range"
          value={!loading && audio ? songTime : 0}
          min={0}
          max={!loading && audio ? audio.duration : 1}
          onMouseDown={() => (!loading ? audio.pause() : null)}
          onMouseUp={(e: React.MouseEvent) =>
            !loading && active ? playbackChange(e) : null
          }
          onChangeCapture={(e: React.ChangeEvent<any>) =>
            !loading ? changeCapture(e) : null
          }
          readOnly
        />
      </div>
    </div>
  );
}

const formatTime = (songTime) => {
  return (
    (Math.floor(Math.floor(songTime) / 60) > 60
      ? Math.floor(Math.floor(Math.floor(songTime) / 60) / 60) +
        ':' +
        (Math.floor(Math.floor(songTime) / 60) % 60 > 10
          ? Math.floor(Math.floor(songTime) / 60) % 60
          : '0' + (Math.floor(Math.floor(songTime) / 60) % 60))
      : Math.floor(Math.floor(songTime) / 60)) +
    ':' +
    (Math.floor(songTime) % 60 < 10
      ? '0' + (Math.floor(songTime) % 60)
      : Math.floor(songTime) % 60)
  );
};
