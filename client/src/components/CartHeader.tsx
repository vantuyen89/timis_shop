import { useEffect, useState } from 'react'
import UserHome from '@/pages/auth/UserHome'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useAuth } from '@/common/hooks/useAuth'
import { Link } from 'react-router-dom'

import { getCartByUserId } from '@/services/cart'
import { fetApiCArt } from '@/store/slice/cartSlice'
const CartHeader = () => {
  const { isLoggedIn } = useAuth()
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getCartByUserId()
        dispatch(fetApiCArt(data?.allProducts || []))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const { cart } = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  return (
    <>
      <div className='order-2 lg:order-3 flex items-center gap-2 lg:gap-6 lg:-mr-9'>
        <UserHome />
        {isLoggedIn ? (
          <button className='relative'>
            <Link to={'/cart'}>
              <AiOutlineShoppingCart className='text-[25px] text-[#353535]' />
            </Link>
            <span className='text-[12px] absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white'>
              {cart?.length}
            </span>
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default CartHeader
