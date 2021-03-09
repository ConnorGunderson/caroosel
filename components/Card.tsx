import { useState, useEffect } from 'react';
import styles from '@/styles/card.module.css';
import AudioWidget from './AudioWidget';
import CardImage from './card-features/CardImage';
import CardSettings from './card-features/CardSettings';
import {ImLoop2 } from 'react-icons/im'
import { FaBars} from 'react-icons/fa'
import { useMedia } from '@/utils/media';

interface CardProps {
  name: string;
  audioURL: string;
  imageURL: string;
}

export default function Card({ name, imageURL, audioURL } : CardProps) {
  const [viewSettings, setViewSettings] = useState(false);
  const { setImage, setAudio, setName, setLoop, loop, saveCard } = useMedia();
  
  useEffect(() => {
    setName(name)
    setImage(imageURL);
    setAudio(audioURL);
  }, []);

  return (
    <section className={`${styles.container}`} draggable="false">
      <div className={styles.cardHeaderContainer}>
        <div className={styles.barContainer}>
          <div className={`${styles.faContainer} items-start`}>
            <ImLoop2
              aria-label="loop"
              size="1.25em"
              onClick={() => setLoop(!loop)}
              className={`${styles.fa} ${
                loop ? 'text-cloud-2 animate-pulse' : ""
              }`}
            />
            <span
              className={`${loop ? 'text-cloud-2 ' : ""} text-xs`}
            >
              Loop
            </span>
          </div>
          <div className={`${styles.faContainer} items-end`}>
            <FaBars
              aria-label="settings"
              size="1.25em"
              onClick={() => setViewSettings(!viewSettings)}
              className={`${styles.fa}`}
            />
            <span className={`text-xs`}>Settings</span>
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
