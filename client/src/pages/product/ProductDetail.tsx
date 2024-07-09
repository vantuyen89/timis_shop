import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import bn1 from '@/images/bn1.png'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import bn2 from '@/images/bn2.png'
import bn3 from '@/images/bn3.png'
import bn4 from '@/images/bn4.png'
import bn5 from '@/images/bn5.png'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import RelatedProduct from './RelatedProduct'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'

const images = [bn1, bn2, bn3, bn4]
const ProductDetail = () => {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
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

  const handleSizeChange = (size: any) => {
    setSelectedSize(size)
    if (!sizeColorAvailability[size].includes(selectedColor)) {
      setSelectedColor(null)
    }
    
  }

  const handleColorChange = (color: any) => {
    if (!selectedSize || sizeColorAvailability[selectedSize]?.includes(color)) {
      setSelectedColor(color)
    }
  }

  const handleQuantityChange = (amount: any) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount
      return newQuantity > 0 ? newQuantity : 1
    })
  }
  const sizeColorAvailability = {
    '29': ['Trắng', 'Xám'],
    '30': ['Trắng', 'Xám', 'Nâu'],
    '31': ['Trắng', 'Xám', 'Đen'],
    '32': ['Trắng', 'Xám', 'Nâu', 'Đen'],
    '34': ['Trắng', 'Đen']
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
                      disabled={!sizeColorAvailability[selectedSize]?.includes(colorObj.color)}
                      className={`p-1 border rounded ${selectedColor === colorObj.color ? 'border-black' : 'border-gray-300'} ${!sizeColorAvailability[selectedSize]?.includes(colorObj.color) ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
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
                  <div className='py-4'></div>
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

              <div className='mt-4 flex flex-col gap-3 bg-[#efdbdb] bg-opacity-30 py-5 px-2 rounded-md'>
                <p className='text-sm'>Phí vận chuyển (Tìm hiểu thêm)</p>
                <p className='text-sm'>Thanh toán ngay hoặc COD (Tìm hiểu thêm)</p>
                <p className='text-sm'>Chính sách đổi sản phẩm (Tìm hiểu thêm)</p>
              </div>
              <div className='flex gap-0 flex-col'>
                <div className='flex flex-col border-y-2 py-4'>
                  <div className='flex justify-between'>
                    <h5 className='font-semibold'>Mô tả sản phẩm</h5>
                    {open === false ? (
                      <button>
                        <CiCirclePlus size={27} onClick={() => setOpen(true)} />
                      </button>
                    ) : (
                      <button>
                        <CiCircleMinus size={27} onClick={() => setOpen(false)} />
                      </button>
                    )}
                  </div>
                  {open === false ? (
                    <div></div>
                  ) : (
                    <div className='font-light'>
                      Áo phông unisex người lớn dáng boxy in chữ, chất liệu cotton thoáng mát
                    </div>
                  )}
                </div>
                <div className='flex flex-col border-y-2 py-4'>
                  <div className='flex justify-between'>
                    <h5 className='font-semibold'>Chất liệu</h5>
                    {open1 === false ? (
                      <button>
                        <CiCirclePlus size={27} onClick={() => setOpen1(true)} />
                      </button>
                    ) : (
                      <button>
                        <CiCircleMinus size={27} onClick={() => setOpen1(false)} />
                      </button>
                    )}
                  </div>
                  {open1 === false ? <div></div> : <div className='font-light'>100% cotton</div>}
                </div>
                <div className='flex flex-col border-y-2 py-4'>
                  <div className='flex justify-between'>
                    <h5 className='font-semibold'>Hướng dẫn sử dụng</h5>
                    {open2 === false ? (
                      <button>
                        <CiCirclePlus size={27} onClick={() => setOpen2(true)} />
                      </button>
                    ) : (
                      <button>
                        <CiCircleMinus size={27} onClick={() => setOpen2(false)} />
                      </button>
                    )}
                  </div>
                  {open2 === false ? (
                    <div></div>
                  ) : (
                    <div className='font-light'>
                      Giặt máy ở chế độ nhẹ, nhiệt độ thường. Không sử dụng hóa chất tẩy có chứa Clo. Phơi trong bóng
                      mát. Sấy khô ở nhiệt độ thấp. Là ở nhiệt độ thấp 110 độ C. Giặt với sản phẩm cùng màu. Không là
                      lên chi tiết trang trí.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct />
    </div>
  )
}

export default ProductDetail
