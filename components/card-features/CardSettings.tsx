import React, { useState } from 'react';
import styles from '@/styles/card.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useMedia } from '@/utils/media';

export default function CardSettings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { setAudio, setImage, setActive } = useMedia();

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (imageUrl) {
      setImage(imageUrl);
    }
    if (selectedFile) {
      setActive(false);
      const audio = URL.createObjectURL(selectedFile);
      setAudio(audio);
    }
    setSelectedFile(null);
  };

  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      className={styles.cardSettings}
    >
      <form
        className={`flex flex-col items-center`}
        id="cardSettingsForm"
        onSubmit={(e) => formSubmit(e)}
      >
        <button className="flex flex-col justify-center">
          <label
            aria-label="upload audio file"
            className={styles.audioFileLabel}
            htmlFor="audioFile"
          >
            <FaCloudUploadAlt
              className={`${
                selectedFile ? 'animate-pulse' : ""
              } w-6 h-6 transition-all`}
            />
            <span>
              {selectedFile
                ? selectedFile.name.split('.')[0].substring(0, 8)
                : 'Audio File'}
            </span>
          </label>
          <input
            id="audioFile"
            name="audioFile"
            type="file"
            accept="audio/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className={styles.input}
          />
        </button>
        <input
          aria-label="working image url"
          placeholder="Image Url"
          className={styles.imageInput}
          accept="image/*"
          value={imageUrl}
          onChange={(e: React.ChangeEvent<any>) => setImageUrl(e.target.value)}
        />
        <button
          aria-label="submit new media content"
          type="submit"
          className="p-1 transition-all rounded-sm border border-cloud-4 hover:bg-white bg-cloud-4 hover:text-cloud-4 text-white"
          form="cardSettingsForm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
