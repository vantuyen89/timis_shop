import React from 'react'

const MainContent = () => {
  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-4'>Dashboard Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>Users</h3>
          <p className='text-gray-600'>Total users: 1000</p>
        </div>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>Revenue</h3>
          <p className='text-gray-600'>$10,000</p>
        </div>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>Orders</h3>
          <p className='text-gray-600'>Total orders: 500</p>
        </div>
      </div>
    </div>
  )
}

export default MainContent