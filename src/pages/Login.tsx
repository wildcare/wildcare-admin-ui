import React from 'react'
import icon from '../assets/icon.png'
import { Button, Input, Image } from '@nextui-org/react'
import { useAuth } from '../../context/auth/useAuth'
import EyeFilledIcon from '../assets/icons/EyeFilledIcon'
import EyeSlashFilledIcon from '../assets/icons/EyeSlashFilledIcon'
import { useSnackbar } from 'notistack'

const Login: React.FC = () => {
	const [isVisible, setIsVisible] = React.useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)
	const { enqueueSnackbar } = useSnackbar()

	const { inicioSesion, setCamposUsuario, usuario } = useAuth()
	const login = async () => {
		const estadoLogin = await inicioSesion()
		console.log(estadoLogin)
		if (!estadoLogin) {
			enqueueSnackbar('Correo o contraseña incorrectos', {
				autoHideDuration: 3000,
				variant: 'error',
			})
		}
	}

	return (
		<div className="w-screen h-screen bg-slate-100 flex">
			<div className="w-[50%] h-full animate-fadeIn relative overflow-hidden title before:content-[''] before:absolute before:bg-gradient-to-t from-green-900 to-transparent before:w-full before:h-full">
				<img
					src="https://images.unsplash.com/photo-1527720255604-b27935ade401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="w-1/2 h-full text-slate-500/80 flex justify-center items-center">
				<div className="w-[70%] px-10  flex flex-col items-center justify-center gap-8 bg-white py-[40px] rounded-lg">
					<Image src={icon} className="w-[50px] h-[50px] " />

					<form
						onSubmit={(e) => {
							e.preventDefault()
							login()
						}}
						className="w-full flex flex-col items-center justify-center"
					>
						<h1 className="poppins-medium text-2xl font-medium verdeMedio">
							Iniciar sesión
						</h1>

						<div className="w-full flex flex-col justify-center items-center max-w-[80%] gap-5 mt-6">
							<Input
								label="Correo"
								name="correo"
								type="text"
								value={usuario.correo}
								defaultValue={usuario.correo}
								placeholder="correo@gmail.com"
								className="poppins-semibold"
								onChange={(e) => setCamposUsuario('correo', e.target.value)}
								isRequired
							/>

							<Input
								label="Contraseña"
								name="password"
								value={usuario.password}
								className="poppins-semibold"
								placeholder="**********"
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
									>
										{isVisible ? (
											<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										) : (
											<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										)}
									</button>
								}
								type={isVisible ? 'text' : 'password'}
								onChange={(e) => setCamposUsuario('password', e.target.value)}
								isRequired
							/>
						</div>
						<div className="flex flex-col gap-3 w-[80%] scale-90 mt-6">
							<Button
								type="submit"
								size="lg"
								className="poppins-medium text-white text-center p-2 rounded-lg w-full"
								color="success"
							>
								Iniciar sesión
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
