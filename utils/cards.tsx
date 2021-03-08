import { useAuth } from '@/lib/auth';
import firebase from '@/lib/firebase';
import 'firebase/storage';
import { createContext, useContext, useEffect, useState } from 'react';

const storage = firebase.storage().ref('audio');

const CardContext = createContext(null);

export const CardProvider = ({ children }) => {
  const cards = useCardProvider();
  return <CardContext.Provider value={cards}>{children}</CardContext.Provider>;
};

export const useCards = () => {
  return useContext(CardContext);
};

const useCardProvider = () => {
  const [cards, setCards] = useState(defaultMedia);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const {user} = useAuth()
  
  const cardLoading = loading;

  const getCards = async () => {
    setLoading(true);

    let audio: any;
    await storage
      .child('/reverie.mp3')
      .getDownloadURL()
      .then((d) => {
        audio = new Audio()
        audio.src = d
      })
      .catch((e) => {
        console.log(e.stack);
      });

    setLoading(false);
    return audio;
  };

  useEffect(() => {
    if (cards) {
      setLoading(false);
    }
  }, [cards]);

  return {
    cards,
    cardLoading,
    getCards
  };
};

const defaultMedia = [
  {
    name: 'cappadocia',
    audioURL: '/audio/cappadocia.mp3',
    imageURL: '/images/hot-air-balloon.png'
  },
  {
    name: 'river',
    audioURL: '/audio/river.mp3',
    imageURL: '/images/river.png'
  },
  {
    name: 'rain',
    audioURL: '/audio/rain.mp3',
    imageURL: '/images/rain.png'
  }
];
