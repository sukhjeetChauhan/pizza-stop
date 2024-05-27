import { newData } from '../data/products'
import { db } from './firebase.config'
import { collection, addDoc } from 'firebase/firestore'

export function addData() {
  newData.forEach(async (item) => {
    // Add a new document with a generated id.
    // const docRef = await addDoc(collection(db, 'pizzas'), item)
    console.log('Document written with ID: ', docRef.id)
  })
}
