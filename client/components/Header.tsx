import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { useContext } from 'react'
import { CartContext } from './CartProvider'
import cartSVG from '/images/cart.svg'

export default function Header({
  cartView,
  setCartView,
}: {
  cartView: boolean
  setCartView: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const cart = useContext(CartContext)
  return (
    <>
      <section className="flex py-8 border-b-1 border-slate-300 items-center">
        <div className="ml-8 w-20 rounded-sm w-auto">
          <Link to="/">
            {/* <img src="/images/Logo/android-chrome-192x192.png" alt="logo" /> */}
            <p>
              <span className="text-white  rounded-l-sm font-caveat text-xl p-2 bg-limeGreen uppercase pl-3">
                Pizza
              </span>
              <span className="text-white rounded-r-sm font-caveat text-xl p-2 bg-red-500 uppercase pr-3">
                Stop
              </span>
            </p>
          </Link>
        </div>
        <div
          className={`flex transition-all ease-in-out duration-500 absolute top-0 ${
            cartView ? 'right-[70%] sm:right-[60%]' : 'right-12'
          } items-center bg-white p-2`}
        >
          <div className="block md:hidden">
            {cartView ? (
              <img
                className="sm:w-8 w-4 sm:h-8 h-4"
                src="/rightArrow.png"
                alt="left arrow"
                onClick={() => setCartView(false)}
              ></img>
            ) : (
              <img
                className="sm:w-8 w-4 sm:h-8 h-4"
                src="/leftArrow.png"
                alt="left arrow"
                onClick={() => setCartView(true)}
              ></img>
            )}
          </div>
          <div className="max-w-12 ml-3">
            <Link to="/order/pizzas">
              <span className="text-red-500 text-xl font-bold relative top-2">
                {cart.cart.length}
              </span>
              <img src={cartSVG} alt="cart Image" />
            </Link>
          </div>
        </div>
      </section>
      <Navigation />
    </>
  )
}
