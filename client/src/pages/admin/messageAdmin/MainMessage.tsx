import React from 'react'
import GetUser from './GetUser'
import GetMessageUser from './GetMessageUser'

const MainMessage = () => {
  return (
    <div className='grid lg:grid-cols-6 grid-row-2  gap-4 p-4'>
      <GetUser />
      <GetMessageUser/>
    </div>
  )
}

export default MainMessage