import { useRef, useEffect, useState} from 'react'
import styles from '../styles/audio-widget.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faVolumeDown, faVolumeMute, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import loadMedia from './utils/load-media'

interface AudioProps {
  loop: boolean,
  setAudioLoaded: any,
  audUrl: string,
  active: boolean,
  loaded: boolean
}

export default function AudioWidget({loop, setAudioLoaded , audUrl = "/audio/ghibli2.mp3", active, loaded} : AudioProps) {
  const [volume, setVolume] = useState(.25)
  const [songTime, setSongTime] = useState(0)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    loadMedia(audUrl, 'a')
    .then(() => setAudioLoaded(true))
    .then(() => {
      audio.current.src = audUrl
      setSongTime(audio.current.currentTime)
    })
    .catch(e => console.log('audio error', e))
  }, [audUrl])

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (active && loaded) {
      audio.current.play()
    } else if (loaded && !active) {
      audio.current.pause()
    }
  }, [active, loaded])

  const playbackChange = (e:any) => {
    audio.current.currentTime = songTime
    audio.current.play()
  }

  const changeCapture = (e:any) => {
    setSongTime(e.target.value)
    audio.current.currentTime = e.target.value
  }

  return (
    <div className={styles.widgetContainer} >
      <audio loop={loop} ref={audio} onTimeUpdate={() => {setSongTime(audio.current.currentTime)}} />
      <div className={styles.inputContainer}>
        <h3 className={styles.h3}>
          {
            Math.floor(volume*100)*2
          }
        </h3>
        <FontAwesomeIcon aria-label="volume" className={styles.speakerIcons} icon={!active ? faVolumeMute : volume > .25 ? faVolumeUp : volume > 0 ? faVolumeDown : faVolumeOff } />
        <input
          aria-label="volume"
          type='range' 
          value={volume} 
          min={0} 
          max={.5} 
          step={.005} 
          onChange={(e: React.ChangeEvent<any>) => setVolume(e.target.value)} >
        </input>
      </div>
      <div className={styles.inputContainer}>
        <h3 className={styles.h3}>
          {
            ((Math.floor(Math.floor(songTime)/60) > 60 
              ? Math.floor(Math.floor(Math.floor(songTime)/60)/60) + ":" + (Math.floor(Math.floor(songTime)/60)%60 > 10 ? Math.floor(Math.floor(songTime)/60)%60 : "0" + Math.floor(Math.floor(songTime)/60)%60)
              : Math.floor(Math.floor(songTime)/60))
              + ":" 
              + (Math.floor(songTime) % 60 < 10 
                ? "0" + Math.floor(songTime) % 60 
                : Math.floor(songTime) % 60))
          }
        </h3>
        <FontAwesomeIcon className={styles.speakerIcons} icon={faClock} />
        <input 
          aria-label="playback time"
          type="range" 
          value={loaded && audio.current ? songTime : 0}
          min={0}
          max={loaded && audio.current ? audio.current.duration : 1}
          onMouseDown={() => loaded ? audio.current.pause() : null}
          onMouseUp={(e: React.MouseEvent) => loaded && active ? playbackChange(e) : null}
          onChangeCapture={(e: React.ChangeEvent<any>) => loaded ? changeCapture(e) : null}
          readOnly
        />
      </div>
    </div>
  )
}