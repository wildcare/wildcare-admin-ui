import { useAuth } from '../../context/auth/useAuth'
import { Especimen } from '../types'
import { useState, useCallback, useEffect } from 'react'
import {
	Breadcrumbs,
	BreadcrumbItem,
	Input,
	Spinner,
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Button,
} from '@nextui-org/react'
import EspecimenCard from '../components/EspecimenCard'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '../assets/icons/SearchIcon'
import { API_WILDCARE } from '../consts/APIWildCare'

const ListarEspecimenes: React.FC = () => {
	const { obtenerTokenLocalStorage } = useAuth()
	const [busqueda, setBusqueda] = useState('')
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedEspecimen, setSelectedEspecimen] = useState<string | null>(
		null
	)

	const location = useLocation()
	const { nombreEspecimen } = location.state as { nombreEspecimen: string }
	const [especimenes, setEspecimenes] = useState<Especimen[]>([])
	const normalize = (str: string) =>
		str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()

	const especimenesFiltrados = especimenes.filter(
		(especimen) =>
			normalize(especimen.nombre).includes(normalize(busqueda)) ||
			normalize(especimen.region).includes(normalize(busqueda)) ||
			normalize(especimen.descripcion).includes(normalize(busqueda)) ||
			normalize(especimen.id).includes(normalize(busqueda))
	)

	const inputClasses = {
		input: ['bg-transparent', 'text-black/90 dark:text-white/90'],
		innerWrapper: 'bg-transparent',
		inputWrapper: [
			'bg-white',
			'dark:bg-default/60',
			'backdrop-blur-xl',
			'backdrop-saturate-200',
			'hover:bg-default-200/70',
			'dark:hover:bg-default/70',
			'group-data-[focus=true]:bg-white',
			'dark:group-data-[focus=true]:bg-default/60',
			'!cursor-text',
		],
	}

	const onClear = useCallback(() => {
		setBusqueda('')
	}, [])

	const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBusqueda(event.target.value)
	}

	const obtenerEspecimenes = async (nombreEspecie: string) => {
		console.log(nombreEspecie)
		setLoading(true)
		// Agrega un tiempo de espera de 2 segundos (2000 milisegundos)
		setTimeout(async () => {
			await fetch(
				API_WILDCARE + `/especimenes/obtenerPorNombre?nombre=${nombreEspecie}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					setEspecimenes(data)
				})
				.finally(() => setLoading(false))
		}, 1000)
	}

	const obtenerEspecimen = async (id: string) => {
		await fetch(API_WILDCARE + `/especimenes/obtenerPorId?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				navigate('/home/editar_especimen', {
					state: { especimenObtenido: data },
				})
			})
	}

	const eliminarEspecimen = async (id: string) => {
		await fetch(API_WILDCARE + `/especimenes/eliminar?id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
		}).then((response) => {
			if (!response.ok) {
				throw new Error('Error al eliminar el especimen')
			}
		})
	}

	useEffect(() => {
		obtenerEspecimenes(nombreEspecimen)

		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 100)
	}, [])

	const handleDelete = async () => {
		if (selectedEspecimen !== null) {
			setIsDeleting(true)
			console.log(selectedEspecimen)
			await eliminarEspecimen(selectedEspecimen)
			setIsDeleting(false)
			onClose()

			window.location.reload()
		}
	}
	console.log(especimenes)
	return (
		<>
			<div key={location.key} className="w-full min-h-screen bg-gray-100">
				<div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">
					<div className="w-full h-full">
						<h1 className="poppins-medium verdeClaro text-2xl mb-2">
							Especies en peligro de extinción
						</h1>
						<Breadcrumbs size="lg" className="poppins-medium verdeClaro">
							<BreadcrumbItem href="/home">Especies</BreadcrumbItem>
							<BreadcrumbItem href="#">{nombreEspecimen}</BreadcrumbItem>
						</Breadcrumbs>
						<div className="ml-14 mt-8">
							<div className="mb-8">
								<Input
									isClearable
									size="md"
									type="text"
									className="poppins-semibold w-full sm:max-w-[34%]"
									classNames={inputClasses}
									placeholder="Buscar"
									startContent={<SearchIcon />}
									onClear={onClear}
									value={busqueda}
									onChange={manejarCambio}
								/>
							</div>
							<div
								className="flex flex-wrap justify-start gap-6 mb-8"
								id="cardEspecimenes"
							>
								{loading ? (
									<div className="flex items-center justify-center gap-4">
										<Spinner size="lg" color="success" />
										<h2 className="poppins-medium mt-2">Cargando...</h2>
									</div>
								) : especimenesFiltrados.length > 0 ? (
									especimenesFiltrados.map((especimen) => (
										<EspecimenCard
											key={especimen.id}
											id={especimen.id}
											region={especimen.region}
											nombre={especimen.nombre}
											descripcion={especimen.descripcion}
											imagen={especimen.imagen}
											showDropdown={true}
											showButton={true}
											onEditar={() =>
												especimen.id ? obtenerEspecimen(especimen.id) : null
											}
											onEliminar={() => {
												if (especimen.id) {
													setSelectedEspecimen(especimen.id)
													onOpen()
												}
											}}
										/>
									))
								) : (
									<p className="poppins-regular">
										No hay especímenes para mostrar.
									</p>
								)}

								<Modal isOpen={isOpen} onOpenChange={onClose}>
									<ModalContent>
										{(closeModal) => (
											<>
												<ModalHeader className="poppins-medium">
													Confirmación de eliminación
												</ModalHeader>
												<ModalBody>
													{isDeleting ? (
														<div className="flex flex-col items-center justify-center">
															<Spinner size="md" color="success" />
															<p className="mt-2 mb-6 poppins-medium text-base">
																Eliminando espécimen...
															</p>
														</div>
													) : (
														<p className="poppins-regular text-sm">
															¿Seguro de eliminar espécimen?
														</p>
													)}
												</ModalBody>
												{!isDeleting && (
													<ModalFooter className="poppins-regular">
														<Button
															color="danger"
															variant="flat"
															onPress={closeModal}
														>
															No
														</Button>
														<Button
															color="success"
															className="text-white"
															onPress={handleDelete}
														>
															Si
														</Button>
													</ModalFooter>
												)}
											</>
										)}
									</ModalContent>
								</Modal>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default ListarEspecimenes
