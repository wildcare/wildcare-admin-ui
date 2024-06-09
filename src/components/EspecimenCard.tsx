import {
	Card,
	CardHeader,
	CardBody,
	Image,
	Dropdown,
	DropdownItem,
	DropdownTrigger,
	DropdownMenu,
	Button,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface EspecimenCardProps {
	id: string
	region: string
	nombre: string
	descripcion: string
	imagen: string | null
	showDropdown?: boolean
	showButton?: boolean
	onEditar?: () => void
	onEliminar?: () => void
}

const EspecimenCard: React.FC<EspecimenCardProps> = ({
	id,
	region,
	nombre,
	descripcion,
	imagen,
	showDropdown,
	showButton,
	onEditar,
	onEliminar,
}) => {
	const regionDefault = 'Región'
	const nombreDefault = 'NOMBRE'
	const descripcionDefault = 'Descripción'
	const idUbicacionDefault = 'XXXXXXX'
	const imagenDefault = 'https://fakeimg.pl/600x400?text=Imagen'

	return (
		<Card className="py-2 min-w-xs max-w-xs h-fit max-h-[520px] overflow-auto relative">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<div className="flex justify-between items-center w-full">
					<div>
						<p className="poppins-medium text-gray-400 mb-2 h-[3rem] pr-4">
							{region || regionDefault}
						</p>
						<h1 className="poppins-semibold text-3xl mb-4">
							{nombre ? nombre.toUpperCase() : nombreDefault}
						</h1>
						<h4 className="poppins-medium   text-gray-500 text-sm text-justify mb-4 h-[5rem]">
							{descripcion || descripcionDefault}
						</h4>
					</div>
					{showDropdown && (
						<div className="absolute top-2 right-0 p-1">
							<Dropdown placement="bottom-end">
								<DropdownTrigger>
									<Button
										className="rounded-full hover:bg-gray-200"
										isIconOnly
										variant="light"
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M14.25 19.5C14.25 20.0967 14.0129 20.669 13.591 21.091C13.169 21.5129 12.5967 21.75 12 21.75C11.4033 21.75 10.831 21.5129 10.409 21.091C9.98705 20.669 9.75 20.0967 9.75 19.5C9.75 18.9033 9.98705 18.331 10.409 17.909C10.831 17.4871 11.4033 17.25 12 17.25C12.5967 17.25 13.169 17.4871 13.591 17.909C14.0129 18.331 14.25 18.9033 14.25 19.5ZM14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25C11.4033 14.25 10.831 14.0129 10.409 13.591C9.98705 13.169 9.75 12.5967 9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75C12.5967 9.75 13.169 9.98705 13.591 10.409C14.0129 10.831 14.25 11.4033 14.25 12ZM14.25 4.5C14.25 5.09674 14.0129 5.66903 13.591 6.09099C13.169 6.51295 12.5967 6.75 12 6.75C11.4033 6.75 10.831 6.51295 10.409 6.09099C9.98705 5.66903 9.75 5.09674 9.75 4.5C9.75 3.90326 9.98705 3.33097 10.409 2.90901C10.831 2.48705 11.4033 2.25 12 2.25C12.5967 2.25 13.169 2.48705 13.591 2.90901C14.0129 3.33097 14.25 3.90326 14.25 4.5Z"
												fill="#71717A"
											/>
										</svg>
									</Button>
								</DropdownTrigger>
								<DropdownMenu className="poppins-semibold">
									<DropdownItem onClick={onEditar}>Editar</DropdownItem>
									<DropdownItem onClick={onEliminar}>Eliminar</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					)}
				</div>
			</CardHeader>
			<CardBody className="overflow-visible py-2">
				<Image
					alt="Card background"
					className="rounded-xl object-cover w-96 h-48"
					src={imagen || imagenDefault}
				/>
				<p className="poppins-medium text-gray-400 text-center text-sm mt-2">
					ID: {id || idUbicacionDefault}
				</p>
				{showButton && (
					<Link
						to="/home/listar_especimenes/InfoEspecimen"
						state={{
							id,
							region,
							nombre,
							descripcion,
							imagen,
						}}
						className="w-full fondoVerdeClaro text-white text-center py-2 rounded-xl mt-2 hover:bg-verdeOscuro"
					>
						Rastrear
					</Link>
				)}
			</CardBody>
		</Card>
	)
}

export default EspecimenCard
