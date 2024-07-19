import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import bn1 from '@/images/bn1.png'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCartByUserId, removeItemFromCart } from '@/services/cart'
import ClipLoader from 'react-spinners/ClipLoader'
import Paginations from '@/components/Pagination'
import { useDispatch } from 'react-redux'
import { ICart } from '@/interfaces/ICart'
import { fetApiCArt } from '@/store/slice/cartSlice'

const Cart = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const dispatch = useDispatch<any>()
  console.log(dispatch)
  const query = useQueryClient()
  const {
    data: productCart,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['productCart', pageIndex],
    queryFn: async () => getCartByUserId(pageIndex)
  })
  if (isLoading)
    return (
      <div className='flex justify-center items-center mt-[200px]'>
        <ClipLoader
          color={'#000000'}
          loading={isLoading}
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    )
  if (isError) return <div>Error fetching cart data</div>
  console.log(productCart)

  return (
    <div className='container'>
      <div className='flex py-4 gap-2'>
        <Link to={'/'}>Trang chủ</Link>/<Link to={'/'}>Áo nam</Link>/<Link to={'/'}>Áo cam đỏ đẹp</Link>
      </div>
      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
          {productCart?.content.length !== 0 ? (
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Giỏ hàng của bạn</h3>
              <hr />
              <div className='flex px-6'>
                <table className='w-full'>
                  <thead>
                    <tr className=''>
                      <th></th>
                      <th></th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCart?.content.map((product: any, index: number) => {
                      return (
                        <tr className='text-center border-b' key={index}>
                          <td className='py-6'>
                            <button
                              className='cursor-pointer'
                              onClick={async () => {
                                await removeItemFromCart({
                                  productId: product.productId,
                                  color: product.color._id,
                                  size: product.size._id
                                })
                                const data = await getCartByUserId()
                                dispatch(
                                  fetApiCArt(data)
                                )
                                query.invalidateQueries({
                                queryKey: ['productCart', pageIndex]})
                              }}
                            >
                              <TiDeleteOutline size={25} />
                            </button>
                          </td>
                          <td>
                            <img src={product.image} alt='' className='w-[120px] h-[150px] mx-auto my-6' />
                          </td>
                          <td>
                            <div className='flex flex-col justify-center items-center'>
                              <p className='w-64 truncate ...'>{product.name}</p>
                              <p>
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
                                // onClick={() =>
                                //   dispatch(
                                //     decrementItemAsync({
                                //       productId: product.productId,
                                //       color: product.color._id,
                                //       size: product.size._id
                                //     })
                                //   )
                                // }
                                className='cursor-pointer'
                              />

                              <span className='mx-3 font-bold'>{product.quantity}</span>
                              <FiPlus
                                // onClick={() =>
                                //   dispatch(
                                //     incrementItemAsync({
                                //       productId: product.productId,
                                //       color: product.color._id,
                                //       size: product.size._id
                                //     })
                                //   )
                                // }
                                className='cursor-pointer'
                              />
                            </button>
                          </td>
                          <td>
                            <p>{(product.price * 1000).toLocaleString('vi-VN')}đ</p>
                          </td>
                          <td>
                            <p>{(product.price * 1000 * product.quantity).toLocaleString('vi-VN')}đ</p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>Không có sản phẩm nào , Hãy quay lại mua hàng</div>
          )}
          <div className='flex justify-center items-center py-3'>
            <Paginations
              pageCount={productCart?.totalPage}
              handlePageClick={(event: any) => {
                console.log(event.selected)
                setPageIndex(event.selected + 1)
              }}
            />
          </div>
        </div>
        <div className='grid col-span-1 h-[600px]'>
          <div className='border rounded-3xl flex flex-col p-5 gap-7'>
            <h3 className='text-[20px] font-medium'>Thông tin khách hàng</h3>
            <div className='flex justify-between'>
              <span className='text-[#9D9EA2] text-[14px]'>Subtotal</span>
              <span className='text-[14px]'>$497.00</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#9D9EA2] text-[14px]'>Discount</span>
              <span className='text-[14px]'>$0.0</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#9D9EA2] text-[14px]'>Shipping Costs</span>
              <span className='text-[14px]'>$50.00</span>
            </div>
            <div className='flex items-center gap-4'>
              <input type='text' className='rounded-xl border h-[48px] pl-8' placeholder='Coupon code' />
              <button className='btn'>Apply Coupon</button>
            </div>
            <hr />

            <p className='text-[14px]'>
              Get Free Shipping for orders over <span className='text-red-500'>$100.00</span>
            </p>
            <a className='text-[14px] underline'>Continue Shopping</a>
            <button className='bg-[#000] h-[60px] text-white'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
