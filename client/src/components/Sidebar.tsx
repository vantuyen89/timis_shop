import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'


const Sidebar = () => {
  return (
    <div className='bg-gray-800 text-white w-64'>
      <div className='p-4'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <ul className='mt-4'>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Link to={'/admin'}>Dashboard</Link>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Sản phẩm</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/product'}>ProductList</Link>
                  <Link to={'/admin/productAdd'}>ProductAdd</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/category'}>CategoryList</Link>
                  <Link to={'/admin/categoryAdd'}>CategoryAdd</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/size'}>SizeList</Link>
                  <Link to={'/admin/sizeAdd'}>SizeAdd</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/color'}>ColorList</Link>
                  <Link to={'/admin/colorAdd'}>ColorAdd</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
