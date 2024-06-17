import { Link } from 'react-router-dom';

interface PropsBotonSidebar {
	icono: React.ReactNode
	texto: string
	url: string
	estaAbierto?: boolean
	cambiarBotonActivo: (boton: string) => void
}

const BotonSidebar: React.FC<PropsBotonSidebar> = ({
	icono,
	texto,
	url,
	estaAbierto,
	cambiarBotonActivo,
}) => {
	const isActive = location.pathname === url
	let classN = ''
	classN = ` flex transition relative duration-300  hover:bg-white/20  w-full relative px-3 py-1 ${
		isActive
			? 'bg-white/10 text-white rounded-r-lg rounded-y-lg '
			: 'text-white rounded-lg'
	}`

	return (
		<div className={classN}>
			<div
				onClick={() => cambiarBotonActivo(texto)}
				className={` min-w-[3px] h-full w-[3px] absolute left-0 top-0 rounded-full  ${
					isActive === true ? 'fondoVerdeClaro' : 'bg-transparent'
				}`}
			></div>
			<Link
				to={url}
				onClick={() => cambiarBotonActivo(texto)}
				className="group  flex  items-center overflow-hidden  "
			>
				<div className="h-[30px] max-w-[16px] items-center flex">{icono}</div>

				<div
					className={`col-span-5 pl-4 w-[150px] text-[11px]  text-nowrap overflow-hidden ${
						estaAbierto
							? 'transition-all duration-1000 text-white'
							: 'text-transparent transition-all duration-300  '
					}`}
				>
					{texto}
				</div>

				{estaAbierto === false && (
					<div className="invisible group-hover:visible h-full flex items-center absolute text-xs right-[-119px] w-[110px] ">
						<div className=" fondoVerdeOscuro rounded text-center">
							<p className="bg-white/30 p-3 rounded text-center">{texto}</p>
						</div>
					</div>
				)}
			</Link>
		</div>
	)
}

export default BotonSidebar;