import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/card.module.css';
import { useMedia } from '@/utils/media';
import { useEffect, useRef } from 'react';

export default function CardImage() {
  const { active, setActive, imageURL, setImageLoaded, loading } = useMedia();

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
          <FontAwesomeIcon className={styles.playPause} icon={faPlayCircle} />
        ) : null}
        <img
          aria-label="play"
          alt="card image"
          src={imageURL}
          ref={imageRef}
          height={250}
          width={250}
          className={`${styles.cardImage} ${
            active ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </>
    </div>
  );
}
