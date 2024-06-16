import { Button, Modal, ModalContent, ModalHeader, Spinner } from '@nextui-org/react'
import { API_WILDCARE } from '../consts/APIWildCare'
import { useAuth } from '../../context/auth/useAuth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const UploadFileForm: React.FC = () => {
    const { obtenerTokenLocalStorage } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [estadoPeticion, setEstadoPeticion] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [mensajeError, setMensajeError] = useState('');
    const navigate = useNavigate();

    const handleJSONFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            
            if (file.size > 10 * 1024 * 1024) {
                alert('El archivo excede el tamaño máximo permitido de 10MB.');
                setSelectedFile(null);
                return; 
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                try {
                    JSON.parse(text as string);
                    setSelectedFile(file);
                } catch (error) {
                    alert('El archivo JSON está corrompido o tiene un formato inválido.');
                    setSelectedFile(null);
                }
            };
            reader.readAsText(file);
        } else {
            setSelectedFile(null);
        }
    };

    async function handleNavigation(path: string) {
        setTimeout(() => {
            setEstadoPeticion(false)
        }, 2000)
        setTimeout(() => {
            setShowModal(false)
        }, 4000)
        setTimeout(() => {
            navigate(`/${path}`)
        }, 5500)
    }

    async function subirArchivoJSON(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedFile) {
            alert('Por favor, selecciona un archivo JSON.');
            return;
        }

        setShowModal(true);
        setEstadoPeticion(true);
        setMensajeError('');

        const formData = new FormData();
        formData.append('file', selectedFile);

        await fetch(API_WILDCARE + '/ubicacion/registrarUbicaciones', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al subir el archivo. Por favor, intenta nuevamente.');
                }
                return response.text();
            })
            .then(() => {
                // Si la operación fue exitosa, redirigir a home
                handleNavigation('home');
            })
            .catch((error) => {
                console.error('Error:', error);
                setEstadoPeticion(false);
                setMensajeError('Error al subir el archivo. Por favor, intenta nuevamente.');
                handleNavigation('cargar-archivo');
            });
    }

    return (

        <>
            <div className="w-full min-h-screen bg-gray-100">
                <div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">
                    <form
                        className="w-full md:w-1/2 space-y-4 mb-4"
                        onSubmit={subirArchivoJSON}
                    >
                        <h1 className="poppins-medium verdeClaro text-2xl mb-8">
                            Cargar archivo de ubicaciones
                        </h1>

                        <p className="poppins-semibold text-sm verdeClaro text-gray-500">
                            Por favor seleccione un archivo .JSON con las ubicaciones.
                        </p>

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
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="poppins-regular mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="poppins-semibold">Click para subir</span>{' '}
                                        o arrastra y suelta
                                    </p>
                                    <p className="poppins-semibold text-xs text-gray-500 dark:text-gray-400">
                                        JSON (MAX. 10MB)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept=".json"
                                    className="hidden"
                                    onChange={handleJSONFileChange}
                                />
                            </label>
                        </div>
                        <div className="poppins-regular verdeClaro text-sm  mt-2">
                            {selectedFile ? (
                                <>Archivo seleccionado: <span className="poppins-semibold">{selectedFile.name}</span></>
                            ) : (
                                <>Ningún archivo seleccionado</>
                            )}
                        </div>

                        <Button
                            className="poppins-medium text-white w-full"
                            size="lg"
                            color="success"
                            type="submit"
                        >
                            Subir archivo
                        </Button>
                    </form>
                </div>
            </div>

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
                                <p className="poppins-medium mt-2">
                                    Subiendo archivo con ubicaciones...
                                </p>
                            </>
                        ) : mensajeError ? (
                            <p className="poppins-medium text-red-500">
                                {mensajeError}
                            </p>
                        ) : (
                            <p className="poppins-medium">
                                Archivo con ubicaciones subido correctamente
                            </p>
                        )}
                    </div>
                </ModalContent>
            </Modal>

        </>
    );
}

export default UploadFileForm;