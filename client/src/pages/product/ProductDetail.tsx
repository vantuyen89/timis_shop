import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import bn1 from '~/images/bn1.png'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import bn2 from '~/images/bn2.png'
import bn3 from '~/images/bn3.png'
import bn4 from '~/images/bn4.png'
import bn5 from '~/images/bn5.png'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

const images = [bn1, bn2, bn3, bn4]
const ProductDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const sizes = ['29', '30', '31', '32', '34']
  const colors = [
    { color: 'Trắng', src: 'path/to/white.jpg' },
    { color: 'Xám', src: 'path/to/grey.jpg' },
    { color: 'Nâu', src: 'path/to/brown.jpg' },
    { color: 'Đen', src: 'path/to/black.jpg' }
  ]

  const handleSizeChange = (size:any) => {
    setSelectedSize(size)
  }

  const handleColorChange = (color:any) => {
    setSelectedColor(color)
  }

  const handleQuantityChange = (amount:any) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount
      return newQuantity > 0 ? newQuantity : 1
    })
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const product = {
        size: selectedSize,
        color: selectedColor,
        quantity
      }
      console.log('Product added to cart:', product)
      // Logic to add the product to the cart
    } else {
      alert('Please select a size and color.')
    }
  }
  return (
    <div className='container flex flex-col'>
      <div className='flex py-4 gap-2'>
        <Link to={'/'}>Trang chủ</Link>/<Link to={'/'}>Áo nam</Link>/<Link to={'/'}>Áo cam đỏ đẹp</Link>
      </div>
      <div className='grid lg:grid-cols-12 grid-cols-1'>
        <div className='col-span-6'>
          <div className='w-full'>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              // pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => {
                console.log(swiper)
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className='w-full'>
                  <img src={img} alt={`Slide ${index + 1}`} className='w-full' />
                </SwiperSlide>
              ))}
              <button className='swiper-button-next after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 '>
                <GrLinkNext />
              </button>
              <button className='swiper-button-prev after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300'>
                <GrLinkPrevious />
              </button>
            </Swiper>

            <div className='flex justify-center mt-4 space-x-2 w-full'>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-[80px] h-[80px] cursor-pointer opacity-60 transition-opacity duration-300 ${
                    activeIndex === index ? 'opacity-100 border-2 border-black' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-1'></div>
        <div className='col-span-5'>
          <div className='w-full'>
            <div className='p-6 w-full space-y-4'>
              <h1 className='text-xl font-bold'>Quần âu nam QACTK320-1</h1>
              <div className='flex items-center space-x-2'>
                <p>Mã sản phẩm : 12345</p>
              </div>
              <div className='flex items-center space-x-2'>
                <p className='text-2xl font-bold'>249.000 ₫</p>
                <span className='line-through text-gray-500'>389.000 ₫</span>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Màu Sắc</p>
                <div className='flex space-x-2'>
                  {colors.map((colorObj, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorChange(colorObj.color)}
                      className={`p-1 border rounded ${selectedColor === colorObj.color ? 'border-black' : 'border-gray-300'}`}
                    >
                      {colorObj.color}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Size</p>
                <div className='flex space-x-2'>
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeChange(size)}
                      className={`px-4 py-2 border rounded ${selectedSize === size ? 'border-black bg-gray-200' : 'border-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline' className='text-red-500'>
                    Hướng dẫn chọn size
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Hướng dẫn chọn size</DialogTitle>
                  </DialogHeader>
                  <div className='py-4'>

                  </div>
                </DialogContent>
              </Dialog>

              <div>
                <p className='font-semibold'>Số lượng</p>
                <div className='flex items-center space-x-2'>
                  <button onClick={() => handleQuantityChange(-1)} className='px-3 py-1 border rounded'>
                    -
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='w-12 text-center border border-gray-300 rounded'
                  />
                  <button onClick={() => handleQuantityChange(1)} className='px-3 py-1 border rounded'>
                    +
                  </button>
                </div>
              </div>

              <div className='flex space-x-4'>
                <button onClick={handleAddToCart} className='flex-1 bg-red-600 text-white py-2 rounded'>
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button className='flex-1 bg-red-600 text-white py-2 rounded'>MUA NGAY</button>
              </div>

              <div className='mt-4'>
                <p className='text-sm'>Phí vận chuyển (Tìm hiểu thêm)</p>
                <p className='text-sm'>Thanh toán ngay hoặc COD (Tìm hiểu thêm)</p>
                <p className='text-sm'>Chính sách đổi sản phẩm (Tìm hiểu thêm)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
