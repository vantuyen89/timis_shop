import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import ListColor from './ListColor'
import ListSize from './ListSize'
import DialogSelect from './DialogSelect'
import instance from '@/config/instance'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import SwiperProduct from '@/components/SwiperProduct'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch } from 'react-redux'
import { fetApiCArt } from '@/store/slice/cartSlice'
import { addtoCartById, getCartByUserId } from '@/services/cart'
import { useAuth } from '@/common/hooks/useAuth'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import { getProductById } from '@/services/product'

// import { addtoCart } from '@/store/slice/cartSlice'

const ProductDetail = () => {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeCart, setSizeCart] = useState<any>(null)
  const [colorCart, setColorCart] = useState<any>(null)
  const [category, setCategory] = useState<any>(null)
  const dispatch = useDispatch<any>()
  const location = useLocation()
  const crumbs = generateBreadcrumbs(location.pathname)
  const { isLoggedIn } = useAuth()
  const { id } = useParams()
  const {
    data: product,
    isLoading: isLoading1,
    isError: isError1
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const response = await getProductById(id as string)
        setCategory(response.data.category._id)
        return response.data
      } catch (error) {
        console.error('Error fetching product:', error)
        throw error
      }
    },
    refetchInterval: 1000 * 60 * 15 // refetch every 15 minutes
  })
  const {
    data: productRelated,
    isLoading: isLoading2,
    isError: isError2
  } = useQuery({
    queryKey: ['productRelated', category],
    queryFn: async () => {
      try {
        const response = await instance.post(`/product/productRelated`, {
          categoryId: category,
          pageSize: 6,
          idProduct: id
        })
        return response.data
      } catch (error) {
        console.error('Error fetching product:', error)
        throw error
      }
    },
    refetchInterval: 1000 * 60 * 15 // refetch every 15 minutes
  })
  useEffect(() => {
    if (product) {
      setSizeCart(null)
      setColorCart(null)
    }
  }, [product])
  if (isLoading1 || isLoading2)
    return (
      <div className='flex justify-center items-center mt-[200px]'>
        <ClipLoader
          color={'#000000'}
          loading={isLoading1 || isLoading2}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    )
  if (isError1 || isError2) return <>Error</>
  const handleQuantityChange = (amount: any) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount
      return newQuantity > 0 ? newQuantity : 1
    })
  }
  const handleAddCart = async () => {
    if (!isLoggedIn) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }
    if (sizeCart === null) {
      toast.error('Bạn chưa chọn size')
      return
    }
    if (colorCart === null) {
      toast.error('Bạn chưa chọn màu')
      return
    }
    await addtoCartById({ productId: id, color: colorCart, size: sizeCart, quantity: quantity })
    const data = await getCartByUserId()
    dispatch(fetApiCArt(data))
    toast.success('Bạn đã thêm sản phẩm vào giỏ hàng')
  }

  return (
    <div className='container flex flex-col'>
      <div className='flex py-4 gap-2'>
        <Breadcrumb crumbs={crumbs} />
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
              // onSwiper={(swiper) => {
              //   // console.log(swiper)
              // }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {product.images.map((img: string, index: number) => (
                <SwiperSlide key={index} className='w-full'>
                  <img src={img} alt={`Slide ${index + 1}`} className='w-full object-cover' />
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
              {product?.images?.map((img: string, index: number) => (
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
        <div className='col-span-1 hidden lg:grid '></div>
        <div className='col-span-5'>
          <div className='w-full'>
            <div className='p-6 w-full space-y-4'>
              <h1 className='text-xl font-bold'>{product.name}</h1>
              <div className='flex items-center space-x-2'>
                <p>Mã sản phẩm : 12345</p>
              </div>
              <div className='flex items-center space-x-2'>
                <p className='text-2xl font-bold'>{product.price * 1000} ₫</p>
                <span className='line-through text-gray-500'>389.000 ₫</span>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Màu Sắc</p>
                <ListColor variants={product.variants} setColorCart={setColorCart} sizeCart={sizeCart} />
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Size</p>
                <ListSize variants={product.variants} setSizeCart={setSizeCart} colorCart={colorCart} />
              </div>
              <DialogSelect />

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
                <button className='flex-1 bg-red-600 text-white py-2 rounded' onClick={() => handleAddCart()}>
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
      <div></div>

      <SwiperProduct products={productRelated.data} title={`Sản phẩm liên quan`} />
      {productRelated.data.length === 0 && (
        <div className='flex justify-center items-center w-full h-full bg-[#f9f9f9] text-center'>
          <p className='text-xl'>Không có sản phẩm nào liên quan</p>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
