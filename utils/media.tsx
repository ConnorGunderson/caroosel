import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';

import firebase from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

const firestore = firebase.firestore()

const MediaContext = createContext(null);

interface payloadProps {
  type: string;
  payload?: any;
}

const initialState = {
  name: null,
  active: false,
  imageLoad: false,
  audioLoad: false,
  loop: false,
  imageURL: null,
  audioURL: null
};

const reducer = (state: any, action: payloadProps) => {
  switch (action.type) {
    case 'ACTIVE':
      return { ...state, active: action.payload };
    case 'NAME':
      return { ...state, name: action.payload };
    case 'IMAGE':
      return { ...state, imageURL: action.payload };
    case 'AUDIO':
      return { ...state, audioURL: action.payload };
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
    setLoading(true)
    dispatch({type: "AUDIO", payload: audioURI});
  };

  const setImage = (imageURI: string) => {
    setLoading(true)
    dispatch({type: "IMAGE", payload: imageURI});

  };

  const setName = (name: string) => {
    dispatch({ type: 'NAME', payload: name });
  };

  const setActive = (bool: boolean) => {
    dispatch({ type: 'ACTIVE', payload: bool });
  };

  const saveCard = async () => {
    if (user) {
      return firestore
        .collection('users')
        .doc(user.uid)
        .set({ media: [state] }, { merge: true })
        .then(snapshot => console.log(snapshot))
    } else {
      return null;
    }
  };

  const setAudioLoaded = (bool: boolean) => {
    return dispatch({ type: 'AUDIO_LOADED', payload: bool });
  };

  const setImageLoaded = (bool: boolean) => {
    return dispatch({ type: 'IMAGE_LOADED', payload: bool });
  };

  const setLoop = () => {
    return dispatch({ type: 'LOOP' });
  };

  useEffect(() => {
    if (loading && audioLoad && imageLoad) {
      console.log(active)
      setLoading(false)
    }
  }, [audioLoad, imageLoad])

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
    saveCard,
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
