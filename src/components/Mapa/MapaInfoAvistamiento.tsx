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
      <APIProvider apiKey={'AIzaSyDSAkerSFnBI7OxrI31_4FCoFvlwB0cL1U'}>
        <Map defaultCenter={position} defaultZoom={10}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </>
  )
}

export default MapaInfoEspecimen