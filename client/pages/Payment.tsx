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
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_live_51MR5xTIP5GR2cuzx36SURQMsXwpnz346yJGBKErRXv7dEGWPCBW6tN1T5B5vt0zQ1SimGnUgHA5WoRlvt00x3mRz00S3Ciuge1'
)

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const cart = useContext(CartContext)
  const deliverStatus = getLocalStorage()
  const user = auth.currentUser
  const userId = user?.uid
  const { data: userData } = useGetDataById('Users', userId as string)
  console.log(deliverStatus)
  console.log(userData)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'https://us-central1-pizza-stop-wellsford.cloudfunctions.net/api/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.cart,
          order: deliverStatus?.order ? deliverStatus.order : '',
          address: deliverStatus?.address ? deliverStatus.address : '',
          name: deliverStatus?.name ? deliverStatus.name : '',
          number: deliverStatus?.number ? deliverStatus.number : '',
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = {
    theme: 'stripe' as 'stripe', // Ensure theme is one of the allowed values
  }
  const options = {
    clientSecret,
    appearance,
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
      <div className="flex item-center justify-center gap-20">
        {/* <div className="flex flex-col">
          <div className="flex w-full items-center">
            <label className="text-xl text-limeGreen font-bold" htmlFor="name">
              Please enter your name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              className="w-4/5 bg-lime-100 p-2 mb-4 rounded text-xl"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center">
            <label className="text-xl text-limeGreen font-bold" htmlFor="name">
              Please enter your number
            </label>

            <input
              id="name"
              type="text"
              value={number}
              className="w-4/5 bg-lime-100 p-2 mb-4 rounded text-xl"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div> */}

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
