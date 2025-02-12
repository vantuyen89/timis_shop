import { IProductComing } from '@/interfaces/IProduct'
import { getProductComing } from '@/services/productcomings'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
const PageFramer = () => {
  // const blobPath =
  const [dataComing, setDataComing] = useState<IProductComing>({} as IProductComing)
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)
  console.log(isExpired)

  //   'M85.5,11.5Q96,23,94.5,37.5Q93,52,83.5,62Q74,72,60,74.5Q46,77,33,70.5Q20,64,13,50Q6,36,11.5,23Q17,10,33,5.5Q49,1,63.5,7Q78,13,85.5,11.5Z'
  useEffect(() => {
    const fetchProductComing = async () => {
      try {
        const { data } = await getProductComing()
        setDataComing(data.data)
        const comingDate = new Date(data.data.comingDate).getTime()
        updateTimeLeft(comingDate)
        const timer = setInterval(() => {
          updateTimeLeft(comingDate)
        }, 1000)

        return () => clearInterval(timer)
      } catch (error) {
        console.log(error)
      }
    }

    const updateTimeLeft = (comingDate: number) => {
      const now = new Date().getTime()
      const diffTime = comingDate - now

      if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diffTime / (1000 * 60)) % 60)
        const seconds = Math.floor((diffTime / 1000) % 60)

        setTime({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
      }
    }

    fetchProductComing()
  }, [])
  return (
    <div className='flex items-center justify-between h-[500px] bg-white w-full p-0 m-0 '>
      <div className='flex flex-col gap-4'>
        <h3 className='uppercase'>Sản phẩm nổi bật</h3>
        <p className='font-semibold tracking-wider text-red-600 text-4xl'>{dataComing?.productId?.name}</p>
        <div className='flex items-center gap-5'>
          <p className='text-red-600 text-4xl'>
            {dataComing?.productId?.price * (dataComing?.productId?.discount / 100) * 1000}₫
          </p>
          <p className='text-gray-200 line-through text-xl'>{dataComing?.productId?.price * 1000}₫</p>
          <Button className='bg-red-600 hover:bg-red-500 p-[23px] '>Mua ngay</Button>
        </div>
        <p>Kết thúc vào</p>
        <div className='flex gap-9 gap-x-6'>
          <div className='flex flex-col items-center'>
            <p className='rounded-full bg-[#fee] w-20 h-20 text-center flex flex-col justify-center items-center text-2xl'>
              {time?.days}
            </p>
            <p>Ngày</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='rounded-full bg-[#fee] w-20 h-20 text-center flex flex-col justify-center items-center text-2xl'>
              {time?.hours}
            </p>
            <p>Giờ</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='rounded-full bg-[#fee] w-20 h-20 text-center flex flex-col justify-center items-center text-2xl'>
              {time?.minutes}
            </p>
            <p>Phút</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='rounded-full bg-[#fee] w-20 h-20 text-center flex flex-col justify-center items-center text-2xl'>
              {time?.seconds}
            </p>
            <p>Giây</p>
          </div>
        </div>
        {/* <p>{dataComing?.productId}</p> */}
      </div>
      <div className='relative w-[600px] h-[400px]'>
        <motion.div
          className='absolute inset-0'
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div
            className='w-full h-full'
            style={{
              background: 'linear-gradient(120deg, #e0f7f6 0%, #c8e6ff 100%)',
              borderRadius: '42% 56% 72% 28% / 42% 42% 56% 48%'
            }}
          />
        </motion.div>
        <div className='absolute inset-0 flex items-center justify-center z-0'>
          <img src={`${dataComing?.productId?.images[0].url}`} alt='Shirt' className='w-72 h-auto bg-transparent' />
        </div>
      </div>
    </div>
  )
}

export default PageFramer
