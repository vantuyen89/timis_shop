import instance from '@/config/instance'

export const statisticTotal = () => {
  const data = instance.get(`/statistic`)
  return data
}
