import { Link, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CartContext } from './CartProvider'
import cartSVG from '/images/cart.svg'
import { auth } from '../../src/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { sign_Out } from '../../src/authentication'

interface CartContextType {
  cartView: boolean
  setCartView: Dispatch<SetStateAction<boolean>>
}

export default function Header({ cartView, setCartView }: CartContextType) {
  const cart = useContext(CartContext)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const navigate = useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in,
      console.log('signed In')
      setIsSignedIn(true)
    } else {
      // User is signed out
      console.log('signed out')
      setIsSignedIn(false)
    }
  })

  console.log(isSignedIn)
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
          className={`flex gap-2 transition-all ease-in-out duration-500 absolute top-0 ${
            cartView ? 'right-[70%] sm:right-[60%]' : 'right-12'
          } items-center bg-white p-2`}
        >
          {isSignedIn ? (
            <button
              className="text-red-500 text-lg bg-white font-bold hover:text-xl transition-all ease-in-out duration-500"
              onClick={() => {
                sign_Out()
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-red-500 text-lg bg-white font-bold hover:text-xl transition-all ease-in-out duration-500"
              onClick={() => navigate('/login')}
            >
              Login/Sign-Up
            </button>
          )}
          <div
            className={`${
              location.pathname === '/' ? 'hidden' : 'block'
            } md:hidden`}
          >
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
