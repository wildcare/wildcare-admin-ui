import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

interface Position {
  lat: number;
  lng: number;
}

interface MapaInfoEspecimenProps {
  position: Position;
}

function MapaInfoEspecimen({ position }: MapaInfoEspecimenProps) {
  return (
    <>
      <APIProvider apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}>
        <Map defaultCenter={position} defaultZoom={10}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </>
  )
}

export default MapaInfoEspecimen