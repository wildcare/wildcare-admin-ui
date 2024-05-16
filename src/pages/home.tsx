import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { useEffect, useState } from 'react'
import { Especie, ListaEspecies } from '../types'
function Home() {
  const { obtenerTokenLocalStorage } = useAuth()
  const [especies, setEspecies] = useState([] as ListaEspecies)

  async function fetchData() {
    await fetch(API_WILDCARE + '/especies/obtenerTodos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEspecies(data as unknown as ListaEspecies)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className=" w-full h-full ">
      {especies.map((especie: Especie) => {
        return (
          <div key={especie.id} className="flex flex-row justify-between p-4">
            <h1>{especie.nombre}</h1>
          </div>
        )
      })}
    </div>
  )
}
export default Home
