import {
  // getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from './firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    console.log(user)
    return 'success'
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode} ${errorMessage}`)
      return errorMessage
    } else {
      // Handle any other types of errors
      console.error('An unexpected error occurred:', error)
      return 'An unexpected error occurred.'
    }
  }
}

export async function SignIn(email: string, password: string) {
  let output
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      output = 'success'
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode} ${errorMessage}`)
      output = errorMessage
    })
  return output
}

export function sign_Out() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(`Error: ${error}`)
    })
}

export async function addUser(data: any) {
  const user = auth.currentUser
  const userId = user?.uid
  // Add a new document with a generated id.
  const UserRef = doc(db, 'Users', userId as string)
  setDoc(UserRef, data)
}
