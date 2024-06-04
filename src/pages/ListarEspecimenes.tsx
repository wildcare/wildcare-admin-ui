import { useAuth } from '../../context/auth/useAuth'
import { Especimen } from '../types'
import { useState, useCallback, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem, Input, Spinner } from '@nextui-org/react'
import EspecimenCard from '../components/EspecimenCard'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from "../assets/icons/SearchIcon";
import { API_WILDCARE } from '../consts/APIWildCare'


const ListarEspecimenes: React.FC = () => {
    const { obtenerTokenLocalStorage } = useAuth()
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { nombreEspecimen } = location.state as { nombreEspecimen: string };
    const [especimenes, setEspecimenes] = useState<Especimen[]>([]);
    const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const especimenesFiltrados = especimenes.filter((especimen) =>
        normalize(especimen.nombre).includes(normalize(busqueda)) ||
        normalize(especimen.region).includes(normalize(busqueda)) ||
        normalize(especimen.descripcion).includes(normalize(busqueda)) ||
        normalize(especimen.idUbicacion).includes(normalize(busqueda))
    );

    const inputClasses = {
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
    };

    const onClear = useCallback(() => {
        setBusqueda("");
    }, []);

    const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(event.target.value);
    };

    const obtenerEspecimenes = async (nombreEspecie: string) => {
        console.log(nombreEspecie)
        setLoading(true);
        // Agrega un tiempo de espera de 2 segundos (2000 milisegundos)
        setTimeout(async () => {
            await fetch(API_WILDCARE + `/especimenes/obtenerPorNombre?nombre=${nombreEspecie}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setEspecimenes(data);
                })
                .finally(() => setLoading(false));
        }, 1000);
    };

    const obtenerEspecimen = async (id: string) => {
        await fetch(API_WILDCARE + `/especimenes/obtenerPorId?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/home/editar_especimen', { state: { especimenObtenido: data } });
            })
    };

    const eliminarEspecimen = async (id: string) => {
        await fetch(API_WILDCARE + `/especimenes/eliminar?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${obtenerTokenLocalStorage()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el especimen');
                }
            })
            .finally(() => {
                window.location.reload();
            });
    };

    useEffect(() => {
        obtenerEspecimenes(nombreEspecimen);

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [])



    return (
        <>
            <div key={location.key} className="w-full min-h-screen bg-gray-100">
                <div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">
                    <div className="w-full h-full">
                        <h1 className="poppins-medium verdeClaro text-2xl mb-2">Especies en peligro de extinción</h1>
                        <Breadcrumbs size="lg" className="poppins-medium verdeClaro">
                            <BreadcrumbItem href='/home'>Especies</BreadcrumbItem>
                            <BreadcrumbItem href='#'>{nombreEspecimen}</BreadcrumbItem>
                        </Breadcrumbs>
                        <div className="ml-14 mt-8">
                            <div className="mb-8">
                                <Input
                                    isClearable
                                    size="md"
                                    type="text"
                                    className="poppins-semibold w-full sm:max-w-[34%]"
                                    classNames={inputClasses}
                                    placeholder="Buscar"
                                    startContent={<SearchIcon />}
                                    onClear={onClear}
                                    value={busqueda}
                                    onChange={manejarCambio}
                                />
                            </div>
                            <div className="flex flex-wrap justify-start gap-6 mb-8" id="cardEspecimenes">
                                {loading ? (
                                    <div className="flex items-center justify-center gap-4">
                                        <Spinner size='lg' color="success" />
                                        <h2 className="poppins-medium mt-2">Cargando...</h2>
                                    </div>
                                ) : especimenesFiltrados.length > 0 ? (
                                    especimenesFiltrados.map((especimen) => (
                                        <EspecimenCard
                                            key={especimen.id}
                                            region={especimen.region}
                                            nombre={especimen.nombre}
                                            descripcion={especimen.descripcion}
                                            imagen={especimen.imagen}
                                            idUbicacion={especimen.idUbicacion}
                                            showDropdown={true}
                                            showButton={true}
                                            onEditar={() => especimen.id ? obtenerEspecimen(especimen.id) : null}
                                            onEliminar={() => especimen.id ? eliminarEspecimen(especimen.id) : null}
                                        />
                                    ))
                                ) : (
                                    <p className="poppins-regular">No hay especímenes para mostrar.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListarEspecimenes;