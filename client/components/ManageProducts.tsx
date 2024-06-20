import { useState } from 'react'
import { sortBasedOnType } from '../../data/data_manipulation'
import { useGetData } from '../../data/hooks'
// import { CartItemWithId } from './CartProvider'
import AdminProducts from '../utils/AdminProducts'
import Spinner from '../utils/Spinner'

export default function ManageProducts() {
  const [data, setData] = useState()
  const [types, setTypes] = useState<string[]>()
  const [product, setProduct] = useState('')
  const {
    data: pizzas,
    isLoading: pizzasLoading,
    // isError: pizzasError,
  } = useGetData('pizzas')
  const {
    data: sides,
    // isLoading: sidesLoading,
    // isError: sidesError,
  } = useGetData('sides')
  const {
    data: desserts,
    // isLoading: dessertsLoading,
    // isError: dessertsError,
  } = useGetData('desserts')
  const {
    data: drinks,
    // isLoading: drinksLoading,
    // isError: drinksError,
  } = useGetData('drinks')

  const productType = ['pizzas', 'sides', 'desserts', 'drinks']

  const sortedPizzas = pizzas ? sortBasedOnType(pizzas) : undefined
  const sortedSides = sides ? sortBasedOnType(sides) : undefined
  const sortedDesserts = desserts ? sortBasedOnType(desserts) : undefined
  const sortedDrinks = drinks ? sortBasedOnType(drinks) : undefined
  if (pizzasLoading) {
    return <Spinner />
  }

  function showData(item: string) {
    setProduct(item)
    if (item === 'pizzas') {
      setData(sortedPizzas?.menu)
      setTypes(Object.keys(sortedPizzas?.menu))
    } else if (item === 'sides') {
      setData(sortedSides?.menu)
      setTypes(Object.keys(sortedSides?.menu))
    } else if (item === 'desserts') {
      setData(sortedDesserts?.menu)
      setTypes(Object.keys(sortedDesserts?.menu))
    } else if (item === 'drinks') {
      setData(sortedDrinks?.menu)
      setTypes(Object.keys(sortedDrinks?.menu))
    }
  }

  return (
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
          <div className="mb-6" key={i}>
            <h1 className="font-bold text-3xl text-limeGreen mb-4">{item}</h1>
            {data && <AdminProducts data={data[item]} type={product} />}
          </div>
        ))}
      </div>
    </div>
  )
}
