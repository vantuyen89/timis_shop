import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import bn1 from '../images/bn1.png'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import instance from '@/config/instance'


interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const Category = () => {
  const [category, setCategory] = useState<Category[]>([])
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/category/getAll`)
        console.log(data);
        
        setCategory(data);
      } catch (error) {
        console.log(error); 
      }
   })()
  },[])
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
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {category.map((category: Category) => {
          return (
            <SwiperSlide key={category.id} className='py-5 flex justify-center flex-col items-center'>
              <img src={category.imageUrl} className='lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full ' />
              <h5 className='text-white'>{category.name}</h5>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Category
