import { useEffect, useState } from 'react'


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Banner from './Banner'

import Category from './Category'
import Sales from './Sales'

import UserShare from './UserShare'
import SwiperProduct from '@/components/SwiperProduct'
import { getProductPrice, productFeature } from '@/services/product'

// init Swiper:

const Homepage = () => {
  const [products, setProducts] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const pageSize = 6
  useEffect(() => {
    (async () => {
      const { data } = await productFeature(pageSize)
      setProducts(data.data)
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const { data } = await getProductPrice(pageSize)
      setProductPrice(data.data)
    })()
  }, [])
  return (
    <section className=''>
      <Banner />
      <Category />
      <div className='container'>
        <SwiperProduct products={products} title={'Sản phẩm mới'} />
        <Sales />
        <SwiperProduct products={productPrice} title={'Sản phẩm giá tốt'} />
        <UserShare />
      </div>
    </section>
  )
}

export default Homepage
