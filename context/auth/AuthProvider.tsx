import { useState, useCallback } from 'react'
import { User } from '../../src/types'
import { auth } from '../../src/config/Firebase'
import { useSnackbar } from 'notistack'
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword
} from 'firebase/auth'
import { authContext } from './AuthContext'
import { API_WILDCARE } from '../../src/consts/APIWildCare'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [usuario, setUsuario] = useState({
		correo: '',
		password: '',
		token: '',
	} as User)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const googleProvider = new GoogleAuthProvider()

	const saveUserToLocalStorage = (user: User) => {
		localStorage.setItem('user', JSON.stringify(user))
	}
	const setCamposUsuario = (campo: string, valor: string) => {
		setUsuario((prevState) => ({
			...prevState,
			[campo]: valor,
		}))
	}
	const obtenerTokenLocalStorage = async () => {
		const user = localStorage.getItem('user')

		if (!user) {
			window.location.href = '/login'
			return undefined
		}

		const userObj = JSON.parse(user)
		const tokenSaved = userObj.token
		const token = await auth.currentUser?.getIdToken()
		if (token !== tokenSaved) {
			saveUserToLocalStorage(userObj)
		}

		return token
	}
	const cerrarSesion = useCallback(async () => {
		localStorage.removeItem('user')
	}, [])

	const iniciarSesionFireStore = async (correo: string, password: string) => {
		return fetch(API_WILDCARE + '/admin/iniciarSesion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ correo, password }),
		})
			.then((response) => response.json())
			.then((data) => {
				return data as boolean
			})
			.catch(() => {
				return false
			})
	}

	const inicioSesion = useCallback(async () => {
		try {
			const isLogeado = await iniciarSesionFireStore(
				usuario.correo as string,
				usuario.password as string
			)
			console.log('isLogeado:', isLogeado)
			if (!isLogeado as boolean) {
				return false
			}
			const credencialesUsuario = await signInWithEmailAndPassword(
				auth,
				usuario.correo as string,
				usuario.password as string
			)
			
			const token = await credencialesUsuario.user.getIdToken()
			console.log('token:', token)
			const newUser = {
				usuario,
				token,
			}
			//redireccionar a home
			window.location.href = '/home'
			saveUserToLocalStorage(newUser)
			setIsLoggedIn(true)
			return true
		} catch (error) {
			console.error('Error en login:', error)
			return false
		}
	}, [usuario])

	const inicioConGoogle = useCallback(async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const token = await result.user.getIdToken()
			//crear objeto user agregando el  nuevo token
			const newUser = {
				usuario,
				token,
			}
			saveUserToLocalStorage(newUser)
			setIsLoggedIn(true)
		} catch (e) {
			enqueueSnackbar('Hubo un error al iniciar sesión con Google', {
				autoHideDuration: 3000,
				variant: 'error',
			})
		}
	}, [usuario])

	return (
		<authContext.Provider
			value={{
				usuario,
				setUsuario,
				isLoggedIn,
				cerrarSesion,
				inicioConGoogle,
				inicioSesion,
				setCamposUsuario,
				obtenerTokenLocalStorage,
			}}
		>
			{children}
		</authContext.Provider>
	)
}
