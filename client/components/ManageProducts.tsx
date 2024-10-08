import { useEffect, useState } from 'react'
import { sortBasedOnType } from '../../data/data_manipulation'
import { useGetData } from '../../data/hooks'
import { NewMenuItem } from '../../types/menu'
import AdminProducts from '../utils/AdminProducts'
import Spinner from '../utils/Spinner'
import Modal from './Modal'
import { addData } from '../../src/db'

export default function ManageProducts() {
  const [data, setData] = useState(null)
  const [types, setTypes] = useState<string[]>()
  const [product, setProduct] = useState('')
  const [modalStatus, setModalStatus] = useState(false)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [priceSmall, setPriceSmall] = useState('')
  const [priceLarge, setPriceLarge] = useState('')

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
      // if (product === '') {
      //   showData('pizzas')
      // }
      showData('pizzas')
    }
  }, [pizzas, sides, desserts, drinks])

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

  async function handleSubmit(e: {
    preventDefault: () => void
  }): Promise<void> {
    e.preventDefault()
    const newProduct: NewMenuItem = {
      name: name,
      description: description,
      imgUrl: '/images/front.jpg',
      type: category,
    }
    if (product === 'pizzas') {
      newProduct.price_large = priceLarge
      newProduct.price_small = priceSmall
    } else {
      newProduct.price = price
    }

    await addData(product, newProduct)
    setName('')
    setDescription('')
    setPrice('')
    setPriceSmall('')
    setPriceLarge('')
    setModalStatus(false)
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
            <div className="p-8">
              <h3 className="text-xl mb-8 text-bold mt-6">{`Category: ${category}`}</h3>
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
              >
                <input
                  className="text-lg py-1 px-2 border-2 border-slate-500 rounded mb-4"
                  type="text"
                  placeholder="Product Name"
                  aria-label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {product === 'pizzas' ? (
                  <div
                    key="pizza-prices"
                    className="flex flex-col items-center justify-center"
                  >
                    <input
                      className="text-lg py-1 px-2 border-2 border-slate-500 rounded mb-4"
                      type="text"
                      placeholder="Product Price_small"
                      aria-label="price_small"
                      value={priceSmall}
                      onChange={(e) => setPriceSmall(e.target.value)}
                    />
                    <input
                      className="text-lg py-1 px-2 border-2 border-slate-500 rounded mb-4"
                      type="text"
                      placeholder="Product Price_large"
                      aria-label="price_large"
                      value={priceLarge}
                      onChange={(e) => setPriceLarge(e.target.value)}
                    />
                  </div>
                ) : (
                  <div key="general-prices">
                    <input
                      className="text-lg py-1 px-2 border-2 border-slate-500 rounded mb-4"
                      type="text"
                      placeholder="Product Price"
                      aria-label="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}
                <textarea
                  className="text-lg py-1 px-2 border-2 border-slate-500 rounded mb-4 h-[150px]"
                  placeholder="Product Decription"
                  aria-label="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <button
                  className="bg-red-500 px-2 py-4 text-white text-bold rounded w-full"
                  type="submit"
                >
                  Add Item
                </button>
              </form>
              <button
                onClick={() => setModalStatus(false)}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute top-2 right-2"
              >
                X
              </button>
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
