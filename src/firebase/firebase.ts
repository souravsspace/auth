import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCsxz1_gAVbO8K9GwsIB4xd1ag44r4C--s",
  authDomain: "auth-practice-60e67.firebaseapp.com",
  projectId: "auth-practice-60e67",
  storageBucket: "auth-practice-60e67.appspot.com",
  messagingSenderId: "343561495244",
  appId: "1:343561495244:web:167aa5fe450a864524d869",
  measurementId: "G-KENVMP8JTF",
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const fireStore = getFirestore(firebaseApp)

export default firebaseApp
