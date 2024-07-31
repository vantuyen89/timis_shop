import instance from '@/config/instance'
import useConversation from '@/zustand/useConversation'
import { useState } from 'react'

const useMessage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { messages, setMessages, setSelectedConversation, selectedConversation } = useConversation()
  const sendMessage = async (mes: any) => {
    setIsLoading(true)
    try {
      const { data } = await instance.post(`/message/sendMessage/${selectedConversation?._id}`, {
        message: mes
      })
      setMessages([...messages, data])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, sendMessage }
}

export default useMessage
