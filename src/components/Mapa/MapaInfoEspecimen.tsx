import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

function MapaInfoEspecimen() {
  const position = { lat: 53.54992, lng: 10.00678 }

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
