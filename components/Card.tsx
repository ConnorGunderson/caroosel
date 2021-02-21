import { useState, useEffect } from "react";
import styles from '../styles/card.module.css'
import AudioWidget from './AudioWidget'
import CardImage from './card-features/CardImage'
import CardSettings from './card-features/CardSettings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRedo } from '@fortawesome/free-solid-svg-icons'

interface CardProps {
  audioUrl: string,
  imageUrl: string,
}

export default function Card({audioUrl, imageUrl}: CardProps) {
  const [active, setActive] = useState(false)
  const [viewSettings, setViewSettings] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [imgUrl, setImgUrl] = useState(imageUrl ? imageUrl : "/images/bg-3.webp")
  const [audUrl, setAudUrl] = useState(audioUrl ? audioUrl : "/audio/command_and_control.mp3")
  const [loop, setLoop] = useState(false)
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    if (audioLoaded) {
      setLoaded(true)
    }
  }, [audioLoaded])

  return (
    <section className={`${styles.container}`} draggable="false">
      <div className={styles.cardHeaderContainer}>
        <div className={styles.barContainer}>
          <div className={`${styles.faContainer} items-start`}>
            <FontAwesomeIcon
              aria-label="loop"
              onClick={() => setLoop(!loop)}
              className={`${styles.faLoop} ${loop ? "text-cloud-2 animate-pulse" : "text-cloud-4"}`}
              icon={faRedo}
            />
            <span className={`${loop ? "text-cloud-2 ": "text-cloud-4"} text-xs`}>Loop</span>
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
        <div onDragStart={e => e.preventDefault()}>
          {
            !viewSettings
              ? <CardImage loaded={loaded} imgUrl={imgUrl} active={active} setActive={setActive} />
              : <CardSettings imgUrl={imgUrl} setAudioLoaded={setAudioLoaded} setLoaded={setLoaded} setImgUrl={setImgUrl} setAudUrl={setAudUrl}/>
          }
        </div>
      </div>
      <AudioWidget loop={loop} setAudioLoaded={setAudioLoaded} audUrl={audUrl} loaded={loaded} active={active} />
    </section>
  )
}