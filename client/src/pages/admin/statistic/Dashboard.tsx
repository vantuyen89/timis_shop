import { statisticTotal } from '@/services/statistic'
import { useQuery } from '@tanstack/react-query'

const CountTotal = () => {
  const { data } = useQuery({
    queryKey: ['countTotal'],
    queryFn: async () => {
      try {
        const { data } = await statisticTotal()     
        return data.data
      } catch (error) {}
    }
  })

  return (
    <>
      <div className='h-20 md:h-[100px] rounded-xl relative box-shadow col-span-2 lg:col-span-2 overflow-hidden bg-gradient-to-r from-[rgba(191,230,255,0.48)] to-[rgba(115,185,251,0.84)] flex items-center px-1 md:px-4 justify-between border-l-[4px] border-blue-500'>
        <div className='flex items-center justify-center bg-white rounded-full size-8 md:size-12'>
          <img src='/ic-glass-bag.svg' alt='' className='object-cover size-6 md:size-10' />
        </div>
        <div className=''>
          <p className='text-[#042174] md:text-base text-sm'>Tổng đơn hàng</p>
          <h3 className='text-2xl font-bold text-blue-700 text-end'>{data?.totalOrder}</h3>
        </div>
        <div
          style={{
            mask: 'url(/shape-square.svg) center center / contain no-repeat'
          }}
          className='absolute -top-6 -left-2 size-[240px] z-[-1] bg-blue-800 text-blue-800'
        ></div>
      </div>
      <div className='h-20 md:h-[100px] rounded-xl relative box-shadow  col-span-2 lg:col-span-2 overflow-hidden bg-gradient-to-r from-[rgba(239,214,255,0.48)] to-[rgba(198,132,255,0.48)] flex items-center px-1 md:px-4 justify-between border-l-[4px] border-violet-500'>
        <div className='flex items-center justify-center bg-white rounded-full size-8 md:size-12'>
          <img src='/ic-glass-users.svg' alt='' className='object-cover size-6 md:size-10' />
        </div>
        <div className=''>
          <p className='text-[#27097A] md:text-base text-sm text-end'>Người dùng</p>
          <h3 className='font-bold text-2xl text-[#5119B7] text-end'>{data?.totalUser}</h3>
        </div>
        <div
          style={{
            mask: 'url(/shape-square.svg) center center / contain no-repeat'
          }}
          className='absolute -top-6 -left-2 size-[240px] z-[-1] bg-blue-800 text-blue-800'
        ></div>
      </div>
      <div className='h-20 md:h-[100px] rounded-xl relative box-shadow  col-span-2 lg:col-span-2 overflow-hidden bg-gradient-to-r from-[rgba(255,230,206,0.48)] to-[rgba(255,172,130,0.76)] flex items-center px-1 md:px-4 justify-between border-l-[4px] border-orange-500'>
        <div className='flex items-center justify-center bg-white rounded-full size-8 md:size-12'>
          <img src='/ic-notification-package.svg' alt='' className='object-cover size-6 md:size-8' />
        </div>
        <div className=''>
          <p className='text-[#7A0916]'> Sản phẩm</p>
          <h3 className='font-bold text-2xl text-[#7A0916] text-end'>{data?.totalProduct}</h3>
        </div>
        <div
          style={{
            mask: 'url(/shape-square.svg) center center / contain no-repeat'
          }}
          className='absolute -top-6 -left-2 size-[240px] z-[-1] bg-blue-800 text-blue-800'
        ></div>
      </div>
    </>
  )
}

export default CountTotal
