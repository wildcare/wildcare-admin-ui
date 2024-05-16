import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/Router'
import { SnackbarProvider } from 'notistack'

import { AuthProvider } from '../context/auth/AuthProvider'

import { NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <AuthProvider>
      <NextUIProvider>
        <SnackbarProvider autoHideDuration={3000}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}

export default App
