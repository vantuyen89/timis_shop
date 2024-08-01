

const HeaderAdmin = () => {
  return (
    <div className='bg-gray-900 text-white py-4 px-6 flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <div className='flex items-center'>
        <div className='mr-4'>
          <button className='bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none'>
            Notifications
            <span className='bg-red-500 text-white px-2 py-1 ml-2 rounded-full'>3</span>
          </button>
        </div>
        <div>
          <button className='bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none'>
            Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdmin