import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ControllerProvider } from './Providers/ControllerProvider.tsx'
import CartProvider from './Providers/CartProvider.tsx'
import './index.css'
import routes from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ControllerProvider>
          <RouterProvider router={router} />
        </ControllerProvider>
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
