import { Link, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CartContext } from './CartProvider'
import cartSVG from '/images/cart.svg'
import { auth } from '../../src/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { sign_Out } from '../../src/authentication'
import { Modal, message } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

interface CartContextType {
  cartView: boolean
  setCartView: Dispatch<SetStateAction<boolean>>
}

export default function Header({ cartView, setCartView }: CartContextType) {
  const cart = useContext(CartContext)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const navigate = useNavigate()

  const { confirm } = Modal
  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to Logout?',
      icon: <ExclamationCircleFilled />,

      onOk() {
        message.success('Logged out successfully')
        sign_Out()
      },
      onCancel() {},
    })
  }
  useEffect(() => {
    // Set up the auth state listener when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update state
        setIsSignedIn(true)
      } else {
        // User is signed out, update state
        setIsSignedIn(false)
      }
    })

    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, []) // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <section className="flex py-8 border-b-1 border-slate-300 items-center">
        <div className="ml-8 md:w-20 rounded-sm">
          <Link to="/">
            {/* <img src="/images/Logo/android-chrome-192x192.png" alt="logo" /> */}
            <p>
              <span className="text-white  rounded-l-sm font-caveat md:text-xl p-2 bg-limeGreen uppercase pl-3">
                Pizza
              </span>
              <span className="text-white rounded-r-sm font-caveat md:text-xl p-2 bg-red-500 uppercase pr-3">
                Stop
              </span>
            </p>
          </Link>
        </div>
        <div className="ml-auto mr-[9.5rem]">
          {isSignedIn ? (
            <button
              className="text-red-500 text-xs md:text-lg bg-white font-bold hover:text-xl transition-all ease-in-out duration-500"
              onClick={() => {
                showConfirm()
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-red-500 text-xs md:text-lg bg-white font-bold hover:text-xl transition-all ease-in-out duration-500"
              onClick={() => navigate('/login')}
            >
              Login/Sign-Up
            </button>
          )}
        </div>
        <div
          className={`flex gap-2 transition-all ease-in-out duration-500 absolute top-0 ${
            cartView ? 'right-[70%] sm:right-[60%]' : 'right-12'
          } items-center bg-white p-2`}
        >
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
