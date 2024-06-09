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
  id?: string
  nombre: string
  descripcion: string
  imagen: string
  idUbicacion: string
  region: string
}

export type ListaEspecies = Especie[]
