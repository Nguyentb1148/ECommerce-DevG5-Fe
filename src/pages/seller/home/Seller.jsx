import { Outlet } from 'react-router-dom';
import SidebarSeller from '../../../components/sidebar/SidebarSeller';

const Seller = () => {
  return (
    <div className="md:flex bg-gray-900">
      <SidebarSeller />
      <div className="md:flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Seller