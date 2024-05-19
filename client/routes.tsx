import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Landing from './pages/Landing.tsx'
import Order from './pages/Order.tsx'

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
    </Route>
    <Route path="/order/:name" element={<Order />} />
  </>
)

export default routes
