import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import LayoutSidebar from '../src/pages/layout/LayoutSidebar'
import Home from '../src/pages/home'
import Login from '../src/pages/Login'
import RegistrarEspecimenForm from '../src/pages/RegistrarEspecimenForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LayoutSidebar />}>
        <Route path="/home" element={<Home />} />
        <Route path="/registrar-especimen" element={<RegistrarEspecimenForm />} />
      </Route>
      <Route path="/*" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

export default router
