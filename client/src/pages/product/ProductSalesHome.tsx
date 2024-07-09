import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { Link } from 'react-router-dom'
import bn1 from '@/images/bn1.png'
import bn2 from '@/images/bn2.png'

const ProductSalesHome = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1 quá đẹp , quá đẹp quá đẹp quá đẹp quá',
      price: 100000,
      sale: 10
    },
    {
      id: 2,
      name: 'Product 2 , quá đẹp quá đẹp quá đẹp quá',
      price: 150000,
      sale: 20
    },
    {
      id: 3,
      name: 'Product 3 , quá đẹp quá đẹp quá đẹp quá',
      price: 80000,
      sale: 0
    },
    {
      id: 4,
      name: 'Product 4 , quá đẹp quá đẹp quá đẹp quá',
      price: 120000,
      sale: 15
    },
    {
      id: 5,
      name: 'Product 5',
      price: 200000,
      sale: 25
    },
    {
      id: 6,
      name: 'Product 6',
      price: 90000,
      sale: 5
    },
    {
      id: 7,
      name: 'Product 7',
      price: 110000,
      sale: 0
    },
    {
      id: 8,
      name: 'Product 8',
      price: 130000,
      sale: 18
    }
  ]
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='py-[40px] flex justify-center items-center gap-2 '>
        <div className='border-b-2 w-[100px] border-black'></div>
        <h3 className='lg:text-[30px] text-[16px] text-center'>Sản phẩm Sales</h3>
        <div className='border-b-2 w-[100px] border-black'></div>
      </div>
      <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-7'>
        {products.map((product) => {
          return (
            <div className='group'>
              <div>
                <div className='relative overflow-hidden border rounded-2xl bg-[#F4F4F4] flex justify-center items-center '>
                  {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                  <div className='relative group inline-block'>
                    <img
                      className='object-cover w-full h-full transition duration-300 transform group-hover:scale-50'
                      src={bn1}
                      alt='Image 1'
                    />
                    <img
                      className='absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100'
                      src={bn2}
                      alt='Image 2'
                    />
                  </div>
                  <div className='absolute flex justify-center items-center -bottom-10 group-hover:bottom-14 transition-all duration-300 ease-in-out'>
                    <Link
                      to={'/'}
                      className='w-[150px] border text-white bg-[#000000] bg-opacity-30 text-center rounded-full leading-[40px] border-none transition-transform hover:scale-90 ease-in-out'
                    >
                      Xem nhanh
                    </Link>
                  </div>
                  <div className='absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]'>
                    <IoIosHeartEmpty className='text-[20px] border-opacity-30 text-[#545454]' />
                  </div>
                  <div className='absolute left-3 top-5 rounded-t-full rounded-b-full rounded-br-none  p-1 bg-[#f85656]'>
                    <p className='text-[14px] p-1 text-white'>50%</p>
                  </div>
                </div>
                <div className='my-4'>
                  <h3 className=' lg:text-base text-[14px] text-[#1A1E26] my-4 font-light w-70 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {product.name}
                  </h3>
                  <div className='flex gap-2 justify-start pl-2 my-4 items-center '>
                    <h5 className='text-[18px] text-[#000]'>{product.price.toLocaleString('vi-VN')}đ</h5>
                    <span className='text-[15px] text-[#767676]'>
                      <del>${(80000).toLocaleString('vi-VN')}đ</del>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='border-2 my-4 text-center w-[120px] h-[35px] border-[#dd4e4e] flex items-center justify-center'>
        <Link to={'/'} className='font-semibold text-[#dd4e4e]'>
          Xem tất cả
        </Link>
      </div>
    </div>
  )
}

export default ProductSalesHome
