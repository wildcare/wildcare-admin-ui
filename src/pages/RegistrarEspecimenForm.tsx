import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { Especimen } from '../types'
import { useCallback, useEffect, useState } from 'react'
import {
	Select,
	SelectItem,
	Textarea,
	Button,
	Modal,
	ModalContent,
	Spinner,
	ModalHeader,
} from '@nextui-org/react'
import EspecimenCard from '../components/EspecimenCard'
import { ListaEspecies } from '../types'
import { useLocation } from 'react-router-dom'

interface Region {
	region: string
	comunas: string[]
}

type Regiones = Region[]

interface RegistrarEspecimenFormProps {
	isEditing: boolean
}

const RegistrarEspecimenForm: React.FC<RegistrarEspecimenFormProps> = ({
	isEditing,
}) => {
	const [reloadKey, setReloadKey] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const { obtenerTokenLocalStorage } = useAuth()
	const [especies, setEspecies] = useState([] as ListaEspecies)
	const [especimenes, setEspecimenes] = useState([] as string[])

	const [fileName, setFileName] = useState<string>('')
	const [imagen, setImagen] = useState<string | null>(null)
	const [regiones, setRegiones] = useState([] as string[])
	const [infoPais, setInfoPais] = useState([] as Regiones)
	const [especimen, setEspecimen] = useState<Especimen>({} as Especimen)
	const [imagenModificada, setImagenModificada] = useState(false)

	const [showModal, setShowModal] = useState(false)
	const [estadoPeticion, setEstadoPeticion] = useState(false)

	const location = useLocation()

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

	const selectClasses = {
		trigger: ['bg-white', 'text-black/90 dark:text-white/90'],
		innerWrapper: 'bg-transparent',
	}

	async function fetchData() {
		await fetch(API_WILDCARE + '/especies/obtenerTodos', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setEspecies(data as unknown as ListaEspecies)
				setIsLoading(false)
			})
	}

	async function fetchEspecimenesDisponibles() {
		await fetch(API_WILDCARE + '/especimenes/obtenerIdsDisponibles', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setEspecimenes(data)
			})
	}

	/**
	 * Establece el valor de una etiqueta específica en el objeto de estado `especimen`.
	 * @param {string} label - La etiqueta del valor a establecer.
	 * @param {string | number} value - El valor a establecer.
	 */
	const setearEspecimen = (label: string, value: string | number) => {
		setEspecimen((prev) => ({ ...prev, [label]: value }))
		console.log(especimen)
	}

	const setearImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const fileSize = file.size / 1024 / 1024

			if (fileSize > 2) {
				alert('El archivo excede el tamaño máximo de 2MB')
				e.target.value = ''
				return
			} else {
				const urlImagen = URL.createObjectURL(file)
				setImagen(urlImagen)
				setFileName(file.name)
				setImagenModificada(true)
			}
		}
	}

	/**
	 * Consulta la lista de regiones desde una API remota y establece la información de las regiones y el país en el estado del componente.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando se han establecido las regiones y la información del país.
	 */
	async function consultarRegiones(): Promise<void> {
		return fetch(
			'https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json'
		)
			.then((response) => response.json())
			.then((data) => {
				const pais = data.regiones
				const regiones = [] as string[]
				pais.map((region: { region: string }) => {
					regiones.push(region.region)
				})
				setRegiones(regiones)
				setInfoPais(pais)
			})
			.catch((error) => console.error(error))
	}

	useEffect(() => {
		fetchData()
		consultarRegiones()

		if (location.state) {
			const { especimenObtenido } = location.state as {
				especimenObtenido: Especimen
			}
			setEspecimen(especimenObtenido)
			setImagen(especimenObtenido.imagen)
		} else {
			fetchEspecimenesDisponibles()
			setReloadKey((prevKey) => prevKey + 1)
			setEspecimen({} as Especimen)
			setImagen(null)
		}
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 100)
	}, [location.pathname])

	/**
	 * Recupera la lista de comunas basada en la región seleccionada del espécimen.
	 * @returns Un array de comunas.
	 */
	const obtenerComunas = useCallback(() => {
		const comunas = infoPais.find(
			(pais) => pais.region === especimen.region
		)?.comunas
		return comunas
	}, [especimen.region, infoPais])

	// const handleID = (event: React.KeyboardEvent<HTMLInputElement>) => {
	// 	const regex = /^[a-zA-Z0-9\s-áéíóúÁÉÍÓÚ]*$/
	// 	if (!regex.test(event.key)) {
	// 		event.preventDefault()
	// 	}
	// }

	async function createFormData(blobUrl: string, fileName: string) {
		const response = await fetch(blobUrl)
		const blob = await response.blob()
		const formData = new FormData()
		formData.append('file', blob, fileName)

		return formData
	}

	async function registrarImagen(idEspecimen: string) {
		const file =
			imagen && fileName ? await createFormData(imagen, fileName) : null

		fetch(API_WILDCARE + '/especimenes/editarImagen?id=' + idEspecimen, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
			body: file,
		})
			.then((response) => response.text())
			.then((data) => {
				setTimeout(() => {
					setEstadoPeticion(false)
					console.log('Success:', data)
				}, 2000)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
			.finally(() => {
				setTimeout(() => {
					setShowModal(false)
				}, 4000)
				setTimeout(() => {
					window.location.href = '/home'
				}, 5500)
			})
	}

	/**
	 * Registra un espécimen enviando una solicitud POST a la API.
	 * @param event - El evento de envío del formulario.
	 * @returns Una promesa que se resuelve con el texto de la respuesta.
	 */
	async function registrarEspecimen(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		console.log(especimen)

		setShowModal(true)

		setEstadoPeticion(true)
		await fetch(API_WILDCARE + '/especimenes/crear', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
			},
			body: JSON.stringify(especimen as Especimen),
		})
			.then((response) => response.text())
			.then((data) => {
				if (imagenModificada) {
					registrarImagen(data)
				} else {
					setTimeout(() => {
						setEstadoPeticion(false)
						console.log('Success:', data)
					}, 2000)
					setTimeout(() => {
						setShowModal(false)
					}, 4000)
					setTimeout(() => {
						window.location.href = '/home'
					}, 5500)
				}
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	return (
		<>
			{isLoading ? (
				<div className="w-screen h-screen flex items-center justify-center gap-4">
					<Spinner color="success" />
					<h2 className="poppins-medium mt-2">Cargando...</h2>
				</div>
			) : (
				<div className="w-full min-h-screen bg-gray-100">
					<div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">
						<form
							className="w-full md:w-1/2 space-y-5 mb-8"
							onSubmit={registrarEspecimen}
							key={reloadKey}
						>
							<h1 className="poppins-medium verdeClaro text-2xl mb-8">
								{isEditing ? 'Editar espécimen' : 'Registrar nuevo espécimen'}
							</h1>

							<Select
								className="poppins-semibold"
								classNames={selectClasses}
								name="nombre"
								value={especimen.nombre}
								onChange={(e) => setearEspecimen(e.target.name, e.target.value)}
								defaultSelectedKeys={
									especimen && especimen.nombre ? [especimen.nombre] : []
								}
								size="md"
								label="Nombre"
								placeholder="Seleccione el nombre del espécimen"
								isRequired
							>
								{especies.map((especie) => (
									<SelectItem key={especie.nombre} value={especie.nombre}>
										{especie.nombre}
									</SelectItem>
								))}
							</Select>
							<Select
								className="poppins-semibold"
								classNames={selectClasses}
								name="id"
								value={especimen.id}
								onChange={(e) => setearEspecimen(e.target.name, e.target.value)}
								defaultSelectedKeys={
									especimen && especimen.id ? [especimen.id] : []
								}
								size="md"
								label="Id"
								placeholder="Seleccione el ID del espécimen"
								isRequired
								disallowEmptySelection={location.state ? true : false}
							>
								{location.state ? (
									<SelectItem key={especimen.id} value={especimen.id}>
										{especimen.id}
									</SelectItem>
								) : (
									especimenes.map((especimen) => (
										<SelectItem key={especimen} value={especimen}>
											{especimen}
										</SelectItem>
									))
								)}
							</Select>

							<Select
								className="poppins-semibold"
								classNames={selectClasses}
								name="region"
								value={especimen.region}
								onChange={(e) => setearEspecimen(e.target.name, e.target.value)}
								defaultSelectedKeys={
									especimen && especimen.region ? [especimen.region] : []
								}
								size="md"
								label="Región"
								placeholder="Seleccione una región"
								isRequired
							>
								{regiones.map((region) => (
									<SelectItem key={region} value={region}>
										{region}
									</SelectItem>
								))}
							</Select>

							<Select
								className="poppins-semibold"
								classNames={selectClasses}
								name="ciudad"
								value={especimen.ciudad}
								onChange={(e) => setearEspecimen(e.target.name, e.target.value)}
								defaultSelectedKeys={
									especimen && especimen.ciudad ? [especimen.ciudad] : []
								}
								size="md"
								label="Ciudad"
								placeholder="Seleccione una ciudad"
								isRequired
							>
								{(obtenerComunas() || []).map((comuna) => (
									<SelectItem key={comuna} value={comuna}>
										{comuna}
									</SelectItem>
								))}
							</Select>

							<Textarea
								className="poppins-semibold"
								classNames={inputClasses}
								name="descripcion"
								value={especimen.descripcion}
								onChange={(e) => setearEspecimen(e.target.name, e.target.value)}
								label="Descripción"
								placeholder="Ingrese descripción del espécimen"
								minRows={3}
								isRequired
							/>

							<div className="flex items-center justify-center w-full">
								<label
									htmlFor="dropzone-file"
									className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
								>
									<div className="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="poppins-regular mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="poppins-semibold">Click para subir</span>{' '}
											o arrastra y suelta
										</p>
										<p className="poppins-semibold text-xs text-gray-500 dark:text-gray-400">
											PNG, JPG o JPEG (MAX. 2MB)
										</p>
									</div>
									<input
										id="dropzone-file"
										type="file"
										accept=".png, .jpg, .jpeg"
										className="hidden"
										onChange={setearImagen}
									/>
								</label>
							</div>

							<Button
								className="poppins-medium text-white w-full"
								size="lg"
								color="success"
								type="submit"
							>
								{isEditing ? 'Guardar espécimen' : 'Registrar espécimen'}
							</Button>
						</form>

						<div
							className="w-full md:w-1/2 min-w-[300px] flex items-center justify-center h-screen"
							id="cardNuevoEspecimen"
						>
							<EspecimenCard
								region={especimen.region}
								nombre={especimen.nombre}
								descripcion={especimen.descripcion}
								imagen={imagen}
								id={especimen.id}
								showDropdown={false}
							/>
						</div>
					</div>
				</div>
			)}

			<Modal
				className="flex items-center justify-center"
				size="lg"
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			>
				<ModalHeader>Registrando especimen</ModalHeader>
				<ModalContent>
					<div className="flex flex-col items-center justify-center m-8">
						{estadoPeticion ? (
							<>
								<Spinner size="lg" color="success" />
								<p className="poppins-medium mt-2">Registrando espécimen...</p>
							</>
						) : (
							<p className="poppins-medium">
								Espécimen registrado exitosamente
							</p>
						)}
					</div>
				</ModalContent>
			</Modal>
		</>
	)
}
export default RegistrarEspecimenForm
