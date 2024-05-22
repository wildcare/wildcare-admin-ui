import { useAuth } from '../../context/auth/useAuth'
import { API_WILDCARE } from '../consts/APIWildCare'
import { Especimen } from '../types'
import { useCallback, useEffect, useState } from 'react'
import { Input, Select, SelectItem, Textarea, Button, Modal, ModalContent, Spinner, ModalHeader } from '@nextui-org/react'
import FormData from 'form-data'
import EspecimenCard from '../components/EspecimenCard'
import { useNavigate } from 'react-router-dom'

interface Region {
    region: string
    comunas: string[]
}

type Regiones = Region[]

const RegistrarEspecimenForm: React.FC = () => {
    const { obtenerTokenLocalStorage } = useAuth()
    const navigate = useNavigate()

    const [fileName, setFileName] = useState<string>('')
    const [imagen, setImagen] = useState<string | null>(null);
    const [regiones, setRegiones] = useState([] as string[])
    const [infoPais, setInfoPais] = useState([] as Regiones)
    const [especimen, setEspecimen] = useState<Especimen>(
        {} as Especimen
    )

    const [showModal, setShowModal] = useState(false);
    const [estadoPeticion, setEstadoPeticion] = useState(false);

    const setearEspecimen = (label: string, value: string | number) => {
        setEspecimen((prev) => ({ ...prev, [label]: value }))
        console.log(especimen)
    }

    const setearImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024;

            if (fileSize > 2) {
                alert('El archivo excede el tamaño máximo de 2MB');
                e.target.value = '';
                return;
            } else {
                const urlImagen = URL.createObjectURL(file);
                setImagen(urlImagen);
                setFileName(file.name);
            }
        }
    }

    async function consultarRegiones() {
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
        consultarRegiones()
    }, [])

    const obtenerComunas = useCallback(() => {
        const comunas = infoPais.find((pais) => pais.region === especimen.region)?.comunas
        return comunas
    }, [especimen.region, infoPais])

    const handleName = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z\s-áéíóúÁÉÍÓÚ]*$/; // Solo permite letras y espacios
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    };

    async function createFormData(blobUrl: string, fileName: string) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('file', blob, fileName);

        return formData;
    }

    async function registrarImagen(idEspecimen: string) {
        const file = imagen && fileName ? await createFormData(imagen, fileName) : null;
        setShowModal(true);
        setEstadoPeticion(true);

        fetch(API_WILDCARE + '/especimenes/editarImagen?id=' + idEspecimen, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
            },
            body: file as any,
        })
            .then((response) => response.text())
            .then((data) => {
                setTimeout(() => {
                    setEstadoPeticion(false);
                    console.log('Success:', data)
                }, 2000)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
            .finally(() => {
                setTimeout(() => {
                    setShowModal(false);
                }, 4000);
            });
    }

    async function registrarEspecimen(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(especimen)
        await fetch(API_WILDCARE + '/especimenes/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
            },
            body: JSON.stringify(especimen as Especimen)
        })
            .then((response) => response.text())
            .then((data) => {
                registrarImagen(data)
            })
    }

    return (

        <>

            <div className="w-full h-full bg-gray-100">
                <div className="flex gap-40 mx-24 mt-8">

                    <form className="w-1/2 space-y-5 mb-8" onSubmit={registrarEspecimen}>

                        <h1 className="poppins-medium verdeClaro text-2xl mb-10">Registrar nuevo espécimen</h1>

                        <Input className="poppins-semibold" classNames={{
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "bg-white",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focus=true]:bg-white",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }} name="nombre" value={especimen.nombre} onChange={(e) => setearEspecimen(e.target.name, e.target.value)} onKeyDown={handleName} type="text" label="Nombre" size='md' placeholder="Ingrese nombre del espécimen" isRequired />

                        <Input className="poppins-semibold" classNames={{
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "bg-white",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focus=true]:bg-white",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }} name="idUbicacion" value={especimen.idUbicacion} onChange={(e) => setearEspecimen(e.target.name, e.target.value)} type="text" label="ID" size='md' placeholder="Ingrese ID de ubicación del espécimen" isRequired />

                        <Select className="poppins-semibold" classNames={{
                            trigger: [
                                "bg-white",
                                "text-black/90 dark:text-white/90",
                            ],
                            innerWrapper: "bg-transparent"

                        }} name="region" value={especimen.region} onChange={(e) => setearEspecimen(e.target.name, e.target.value)} size='md' label="Región" placeholder="Seleccione una región" isRequired
                        >
                            {regiones.map((region) => (
                                <SelectItem key={region} value={region}>
                                    {region}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select className="poppins-semibold" classNames={{
                            trigger: [
                                "bg-white",
                                "text-black/90 dark:text-white/90",
                            ],
                            innerWrapper: "bg-transparent"

                        }} name="ciudad" value={especimen.ciudad} onChange={(e) => setearEspecimen(e.target.name, e.target.value)} size='md' label="Ciudad" placeholder="Seleccione una ciudad" isRequired
                        >
                            {(obtenerComunas() || []).map((comuna) => (
                                <SelectItem key={comuna} value={comuna}>
                                    {comuna}
                                </SelectItem>
                            ))}
                        </Select>

                        <Textarea className="poppins-semibold" classNames={{
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "bg-white",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focus=true]:bg-white",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }} name="descripcion" value={especimen.descripcion} onChange={(e) => setearEspecimen(e.target.name, e.target.value)} label="Descripción" placeholder="Ingrese descripción del espécimen" minRows={3} isRequired />

                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="poppins-regular mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="poppins-semibold">Click para subir</span> o arrastra y suelta</p>
                                    <p className="poppins-semibold text-xs text-gray-500 dark:text-gray-400">PNG, JPG o JPEG (MAX. 2MB)</p>
                                </div>
                                <input id="dropzone-file" type="file" accept=".png, .jpg, .jpeg" className="hidden" onChange={setearImagen} required />
                            </label>
                        </div>

                        <Button className="poppins-medium text-white w-full" size='lg' color="success" type='submit'>
                            Registrar nuevo espécimen
                        </Button>


                    </form>

                    <div className="w-1/2 flex items-center justify-center h-screen" id="cardNuevoEspecimen">
                        <EspecimenCard region={especimen.region} nombre={especimen.nombre} descripcion={especimen.descripcion} imagen={imagen} idUbicacion={especimen.idUbicacion} />
                    </div>

                </div>
            </div>

            <Modal className="flex items-center justify-center" size="lg" isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>Registrando especimen</ModalHeader>
                <ModalContent>
                    <div className="flex flex-col items-center justify-center m-8">
                        {estadoPeticion ? (
                            <>
                                <Spinner size="lg" />
                                <p className="poppins-medium mt-2">Registrando...</p>
                            </>
                        ) : (
                            <p className="poppins-medium">Espécimen registrado exitosamente</p>
                        )}
                    </div>
                </ModalContent>
            </Modal>

        </>
    )
}
export default RegistrarEspecimenForm;