import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import bn1 from '@/images/salesone.png'
import bn2 from '../images/bn2.png'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'


const UserShare = () => {
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
    },
    {
      id: 9,
      name: 'Product 9',
      price: 160000,
      sale: 0
    },
    {
      id: 10,
      name: 'Product 10',
      price: 180,
      sale: 12
    }
  ]
  return (
    <div className='flex flex-col items-center py-6'>
      <div className='py-[40px] flex justify-center items-center gap-2 '>
        <div className='border-b-2 w-[100px] border-black'></div>
        <h3 className='lg:text-[30px] text-[16px] text-center'>Chi tiết từ khách hàng</h3>
        <div className='border-b-2 w-[100px] border-black'></div>
      </div>
      <Swiper
        className='grid grid-cols-1'
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop
        spaceBetween={50}
        slidesPerView={2.5}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        breakpoints={{
          768: {
            slidesPerView: 5,
            spaceBetween: 20
          }
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {products.map((product: any) => {
          return (
            <SwiperSlide className=''>
              <div>
                <div className='flex justify-center items-center w-full h-full'>
                  {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                  <div className=' w-full h-full'>
                    <img className='w-full h-[300px]' src={bn1} alt='Image 1' />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        <button className='swiper-button-next after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300'>
          <GrLinkNext />
        </button>
        <button className='swiper-button-prev after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300'>
          <GrLinkPrevious />
        </button>
      </Swiper>
    </div>
  )
}

export default UserShare
