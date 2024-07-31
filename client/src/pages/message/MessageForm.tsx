import useMessage from '@/common/hooks/useMessage'
import React, { useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const MessageForm = () => {
  const { isLoading, sendMessage } = useMessage()
  const [message, setMessage] = useState<string>("")
  // console.log(message);
  const formRef = useRef(null)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage("")
    if (formRef.current) {
      (formRef.current as any).reset() 
    }
  }
  return (
    <form className='p-4 border-t flex' onSubmit={handleSubmit} ref={formRef}>
      <input type='text' className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Type a message" onChange={(e) => {
        setMessage(e.target.value)
       }
    } />
      <button className=' text-[#979797] px-4 py-2 rounded-r-md transition duration-300' type='submit'>
        <FaPaperPlane />
      </button>
    </form>
  )
}

export default MessageForm
