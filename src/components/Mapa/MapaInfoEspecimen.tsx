import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { Ubicaciones } from '../../types'
interface MapaInfoEspecimenProps {
	markers: Ubicaciones
}

const MapaInfoEspecimen: React.FC<MapaInfoEspecimenProps> = ({ markers }) => {
	if (markers.length === 0) {
		markers = [{ lat: 13, lng: 13, fecha: 'No hay ubicaciones' }]
	}
	return (
		<>
			<APIProvider apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}>
				<Map
					defaultCenter={markers[0]}
					defaultZoom={15}
					style={{
						overflow: 'hidden',
						//agregar shadow y un borde un poco mas oscuro y un radio de 20
						border: '2px solid #E0E0E0',
						borderRadius: '20px',
					}}
				>
					{markers.map((marker, index) => {
						return <Marker key={index} position={marker}></Marker>
					})}
				</Map>
			</APIProvider>
		</>
	)
}

export default MapaInfoEspecimen
