import { IUser } from '@/interfaces/IUser'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { authCurrent } from '@/services/auth'
import { getCartByUserId } from '@/services/cart'
import { useDispatch } from 'react-redux'
import { fetApiCArt, resetCart, setTotalCart } from '@/store/slice/cartSlice'
interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextType {
  userAuth?: IUser | undefined
  setUserAuth?: Dispatch<SetStateAction<IUser | undefined>>
  isLoggedIn?: boolean
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>({})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userAuth, setUserAuth] = useState<IUser | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const value = { userAuth, setUserAuth, isLoggedIn, setIsLoggedIn }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await authCurrent()
        setUserAuth(data?.data)
        setIsLoggedIn(true)
        setIsLoading(false)
        const cart = await getCartByUserId()
        dispatch(fetApiCArt(cart?.allProducts))
        dispatch(setTotalCart(cart?.cartTotal))
      } catch (error) {
        console.log(error)
        dispatch(resetCart())
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])
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
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
