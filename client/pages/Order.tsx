// import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'
import '../styles/Order.css'
import { useGetData } from '../../data/hooks'
import { sortBasedOnType } from '../../data/data_manipulation'
import Spinner from '../utils/Spinner'
import { useState } from 'react'

const order = [
  'Meat Range',
  'Chicken Range',
  'Favourite Range',
  'Seafood SaRange',
  'Veg Range',
  'Value Range',
]

export default function Order() {
  const { name } = useParams()
  const { data, isLoading, isError } = useGetData(name as string)
  const { data: sides } = useGetData('sides')
  const [cartView, setCartView] = useState(false)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    console.log('Error occured')
  }
  if (data) {
    const { menu, hasType } = sortBasedOnType(data)
    const menuTypeArr = name === 'pizzas' ? order : Object.keys(menu)

    const { menu: sidesArr } = sortBasedOnType(sides)

    return (
      <div className="bg-[url('/images/marble-back.jpeg')] bg-auto bg-fixed md:w-[77%]">
        <main>
          <div className="sticky top-0 left-0 z-10 bg-white">
            <Header cartView={cartView} setCartView={setCartView} />
          </div>
          <div className="px-16 ">
            {hasType ? (
              menuTypeArr.map((item, i) => (
                <div key={i}>
                  <Menu data={menu[item]} title={item} type={name as string} />
                </div>
              ))
            ) : (
              <Menu data={menu} title={'Menu'} type={name as string} />
            )}

            {/* <Menu data={menu} title={'Menu'} /> */}
          </div>
        </main>
        <aside
          className={`fixed transition-all transform ease-out-in duration-500 z-10 right-0 ${
            cartView ? '' : 'translate-x-full'
          } bottom-0 h-screen shadow-inner md:w-[23%] sm:w-[60%] w-[70%]`}
        >
          <Sidebar data={sides && sidesArr.Loaded} />
        </aside>
      </div>
    )
  }
}
