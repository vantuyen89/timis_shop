
import { Outlet } from 'react-router-dom'

const LayoutAuth = () => {
  return (
    <div className='w-full h-full py-[114px]'>
      <Outlet />
    </div>
  )
}

export default LayoutAuth