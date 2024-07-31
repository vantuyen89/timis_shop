import instance from '@/config/instance'
import React, { useEffect, useState } from 'react'

const useConversation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState([])
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const { data } = await instance.get(`/auth/userChat`)
        setConversation(data)
      } catch (error) {
        console.log('Error:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])
  return { isLoading, conversation }
}

export default useConversation