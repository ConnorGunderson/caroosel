import { useState, useEffect } from 'react';
import styles from '@/styles/card.module.css';
import AudioWidget from './AudioWidget';
import CardImage from './card-features/CardImage';
import CardSettings from './card-features/CardSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRedo } from '@fortawesome/free-solid-svg-icons';
import { useMedia } from '@/utils/media';

interface CardProps {
  audioURL: string;
  imageURL: string;
}

export default function Card({ imageURL, audioURL } : CardProps) {
  const [viewSettings, setViewSettings] = useState(false);
  const { setImage, setLoop, loop, setAudio } = useMedia();

  useEffect(() => {
    setImage(imageURL);
    setAudio(audioURL);
  }, []);

  return (
    <section className={`${styles.container}`} draggable="false">
      <div className={styles.cardHeaderContainer}>
        <div className={styles.barContainer}>
          <div className={`${styles.faContainer} items-start`}>
            <FontAwesomeIcon
              aria-label="loop"
              onClick={() => setLoop(!loop)}
              className={`${styles.faLoop} ${
                loop ? 'text-cloud-2 animate-pulse' : 'text-cloud-4'
              }`}
              icon={faRedo}
            />
            <span
              className={`${loop ? 'text-cloud-2 ' : 'text-cloud-4'} text-xs`}
            >
              Loop
            </span>
          </div>
          <div className={`${styles.faContainer} items-end`}>
            <FontAwesomeIcon
              aria-label="settings"
              onClick={() => setViewSettings(!viewSettings)}
              className={styles.faBars}
              icon={faBars}
            />
            <span className={`text-cloud-4 text-xs`}>Settings</span>
          </div>
        </div>
        <div onDragStart={(e) => e.preventDefault()}>
          {!viewSettings ? <CardImage /> : <CardSettings />}
        </div>
      </div>
      <AudioWidget />
    </section>
  );
}
