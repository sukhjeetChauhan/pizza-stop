import { useState, useEffect, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from '../components/CheckoutForm'
// import '../styles/Payment.css'
import { CartContext } from '../components/CartProvider'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51PLgjzK3nDwi1iFQFXCVEUyURYb88KGNqu0T1CF1ndZPHXuzFQoDlz845Kw7Ui5YUyMHItCWGBlmNEoCjs8r7kY200XEcGW366'
)

export default function Payment() {
  const [clientSecret, setClientSecret] = useState('')
  const cart = useContext(CartContext)
  console.log(cart)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'http://127.0.0.1:5001/pizza-stop-wellsford/us-central1/api/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.cart }),
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
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
