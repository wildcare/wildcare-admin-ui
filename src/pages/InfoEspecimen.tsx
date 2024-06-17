import { useEffect, useState } from 'react'
import { Especimen } from '../../src/types'
import { useNavigate } from 'react-router-dom'

import EspecimenCard from '../components/EspecimenCard'
import MapaInfoEspecimen from '../components/Mapa/MapaInfoEspecimen'
import { useLocation } from 'react-router-dom'
import { API_WILDCARE } from '../consts/APIWildCare'
import { Ubicaciones } from '../types'
import { APIProvider } from '@vis.gl/react-google-maps'
import { BreadcrumbItem, Breadcrumbs, Button, Spinner } from '@nextui-org/react'

const InfoEspecimen = () => {
	const { state } = useLocation()
	const navigate = useNavigate()
	const especimen = state as Especimen
	const [ubicaciones, setUbicaciones] = useState<Ubicaciones>([])
	const [predicciones, setPredicciones] = useState<Ubicaciones>([])
	const [ultimaUbicacion, setUltimaUbicacion] = useState<Ubicaciones>([])
	const [seccion, setSeccion] = useState('info')
	const [isLoading, setIsLoading] = useState(true)

	const obtenerUltimaUbicacion = () => {
		fetch(API_WILDCARE + '/ubicacion/obtenerUltimaUbicacion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: especimen.id }),
		})
			.then((res) => res.json())
			.then((res) => {
				setUltimaUbicacion(res)
			})
			.catch((err) => console.log(err))
	}

	const obtenerUbicaciones = () => {
		fetch(API_WILDCARE + '/ubicacion/obtenerUbicacionesById', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: especimen.id }),
		})
			.then((res) => res.json())
			.then((res) => {
				setUbicaciones(res)
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false))
	}

	const obtenerPrediccion = () => {
		setIsLoading(true)
		fetch(API_WILDCARE + '/prediccion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: especimen.id }),
		})
			.then((res) => res.json())
			.then((res) => {
				setPredicciones(res)
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		obtenerUltimaUbicacion()
		obtenerUbicaciones()
	}, [])

	return (
		<div className="w-full min-h-screen bg-gray-100">
			<div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">
				<div className="w-full h-full">
					<h1 className="poppins-medium verdeClaro text-2xl mb-2">
						Especies en peligro de extinción
					</h1>
					<Breadcrumbs size="lg" className="poppins-medium verdeClaro">
						<BreadcrumbItem onClick={() => navigate('/home')}>
							Especies
						</BreadcrumbItem>
						<BreadcrumbItem
							onClick={() =>
								navigate('/home/listar_especimenes', {
									state: { nombreEspecimen: especimen.nombre },
								})
							}
						>
							{especimen.nombre}
						</BreadcrumbItem>
						<BreadcrumbItem href="#">{especimen.id}</BreadcrumbItem>
					</Breadcrumbs>

					<div className="w-full lg:flex justify-center items-center">
						{isLoading ? (
							<div className="w-full h-[60vh] flex items-center justify-center gap-4">
								<Spinner color="success" />
								<h2 className="poppins-medium mt-2">Cargando...</h2>
							</div>
						) : seccion === 'info' ? (
							<div className="w-full lg:flex justify-center items-center mt-4 gap-4">
								<div className="w-full lg:w-[55%] h-[74vh]">
									<APIProvider
										apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}
										libraries={['marker']}
									>
										<MapaInfoEspecimen ubicaciones={ultimaUbicacion} />
									</APIProvider>
								</div>
								<div
									className="w-full lg:w-[45%] flex flex-col items-center justify-center"
									id="cardNuevoEspecimen2"
								>
									<EspecimenCard
										id={especimen.id}
										region={especimen.region}
										nombre={especimen.nombre}
										descripcion={especimen.descripcion}
										imagen={especimen.imagen}
										showDropdown={false}
									/>
									<Button
										size="md"
										onClick={async () => {
											setSeccion('ubicacion')
											obtenerUbicaciones()
											obtenerPrediccion()
										}}
										className="w-[250px] mt-2 fondoVerdeMedio poppins-medium text-white hover:bg-verdeOscuro"
									>
										Rastrear
									</Button>
								</div>
							</div>
						) : (
							<div className="w-full lg:flex justify-center items-center">
								<div className="w-full h-[76vh] pt-1">
									<Button
										size="md"
										onClick={() => setSeccion('info')}
										className="w-[150px] mb-3 fondoVerdeMedio poppins-medium text-white mt-2 hover:bg-verdeOscuro"
									>
										Ver información
									</Button>
									<APIProvider
										apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}
									>
										<MapaInfoEspecimen
											ubicaciones={ubicaciones}
											predicciones={predicciones}
										/>
									</APIProvider>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoEspecimen
