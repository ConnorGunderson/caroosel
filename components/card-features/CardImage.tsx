import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/card.module.css';
import { useMedia } from '@/utils/media';
import { useEffect, useRef } from 'react';

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
          <FontAwesomeIcon
            size="3x"
            className={styles.playPause}
            icon={faPlayCircle}
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
