import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/timis1.png'
import { CiSearch } from 'react-icons/ci'

import { HiBars3 } from 'react-icons/hi2'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import CartHeader from './CartHeader'
import { useSelector } from 'react-redux'
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const handSearch = (e: any) => {
    e.preventDefault()
    navigate(`/shop?search=${searchTerm}`)
  }
  const { cart } = useSelector((state: any) => state.cart)
  console.log(cart)

  return (
    <header className='lg:sticky sticky lg:top-0 lg:left-0 lg:right-0 top-0 left-0 right-0 bg-white z-[10]'>
      <div className='bg-black'>
        <div className='container text-center py-2'>
          <p className='text-[12px] lg:text-sm text-white'>
            TIMIS luôn đồng hành cùng các bạn -<span className=''> Thời trang nâng tầm sắc đẹp</span>
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
                    <div>
                      <ul className='lg:flex flex-col items-center justify-center space-x-10 text-[#46494F]'>
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
                            Sản phẩm
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
                            Phụ kiện
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
                    </div>
                  </SheetContent>
                </Sheet>
              </button>
              <Link to={'/'}>
                <img srcSet={logo + ' ' + `2x`} className='w-[100px] lg:w-full' />
              </Link>
            </div>
            <form
              onSubmit={handSearch}
              className='w-full order-3 lg:order-2 flex gap-2 border-t mt-4 lg:mt-0 border-neutral-400 pt-4 lg:w-auto lg:pt-0 lg:border-0'
            >
              <input
                type='text'
                className='py-1 pl-6 pr-1 rounded-full bg-white border border-[#F4F4F4] w-full lg:w-[400px]'
                placeholder='Search'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type='submit'
                className='bg-[#000] hover:bg-[#4a4a4a] transition duration-300 rounded-full w-[58px] lg:w-12 h-12 flex justify-center items-center'
              >
                <CiSearch className='text-[30px] text-white' />
              </button>
            </form>
            <CartHeader />
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
                      Sản phẩm
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
                      Phụ kiện
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
