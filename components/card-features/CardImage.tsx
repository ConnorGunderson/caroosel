import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../../styles/card.module.css'
import Image from 'next/image'

interface CardImageProps {
  imgUrl: string,
  loaded: boolean,
  active: boolean,
  setActive: any
}

export default function CardImage({loaded, imgUrl, active, setActive} : CardImageProps) {
  return (
    <div className={`${styles.cardImageContainer} ${active ? styles.active : styles.inactive}`} onClick={() => loaded ? setActive(!active) : null}>
      <>
        {
          !active
            ? <FontAwesomeIcon  
                className={styles.playPause} 
                icon={faPlayCircle}
              />
            : null
        }
        <img
          aria-label="play"
          alt="card image"
          src={imgUrl}
          height={250}
          width={250}
          className={`${styles.cardImage} ${active ? "opacity-100" : "opacity-50"}`} 
        /> 
      </>
    </div>
  )
} 