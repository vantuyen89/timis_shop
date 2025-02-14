import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/common/hooks/useAuth'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { resetCart } from '@/store/slice/cartSlice'
import { logout } from '@/services/auth'
import { getAuth, signOut } from 'firebase/auth'
import app from '@/config/initializeFirebase'
import instance from '@/config/instance'
const UserHome = () => {
  const { isLoggedIn, userAuth, setUserAuth, setIsLoggedIn } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onHandleLogout = async () => {
    try {
      const data = await logout()
      setIsLoggedIn?.(false)
      setUserAuth?.(undefined)
      navigate('/')
      dispatch(resetCart())
      signOut(getAuth(app))
      instance.defaults.headers.common['Authorization'] = null
      toast.success('Bạn đăng xuất thành công')
      return data
    } catch (error) {
      console.log(error)
      toast.error('Bạn đăng xuất thất bại')
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-2'>
            {userAuth?.username}
            <FaRegCircleUser className='text-[23px] text-[#353535]' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='z-[200]'>
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex cursor-pointer'>
              <div className='flex items-center gap-3'>
                <img src={userAuth?.avatar} alt={userAuth?.username} className='w-6 h-6 rounded-full border' />
                <div className='flex flex-col'>
                  <h5 className='text-[12px]'>{userAuth?.username}</h5>
                  <span className='text-[10px] w-[70px] overflow-hidden overflow-ellipsis whitespace-nowrap '>
                    Email:{userAuth?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Link to={'/myinfor'}>Đơn hàng của bạn</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Sản phẩm yêu thích</DropdownMenuItem>
            {userAuth?.isAdmin ? (
              <DropdownMenuItem className='cursor-pointer'>
                <Link to={'/admin'}>Trang quản trị</Link>
              </DropdownMenuItem>
            ) : (
              ''
            )}
            <DropdownMenuItem className='text-red-400 cursor-pointer' onClick={onHandleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to='/auth/signin'>
          <Button>Đăng nhập</Button>
        </Link>
      )}
    </div>
  )
}

export default UserHome
