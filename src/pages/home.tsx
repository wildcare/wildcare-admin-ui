import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { useEffect, useState } from 'react'
import { Especie, ListaEspecies } from '../types'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@nextui-org/react'

function Home() {
  const { obtenerTokenLocalStorage } = useAuth()
  const usuario = 'Matias'
  const [especies, setEspecies] = useState([] as ListaEspecies)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const obtenerEspecimenes = async (nombreEspecie: string) => {
    setLoading(true);
    await fetch(`http://localhost:3000/especimenes/obtenerPorNombre?nombre=${nombreEspecie}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/home/listar_especimenes', { state: { especimenes: data } });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className=" w-full h-full poppins-regular  ">
        {loading ? (
          <div className="w-screen h-screen flex items-center justify-center gap-4">
            <Spinner color="success" />
            <h2 className="poppins-medium mt-2">Cargando...</h2>
          </div>
        ) : (
          <>
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
                    onClick={() => obtenerEspecimenes(especie.nombre)}
                    className="flex flex-row justify-between h-[130px] flex-wrap items-center gap-3 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    style={divStyle}
                  >
                    <h1 className="text-white ml-20 text-[22px]">{especie.nombre}</h1>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default Home
