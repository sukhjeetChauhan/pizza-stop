// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import dotenv from 'dotenv'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// dotenv.config()
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  apiKey: 'AIzaSyA_BWDEMsOSlo332BcoOUICO6zS7hRtzxY',
  authDomain: 'pizza-stop-wellsford.firebaseapp.com',
  projectId: 'pizza-stop-wellsford',
  storageBucket: 'pizza-stop-wellsford.appspot.com',
  messagingSenderId: '827002287596',
  appId: '1:827002287596:web:37c2a41d0314b1392bbcc9',
  measurementId: 'G-2Y5TDEFJPJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// Get a list of menu from your database
// async function getMenu() {
//   try {
//     const menuCollection = collection(db, 'menu')
//     const menuSnap = await getDocs(menuCollection)
//     const res = menuSnap.docs.map((doc) => doc.data())

//     return res
//   } catch (e) {
//     console.log(e)
//   }
// }

// console.log(await getMenu())
