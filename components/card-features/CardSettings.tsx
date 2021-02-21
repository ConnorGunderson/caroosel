import React, { useState, useEffect } from "react";
import styles from '../../styles/card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

interface CardSettingsProps {
  imgUrl: string,  
  setImgUrl: Function,
  setAudUrl: Function,
  setLoaded: Function,
  setAudioLoaded: Function,
}



export default function CardSettings({setAudUrl, setAudioLoaded, setLoaded, setImgUrl} : CardSettingsProps) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const formSubmit = (e : any) => {
    e.preventDefault()
    if (imageUrl) {
      setImgUrl(imageUrl)
    }
    if (selectedFile) {
      setAudUrl(URL.createObjectURL(selectedFile))
      setAudioLoaded(false)
      setLoaded(false)
    }
    setSelectedFile(null)
  }

  return (
    <div
      onDragStart={e => e.preventDefault()}
      className={styles.cardSettings} 
    >
      <form className={`flex flex-col items-center`} id="cardSettingsForm" onSubmit={(e) => formSubmit(e)}>
        <div className="flex flex-col justify-center">
          <label 
            aria-label="upload audio file" 
            className={styles.audioFileLabel} 
            htmlFor="audioFile"
          >
              <FontAwesomeIcon 
                icon={faCloudUploadAlt}
                className={`${selectedFile ? "text-cloud-2 animate-pulse" : "text-white"} w-6 h-6 transition-all`}
              />
              <span>
                {
                  selectedFile
                    ? selectedFile.name.split('.')[0].substring(0,8)
                    : "Audio File"
                }
              </span>
          </label>
          <input
            id="audioFile"
            name="audioFile"
            type="file"
            accept="audio/*"
            onChange={e => setSelectedFile(e.target.files[0])}
            className={styles.input}
          />
        </div>
        <input 
          aria-label="working image url"
          placeholder="Image Url"
          className={styles.imageInput}
          accept="image/*"
          value={imageUrl}
          onChange={(e:React.ChangeEvent<any>) => setImageUrl(e.target.value)}
          />
          <button aria-label="submit new media content" type="submit" className="p-1 text-white transition-all rounded-sm hover:bg-cloud-3 bg-cloud-4" form="cardSettingsForm">
            Submit
          </button>
      </form>
    </div>
  )
}