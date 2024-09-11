import { db } from './firebase.config'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  where,
  query,
  onSnapshot,
  DocumentData,
  updateDoc,
} from 'firebase/firestore'

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
  return docRef
  // console.log('Document written with ID: ', docRef.id)
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

export function getUpdatedOrder(
  onupdate: (arg0: DocumentData[]) => void,
  status: string
) {
  const q = query(collection(db, 'orders'), where('status', '==', status))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const orders: DocumentData[] = []
    querySnapshot.forEach((doc) => {
      orders.push({ ...doc.data(), id: doc.id })
    })
    onupdate(orders)
  })
  return unsubscribe
}

export async function getDataByType(product: string, type: string) {
  const q =
    type === 'any'
      ? query(collection(db, product))
      : query(collection(db, product), where('type', '==', type))
  const result: DocumentData[] = []
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snacopshots
    result.push({ ...doc.data(), id: doc.id })
  })
  return result
}

export async function updateData(collection: string, id: string, data: any) {
  const dataRef = doc(db, collection, id)

  await updateDoc(dataRef, data)
}

export async function deleteProduct(collection: string, id: string) {
  await deleteDoc(doc(db, collection, id))
}
