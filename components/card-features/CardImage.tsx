import styles from '@/styles/card.module.css';
import { useMedia } from '@/utils/media';
import { useEffect, useRef } from 'react';
import {FaPlayCircle} from 'react-icons/fa'

export default function CardImage() {
  const {
    name,
    active,
    setActive,
    imageURL,
    setImageLoaded,
    loading
  } = useMedia();

  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image && image.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <div
      className={`${styles.cardImageContainer} ${
        active ? styles.active : styles.inactive
      }`}
      onClick={() => (!loading ? setActive(!active) : null)}
    >
      <>
        {!active ? (
          <FaPlayCircle
            size="3em"
            className={styles.playPause}
          />
        ) : null}
        <a
          className={`${styles.cardImage} ${
            active ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <img alt={name} aria-label="play" src={imageURL} ref={imageRef} />
        </a>
      </>
    </div>
  );
}
