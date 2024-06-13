import { Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Ubicaciones } from '../../types'
interface MapaInfoEspecimenProps {
	ubicaciones: Ubicaciones
	predicciones?: Ubicaciones
}

const MapaInfoEspecimen: React.FC<MapaInfoEspecimenProps> = ({
	ubicaciones,
	predicciones = [],
}) => {
	if (ubicaciones.length === 0) {
		ubicaciones = [{ lat: 13, lng: 13, fecha: 'No hay ubicaciones' }]
	}

	const map = useMap()
	const maps = useMapsLibrary('maps')

	if (!maps) {
		return null
	}

	const lineaUbicacion = ubicaciones.sort(
		(a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
	)
	const lineaPrediccion = predicciones.sort(
		(a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
	)
	const trasaUbicacion = new maps.Polyline({
		path: lineaUbicacion,
		geodesic: true,
		strokeColor: '#0e7239',
		strokeOpacity: 1.0,
		strokeWeight: 2,
	})
	const trasaPrediccion = new maps.Polyline({
		path: lineaPrediccion,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
	})

	trasaUbicacion.setMap(map)
	trasaPrediccion.setMap(map)
	return (
		<Map
			defaultCenter={ubicaciones[Math.trunc(ubicaciones.length - 1)]}
			defaultZoom={18}
			style={{
				overflow: 'hidden',
				//agregar shadow y un borde un poco mas oscuro y un radio de 20
				border: '2px solid #E0E0E0',
				borderRadius: '20px',
			}}
		>
			{ubicaciones.length == 1 &&
				ubicaciones?.map((marker, index) => {
					return (
						<Marker
							key={index}
							position={marker}
							animation={window.google.maps.Animation.DROP}
						></Marker>
					)
				})}

			{predicciones?.map((marker, index) => {
				return (
					<Marker
						key={index}
						position={marker}
						animation={window.google.maps.Animation.BOUNCE}
						opacity={0.5}
					></Marker>
				)
			})}
		</Map>
	)
}

export default MapaInfoEspecimen
