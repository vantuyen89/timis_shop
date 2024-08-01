
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import LayoutMessage from '@/pages/message/LayoutMessage'


const LayoutWebsite = () => {
  return (
    <div className='relative '>
      <Header />
      <Outlet></Outlet>
      <Footer />
      <LayoutMessage/>
    </div>
  )
}

export default LayoutWebsite
