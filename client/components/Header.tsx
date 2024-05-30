import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { useContext } from 'react'
import { CartContext } from './CartProvider'

export default function Header() {
  const cart = useContext(CartContext)
  return (
    <>
      <section className="flex py-5 border-b-1 border-slate-300">
        <div className="ml-5 w-20">
          <Link to="/">
            <img src="/images/Logo/android-chrome-192x192.png" alt="logo" />
          </Link>
        </div>
        <p className="text-xl font-bold text-red-500 ml-auto mr-12 ">{`Cart Items - ${cart.cart.length}`}</p>
      </section>
      <Navigation />
    </>
  )
}
