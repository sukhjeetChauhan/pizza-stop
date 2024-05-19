// import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Sidebar from '../components/Sidebar'

export default function Order() {
  const { name } = useParams()
  console.log(name)
  return (
    <div style={{ width: '77%' }}>
      <main>
        <div className="sticky top-0 left-0 z-50 bg-white">
          <Header />
        </div>
        <div className="px-16">
          <Menu />
        </div>
      </main>
      <aside
        style={{ width: '23%' }}
        className="fixed top-0 right-0 h-screen bg-red-700"
      >
        <Sidebar />
      </aside>
    </div>
  )
}
