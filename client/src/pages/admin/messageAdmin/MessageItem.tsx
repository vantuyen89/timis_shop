import useGetMessage from '@/common/hooks/useGetMessage'
import useListenMessage from '@/common/hooks/useListenMessage'
import MessageCheck from '@/pages/message/MessageCheck'
import React from 'react'

const MessageItem = () => {
  const { isLoading, messages } = useGetMessage()
  useListenMessage()
  return (
    <>
      <div className='max-h-[500px] overflow-y-auto flex flex-col gap-3'>
        {!isLoading &&
          messages.length > 0 &&
          messages.map((message: any) => {
            return <MessageCheck message={message} />
          })}
      </div>
    </>
  )
}

export default MessageItem