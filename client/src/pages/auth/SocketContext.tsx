import { useAuth } from '@/common/hooks/useAuth'
import useConversation from '@/zustand/useConversation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
interface AuthProviderProps {
  children: ReactNode
}

interface ContextProp {
  socket?: any | null | undefined | string
}

export const SocketContext = createContext<ContextProp>({})

export const useSocketContext = () => {
  return useContext(SocketContext)
}
export const SocketContextProvider = ({ children }: AuthProviderProps) => {
  const [socket, setSocket] = useState<any | null>(null)
  const { userAuth } = useAuth()
  
  useEffect(() => {
    if (userAuth) {
      const socketNew = io('http://localhost:8000', {
        query: { userId: userAuth?._id }
      })
      setSocket(socketNew)
      return () => socket?.close()
    } else {
      if (socket) {
        socket?.close()
        setSocket(null)
      }
    }
  }, [userAuth])
  return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
}
