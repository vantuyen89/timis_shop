import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import bn1 from '../images/bn1.png'
import bn2 from '../images/bn2.png'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Banner from './Banner'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { IoIosHeartEmpty } from 'react-icons/io'
import Category from './Category'
import Sales from './Sales'
import ProductSalesHome from './product/ProductSalesHome'
import UserShare from './UserShare'
import SwiperProduct from '@/components/SwiperProduct'
import instance from '@/config/instance'

// init Swiper:

const Homepage = () => {
  const [products, setProducts] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const pageSize = 6
  useEffect(() => {
    (async () => {
      const { data } = await instance.post(`product/productFeatured`, { pageSize })
      console.log(data)
      setProducts(data.data)
      console.log(data)
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const { data } = await instance.post(`product/productPrice`, { pageSize })
      console.log(data)
      setProductPrice(data.data)
      console.log(data)
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
