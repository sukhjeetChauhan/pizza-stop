import React, { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { auth } from '../../src/firebase.config'

interface ProtectedRouteProps {
  element: ReactElement
}

const AdminRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = auth.currentUser
  const userId = user?.uid

  const location = useLocation()

  if (userId !== 'sq5tfS5JPyVIRinIc9XsBN1PlmY2') {
    return <Navigate to="/order/pizzas" state={{ from: location }} />
  }

  return element
}

export default AdminRoute
