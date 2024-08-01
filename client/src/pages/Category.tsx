import { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllCategory } from '@/services/category'

interface Category {
  _id: string
  name: string
  description: string
  imageUrl: string
}

const Category = () => {
  const [category, setCategory] = useState<Category[]>([])
  const navigate = useNavigate()
  const handleSearchCategory = (id:string) => {
    navigate(`/shop?category=${id}`)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getAllCategory()
        setCategory(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <div className='bg-[#ffffff] border-b-2 container'>
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
        {category?.map((category: Category) => {
          return (
            <SwiperSlide key={category._id} className='py-5 flex justify-center flex-col items-center'>
              <img
                src={category.imageUrl}
                className='lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] rounded-full cursor-pointer'
                onClick={() => handleSearchCategory(category._id)}
              />
              <h5 className='text-black cursor-pointer' onClick={() => handleSearchCategory(category._id)}>
                {category.name}
              </h5>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Category
