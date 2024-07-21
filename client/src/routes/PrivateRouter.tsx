import { useAuth } from '@/common/hooks/useAuth'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router'

interface Props {
  children: ReactElement
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const {isLoggedIn} = useAuth()
  return isLoggedIn ? children : <Navigate to='/' />
}

export default PrivateRoute
