import { firestore } from '@/lib/firebase';

export default async (req, res) => {
  try {
    const { uid } = req.query;
    const docRef = firestore().collection('users').doc(uid);

    const snapshot = await docRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        res.status(304).end(null);
      }
    });
    const { media } = snapshot;
    if (!media.length) {
      res.status(304).end(null);
    } else {
      res.status(200).json(media);
    }
  } catch (e) {
    console.log('UID ERROR:', e);
  }
};
