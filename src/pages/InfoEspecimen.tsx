import React from 'react'
import { Especimen } from '../../src/types'

import EspecimenCard from '../components/EspecimenCard'
import MapaInfoEspecimen from '../components/Mapa/MapaInfoEspecimen'
interface InfoEspecimenProps {
  especimen?: Especimen
}
const InfoEspecimen: React.FC<InfoEspecimenProps> = ({ especimen }) => {
  if (!especimen) {
    especimen = {
      id: '123132',
      nombre: 'Especimen',
      descripcion: 'Descripcion',
      region: 'Region',
      imagen: 'https://via.placeholder.com/150',
      idUbicacion: 'adsad',
      ciudad: 'Ciudad',
    }
  }
  return (
    <div className="w-full h-screen lg:flex   bg-gray-100  ">
      <div className=" lg:w-1/2 flex flex-col  mt-8 lg:items-end items-center ">
        <h1 className="poppins-medium verdeClaro text-2xl  w-[470px] ">
          {'Registrar nuevo espécimen'}
        </h1>
        <h1 className="poppins-regular verdeClaro text-medium w-[470px] ">
          {'Especimenes> ' + especimen.nombre + '> ' + especimen.id}
        </h1>
        <div className=" w-[470px] h-[470px] mt-12">
          <MapaInfoEspecimen />
        </div>
      </div>
      <div
        className="w-full lg:w-1/2 min-w-[300px] flex items-center justify-center h-screen"
        id="cardNuevoEspecimen2"
      >
        <EspecimenCard
          region={especimen.region}
          nombre={especimen.nombre}
          descripcion={especimen.descripcion}
          imagen={especimen.imagen}
          idUbicacion={especimen.idUbicacion}
          showDropdown={false}
        />
      </div>
    </div>
  )
}

export default InfoEspecimen
