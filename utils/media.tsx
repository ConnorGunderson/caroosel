import React, { createContext, useContext, useReducer, useState } from 'react';

import { db, firestore } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

const MediaContext = createContext(null);

interface payloadProps {
  type: string;
  payload?: object | string;
}

const reducer = (state: any, action: payloadProps) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, active: !state.active };
    case 'SET_IMAGE_URI':
      return { ...state, imageUrl: action.payload };
    case 'SET_AUDIO_URI':
      return { ...state, audioUrl: action.payload };
  }
};

export const MediaProvider = (children: React.ReactElement[]) => {
  const media = useProviderMedia();
  return (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
};

export const useMedia = () => {
  return useContext(MediaContext);
};

export const useProviderMedia = () => {
  const { user } = useAuth();
  const initialState = async () => {
    if (user) {
      const snapshot = await firestore().collection("users").doc(user.uid).get()
      return {};
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const { active, audioUrl, imageUrl } = state;

  const setAudio = async (audioURI: string) => {
    const audio = URL.createObjectURL(audioURI);
    dispatch({ type: 'SET_AUDIO_URI', payload: audio });
  };

  const setImage = (imageURI: string) => {
    dispatch({ type: 'SET_IMAGE_URI', payload: imageURI });
  };

  const setActive = () => {
    dispatch({ type: 'SET_ACTIVE' });
  };

  return {
    loading,
    active,
    audioUrl,
    imageUrl,
    setActive,
    setAudio,
    setImage
  };
};
