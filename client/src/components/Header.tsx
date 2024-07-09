import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../images/timis1.png'
import Banner from '@/pages/Banner'
import { CiSearch } from 'react-icons/ci'
import { FaRegCircleUser } from 'react-icons/fa6'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { HiBars3 } from 'react-icons/hi2'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const Header = () => {
  return (
    <header className='lg:sticky sticky lg:top-0 lg:left-0 lg:right-0 top-0 left-0 right-0 bg-white z-[100]'>
      <div className='bg-black'>
        <div className='container text-center py-2'>
          <p className='text-[12px] lg:text-sm text-white'>
            LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.
            <span className='pl-4'>23:00:00</span>
          </p>
        </div>
      </div>

      <div className='py-4 lg:border-b lg:border-neutral-400'>
        <div className='container'>
          <div className='flex flex-wrap lg:flex-nowrap justify-between lg:gap-8'>
            <div className='order-1 flex items-center space-x-4 lg:-ml-9'>
              <button className='lg:hidden'>
                <Sheet>
                  <SheetTrigger asChild>
                    <HiBars3 className='text-[24px]' />
                  </SheetTrigger>
                  <SheetContent side={'left'}>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className='grid gap-4 py-4'>
                      <p>hahah</p>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <button type='submit'>Save changes</button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </button>
              <Link to={'/'}>
                <img srcSet={logo + ' ' + `2x`} className='w-[100px] lg:w-full' />
              </Link>
            </div>
            <form className='w-full order-3 lg:order-2 flex gap-2 border-t mt-4 lg:mt-0 border-neutral-400 pt-4 lg:w-auto lg:pt-0 lg:border-0'>
              <input
                type='text'
                className='py-1 pl-6 pr-1 rounded-full bg-white border border-[#F4F4F4] w-full lg:w-[400px]'
                placeholder='Search'
              />
              <button
                type='submit'
                className='bg-[#000] hover:bg-[#4a4a4a] transition duration-300 rounded-full w-[58px] lg:w-12 h-12 flex justify-center items-center'
              >
                <CiSearch className='text-[30px] text-white' />
              </button>
            </form>
            <div className='order-2 lg:order-3 flex items-center gap-2 lg:gap-6 lg:-mr-9'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaRegCircleUser className='text-[23px] text-[#353535]' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='z-[200]'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex cursor-pointer'>
                    <div className='flex items-center gap-3'>
                      <img src={logo} alt='' className='w-6 h-6 rounded-full border' />
                      <div className='flex flex-col'>
                        <h5 className='text-[12px]'>Nguyễn Văn Tuyên</h5>
                        <span className='text-[10px] w-[70px] overflow-hidden overflow-ellipsis whitespace-nowrap '>
                          Email:tuyennvph39165@gmail.com
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>Đơn hàng của bạn</DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>Sản phẩm yêu thích</DropdownMenuItem>
                  <DropdownMenuItem className='text-red-400 cursor-pointer'>Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button className='relative'>
                <AiOutlineShoppingCart className='text-[25px] text-[#353535]' />
                <span className='text-[12px] absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white'>
                  1
                </span>
              </button>
            </div>
          </div>
          <div className='hidden lg:block'>
            <div className='container'>
              <nav>
                <ul className='lg:flex items-center justify-center space-x-10 text-[#46494F]'>
                  <li>
                    <NavLink
                      to={'/'}
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : 'normal',
                        borderBottomColor: isActive ? 'black' : 'none',
                        borderBottomWidth: isActive ? '4px' : ''
                      })}
                      className={`relative block pt-4 group`}
                    >
                      Trang chủ
                      <div className='absolute left-0 bottom-0 h-1 w-full bg-black mt-3 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100'></div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/shop'}
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 'medium' : 'normal',
                        borderBottomColor: isActive ? 'black' : 'none',
                        borderBottomWidth: isActive ? '4px' : ''
                      })}
                      className={`relative block pt-4 group`}
                    >
                      Shop All
                      <div className='absolute left-0 bottom-0 h-1 w-full bg-black mt-3 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100'></div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/ddd'}
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : 'normal',
                        borderBottomColor: isActive ? 'black' : 'none',
                        borderBottomWidth: isActive ? '4px' : ''
                      })}
                      className={`relative block pt-4 group`}
                    >
                      FLower
                      <div className='absolute left-0 bottom-0 h-1 w-full bg-black mt-3 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100'></div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/ccc'}
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : 'normal',
                        borderBottomColor: isActive ? 'black' : 'none',
                        borderBottomWidth: isActive ? '4px' : ''
                      })}
                      className={`relative block pt-4 group`}
                    >
                      Liên hệ
                      <div className='absolute left-0 bottom-0 h-1 w-full bg-black mt-3 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100'></div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/sss'}
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : 'normal',
                        borderBottomColor: isActive ? 'black' : 'none',
                        borderBottomWidth: isActive ? '4px' : ''
                      })}
                      className={`relative block pt-4 group`}
                    >
                      Tin tức
                      <div className='absolute left-0 bottom-0 h-1 w-full bg-black mt-3 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100'></div>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
