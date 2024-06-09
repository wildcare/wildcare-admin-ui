import React, { useEffect, useState } from 'react'
import { Especimen } from '../../src/types'

import EspecimenCard from '../components/EspecimenCard'
import MapaInfoEspecimen from '../components/Mapa/MapaInfoEspecimen'
import { useLocation } from 'react-router-dom'
const InfoEspecimen = () => {
	const { state } = useLocation()
	const especimen = state as Especimen
	const [seccion, setSeccion] = useState('info')

	const obtenerUltimaUbicacion = () => {
		return { lng: -84.091, lat: 9.928 }
	}
	const rastrearEspecimen = () => {
		return { lng: -84.091, lat: 9.928 }
	}
	useEffect(() => {
		obtenerUltimaUbicacion()
		rastrearEspecimen()
	}, [])

	return (
		<div className="w-full   bg-gray-100 px-[50px] py-10 ">
			<h1 className="poppins-medium verdeClaro text-2xl text-start ">
				Especies en peligro de extinción
			</h1>

			<h1 className="poppins-regular verdeClaro text-medium w-[470px] ">
				{'Especimenes> ' + especimen.nombre + '> ' + especimen.idUbicacion}
			</h1>
			{seccion === 'info' ? (
				<div className=" w-full lg:flex justify-center items-center ">
					<div className="w-full lg:w-[55%] h-[470px] mt-12">
						<MapaInfoEspecimen />
					</div>
					<div
						className="w-full h-screen lg:h-fit lg:w-[45%] flex flex-col items-center justify-center"
						id="cardNuevoEspecimen2"
					>
						<EspecimenCard
							region={especimen.region}
							nombre={especimen.nombre}
							descripcion={especimen.descripcion}
							imagen={especimen.imagen}
							idUbicacion={especimen.idUbicacion}
							showDropdown={false}
						/>
						<button
							onClick={() => setSeccion('ubicacion')}
							className="w-[250px] fondoVerdeClaro poppins-medium text-white text-center py-2 rounded-xl mt-2 hover:bg-verdeOscuro"
						>
							Rastrear
						</button>
					</div>
				</div>
			) : (
				<div className=" w-full h-[85%] pt-1">
					<button
						onClick={() => setSeccion('info')}
						className="w-[150px] mb-3 fondoVerdeMedio poppins-regular text-white text-center text-xs py-2 rounded-xl mt-2 hover:bg-verdeOscuro"
					>
						Ver información
					</button>
					<MapaInfoEspecimen />
				</div>
			)}
		</div>
	)
}

export default InfoEspecimen
