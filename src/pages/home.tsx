import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { useEffect, useState } from 'react'
import { Especie, ListaEspecies } from '../types'
function Home() {
  const { obtenerTokenLocalStorage } = useAuth()
  const usuario = 'Matias'
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
    <div className=" w-full h-full poppins-regular  ">
      <h2 className="text-xl  text-gray-800 mt-5 ml-10 verdeMedio ">
        Bienvenido, {usuario}
      </h2>
      <h2 className="text-md text-gray-800   ml-10 mb-8 verdeMedio ">
        Especies en peligro de extinción
      </h2>

      <div className="mx-10 rounded-lg overflow-hidden flex flex-col gap-[1px]">
        {especies.map((especie: Especie) => {
          const divStyle: React.CSSProperties = {
            backgroundImage: `linear-gradient(90deg, rgba(5, 40, 20, 0.89) 0%, rgba(5, 40, 20, 0.66) 25%, rgba(30, 31, 24, 0.00) 56.5%), url(${especie.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }

          return (
            <div
              key={especie.id}
              className="flex flex-row justify-between h-[130px] flex-wrap items-center gap-3  "
              style={divStyle}
            >
              <h1 className="text-white ml-20 text-[22px]">{especie.nombre}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Home
