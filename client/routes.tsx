import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Landing from './pages/Landing.tsx'
import Order from './pages/Order.tsx'
import Login from './components/Login.tsx'
import Payment from './pages/Payment.tsx'
import Success from './pages/Success.tsx'
import ProtectedRoute from './utils/ProtectedRoute.tsx' // Import the ProtectedRoute component
import SignUp from './components/SignUp.tsx'

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
    </Route>
    <Route path="/order/:name" element={<Order />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
    <Route path="/success" element={<Success />} />
  </>
)

export default routes
