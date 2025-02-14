
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from '@/config/initializeFirebase'
import { useAuth } from '@/common/hooks/useAuth'
import { loginWithGoogle } from '@/services/auth'
import { getCartByUserId } from '@/services/cart'
import { useDispatch } from 'react-redux'
import { fetApiCArt } from '@/store/slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import instance from '@/config/instance'
const SigninWithGG = () => {
  const auth = getAuth(app)
  const { setUserAuth, setIsLoggedIn } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = getAdditionalUserInfo(result)
        const payload = {
          email: user?.profile?.email,
          full_name: user?.profile?.name,
          picture: user?.profile?.picture,
          first_name: user?.profile?.family_name,
          last_name: user?.profile?.given_name,
          uid: user?.profile?.id,
          provider: user?.providerId
        }
        const cart = await getCartByUserId()
        console.log('cartSigninGG', cart)

        dispatch(fetApiCArt(cart?.allProducts))
        const { data } = await loginWithGoogle(payload)
        instance.defaults.headers.common['Authorization'] = data.data.accessToken
        setUserAuth?.(data?.data?.user)
        setIsLoggedIn?.(true)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='px-5 w-full cursor-pointer py-3' onClick={() => handleGoogle()}>
      <div className='flex border rounded-[10px] justify-center items-center py-2 gap-2 '>
        <img src='../logogg.png' alt='' className='w-5 h-5' />
        <p className='text-sm'>Đăng nhập với Google</p>
      </div>
    </div>
  )
}

export default SigninWithGG
