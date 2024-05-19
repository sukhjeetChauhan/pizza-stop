// import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Menu from '../components/Menu'

export default function Order() {
  return (
    <div className="w-4/5">
      <main>
        <Header />
        <div className="px-20">
          <Menu />
        </div>
      </main>
      <aside className="fixed right-0 w-1/5 h-screen bg-yellow"></aside>
    </div>
  )
}
