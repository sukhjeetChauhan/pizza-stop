import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { useContext } from 'react'
import { CartContext } from './CartProvider'
import cartSVG from '/images/cart.svg'

export default function Header() {
  const cart = useContext(CartContext)
  return (
    <>
      <section className="flex py-5 border-b-1 border-slate-300 items-center">
        <div className="ml-5 w-20">
          <Link to="/">
            <img src="/images/Logo/android-chrome-192x192.png" alt="logo" />
          </Link>
        </div>
        {/* <p className="text-xl font-bold text-red-500 ml-auto mr-12 ">{`Cart Items - ${cart.cart.length}`}</p> */}
        <div className="max-w-12 ml-auto mr-12 ">
          <Link to="/order/pizzas">
            <span className="text-red-500 text-xl font-bold relative top-2">
              {cart.cart.length}
            </span>
            <img src={cartSVG} alt="cart Image" />
          </Link>
        </div>
      </section>
      <Navigation />
    </>
  )
}
