import React, { createContext } from 'react'

import { API_WILDCARE } from '../src/consts/APIWildCare'

interface MiContextoProps {}

export const MiContexto = createContext<MiContextoProps | undefined>(undefined)

export const Contexto: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log(API_WILDCARE)
  return <MiContexto.Provider value={{}}>{children}</MiContexto.Provider>
}
