import HeaderAdmin from '@/components/HeaderAdmin'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const LayoutAdmin = () => {
  return (
    <div>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
          <HeaderAdmin />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin