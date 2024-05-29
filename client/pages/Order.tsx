// import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'
import { productData } from '../../data/products'
import { useGetData } from '../../data/hooks'
import { sortBasedOnType } from '../../data/data_manipulation'

// import { MenuItem } from '../../types/menu'

// interface DataType {
//   [key: string]: MenuItem[] // Adjust the type according to your data structure
// }

export default function Order() {
  const { name } = useParams()
  const { data, isLoading, isError } = useGetData(name as string)

  if (isLoading) {
    return <p>Loading ......</p>
  }

  if (isError) {
    console.log('Error occured')
  }
  if (data) {
    const { menu, hasType } = sortBasedOnType(data)
    const menuTypeArr = Object.keys(menu)
    console.log(menu)

    return (
      <div style={{ width: '77%' }}>
        <main>
          <div className="sticky top-0 left-0 z-10 bg-white">
            <Header />
          </div>
          <div className="px-16">
            {hasType ? (
              menuTypeArr.map((item) => (
                <Menu data={menu[item]} title={item} type={name} />
              ))
            ) : (
              <Menu data={menu} title={'Menu'} type={name} />
            )}

            {/* <Menu data={menu} title={'Menu'} /> */}
          </div>
        </main>
        <aside
          style={{ width: '23%' }}
          className="fixed top-0 right-0 h-screen shadow-inner"
        >
          <Sidebar data={productData.sides} />
        </aside>
      </div>
    )
  }
}
