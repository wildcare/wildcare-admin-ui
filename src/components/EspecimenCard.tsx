import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface EspecimenCardProps {
    region: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    idUbicacion: string;
}

const EspecimenCard: React.FC<EspecimenCardProps> = ({ region, nombre, descripcion, imagen, idUbicacion }) => {
    const regionDefault = "Región";
    const nombreDefault = "NOMBRE";
    const descripcionDefault = "Descripción";
    const idUbicacionDefault = "XXXXXXX"
    const imagenDefault = "https://fakeimg.pl/600x400?text=Imagen";

    return (
        <Card className="py-2 min-w-xs max-w-xs h-fit max-h-[470px] overflow-auto">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="poppins-medium text-gray-400 mb-2">{region || regionDefault}</p>
                <h1 className="poppins-semibold text-3xl mb-4">{(nombre ? nombre.toUpperCase() : nombreDefault)}</h1>
                <h4 className="poppins-medium text-gray-600 text-sm text-justify mb-4">{descripcion || descripcionDefault}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="rounded-xl object-cover w-96 h-48"
                    src={imagen || imagenDefault}
                />
                <p className="poppins-medium text-gray-400 text-center text-sm mt-2">ID: {idUbicacion || idUbicacionDefault}</p>
            </CardBody>

        </Card>
    );
};

export default EspecimenCard;