import { Especimen } from '../types'
import { useState, useCallback, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem, Input } from '@nextui-org/react'
import EspecimenCard from '../components/EspecimenCard'
import { useLocation } from 'react-router-dom'
import SearchIcon from "../assets/icons/SearchIcon";


const ListarEspecimenes: React.FC = () => {
    const [filterValue, setFilterValue] = useState("");

    const location = useLocation();
    const especimenes = location.state as { especimenes: Especimen[] };

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
        setFilterValue("");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [especimenes])

    return (

        <>

            <div key={location.key} className="w-full min-h-screen bg-gray-100">
                <div className="flex flex-col md:flex-row gap-4 md:gap-40 mx-4 md:mx-24 mt-8">

                    <div className="w-full h-full">
                        <h1 className="poppins-medium verdeClaro text-2xl mb-2">Especies en peligro de extinción</h1>

                        <Breadcrumbs size="lg" className="poppins-medium verdeClaro">
                            <BreadcrumbItem href='/home'>Especies</BreadcrumbItem>
                            <BreadcrumbItem href='#'>{especimenes.especimenes[0].nombre}</BreadcrumbItem>
                        </Breadcrumbs>

                        <div className="ml-14 mt-8">
                            <div className="mb-8">
                                <Input
                                    isClearable
                                    size="lg"
                                    type="text"
                                    className="poppins-semibold w-full sm:max-w-[34%]"
                                    classNames={inputClasses}
                                    placeholder="Buscar"
                                    startContent={<SearchIcon />}
                                    onClear={onClear}
                                />
                            </div>

                            <div className="flex flex-wrap justify-start gap-6 mb-8" id="cardEspecimenes">
                                {especimenes.especimenes.length > 0 ? (
                                    especimenes.especimenes.map((especimen) => (
                                        <EspecimenCard
                                            key={especimen.id}
                                            region={especimen.region}
                                            nombre={especimen.nombre}
                                            descripcion={especimen.descripcion}
                                            imagen={especimen.imagen}
                                            idUbicacion={especimen.idUbicacion}
                                            showDropdown={true}
                                            showButton={true}
                                        />
                                    ))
                                ) : (
                                    <p>No hay especímenes para mostrar.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default ListarEspecimenes;