import firebase from 'firebase'
import "firebase/auth"
import "firebase/database"
import "firebase/firestore"

import config from '../config'

const {_FIREBASE} = config

if (!firebase.apps.length) {
  firebase.initializeApp(_FIREBASE)
}

const {ref} = firebase.database

export default firebase;
export const db = ref;
export const {auth, firestore} = firebase;