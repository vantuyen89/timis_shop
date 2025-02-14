import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import LayoutMessage from '@/pages/message/LayoutMessage'
import FooterV2 from '../FooterV2'

const LayoutWebsite = () => {
  return (
    <div className='relative '>
      <Header />
      <Outlet></Outlet>
      <FooterV2 />
      <LayoutMessage />
    </div>
  )
}

export default LayoutWebsite
