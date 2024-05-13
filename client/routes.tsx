import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './pages/App.tsx'

import Landing from './pages/Landing.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Landing />} />
  </Route>
)

export default routes
