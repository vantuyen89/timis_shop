import instance from '@/config/instance'

export const statisticTotal = () => {
  const data = instance.get(`/statistic`)
  return data
}

export const get7days = () => instance.get(`/statistic/get7days`)

export const get1year = (year: number) => instance.post(`/statistic/get1year`, { year })
