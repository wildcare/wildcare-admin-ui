import { Card, CardHeader, CardBody, Image, Chip } from '@nextui-org/react';
import { API_WILDCARE } from '../consts/APIWildCare';
import { useAuth } from '../../context/auth/useAuth';
import { useState } from 'react';

interface AvistamientoCardProps {
    id: string;
    region: string;
    nombre: string;
    descripcion: string;
    imagen: string | null;
    estado: string;
    fetchAvistamientoPorId: () => void;
}

const AvistamientoCard: React.FC<AvistamientoCardProps> = ({ id, region, nombre, descripcion, imagen, estado, fetchAvistamientoPorId }) => {
    const regionDefault = "Región";
    const nombreDefault = "NOMBRE";
    const descripcionDefault = "Descripción";
    const imagenDefault = "https://fakeimg.pl/600x400?text=Imagen";


    const [isLoading, setIsLoading] = useState(false);

    const { obtenerTokenLocalStorage } = useAuth();

    const editarEstadoAvistamiento = async (estado: string) => {

      if (nombre.toLowerCase() === 'pendiente'){
        alert('No se puede editar el estado de un avistamiento pendiente ');
        return;
      } 

      setIsLoading(true);

      try {
        const response = await fetch(API_WILDCARE + '/avistamientos/editarEstado/' + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
          },
          body: JSON.stringify({ estado }),
        })
        if (!response.ok) {
          throw new Error('Error al editar el avistamiento');
        }
        setIsLoading(false);
        fetchAvistamientoPorId();
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      } 
    };


    return (
      <Card className="py-2 min-w-xs max-w-xs h-fit max-h-[520px] overflow-auto relative">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="poppins-medium text-gray-400 mb-2 h-[3rem] pr-4">
                {region || regionDefault}
              </p>
              <h1 className="poppins-semibold text-3xl mb-4">
                {nombre ? nombre.toUpperCase() : nombreDefault}
              </h1>
              <h4 className="poppins-medium text-gray-600 text-sm text-justify mb-4 h-[5rem]">
                {descripcion || descripcionDefault}
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover w-96 h-48"
            src={imagen || imagenDefault}
          />
          {/* MOSTRAR 2 COMPONENTE DE CHIP  */}
          <div className="flex justify-between items-center mt-4">
            <Chip
              size="sm"
              variant={estado === "revisado" ? "solid" : "faded"}
              color="success"
              className="poppins-medium cursor-pointer"
              onClick={() => editarEstadoAvistamiento("revisado")}
              isDisabled={isLoading}

            >
              Revisado
            </Chip>
            <Chip
              size="sm"
              variant={estado === "revisado" ? "faded" : "solid"}
              color="danger"
              className="poppins-medium cursor-pointer"
              onClick={() => editarEstadoAvistamiento("pendiente")}
              isDisabled={isLoading}

            >
              Pendiente
            </Chip>
          </div>
        </CardBody>
      </Card>
    );
};

export default AvistamientoCard;
