import { get7days } from '@/services/statistic'
import { useEffect, useState } from 'react'
import { AreaChart, XAxis, CartesianGrid, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts'
const Recharts = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    try {
      ;(async () => {
        const { data } = await get7days()
        setData(data)
      })()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className=''>
      <h3 className='p-5 pl-20'>Đơn hàng gần nhất</h3>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='delivered' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='cancelled' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='date' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area type='monotone' dataKey='delivered' stroke='#8884d8' fillOpacity={1} fill='url(#delivered)' />
          <Area type='monotone' dataKey='cancelled' stroke='#82ca9d' fillOpacity={1} fill='url(#cancelled)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Recharts
