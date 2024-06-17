import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Input,
  SortDescriptor,
  Spinner,
  Select,
  SelectItem
} from "@nextui-org/react";
import VerticalDotsIcon from "../assets/icons/VerticalDotsIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import { API_WILDCARE } from '../consts/APIWildCare'
import { useAuth } from '../../context/auth/useAuth'
import { useNavigate } from 'react-router-dom';


interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
  searchable?: boolean;
}

interface Avistamiento {
  id: string;
  ciudad: string;
  descripcion: string;
  especie: string;
  fecha: string;
  idUsuario: string;
  imagen: string;
  lat: number;
  lng: number;
  region: string;
  nombreUsuario: string;
  correoUsuario: string;
  estado: string; //pendiente(default) o revisado
}

interface StatusColorMap {
  [key: string]: "success" | "default" | "primary" | "secondary" | "warning" | "danger" | undefined;
}

interface Searchable {
  [key: string]: string;
}

const searchables: Searchable[] = [
  { value: "especie", label: "Especie" },
  { value: "nombreUsuario", label: "Usuario" },
  { value: "ciudad", label: "Ciudad"},
  { value: "region", label: "Región"},
];

const columns: Column[] = [
  { name: "ESPECIE", uid: "especie", sortable: true, searchable: true},
  { name: "USUARIO", uid: "nombreUsuario", sortable: true, searchable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACCIONES", uid: "acciones" },
];

const statusColorMap: StatusColorMap = {
  revisado: "success",
  pendiente: "danger",
  vacation: "warning",
};

const Avistamientos: React.FC = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [avistamientos, setAvistamientos] = useState<Avistamiento[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "especie",
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedValue, setSelectedValue] = useState('especie');

  const { obtenerTokenLocalStorage } = useAuth();
  const navigate = useNavigate();



  const fetchAvistamientos = async () => {
    try {
      const response = await fetch(API_WILDCARE + '/avistamientos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
      },
    })
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      
      const data: Avistamiento[] = await response.json();

      setIsLoading(false);

      
      setAvistamientos(data);
    } catch (error) {

      console.log(error)
    } 

  };

  const eliminarAvistamiento = async (id: string) => {
    console.log('eliminando avistamiento')
    try {
      const response = await fetch(API_WILDCARE + '/avistamientos/eliminar/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await obtenerTokenLocalStorage()}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el avistamiento');
      }

      alert('Avistamiento eliminado correctamente')	
      await fetchAvistamientos();
  
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvistamientos();
  }, []);


  const filteredItems = useMemo(() => {
    let filteredAvistamientos = [...avistamientos];

    if (hasSearchFilter) {
      filteredAvistamientos = filteredAvistamientos.filter((avistamiento) =>
        avistamiento[selectedValue as keyof Avistamiento].toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredAvistamientos;
  }, [avistamientos, filterValue, hasSearchFilter]);


  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Avistamiento, b: Avistamiento) => {
      const first = a[sortDescriptor.column as keyof Avistamiento] as string | number;
      const second = b[sortDescriptor.column as keyof Avistamiento] as string | number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-end my-2">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar"
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <Select
          label="Búsqueda por"
          className="max-w-xs"
          //poniendo el valor por defecto en el select
          defaultSelectedKeys={["especie"]}
          onChange={handleSelectionChange}
        >
{searchables
  .map((searchable) => (
    <SelectItem key={searchable.value} className="capitalize">
      {searchable.label}
    </SelectItem>
  ))}
        </Select>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);



  const renderCell = React.useCallback(
    (avistamiento: Avistamiento, columnKey: string) => {
      const cellValue = avistamiento[columnKey as keyof Avistamiento];

      switch (columnKey) {
        case "especie":
          return (
            <div className="flex items-center mb-4">
              <img
                src={avistamiento.imagen}
                alt="Avatar"
                className="rounded-lg w-16 h-16 mr-4"
              />
              <div className="flex flex-col">
                <p className="font-bold mb-1">{cellValue}</p>
                <p className="text-gray-500 mb-1">{avistamiento.ciudad}</p>
                <p className="text-gray-500 ">{avistamiento.region}</p>
              </div>
            </div>
          );
        case "nombreUsuario":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm text-default-400">
                {avistamiento.correoUsuario}
              </p>
            </div>
          );
        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[avistamiento.estado]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "acciones":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => navigate(`/avistamientos/info-avistamiento/${avistamiento.id}`)}>Ver</DropdownItem>
                  <DropdownItem onClick={() => eliminarAvistamiento(avistamiento.id)}>Eliminar</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <div className="w-full bg-gray-100 px-20">
        <h1 className="poppins-medium verdeClaro text-2xl my-10">
          Avistamientos de especies en peligro de extinción
        </h1>
        <div className="">
          <Table
                  selectionMode="single" 

            aria-label="Example table with custom cells"
            topContent={topContent}
            topContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            className="bg-white p-10 rounded-lg"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  allowsSorting={column.sortable}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="poppins-medium font-bold text-sm text-black"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody
              emptyContent={"No se han encontrado avistamientos"}
              items={sortedItems}
              isLoading={isLoading}
              loadingContent={<Spinner color="success" label="Cargando..." />}
            >
              {(item) => (
                <TableRow key={item.id} className="cursor-pointer" onClick={() => navigate(`/avistamientos/info-avistamiento/${item.id}`)}  >
                  {(columnKey) => (
                    <TableCell className="poppins-medium">
                        {renderCell(item, String(columnKey))}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Avistamientos;
