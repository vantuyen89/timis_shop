import { useAuth } from '@/common/hooks/useAuth'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router'

interface Props {
  children: ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isLoggedIn,userAuth } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to='/auth/signin' />
  }
  if (!userAuth?.isAdmin) {
    return <Navigate to='/' />
  }
  return isLoggedIn && userAuth?.isAdmin && children 
}

export default PrivateRoute
