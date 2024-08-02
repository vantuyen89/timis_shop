import { useAuth } from '@/common/hooks/useAuth'
import useListenMessage from '@/common/hooks/useListenMessage'
import useConversation from '@/zustand/useConversation'
import { useEffect, useRef } from 'react'

const MessageCheck = (message: any) => {
  const { userAuth } = useAuth()
   const messagesEndRef = useRef<HTMLDivElement | null>(null)

   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
   }

   useEffect(() => {
     scrollToBottom()
   }, [message])
  const { selectedConversation } = useConversation()
   useListenMessage()
   const fromMe = message.message.senderId === userAuth?._id
  const checkClass = fromMe ? 'items-end' : 'items-start'
  const checkMessage = fromMe ? 'bg-blue-500' : 'bg-[#abaaaa]'
  const checkImg = fromMe ? '' : <img src={selectedConversation?.avatar} alt='' className='border rounded-full w-8 h-8' />
  return (
    <div className={`flex flex-col gap-3 ${checkClass}`}>
      <div className='flex items-center gap-3'>
        {checkImg}
        <div
          className={` text-white  inline-block rounded-lg px-4 py-2 max-w-[180px] break-words text-sm ${checkMessage} `}
        >
          {message.message.message}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessageCheck

