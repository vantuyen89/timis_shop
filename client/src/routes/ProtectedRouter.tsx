
import { useAuth } from '@/common/hooks/useAuth'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router'

interface Props {
  children: ReactElement
}

const ProtectedRouter: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to='/auth/signin' />
}

export default ProtectedRouter
