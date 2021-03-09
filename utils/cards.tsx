import { createContext, useContext, useEffect, useState } from 'react';

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
  const cardLoading = loading;

  useEffect(() => {
    if (cards) {
      setLoading(false);
    }
  }, [cards]);

  return {
    cards,
    cardLoading
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
