import { useEffect, useState } from 'react'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import useConversation from '@/zustand/useConversation'
import instance from '@/config/instance'
import MessageForm from '@/pages/message/MessageForm'
import useGetMessage from '@/common/hooks/useGetMessage'
import { useAuth } from '@/common/hooks/useAuth'
import MessageCheck from '@/pages/message/MessageCheck'

const Test = () => {
  const [check, setCheck] = useState(false)
  const { userAuth } = useAuth()
  const { setSelectedConversation } = useConversation()
  const { messages, isLoading } = useGetMessage()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await instance.get(`/auth/getAdmin`)
        setSelectedConversation(data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <div id='chat-container' className={`${userAuth?.isAdmin ? 'hidden' : ''} fixed bottom-16 right-4 w-96`}>
      {check ? (
        <div className='bg-white shadow-md rounded-lg max-w-lg w-full'>
          <div className='p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center'>
            <p className='text-lg font-semibold'>Admin Bot</p>
            <button
              id='close-chat'
              className='text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400'
            >
              <FaTimes onClick={() => setCheck(false)} />
            </button>
          </div>
          <div id='chatbox' className='p-4 h-80 overflow-y-auto'>
            {/* Chat messages will be displayed here */}
            {!isLoading &&
              messages.length > 0 &&
              messages.map((message: any) => {
                return <MessageCheck message={message} />
              })}
          </div>
          <MessageForm />
        </div>
      ) : (
        <IoChatbubbleOutline
          className={`${userAuth?.isAdmin ? 'hidden' : ''}`}
          size={30}
          onClick={() => {
            setCheck(true)
          }}
        />
      )}
    </div>
  )
}

export default Test
