import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { useEffect, useState } from 'react'
import { User, Especie, ListaEspecies } from '../types'
function Home() {
  const { obtenerTokenLocalStorage } = useAuth()
  const [usuario, setUsuario] = useState({} as User)
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

      <h2 style={{ color: 'gray', fontSize:'1.5em', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginLeft: '20px'}}>Bienvenido, {usuario.nombreUsuario}</h2>
      {especies.map((especie: Especie) => {
        const divStyle: React.CSSProperties = {
          width: '1300px',
          height: '200px',
          backgroundImage: `linear-gradient(to right, rgba(5, 40, 20, 0.89), rgba(5, 40, 20, 0.66), rgba(0, 128, 0, 0)), url(${especie.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          margin: 'auto',
          border: '5px solid #000',
          marginTop: '10px',
          marginBottom: '10px'
        };

        const h1Style: React.CSSProperties = {
          color: 'white',
          fontSize: '1.5em',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          alignItems: 'left',
          marginLeft: '20px'
        };


        return (         
          <div key={especie.id} className="flex flex-row justify-between p-4" style={divStyle}>
            <h1 style={h1Style} >{especie.nombre}</h1>
          </div>
        )
      })}
    </div>
  )
}
export default Home
