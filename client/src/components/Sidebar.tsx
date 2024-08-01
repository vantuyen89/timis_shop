
import { Link } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'


const Sidebar = () => {
  return (
    <div className='bg-gray-800 text-white w-64 min-h-screen h-auto overflow-y-auto'>
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
                  <Link to={'/admin/product'}>Danh sách sản phẩm</Link>
                  <Link to={'/admin/productAdd'}>Thêm sản phẩm</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Danh mục</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/category'}>Danh sách danh mục</Link>
                  <Link to={'/admin/categoryAdd'}>Thêm danh mục</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Kích thước</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/size'}>Danh sách kích thức</Link>
                  <Link to={'/admin/sizeAdd'}>Thêm kích thước</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Màu sắc</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/color'}>Danh sách màu sắc</Link>
                  <Link to={'/admin/colorAdd'}>Thêm màu sắc</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Đơn hàng</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/order'}>Đơn hàng</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Tài Khoản</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/auth'}>Tài khoản</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li className='p-2 hover:bg-gray-700 cursor-pointer'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Tài Khoản</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4'>
                  <Link to={'/admin/message'}>Tin nhắn của shop</Link>
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
