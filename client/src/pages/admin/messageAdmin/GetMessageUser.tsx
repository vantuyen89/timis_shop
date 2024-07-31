
import useConversation from '@/zustand/useConversation'
import useMessage from '@/common/hooks/useMessage'
import React, { useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import MessageItem from './MessageItem'
const GetMessageUser = () => {
  const [message, setMessage] = useState("")
  const { selectedConversation } = useConversation()
  const { sendMessage } = useMessage()
  const formRef = useRef(null)
  const handleSubmit =async (e: any) => {
    e.preventDefault()
    if (message === "") return
     await sendMessage(message)
     setMessage('')
    if (formRef.current) {
      (formRef.current as string | any).reset() 
    }
  }
  return (
    <div className='lg:col-span-4 row-span-1'>
      {selectedConversation != null ? (
        <div className='py-2'>
          <div className='flex items-center gap-4'>
            <img src={selectedConversation?.avatar} alt='' className='border rounded-full w-9 h-9' />
            <h5 className='pb-4'>{selectedConversation?.username}</h5>
          </div>

          <hr />
          <div>
            <div className='mt-4 space-y-4 '>
              <MessageItem />
              <form className='mt-4 flex items-center' onSubmit={handleSubmit} ref={formRef}>
                <input
                  type='text'
                  className='flex-1 ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg'
                  placeholder='Aa'
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                />
                <button className='text-gray-500 ml-2' type='submit'>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <h3>Hãy trò chuyện với khách hàng của bạn</h3>
        </div>
      )}
    </div>
  )
}

export default GetMessageUser