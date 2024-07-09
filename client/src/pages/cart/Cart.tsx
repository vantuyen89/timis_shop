import React from 'react'
import { Link } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import bn1 from '@/images/bn1.png'
import { FiMinus, FiPlus } from 'react-icons/fi'

const Cart = () => {
  const products = [
    { name: 'Product 1', price: 10.0, total: 100.0 },
    { name: 'Product 2', price: 20.0, total: 200.0 },
    { name: 'Product 3', price: 30.0, total: 300.0 },
    { name: 'Product 4', price: 40.0, total: 400.0 },
    { name: 'Product 5', price: 50.0, total: 500.0 },
    { name: 'Product 6', price: 60.0, total: 600.0 },
    { name: 'Product 7', price: 70.0, total: 700.0 },
    { name: 'Product 8', price: 80.0, total: 800.0 },
    { name: 'Product 9', price: 90.0, total: 900.0 },
    { name: 'Product 10', price: 100.0, total: 1000.0 }
  ]
  return (
    <div className='container'>
      <div className='flex py-4 gap-2'>
        <Link to={'/'}>Trang chủ</Link>/<Link to={'/'}>Áo nam</Link>/<Link to={'/'}>Áo cam đỏ đẹp</Link>
      </div>
      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
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
                  {products.map((product: any) => {
                    return (
                      <tr className='text-center border-b'>
                        <td className='py-6'>
                          <button className='cursor-pointer'>
                            <TiDeleteOutline size={25} />
                          </button>
                        </td>
                        <td>
                          <img src={bn1} alt='' className='w-[120px] h-[150px] mx-auto my-6' />
                        </td>
                        <td>
                          <p className='truncate ...'>{product.name}</p>
                        </td>
                        <td>
                          <button
                            type='button'
                            className='mx-auto flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md'
                          >
                            <FiMinus />

                            <span className='mx-3 font-bold'>2</span>
                            <FiPlus />
                          </button>
                        </td>
                        <td>
                          <p>{product.price}</p>
                        </td>
                        <td>
                          <p>{product.total}</p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
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
