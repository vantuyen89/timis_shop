import React from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/button'

const LayoutAuth = () => {
  return (
    <div className='w-full h-full py-[114px]'>
      <Outlet />
    </div>
  )
}

export default LayoutAuth