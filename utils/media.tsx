import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';

import { firestore } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

const MediaContext = createContext(null);

interface payloadProps {
  type: string;
  payload?: any;
}

const initialState = {
  name: null,
  imageURL: null,
  audioURL: null,
  imageLoad: false,
  audioLoad: false,
  loop: false
};

const reducer = (state: any, action: payloadProps) => {
  switch (action.type) {
    case 'ACTIVE':
      return { ...state, active: action.payload };
    case 'IMAGE_URI':
      return { ...state, imageURL: action.payload };
    case 'AUDIO_URI':
      return { ...state, audioURL: action.payload };
    case 'NAME':
      return { ...state, name: action.payload };
    case 'LOOP':
      return { ...state, loop: !state.loop };
    case 'AUDIO_LOADED':
      return { ...state, audioLoad: action.payload };
    case 'IMAGE_LOADED':
      return { ...state, imageLoad: action.payload };
    default:
      return state;
  }
};

export const MediaProvider = ({ children }) => {
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

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [songTime, setSongTime] = useState(0);
  const audRef = useRef(null);
  const audio = audRef.current;
  const {
    active,
    audioURL,
    imageURL,
    name,
    loop,
    imageLoad,
    audioLoad
  } = state;

  const setAudio = async (audioURI: string) => {
    dispatch({ type: 'AUDIO_URI', payload: audioURI });
  };

  const setImage = (imageURI: string) => {
    dispatch({ type: 'IMAGE_URI', payload: imageURI });
  };

  const setName = (name: string) => {
    dispatch({ type: 'NAME', payload: name });
  };

  const setActive = (bool: boolean) => {
    dispatch({ type: 'ACTIVE', payload: bool });
  };

  const saveCard = async () => {
    if (user) {
      return firestore()
        .collection('users')
        .doc(user.uid)
        .set({ media: [state] }, { merge: true });
    } else {
      return null;
    }
  };

  const setAudioLoaded = (bool: boolean) => {
    return dispatch({ type: 'AUDIO_LOADED', payload: bool });
  };

  const setImageLoaded = (bool: boolean) => {
    console.log(bool)
    return dispatch({ type: 'IMAGE_LOADED', payload: bool });
  };

  const setLoop = () => {
    return dispatch({ type: 'LOOP' });
  };

  useEffect(() => {
    if (audioLoad && imageLoad) {
      return setLoading(false);
    } else {
      return setLoading(true);
    }
  }, [imageLoad, audioLoad]);

  return {
    name,
    loading,
    active,
    audioURL,
    imageURL,
    audRef,
    loop,
    audio,
    songTime,
    imageLoad,
    audioLoad,
    setName,
    setActive,
    setAudio,
    setImage,
    setSongTime,
    setAudioLoaded,
    setImageLoaded,
    setLoop
  };
};
