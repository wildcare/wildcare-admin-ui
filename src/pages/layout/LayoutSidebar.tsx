import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const LayoutSidebar: React.FC = () => {
  return (
    <div className="flex relative">
      <Sidebar />
      <Outlet />
    </div>
  )
}
export default LayoutSidebar
