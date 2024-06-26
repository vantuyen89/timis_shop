import React from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/button'

const LayoutAuth = () => {
  return (
    <div className='w-full h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 py-[114px]'>
     
      <Outlet />
    </div>
  )
}

export default LayoutAuth