import firebase from 'firebase'

import config from '../config'

const {_FIREBASE} = config

if (!firebase.apps.length) {
  firebase.initializeApp(_FIREBASE)
}

export default firebase;