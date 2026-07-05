import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import './styles/global.css'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Payment from './pages/Payment'
import Scan from './pages/Scan'
import History from './pages/History'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/home', element: <Home /> },
  { path: '/payment', element: <Payment /> },
  { path: '/scan', element: <Scan /> },
  { path: '/history', element: <History /> },
  { path: '/profile', element: <Profile /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
