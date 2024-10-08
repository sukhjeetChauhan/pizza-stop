import { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Layout } from '@stripe/stripe-js'

// const returnUrl = import.meta.env.VITE_RETURN_URL as string

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  // const [email, setEmail] = useState('')
  const [message, setMessage] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!')
            break
          case 'processing':
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setMessage('Something went wrong.')
            break
        }
      })
  }, [stripe])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Remove the return_url here
        // receipt_email: email,
      },
      redirect: 'if_required', // Prevents auto-redirect, handle it manually
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message as string)
      } else {
        setMessage('An unexpected error occurred.')
      }
    } else if (paymentIntent?.status === 'succeeded') {
      // Redirect the user to a success page, but without sensitive info
      window.location.href = '/success'
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: 'tabs' as Layout, // or 'horizontal'
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <input
        id="email"
        type="text"
        value={email}
        className="w-full bg-blue-100 p-2 mb-4 rounded"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address for Invoice"
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
