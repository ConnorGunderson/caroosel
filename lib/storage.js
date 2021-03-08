import "firebase/storage"
import firebase from './firebase'

const storageRef = firebase.storage().ref()

const getImages = (uid, file) => {
  const file = storageRef().child(`${uid}/images/${file}`)
  file.put().then(snapshot => {
    console.log("file uploaded")
  })
}