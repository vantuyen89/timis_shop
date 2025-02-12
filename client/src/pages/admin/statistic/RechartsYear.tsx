import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { get1year } from '@/services/statistic'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { toast } from 'sonner'

const RechartsYear = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setYear(parseInt(e.target.elements[0].value))
  }
  const { data } = useQuery({
    queryKey: ['rechartsYear', year],
    queryFn: async () => {
      try {
        const { data } = await get1year(year)
        return data
      } catch (error: any) {   
        toast.error(error?.response?.data?.message)
      }
    }
  })
  return (
    <div>
      <div className='flex gap-3 items-center'>
        <h3 className='p-5 pl-20'>Đơn hàng theo năm</h3>
        <form action='' className='flex gap-5' onSubmit={handleSubmit}>
          <Input type='text' />
          <Button type='submit'>Tìm</Button>
        </form>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='delivered' stroke='#8884d8' />
          <Line type='monotone' dataKey='cancelled' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RechartsYear
