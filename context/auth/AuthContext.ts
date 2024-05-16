import React, { createContext } from 'react'
import { User } from '../../src/types'

interface AuthProviderProps {
  usuario: User
  setUsuario: React.Dispatch<React.SetStateAction<User>>
  isLoggedIn: boolean
  inicioConGoogle: () => void
  inicioSesion: () => void
  setCamposUsuario: (campo: string, valor: string) => void
  obtenerTokenLocalStorage: () => string | null
}

export const authContext = createContext<AuthProviderProps>(
  {} as AuthProviderProps
)
