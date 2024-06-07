import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/App.css'
import { SetStateAction } from 'react'

export default function App() {
  return (
    <>
      <Header
        cartView={false}
        setCartView={function (value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.')
        }}
      />

      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
