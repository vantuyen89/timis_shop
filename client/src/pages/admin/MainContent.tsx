import CountTotal from './statistic/Dashboard'
import Recharts from './statistic/Recharts'
import RechartsYear from './statistic/RechartsYear'


const MainContent = () => {
  return (
    <div className='min-h-screen  w-full'>
      <div className='grid  grid-cols-6 gap-2 md:gap-4 lg:gap-6 px-7 py-4 '>
        <CountTotal />
      </div>
      <div className=''>
        <Recharts />
        <RechartsYear />
      </div>
    </div>
  )
}

export default MainContent
