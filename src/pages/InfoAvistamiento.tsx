import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MapaInfoAvistamiento from '../components/Mapa/MapaInfoAvistamiento';
import AvistamientoCard from '../components/AvistamientoCard';
import { API_WILDCARE } from '../consts/APIWildCare'
import { useAuth } from '../../context/auth/useAuth'
import { Spinner } from '@nextui-org/react';


interface Avistamiento {
    id: string;
    ciudad: string;
    descripcion: string;
    especie: string;
    fecha: string;
    idUsuario: string;
    imagen: string;
    lat: number;
    lng: number;
    region: string;
    nombreUsuario: string;
    correoUsuario: string;
    estado: string; //pendiente(default) o revisado
  }

const InfoAvistamiento: React.FC = () => {

    const { id } = useParams();
    const [avistamiento, setAvistamiento] = useState<Avistamiento>();
    const { obtenerTokenLocalStorage } = useAuth();

  
    const fetchAvistamientoPorId = async () => {
        try {
          const response = await fetch(API_WILDCARE + '/avistamientos/obtenerAvistamientoById/' + id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
            },
          })
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          const data: Avistamiento = await response.json();
          //console.log(data)
          setAvistamiento(data);
        } catch (error) {
      
          //console.log(error)
        } 
      };


      useEffect(() => {
        fetchAvistamientoPorId();
      }, []);

      if (!avistamiento || Object.keys(avistamiento).length === 0) {
        return <Spinner color="success" label="Cargando..." />
    }



  return (
    <>
    <div className="w-full h-screen lg:flex   bg-gray-100  ">
      <div className=" lg:w-1/2 flex flex-col  mt-8 lg:items-end items-center ">
        <h1 className="poppins-medium verdeClaro text-2xl  w-[470px] ">
          Avistamientos de especies en peligro de extinción
        </h1>
        <h1 className="poppins-regular verdeClaro text-medium w-[470px] ">
          {"Especimenes> " + avistamiento.especie}
        </h1>
        <div className=" w-[470px] h-[470px] mt-12">
          <MapaInfoAvistamiento
                        position={{ lat: avistamiento.lat, lng: avistamiento.lng }}

          />
        </div>
      </div>
      <div
        className="w-full lg:w-1/2 min-w-[300px] flex items-center justify-center h-screen"
        id="cardNuevoEspecimen2"
      >
        <AvistamientoCard
          id={avistamiento.id}
          region={avistamiento.region}
          nombre={avistamiento.especie}
          descripcion={avistamiento.descripcion}
          imagen={avistamiento.imagen}
          estado={avistamiento.estado}
          fetchAvistamientoPorId={fetchAvistamientoPorId}
        />
      </div>
    </div>
    </>
  );
}

export default InfoAvistamiento
