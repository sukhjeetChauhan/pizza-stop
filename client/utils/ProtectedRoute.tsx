import React, { ReactElement, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CartContext } from '../components/CartProvider' // Adjust the import according to your context setup

interface ProtectedRouteProps {
  element: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { cart } = useContext(CartContext)
  const location = useLocation()

  if (!cart || cart.length === 0) {
    return <Navigate to="/order/pizzas" state={{ from: location }} />
  }

  return element
}

export default ProtectedRoute
