
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='container'>
      <div className='flex flex-col justify-center items-center gap-5 py-11'>
        <IoIosCheckmarkCircleOutline size={80} className='text-green-500' />
        <h3 className='text-lg'>Đặt hàng thành công </h3>
        <p>Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất</p>
        <div className='flex gap-3 '>
          <Link to='/myinfor/myorder' className='border border-gray-200 font-light p-2 rounded-lg hover:bg-slate-100'>
            Xem lại đơn hàng
          </Link>
          <Link to='/shop' className='bg-[#36bd2a] text-white font-light p-2 hover:bg-[#479346] rounded-lg'>
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess