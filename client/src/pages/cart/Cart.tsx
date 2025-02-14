import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { decrementItemCart, getCartByUserId, incrementItemCart, removeItemFromCart } from '@/services/cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetApiCArt, setTotalCart } from '@/store/slice/cartSlice'
import CartEmpty from './CartEmpty'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import { Button } from '@/components/ui/button'

const Cart = () => {
  const location = useLocation()
  const crumbs = generateBreadcrumbs(location.pathname)
  const dispatch = useDispatch<any>()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getCartByUserId()
        console.log(data)
        dispatch(fetApiCArt(data?.allProducts))
        dispatch(setTotalCart(data?.cartTotal))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const { cart, totalCart } = useSelector((state: any) => state.cart)
  const calculatePriceSale = (productsCount: number) => {

    if (productsCount === 0) return 0
    if (productsCount < 3) return 30000
    if (productsCount <= 8) return 15000
    return 0
  }

  let priceSale = calculatePriceSale(cart?.length).toLocaleString('vi-VN')
  let totalPrice: any = ((Number(priceSale) + totalCart) * 1000).toLocaleString('vi-VN')

  const handleRemoveCart = async (productIdCart: string, colorCart: string, sizeCart: string) => {
    await removeItemFromCart({
      productId: productIdCart,
      color: colorCart,
      size: sizeCart
    })
    const data = await getCartByUserId()
    dispatch(fetApiCArt(data?.allProducts))
    dispatch(setTotalCart(data?.cartTotal))
  }

  return (
    <div className='container'>
      <div className='flex py-4 gap-2'>
        <Breadcrumb crumbs={crumbs} />
      </div>
      {cart?.length === 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <CartEmpty title={'Bạn chưa có sản phẩm nào trong giỏ hàng'} />
          <Button className='mb-4'>
            <Link to={'/'}>Mua hàng</Link>
          </Button>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 grid-cols-1'>
          <div className='col-span-2'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Giỏ hàng của bạn</h3>
              <hr />
              <div className='flex px-6 w-full overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className=''>
                      <th></th>
                      <th></th>
                      <th>
                        <p className='lg:text-base text-sm'>Tên sản phẩm</p>
                      </th>
                      <th>
                        <p className='lg:text-base text-sm'>Số lượng</p>
                      </th>
                      <th>
                        <p className='lg:text-base text-sm'>Giá</p>
                      </th>
                      <th>
                        <p className='lg:text-base text-sm'>Thành tiền</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((product: any, index: number) => {
                      return (
                        <tr className='text-center border-b' key={index}>
                          <td className='py-6'>
                            <button
                              className='cursor-pointer'
                              onClick={() => handleRemoveCart(product.productId, product.color._id, product.size._id)}
                            >
                              <TiDeleteOutline size={25} />
                            </button>
                          </td>
                          <td>
                            <img
                              src={product.image}
                              alt=''
                              className='lg:w-[120px] w-[60px]  lg:h-[150px] h-[80px] mx-auto my-6'
                            />
                          </td>
                          <td>
                            <div className='flex flex-col justify-center items-center'>
                              <p className='lg:text-base text-sm lg:w-64 w-32 truncate ...'>{product.name}</p>
                              <p className='lg:text-base text-sm'>
                                ({product?.color?.name},{product?.size?.name})
                              </p>
                            </div>
                          </td>
                          <td>
                            <button
                              type='button'
                              className='mx-auto flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md'
                            >
                              <FiMinus
                                onClick={async () => {
                                  await decrementItemCart({
                                    productId: product.productId,
                                    color: product.color._id,
                                    size: product.size._id
                                  })

                                  const data = await getCartByUserId()
                                  dispatch(fetApiCArt(data?.allProducts))
                                  dispatch(setTotalCart(data?.cartTotal))
                                }}
                                className='cursor-pointer'
                              />

                              <span className='mx-3 font-bold'>{product.quantity}</span>
                              <FiPlus
                                onClick={async () => {
                                  await incrementItemCart({
                                    productId: product.productId,
                                    color: product.color._id,
                                    size: product.size._id
                                  })

                                  const data = await getCartByUserId()
                                  dispatch(fetApiCArt(data?.allProducts))
                                  dispatch(setTotalCart(data?.cartTotal))
                                }}
                                className='cursor-pointer'
                              />
                            </button>
                          </td>
                          <td>
                            <p className='lg:text-base text-sm'>{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                          </td>
                          <td>
                            <p className='lg:text-base text-sm'>
                              {(product.price * 1000 * product.quantity).toLocaleString('vi-VN')}đ
                            </p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='grid col-span-1 h-[600px] sticky top-[150px]'>
            <div className='border rounded-3xl flex flex-col p-5 gap-7'>
              <h3 className='text-[20px] font-medium'>Thông tin khách hàng</h3>
              <div className='flex justify-between'>
                <span className='text-[#9D9EA2] text-[14px]'>Tổng tiền</span>
                <span className='text-[14px]'>{(totalCart * 1000).toLocaleString('vi-VN')}đ</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#9D9EA2] text-[14px]'>Phí vận chuyển</span>
                <span className='text-[14px]'>{priceSale}đ</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#9D9EA2] text-[14px]'>Thanh toán</span>
                <span className='text-[14px]'>{totalPrice}đ</span>
              </div>
              <div className='flex items-center gap-4'>
                <input type='text' className='rounded-xl border h-[48px] pl-8' placeholder='Voucher code' />
                <button className='bg-black rounded-full py-2 px-3 text-white text-xs'>Áp dụng</button>
              </div>
              <hr />

              <p className='text-[14px]'>
                Free ship với 10 đơn hàng <span className='text-red-500'>$100.00</span>
              </p>
              <a className='text-[14px] underline'>Tiếp tục mua sắm</a>
              <button className='bg-[#000] h-[60px] text-white'>
                <Link to={'/order'}>Thanh toán</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
