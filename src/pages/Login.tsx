import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png'
import { Input } from '@nextui-org/react'
import { useAuth } from '../../context/auth/useAuth'

const Login: React.FC = () => {
  const { inicioSesion, setCamposUsuario, usuario } = useAuth()
  console.log('usuario:', usuario)

  return (
    <div className="w-screen h-screen bg-slate-100 flex   ">
      <div className="w-[50%] h-full animate-fadeIn relative overflow-hidden titule before:content-[''] before:absolute before:bg-gradient-to-b before:from-transparent before:to-slate-900  before:w-[100%] before:h-[70%] right:top-0 before:top-[30%] ">
        <img
          src=" https://images.unsplash.com/photo-1527720255604-b27935ade401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
          className="w-full h-full object-none"
        />
      </div>

      <div className="w-1/2 h-full text-slate-500/80 flex justify-center items-center">
        <div className="w-[70%] px-10  flex flex-col items-center justify-center gap-8 bg-white py-[40px] rounded">
          <img src={icon} className="w-[50px] h-[50px] " />
          <h1 className="text-2xl font-medium text-sky-700">Iniciar sesión</h1>

          <div className="w-full flex flex-col justify-center items-center max-w-[80%] gap-5  ">
            <Input
              label="Correo"
              name="correo"
              type="text"
              value={usuario.correo}
              defaultValue={usuario.correo}
              placeholder="correo@gmail.com"
              onChange={(e) => setCamposUsuario('correo', e.target.value)}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={usuario.password}
              placeholder="**********"
              onChange={(e) => setCamposUsuario('password', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 w-[80%] scale-90">
            {/* <Link
              to="/empresas"
              className="text-white text-center p-2 bg-sky-700  rounded w-full "
            >
              Iniciar sesión
            </Link> */}
            <button
              onClick={() => inicioSesion()}
              type="button"
              className="text-white text-center p-2 bg-sky-700  rounded w-full "
            >
              Iniciar sesión
            </button>

            <Link
              to="/registro"
              className=" underline text-sky-600 text-[11px] text-center hover:text-sky-400"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
