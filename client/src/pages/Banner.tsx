import React, { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import bn1 from '../images/bn1.png'
import bn2 from '../images/bn2.png'
import bn3 from '../images/bn3.png'
import bn4 from '../images/bn4.png'
import bn5 from '../images/bn5.png'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex) // Cập nhật slide hiện tại khi chuyển slide
  }
  return (
    <Swiper
      className='w-full h-[560px]'
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      effect='slide'
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      // onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
    >
      <SwiperSlide className=''>
        <img src={bn1} className='w-full h-full object-cover' alt='' />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start overflow-hidden'>
          <div
            className={`flex flex-col gap-5 ml-[200px] transform transition-transform duration-1000 ease-in-out ${
              currentSlide === 0 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className='text-[70px] text-[#1f1f1f] leading-5 tracking-widest font-Playwrite font-semibold'>BEST PRICE</h1>
            <p className='text-lg text-[#1f1f1f] mt-2'>DISCOUNT UP TO 70%</p>
            <button className='text-white bg-black p-2'>Shop now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={bn2} className='w-full h-full object-cover' alt='' />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start overflow-hidden'>
          <div
            className={`flex flex-col gap-5 ml-[200px] transform transition-transform duration-1000 ease-in-out ${
              currentSlide === 1 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className='text-[70px] text-[#1f1f1f] leading-5 tracking-widest font-Playwrite font-semibold'>BEST PRICE</h1>
            <p className='text-lg text-[#1f1f1f] mt-2'>DISCOUNT UP TO 70%</p>
            <button className='text-white bg-black p-2'>Shop now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={bn3} className='w-full h-full object-cover' alt='' />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start overflow-hidden'>
          <div
            className={`flex flex-col gap-5 ml-[200px] transform transition-transform duration-1000 ease-in-out ${
              currentSlide === 2 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className='text-[70px] text-[#1f1f1f] leading-5 tracking-widest font-Playwrite font-semibold'>BEST PRICE</h1>
            <p className='text-lg text-[#1f1f1f] mt-2'>DISCOUNT UP TO 70%</p>
            <button className='text-white bg-black p-2'>Shop now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={bn4} className='w-full h-full object-cover' alt='' />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start overflow-hidden'>
          <div
            className={`flex flex-col gap-5 ml-[200px] transform transition-transform duration-1000 ease-in-out ${
              currentSlide === 3 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className='text-[70px] text-[#1f1f1f] leading-5 tracking-widest font-Playwrite font-semibold'>BEST PRICE</h1>
            <p className='text-lg text-[#1f1f1f] mt-2'>DISCOUNT UP TO 70%</p>
            <button className='text-white bg-black p-2'>Shop now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={bn5} className='w-full h-full object-cover' alt='' />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start overflow-hidden'>
          <div
            className={`flex flex-col gap-5 ml-[200px] transform transition-transform duration-1000 ease-in-out ${
              currentSlide === 4 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <h1 className='text-[70px] text-[#1f1f1f] leading-5 tracking-widest font-Playwrite font-semibold'>BEST PRICE</h1>
            <p className='text-lg text-[#1f1f1f] mt-2'>DISCOUNT UP TO 70%</p>
            <button className='text-white bg-black p-2'>Shop now</button>
          </div>
        </div>
      </SwiperSlide>
      <button className='swiper-button-next after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 '>
        <GrLinkNext />
      </button>
      <button className='swiper-button-prev after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300'>
        <GrLinkPrevious />
      </button>
    </Swiper>
  )
}

export default Banner
