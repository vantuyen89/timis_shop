import React, { useEffect, useState } from 'react'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { FaPhone, FaVideo, FaTimes, FaPaperclip, FaImage, FaPaperPlane } from 'react-icons/fa'
import useConversation from '@/zustand/useConversation'
import instance from '@/config/instance'
import MessageForm from '@/pages/message/MessageForm'
import useGetMessage from '@/common/hooks/useGetMessage'
import { useAuth } from '@/common/hooks/useAuth'
import MessageCheck from '@/pages/message/MessageCheck'
import useListenMessage from '@/common/hooks/useListenMessage'
import { getUserAdmin } from '@/services/auth'

const LayoutMessage = () => {
  const [check, setCheck] = useState(false)
  const { userAuth } = useAuth()
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { messages, isLoading } = useGetMessage()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getUserAdmin()
        setSelectedConversation(data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    // <div className={`fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg z-[100] ${userAuth?.isAdmin ? 'hidden' : ''}`}>
    //   {check ? (
    //     <div className='bg-white flex justify-center items-center min-w-[400px]'>
    //       <div className='w-full mx-auto my-2  bg-white text-white rounded-lg'>
    //         <div className='flex justify-between items-center bg-slate-300 w-full p-2 rounded-md'>
    //           <span className='text-lg font-bold text-black '>Admin</span>
    //           <div className='flex space-x-2'>
    //             <button className='text-gray-500'>
    //               <FaTimes onClick={() => setCheck(false)} />
    //             </button>
    //           </div>
    //         </div>
    //         <div className='mt-4 space-y-4 h-[300px] overflow-y-auto'>
    //           {!isLoading &&
    //             messages.length > 0 &&
    //             messages.map((message: any) => {
    //               return <MessageCheck message={message} />
    //             })}
    //         </div>
    //         <MessageForm />
    //       </div>
    //     </div>
    //   ) : (
    //     <IoChatbubbleOutline
    //       className={`${userAuth?.isAdmin ? 'hidden' : ''}`}
    //       size={30}
    //       onClick={() => {
    //         setCheck(true)
    //       }}
    //     />
    //   )}
    // </div>
    <div id='chat-container' className={`fixed bottom-4 z-[100] right-4 ${userAuth?.isAdmin ? 'hidden' : ''}`}>
      {check ? (
        <div className='bg-white shadow-md rounded-lg lg:min-w-[370px] min-w-full w-full'>
          <div className='p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <img src={selectedConversation?.avatar} alt='' className='border rounded-full w-6 h-6' />
              <p className='text-lg font-semibold'>Admin Shop</p>
            </div>
            <button
              id='close-chat'
              className='text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400'
            >
              <FaTimes onClick={() => setCheck(false)} />
            </button>
          </div>
          <div id='chatbox' className='p-4 h-80 mt-4 space-y-4 overflow-y-auto'>
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
        <div className='p-3 bg-[#eeeeee] rounded-full'>
          <IoChatbubbleOutline
            className={`${userAuth?.isAdmin ? 'hidden' : ''} cursor-pointer text-black  `}
            size={35}
            onClick={() => {
              setCheck(true)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default LayoutMessage

  





