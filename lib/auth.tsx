import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from './firebase';

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProviderAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleUser = (rawUser: object | boolean) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const {token, ...userWithoutToken } = user
      createUser(user.uid, userWithoutToken)
      setUser(user);
      setLoading(false);
      return user;
    }
    setUser(null);
    setLoading(false);
    return;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new auth.GoogleAuthProvider();
    const res = await auth().signInWithPopup(provider);
    return handleUser(res.user);
  };

  const signout = async () => {
    await auth().signOut();
    return handleUser(false);
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth().onAuthStateChanged(handleUser);
    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signout
  };
};

const formatUser = (user : any) => {
  const {providerId} = user.providerData[0]
  const {uid, displayName, email, xa, photoURL} = user;
  return {
    uid: uid,
    name: displayName,
    email: email,
    token: xa,
    photoURL: photoURL,
    provider: providerId,
    media: []
  };
};

const createUser = async (uid: string, user : object) => {
  return await firestore()
    .collection('users')
    .doc(uid)
    .set({ uid, ...user }, { merge: true });
};
