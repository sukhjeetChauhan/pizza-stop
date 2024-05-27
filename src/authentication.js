import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const auth = getAuth()

export function SignUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode} ${errorMessage}`)
    })
}

export function SignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode} ${errorMessage}`)
    })
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
