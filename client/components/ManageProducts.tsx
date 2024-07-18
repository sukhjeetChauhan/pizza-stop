import { useEffect, useState } from 'react'
import { sortBasedOnType } from '../../data/data_manipulation'
import { useGetData } from '../../data/hooks'

import AdminProducts from '../utils/AdminProducts'
import Spinner from '../utils/Spinner'
import Modal from './Modal'

export default function ManageProducts() {
  const [data, setData] = useState(null)
  const [types, setTypes] = useState<string[]>()
  const [product, setProduct] = useState('')
  const [modalStatus, setModalStatus] = useState(false)
  const [category, setCategory] = useState('')

  const {
    data: pizzas,
    isLoading: pizzasLoading,
    refetch: refetchPizza,
    // isError: pizzasError,
  } = useGetData('pizzas')
  const {
    data: sides,
    // isLoading: sidesLoading,
    // isError: sidesError,
    refetch: refetchSides,
  } = useGetData('sides')
  const {
    data: desserts,
    // isLoading: dessertsLoading,
    // isError: dessertsError,
    refetch: refetchDesserts,
  } = useGetData('desserts')
  const {
    data: drinks,
    // isLoading: drinksLoading,
    // isError: drinksError,
    refetch: refetchDrinks,
  } = useGetData('drinks')

  // const loadingObj = {
  //   pizzas: pizzasLoading,
  //   sides: sidesLoading,
  //   desserts: dessertsLoading,
  //   drinks: drinksLoading,
  // }
  const refetchObj = {
    pizzas: refetchPizza,
    sides: refetchSides,
    desserts: refetchDesserts,
    drinks: refetchDrinks,
  }

  const productType = ['pizzas', 'sides', 'desserts', 'drinks']

  const sortedPizzas = pizzas ? sortBasedOnType(pizzas) : undefined
  const sortedSides = sides ? sortBasedOnType(sides) : undefined
  const sortedDesserts = desserts ? sortBasedOnType(desserts) : undefined
  const sortedDrinks = drinks ? sortBasedOnType(drinks) : undefined

  useEffect(() => {
    if (data === null) {
      if (product === '') {
        showData('pizzas')
      }
    }
  }, [data])

  if (pizzasLoading) {
    return <Spinner />
  }

  function showData(item: string) {
    setProduct(item)
    let selectedData
    let selectedTypes

    if (item === 'pizzas' && sortedPizzas) {
      selectedData = sortedPizzas.menu
      selectedTypes = Object.keys(sortedPizzas.menu || {})
    } else if (item === 'sides' && sortedSides) {
      selectedData = sortedSides.menu
      selectedTypes = Object.keys(sortedSides.menu || {})
    } else if (item === 'desserts' && sortedDesserts) {
      selectedData = sortedDesserts.menu
      selectedTypes = Object.keys(sortedDesserts.menu || {})
    } else if (item === 'drinks' && sortedDrinks) {
      selectedData = sortedDrinks.menu
      selectedTypes = Object.keys(sortedDrinks.menu || {})
    }

    if (selectedData && selectedTypes) {
      setData(selectedData)
      setTypes(selectedTypes)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.')
  }

  function openAddWindow(item: string): void {
    setCategory(item)
    setModalStatus(true)
  }

  return (
    <>
      {modalStatus && (
        <>
          <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-800 opacity-50"></div>
          <Modal>
            <div className="p-4">
              <h3>{`Category: ${category}`}</h3>
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
              >
                <input type="text" placeholder="Product Name" />
                <input type="text" placeholder="Product Decription" />
                <input type="text" placeholder="Product Price" />

                <button type="submit">Add Item</button>
              </form>
            </div>
          </Modal>
        </>
      )}
      <div className="flex flex-col items-center gap-3 ">
        <div className="flex p-3 bg-white gap-4 border-b-2 border-slate-300 w-full">
          {productType.map((item, i) => (
            <button
              key={i}
              className="rounded bg-red-500 text-white font-bold text-lg hover:bg-red-700 px-4 py-2"
              onClick={() => showData(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="bg-white w-[95%] h-[34.5rem] p-4 shadow-md overflow-y-scroll">
          {types?.map((item, i) => (
            <div className="mb-12" key={i}>
              <div className="flex justify-between mb-6">
                <h1 className="font-bold text-3xl text-limeGreen mb-4">
                  {item}
                </h1>
                <button
                  className="px-3 py-1 rounded-full bg-red-500 text-sm text-white"
                  onClick={() => openAddWindow(item)}
                >
                  ADD
                </button>
              </div>
              {data && (
                <AdminProducts
                  data={data[item]}
                  type={product}
                  refetchObj={refetchObj}
                  showData={showData}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
