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

export type ListaEspecies = Especie[]
