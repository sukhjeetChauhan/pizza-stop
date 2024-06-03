// import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'

import { useGetData } from '../../data/hooks'
import { sortBasedOnType } from '../../data/data_manipulation'
import Spinner from '../utils/Spinner'
// import { useEffect } from 'react'

// import { MenuItem } from '../../types/menu'

// interface DataType {
//   [key: string]: MenuItem[] // Adjust the type according to your data structure
// }

export default function Order() {
  const { name } = useParams()
  const { data, isLoading, isError } = useGetData(name as string)
  const { data: sides } = useGetData('sides')

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    console.log('Error occured')
  }
  if (data) {
    const { menu, hasType } = sortBasedOnType(data)
    const menuTypeArr = [
      'Meat Range',
      'Chicken Range',
      'Favourite Range',
      'Seafood SaRange',
      'Veg Range',
      'Value Range',
    ]

    const { menu: sidesArr } = sortBasedOnType(sides)

    return (
      <div
        className="bg-[url('/images/marble-back.jpeg')] bg-auto bg-fixed"
        style={{ width: '77%' }}
      >
        <main>
          <div className="sticky top-0 left-0 z-10 bg-white">
            <Header />
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
          style={{ width: '23%' }}
          className="fixed top-0 right-0 h-screen shadow-inner"
        >
          <Sidebar data={sides && sidesArr.Loaded} />
        </aside>
      </div>
    )
  }
}
