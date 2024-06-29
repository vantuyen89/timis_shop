import React from 'react'
import sales1  from '../images/salesone.png'
import sales2 from '../images/salestwo.png'
import { Button } from '~/components/ui/button'
const Sales = () => {
  return (
    <div className='flex gap-5 py-4'>
      <div className='relative group'>
        <img src={sales1} alt='' />
        <Button className='absolute top-[200px] left-[260px] opacity-0 group-hover:opacity-80 group-hover:top-[180px] duration-300 ease-in-out transition-all '>
          Xem thêm
        </Button>
      </div>
      <div className='relative group'>
        <img src={sales2} alt='' />
        <Button className='absolute top-[200px] left-[260px] opacity-0 group-hover:opacity-80 group-hover:top-[180px] duration-300 ease-in-out transition-all '>
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default Sales