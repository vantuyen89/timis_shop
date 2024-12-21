import CountTotal from './statistic/Dashboard'
import Recharts from './statistic/Recharts'

const MainContent = () => {
  return (
    <div className='grid w-full min-h-screen grid-cols-6 gap-2 md:gap-4 lg:gap-6 px-7 py-4 '>
      <CountTotal />
      <div className='flex'>
        <Recharts />
      </div>
    </div>
  )
}

export default MainContent
