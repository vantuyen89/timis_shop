import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import bn1 from '../images/bn1.png'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Category = () => {
  return (
    <div className='bg-[#242424]'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop
        spaceBetween={50}
        slidesPerView={2.5}
        breakpoints={{
          768: {
            slidesPerView: 5,
            spaceBetween: 30
          }
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
        <SwiperSlide className='py-5 flex justify-center flex-col items-center'>
          <img src={bn1} className=' lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
          <h5 className='text-white'>Danh mục 1</h5>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Category
