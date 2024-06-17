import {
	Map,
	AdvancedMarker,
	useMap,
	useMapsLibrary,
	InfoWindow,
	Marker,
} from '@vis.gl/react-google-maps'
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
			mapId={'mapaInfoEspecimen'}
			defaultCenter={ubicaciones[Math.trunc(ubicaciones.length - 1)]}
			defaultZoom={13}
			style={{
				overflow: 'hidden',
				//agregar shadow y un borde un poco mas oscuro y un radio de 20
				border: '2px solid #E0E0E0',
				borderRadius: '20px',
			}}
		>
			{ubicaciones.length === 1 &&
				ubicaciones?.map((marker, index) => {
					return (
						<>
							<AdvancedMarker key={index} position={marker}></AdvancedMarker>
							<InfoWindow position={marker} maxWidth={200}>
								<p className="text-center poppins-medium">
									{'Ultima ubicación registrada el: '}
								</p>
								<p className="text-center poppins-medium  ">
									{ubicaciones ? ubicaciones[0].fecha : 'No hay ubicaciones'}
								</p>
							</InfoWindow>
						</>
					)
				})}
			{ubicaciones.length != 1 && (
				<>
					<Marker
						position={ubicaciones[ubicaciones.length - 1]}
						icon={{
							url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
						}}
					/>
					<InfoWindow
						position={ubicaciones[ubicaciones.length - 1]}
						maxWidth={200}
					>
						<p className="text-center poppins-medium  ">
							{'Ultima ubicación registrada el '}
						</p>
						<p className="text-center poppins-medium  ">
							{ubicaciones[ubicaciones.length - 1].fecha}
						</p>
					</InfoWindow>
				</>
			)}

			{predicciones.length != 0 && (
				<>
					<AdvancedMarker
						position={predicciones[predicciones.length - 1]}
					></AdvancedMarker>
					<InfoWindow
						position={predicciones[predicciones.length - 1]}
						maxWidth={200}
					>
						<p className="text-center poppins-medium">
							{'Ubicación estimada el'}
						</p>
						<p className="text-center poppins-medium  ">
							{predicciones[predicciones.length - 1].fecha}
						</p>
					</InfoWindow>
				</>
			)}
		</Map>
	)
}

export default MapaInfoEspecimen
