import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import { useAuth } from '@/common/hooks/useAuth'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdEventNote, MdFavoriteBorder } from 'react-icons/md'
const MyInfor = () => {
  const locaction = useLocation()
  const location = useLocation()
  const { userAuth } = useAuth()

  const crumbs = generateBreadcrumbs(location.pathname)
  return (
    <div className='container'>
      <div className='flex py-4 gap-2'>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4 pt-7'>
          <div className='border rounded-3xl flex flex-col p-5 gap-7'>
            <div className='flex flex-col items-center'>
              <img src={userAuth?.avatar} alt='' className='w-[80px] h-[80px]' />
              <h3 className='text-[20px] font-medium'>{userAuth?.username}</h3>
              <span className='text-[14px]'>Email : {userAuth?.email}</span>
            </div>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <div className='flex items-center gap-2'>
                    <FaRegUserCircle />
                    Thông tin cá nhân
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Link to={'/myinfor'}>Thông tin chi tiết</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className='flex cursor-pointer items-center gap-2'>
              <MdFavoriteBorder />
              Sản phẩm yêu thích
            </div>
            <div className=''>
              <Link to={'/myinfor/myorder'} className='flex cursor-pointer items-center gap-2'>
                <MdEventNote />
                Đơn hàng của tôi
              </Link>
            </div>
          </div>
        </div>
        <div className='col-span-8 flex flex-col py-7'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MyInfor
