import { db } from './firebase.config'
import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore'

export function addDatafromArray(collectionName: string, data: any) {
  data.forEach(async (item: any) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), item)
    console.log('Document written with ID: ', docRef.id)
  })
}

export async function addData(collectionName: string, data: any) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, collectionName), data)
  console.log('Document written with ID: ', docRef.id)
}

export async function getData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName))
  const res: any = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const obj = doc.data()
    const id = doc.id
    res.push({ ...obj, id })
    // console.log({ ...obj, id })
  })
  return res
}

export async function getDataById(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}
