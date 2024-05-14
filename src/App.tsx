import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes/Router'
import { SnackbarProvider } from 'notistack'
import { Contexto } from '../context/authProvider'

import { NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <Contexto>
      <NextUIProvider>
        <SnackbarProvider autoHideDuration={3000}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </NextUIProvider>
    </Contexto>
  )
}

export default App
