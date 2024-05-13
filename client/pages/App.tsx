import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/App.css'

export default function App() {
  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold underline">Hello world People!</h1>
      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
