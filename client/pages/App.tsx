import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/App.css'

export default function App() {
  return (
    <>
      <Header />

      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
