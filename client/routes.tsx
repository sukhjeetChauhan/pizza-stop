import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Layout from './components/Layout.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Landing />} />
  </Route>
)

export default routes
