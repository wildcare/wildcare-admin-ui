import { useContext } from 'react'
import { MiContexto } from './authProvider'
export const useMiContexto = () => {
  const contexto = useContext(MiContexto)

  if (!contexto) {
    throw new Error('useMiContexto debe usarse dentro de un MiContextoProvider')
  }

  return contexto
}
