import  { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { IoIosHeartEmpty } from 'react-icons/io'
import { IProduct } from '@/interfaces/IProduct'
const SwiperProduct = ({ products, title }: any) => {
  const [isBlock, setIsBlock] = useState(false)
  useEffect(() => {
    if (products.length > 4) {
      setIsBlock(true)
    } else {
      setIsBlock(false)
    }
  },[products])
  return (
    <>
      <div className='py-[40px] flex justify-center items-center gap-2 '>
        <div className='border-b-2 w-[100px] border-black'></div>
        <h3 className='lg:text-[30px] text-[16px] text-center'>{title}</h3>
        <div className='border-b-2 w-[100px] border-black'></div>
      </div>
      <div className='w-full relative'>
        <Swiper
          modules={[Navigation]}
          loop
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.btn-next',
            prevEl: '.btn-prev'
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            0:{
              slidesPerView: 1.5,
              spaceBetween: 50,
            }
          }}
         
        >
          {products.map((product: IProduct) => {
            return (
              <SwiperSlide className='lg:w-[310px] w-[300px] group'>
                <div key={product._id}>
                  <div className='relative overflow-hidden border rounded-2xl bg-[#F4F4F4] flex justify-center items-center '>
                    {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                    <div className='relative group inline-block lg:h-full h-[200px]'>
                      <img
                        className='object-cover w-full h-full transition duration-300 transform group-hover:scale-50'
                        src={product.thumbnail}
                        alt='Image 1'
                      />
                      <img
                        className='absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100'
                        src={product.images[0]?.url}
                        alt='Image 2'
                      />
                    </div>
                    <div className='absolute flex justify-center items-center -bottom-10 group-hover:bottom-14 transition-all duration-300 ease-in-out'>
                      <Link
                        to={`/shop/${product._id}`}
                        className='lg:w-[150px] w-[100px] lg:text-base text-sm border text-white bg-[#000000] lg:py-2 bg-opacity-30 text-center rounded-full leading-[40px] border-none transition-transform hover:scale-90 ease-in-out'
                      >
                        Xem nhanh
                      </Link>
                    </div>
                    <div className='absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]'>
                      <IoIosHeartEmpty className='text-[20px] border-opacity-30 text-[#545454]' />
                    </div>
                    <div className='absolute left-3 top-5 rounded-t-full rounded-b-full rounded-br-none  p-1 bg-[#f85656]'>
                      <p className='text-[14px] p-1 text-white'>{product.discount}%</p>
                    </div>
                  </div>
                  <div className='my-4'>
                    <h3 className=' lg:text-base text-[14px] text-[#1A1E26] my-4 font-light w-70 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                      <Link to={`/shop/${product._id}`}>{product.name}</Link>
                    </h3>
                    <div className='flex lg:h-[20px] h-[15px] gap-4'>
                      {Array.from(new Set(product.variants.map((variant: any) => variant.color.code))).map(
                        (colorCode: string, index: number) => (
                          <div
                            key={index}
                            className='rounded-full h-full lg:w-[20px] w-[15px]'
                            style={{ backgroundColor: `#${colorCode}` }}
                          ></div>
                        )
                      )}
                    </div>
                    <div className='flex gap-2 justify-start pl-2 my-4 items-center '>
                      <h5 className=' text-[#000] lg:text-base text-sm'>
                        {(product.price * 1000).toLocaleString('vi-VN')}đ
                      </h5>
                      {/* <span className='text-[15px] text-[#767676]'>
                        <del>${(product.price*((100-(product.discount)/100)/100)).toLocaleString('vi-VN')}đ</del>
                      </span> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* {products.length < 4 &&
            Array.from({ length: 4 - products.length }).map((_, index) => (
              <SwiperSlide key={`empty-${index}`}>
                <div className='empty-slide'></div>
              </SwiperSlide>
            ))} */}
        </Swiper>

        <button className={`btn-next ${!isBlock && 'hidden'} absolute z-20 top-[39%] right-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300`}>
          <GrLinkNext />
        </button>
        <button className={`btn-prev ${!isBlock && 'hidden'} absolute z-20 top-[39%] left-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300`}>
          <GrLinkPrevious />
        </button>
      </div>
    </>
  )
}

export default SwiperProduct
