import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/card.module.css';
import { useMedia } from '@/utils/media';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CardImage() {
  const {
    active,
    setActive,
    imageURL,
    name,
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
          <img aria-label="play" src={imageURL} ref={imageRef} />
        </a>
      </>
    </div>
  );
}
