import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen font-bold flex-col gap-4 bg-green-100">
      <h1 className="text-5xl text-red-500">Payment Recieved Successfully</h1>
      <p className="text-xl text-gray-500">
        Please help your local business by leaving us a Review:{' '}
        <span className="font-bold text-green-500 text-3xl">
          <HashLink to="/#reviewForm">Click Here</HashLink>
        </span>
      </p>
      <p className="text-xl text-gray-500">
        To Order more, Go back to{' '}
        <span className="font-bold text-green-500 text-3xl">
          <Link to="/">Home</Link>
        </span>{' '}
        page
      </p>
    </div>
  )
}
