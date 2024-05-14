import React, { useState, useEffect } from 'react'
import BotonSidebar from './BotonSidebar'
import Deer from '../../assets/icons/Deer'
import Binoculars from '../../assets/icons/Binoculars'
import Menu from '../../assets/icons/Menu'
import Profile from '../../assets/icons/Profile'

const Sidebar: React.FC = () => {
  const [estaAbierto, setEstadoSidebar] = useState(false)
  const [botonActivo, setBotonActivo] = useState('')

  useEffect(() => {
    const estadoSidebar = localStorage.getItem('estadoSidebar')
    if (estadoSidebar) {
      setEstadoSidebar(JSON.parse(estadoSidebar))
    }
  }, [botonActivo])

  const alternarEstadoSidebar = () => {
    localStorage.setItem('estadoSidebar', JSON.stringify(!estaAbierto))
    setEstadoSidebar(!estaAbierto)
  }

  const clasesContSidebar = `h-screen sticky poppins-regular z-10 top-0 fondoVerdeOscuro relative transition-all px-3 duration-500 ${
    estaAbierto ? 'w-[14%] min-w-[160px]' : 'w-[65px] min-w-[65px]'
  }`

  const clasesLogo = `flex mt-14 gap-1 md:text-[18px] px-2 ${
    estaAbierto
      ? 'transition-all duration-1000 text-white'
      : 'text-transparent transition-all duration-300'
  }`

  return (
    <div className={clasesContSidebar}>
      <div className="h-[80%]">
        <div className="z-30 top-4 px-1 flex absolute">
          <button
            className="text-white hover:bg-white/20 rounded-full p-1 transition duration-300"
            onClick={alternarEstadoSidebar}
          >
            <Menu />
          </button>
        </div>

        <div id="logo" className={clasesLogo}>
          <h1 className="text-[19px] font-semibold">WildCare</h1>
          <div>
            <span className="text-xs font-semibold italic uppercase">A</span>
            <span className="text-xs font-semibold italic lowercase">dmin</span>
          </div>
        </div>

        <div
          id="lisOfButtons"
          className="mt-10 w-full flex flex-col justify-center items-center gap-2"
        >
          <BotonSidebar
            icono={<Deer />}
            texto="Especies"
            url="/home"
            estaAbierto={estaAbierto}
            cambiarBotonActivo={setBotonActivo}
          />
          <BotonSidebar
            icono={<Binoculars />}
            texto="Avistamientos"
            url="/avistamientos"
            estaAbierto={estaAbierto}
            cambiarBotonActivo={setBotonActivo}
          />
          <BotonSidebar
            icono={<Profile />}
            texto="Perfil"
            url="/Perfil"
            estaAbierto={estaAbierto}
            cambiarBotonActivo={setBotonActivo}
          />
        </div>
      </div>

      <div className="w-full h-[10%] flex items-end">
        <BotonSidebar
          icono={<Deer />}
          texto="Cerrar sesion"
          url="/login"
          estaAbierto={estaAbierto}
          cambiarBotonActivo={setBotonActivo}
        />
      </div>
    </div>
  )
}

export default Sidebar
