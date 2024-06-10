export interface User {
	nombreUsuario?: string
	id?: number
	correo?: string
	password?: string
	nombre?: string
	token?: string
}
export interface Especie {
	id?: string
	nombre: string
	descripcion?: string
	imagen: null
}

export interface Especimen {
	id: string
	nombre: string
	descripcion: string
	imagen: string
	region: string
	ciudad: string
}
export interface Ubicacion {
	lng: number
	lat: number
	fecha: string
}
export type Ubicaciones = Ubicacion[]
export type ListaEspecies = Especie[]
