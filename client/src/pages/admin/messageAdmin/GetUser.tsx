import instance from '@/config/instance'
import { IUser } from '@/interfaces/IUser'
import { userChat } from '@/services/auth'
import useConversation from '@/zustand/useConversation'
import React, { useEffect, useState } from 'react'

const GetUser = () => {
  const [data, setData] = useState<IUser[]>([])
  const {selectedConversation,setSelectedConversation} = useConversation()
  useEffect(() => {
    (async () => {
      const { data } = await userChat()
      setData(data.data);
    })()
  },[])
  return (
    <div className='lg:col-span-2 row-span-1'>
      <div className="flex flex-col">
        {data?.map((user: IUser) => {     
          return (
            <div key={user._id} className='py-2 border-r-2'>
              <div className='flex items-center space-x-4 hover:bg-blue-300 p-2 cursor-pointer' onClick={()=>setSelectedConversation(user)}>
                <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full' />
                <div className='text-sm font-medium text-gray-700'>{user.username}</div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default GetUser