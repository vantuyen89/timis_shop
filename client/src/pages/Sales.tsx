import React from 'react'
import sales1  from '../images/salesone.png'
import sales2 from '../images/salestwo.png'
import { Button } from '@/components/ui/button'
const Sales = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-5 py-4'>
      <div className='relative group'>
        <img src={sales1} alt='' />
        <Button className='absolute flex items-center lg:top-[200px] top-[12px] lg:left-[260px] left-[130px] opacity-0 group-hover:opacity-80 lg:group-hover:top-[180px] group-hover:top-[100px] duration-300 ease-in-out transition-all '>
          Xem thêm
        </Button>
      </div>
      <div className='relative group'>
        <img src={sales2} alt='' />
        <Button className='absolute flex items-center lg:top-[200px] top-[120px] lg:left-[260px] left-[130px] opacity-0 group-hover:opacity-80 lg:group-hover:top-[180px] group-hover:top-[100px] duration-300 ease-in-out transition-all '>
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default Sales