import { useState, useEffect, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from '../components/CheckoutForm'
import '../styles/Payment.css'
import { CartContext } from '../components/CartProvider'
import { getLocalStorage } from '../../data/localStorage'
import { auth } from '../../src/firebase.config'
import { useGetDataById } from '../../data/hooks'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// const stripePromise = loadStripe(
//   'pk_live_51MR5xTIP5GR2cuzx36SURQMsXwpnz346yJGBKErRXv7dEGWPCBW6tN1T5B5vt0zQ1SimGnUgHA5WoRlvt00x3mRz00S3Ciuge1'
// )
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51PLgjzK3nDwi1iFQFXCVEUyURYb88KGNqu0T1CF1ndZPHXuzFQoDlz845Kw7Ui5YUyMHItCWGBlmNEoCjs8r7kY200XEcGW366'
)

interface UserInfo {
  name: string
  number: string
}

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const cart = useContext(CartContext)
  const deliverStatus = getLocalStorage()
  const user = auth.currentUser
  const userId = user?.uid
  const { data: userData } = useGetDataById('Users', userId as string)
  // console.log(userData?.email)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      // 'https://us-central1-pizza-stop-wellsford.cloudfunctions.net/api/create-payment-intent',
      'http://localhost:3000/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          items: cart.cart,
          order: deliverStatus?.order ? deliverStatus.order : '',
          address: deliverStatus?.address
            ? deliverStatus.address
            : userData?.address
            ? userData?.address
            : '',
          name: userData?.name
            ? userData?.name
            : userInfo?.name
            ? userInfo?.name
            : '',
          number: userData?.phone
            ? userData?.phone
            : userInfo?.number
            ? userInfo?.number
            : '',
          email: userData?.email ? userData?.email : '',
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [userInfo, userData])

  const appearance = {
    theme: 'stripe' as 'stripe', // Ensure theme is one of the allowed values
  }
  const options = {
    clientSecret,
    appearance,
  }

  function handleSubmit() {
    setUserInfo({ name: name, number: number })
    setName('')
    setNumber('')
  }

  return (
    <div className="payment">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          className="w-20 h-20"
          src="/images/Logo/android-chrome-192x192.png"
        />
        <h1 className="text-5xl text-red-700 font-bold">Secure checkout</h1>
      </div>
      <div className="flex flex-col md:flex-row item-center justify-center md:gap-20">
        {userData?.name === undefined && (
          <div className="flex flex-col bg-sky-100 p-4 m-4 md:p-8 rounder shadow-lg gap-4 md:gap-8">
            <h2 className="text-lg font-bold">
              We need little more detail to process your order
            </h2>
            <div className="flex w-full items-center justify-between">
              <label
                className="md:text-xl text-red-500 font-bold"
                htmlFor="name"
              >
                Name:
              </label>

              <input
                id="name"
                type="text"
                value={name}
                className="w-auto p-1 rounded text-xl border-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <label
                className="md:text-xl text-red-500 font-bold"
                htmlFor="number"
              >
                Phone:
              </label>

              <input
                id="number"
                type="text"
                value={number}
                className="w-auto p-1 rounded text-xl border-2"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {userInfo && (
              <div>
                <p className="text-xl font-bold text-sky-500">
                  Thank you for the information.
                </p>
                <p className="text-xl font-bold text-sky-500">
                  Please proceed to Payment.
                </p>
              </div>
            )}
          </div>
        )}
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
