import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Landing from './pages/Landing.tsx'
import Order from './pages/Order.tsx'
import Payment from './pages/Payment.tsx'
import Success from './pages/Success.tsx'
import ProtectedRoute from './utils/ProtectedRoute.tsx' // Import the ProtectedRoute component
import Login from './components/Login.tsx'
import SignUp from './components/SignUp.tsx'
// import MyOrders from './components/MyOrders.tsx'

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
    {/* <Route path="/myOrders" element={<MyOrders />} /> */}
  </>
)

export default routes
