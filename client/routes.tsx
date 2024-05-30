import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Landing from './pages/Landing.tsx'
import Order from './pages/Order.tsx'
// import Login from './components/Login.tsx'
import Payment from './pages/Payment.tsx'
import Success from './pages/Success.tsx'

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
    </Route>
    <Route path="/order/:name" element={<Order />} />
    {/* <Route path="/login" element={<Login />} /> */}
    <Route path="/payment" element={<Payment />} />
    <Route path="/success" element={<Success />} />
  </>
)

export default routes
