import instance from '@/config/instance'
import useConversation from '@/zustand/useConversation'
import { useEffect, useState } from 'react'

const useGetMessage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const { data } = await instance.get(`/message/${selectedConversation?._id}`)
        setMessages(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [selectedConversation?._id,setMessages])

  return { isLoading, messages }
}
export default useGetMessage
