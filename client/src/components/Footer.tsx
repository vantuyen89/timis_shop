
import logo from '../images/logofter.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTelegram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='bg-[#1d1d1d]'>
      <div className='container'>
        <div className='py-6 grid lg:grid-cols-4 grid-cols-2 gap-6'>
          <div className='flex flex-col gap-5 '>
            <Link to={'/'}>
              <img srcSet={logo + ' ' + `2x`} className='w-[100px]' />
            </Link>
            <p className='text-white lg:text-[16px] text-[14px] tracking-normal leading-5'>
              Cửa hàng thời trang uy tín nhất tại Việt Nam
            </p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>Hotline: 0326892004</p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>
              Email: vantuyenfpl@gmail.com
            </p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>
              Địa chỉ: Thạch Thất - Hà Nội
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <h5 className='text-[18px] text-white'>Bạn cần hỗ trợ</h5>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>
              Trợ Giúp Dịch Vụ Khách Hàng
            </p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>Trả Hàng & Hoàn Tiền</p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>Thanh toán</p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>Giao hàng</p>
            <p className='text-white lg:text-[14px] text-[10px] tracking-normal leading-5'>Hotline: 1900 6363</p>
          </div>
          <div className='flex flex-col gap-4'>
            <h5 className='lg:text-[18px] text-[14px] text-white'>Theo dõi chúng tôi trên</h5>

            <div className='flex flex-col gap-3'>
              <FaFacebook className='text-[25px] text-blue-400' />

              <FaInstagram className='text-[25px] text-white bg-instagram-gradient rounded-sm' />
              <FaYoutube className='text-[25px] text-red-400' />
            </div>
            <div className='flex flex-col gap-3'>
              <FaTiktok className='text-[25px] text-white' />
              <FaTelegram className='text-[25px] text-blue-400' />
              <FaTwitter className='text-[25px] text-blue-400' />
            </div>
          </div>
          <div>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29787.307325318317!2d105.59453225845917!3d21.056144208373333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134576b06c9c121%3A0x7e1c4b1b44288657!2zQ2FuaCBO4bqtdSwgVGjhuqFjaCBUaOG6pXQsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1719074579366!5m2!1svi!2s'
              // width='300'
              // height='300'
              className='lg:w-[300px] w-[130px] lg:h-[300px] h-[150px] px-2'
              // allowfullscreen=''
              loading='lazy'
              // referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
        <hr />
        <div className='text-center'>
          <p className='text-white py-4 font-normal'>©Timis All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
