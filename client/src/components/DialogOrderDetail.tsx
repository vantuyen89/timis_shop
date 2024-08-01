
import {
  Dialog,
  DialogContent,

} from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import instance from '@/config/instance'
interface Props {
  open: boolean | string
  handleClose: () => void
}
const DialogOrderDetail = ({ open, handleClose }: Props) => {
  const {
    data: orderDetail,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['orderDetail'],
    queryFn: async () => {
      try {
        const response = await instance.post(`/order/orderDetail`, { orderId: open })
        return response.data.data
      } catch (error) {
        console.error(error)
      }
    }
  })
  console.log(orderDetail)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching order detail</div>
  return (
    <>
      <Dialog open={!!open} onOpenChange={handleClose}>
        <DialogContent className='sm:max-w-[800px] h-screen overflow-y-auto my-8'>
          <h3 className='text-center text-xl'>Chi tiết đơn hàng</h3>
          <div className='grid gap-4 py-4'>
            <h4>Mã đơn hàng : {orderDetail.orderNumber}</h4>
            <div className='flex gap-5'>
              <div className='border rounded-xl flex flex-col p-3 gap-2'>
                <h4>Tài khoản đặt hàng </h4>
                <p className='text-sm font-light'>Tên đăng nhập : {orderDetail.user.username}</p>
                <p className='text-sm font-light'>Email : {orderDetail.user.email}</p>
              </div>
              <div className='border rounded-xl flex flex-col p-3 gap-2'>
                <h4>Thông tin giao hàng</h4>
                <p className='text-sm font-light'>Tên người nhận : {orderDetail.customInfor.name}</p>
                <p className='text-sm font-light'>
                  Địa chỉ :{orderDetail.customInfor.commune}-{orderDetail.customInfor.district}-
                  {orderDetail.customInfor.city}
                </p>
                <p className='text-sm font-light'>Số điện thoại : {orderDetail.customInfor.phone}</p>
              </div>
            </div>
          </div>
          <hr />
          <div>
            {orderDetail.items.map((order: any) => {
              return (
                <>
                  <div className='flex justify-between py-6 items-center'>
                    <div className='flex gap-3'>
                      <img src={order.image} alt='' className='w-[80px] h-[100px]' />
                      <div className='flex flex-col'>
                        <p className='text-lg w-[230px] truncate font-semibold'>{order.orderName}</p>
                        <div className='flex text-sm font-light'>
                          <span>Phân loại hàng : </span>
                          <p>
                            {order.color.name},{order.size.name}
                          </p>
                        </div>
                        <span className='text-sm font-light'>Số lượng : {order.quantity}</span>
                      </div>
                    </div>
                    <div>
                      <span>{(order.price * 1000).toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                  <hr />
                </>
              )
            })}
          </div>
          <div className='flex justify-between pb-6'>
            <div></div>
            <div>
              <h4 className='font-semibold'>Tổng tiền : {(orderDetail.totalPrice * 1000).toLocaleString('vi-VN')}đ</h4>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogOrderDetail
