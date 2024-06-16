import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import LayoutSidebar from '../src/pages/layout/LayoutSidebar'
import Home from '../src/pages/home'
import Login from '../src/pages/Login'
import RegistrarEspecimenForm from '../src/pages/RegistrarEspecimenForm'
import Avistamientos from '../src/pages/Avistamientos'
import ListarEspecimenes from '../src/pages/ListarEspecimenes'
import InfoEspecimen from '../src/pages/InfoEspecimen'
import InfoAvistamiento from '../src/pages/InfoAvistamiento'
import UploadFileForm from '../src/pages/UploadFileForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LayoutSidebar />}>
        <Route path="/home" element={<Home />} />
        <Route
          path="/home/listar_especimenes"
          element={<ListarEspecimenes />}
        />
        <Route
          path="/home/editar_especimen"
          element={<RegistrarEspecimenForm isEditing={true} />}
        />
        <Route
          path="/registrar-especimen"
          element={<RegistrarEspecimenForm isEditing={false} />}
        />
        <Route
          path="/cargar-archivo"
          element={<UploadFileForm />}
        />

        <Route path="/avistamientos" element={<Avistamientos />} />
        <Route path="/avistamientos/info-avistamiento/:id" element={<InfoAvistamiento />} />
        <Route path="/home/listar_especimenes/InfoEspecimen" element={<InfoEspecimen />} />
      </Route>
      <Route path="/*" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

export default router
