import React, { useEffect, useState } from 'react'
import { Especimen } from '../../src/types'

import EspecimenCard from '../components/EspecimenCard'
import MapaInfoEspecimen from '../components/Mapa/MapaInfoEspecimen'
import { useLocation } from 'react-router-dom'
import { API_WILDCARE } from '../consts/APIWildCare'
import { Ubicaciones } from '../types'
import { APIProvider } from '@vis.gl/react-google-maps'
const InfoEspecimen = () => {
	const { state } = useLocation()
	const especimen = state as Especimen
	const [ubicaciones, setUbicaciones] = useState<Ubicaciones>([])
	const [predicciones, setPredicciones] = useState<Ubicaciones>([])
	const [ultimaUbicacion, setUltimaUbicacion] = useState<Ubicaciones>([])
	const [seccion, setSeccion] = useState('info')
	const [isLoading, setIsLoading] = useState(false)

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
			.finally(() => setIsLoading(true))
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
			.finally(() => setIsLoading(true))
	}

	const obtenerPrediccion = () => {
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
			.finally(() => setIsLoading(true))
	}

	useEffect(() => {
		obtenerUltimaUbicacion()
		obtenerUbicaciones()
	}, [])

	return (
		<div className="w-full   bg-gray-100 px-10 py-6 ">
			<h1 className="poppins-medium verdeClaro text-2xl text-start ">
				Especies en peligro de extinción
			</h1>

			<h1 className="poppins-regular verdeClaro text-medium w-[470px] ">
				{'Especimenes> ' + especimen.nombre + '> ' + especimen.id}
			</h1>
			{seccion === 'info' && isLoading ? (
				<div className=" w-full lg:flex justify-center items-center ">
					<div className="w-full lg:w-[55%] h-[470px] mt-12">
						<APIProvider apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}>
							<MapaInfoEspecimen ubicaciones={ultimaUbicacion} />
						</APIProvider>
					</div>
					<div
						className="w-full h-full lg:h-fit lg:w-[45%] flex flex-col items-center justify-center"
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
						<button
							onClick={async () => {
								setSeccion('ubicacion')
								obtenerUbicaciones()
								obtenerPrediccion()
							}}
							className="w-[250px] fondoVerdeMedio poppins-medium text-white text-center py-2 rounded-xl mt-2 hover:bg-verdeOscuro"
						>
							Rastrear
						</button>
					</div>
				</div>
			) : (
				<div className=" w-full h-[80%] pt-1">
					<button
						onClick={() => setSeccion('info')}
						className="w-[150px] mb-3 fondoVerdeMedio poppins-regular text-white text-center text-xs py-2 rounded-xl mt-2 hover:bg-verdeOscuro"
					>
						Ver información
					</button>
					<APIProvider apiKey={'AIzaSyB2kB5gM51fzkKnQlj1QQotbDOnDbz8F38'}>
						<MapaInfoEspecimen
							ubicaciones={ubicaciones}
							predicciones={predicciones}
						/>
					</APIProvider>
				</div>
			)}
		</div>
	)
}

export default InfoEspecimen
