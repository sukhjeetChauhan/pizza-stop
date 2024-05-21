// import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'
import { productData } from '../../data/products'
import { MenuItem } from '../../types/menu'

// interface DataType {
//   [key: string]: MenuItem[] // Adjust the type according to your data structure
// }

export default function Order() {
  const { name } = useParams()
  console.log(productData)

  return (
    <div style={{ width: '77%' }}>
      <main>
        <div className="sticky top-0 left-0 z-50 bg-white">
          <Header />
        </div>
        <div className="px-16">
          <Menu data={productData[name as string]} />
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
