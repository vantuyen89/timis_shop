import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import instance from '@/config/instance'
import CartEmpty from '../cart/CartEmpty'
import { Button } from '@/components/ui/button'
import DialogOrderDetail from '@/components/DialogOrderDetail'
import { toast } from 'sonner'
import DialogConfirm from '@/components/DialogConfirm'
import { searchOrder, updateOrder } from '@/services/order'

interface typeOrderUpdate {
  id: string | boolean
  status: string
}
const MyOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const menuItems = [
    { title: 'Chờ xác nhận', status: 'pending' },
    { title: 'Chờ lấy hàng', status: 'confirm' },
    { title: 'Đang giao hàng', status: 'shipping' },
    { title: 'Đã nhận', status: 'delivered' },
    { title: 'Đã hủy', status: 'cancelled' }
  ]
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams({ status: 'pending' })
  const [dataOrderStatus, setDataOrderStatus] = useState([])
  const paramsObject = Object.fromEntries(searchParams.entries())
  const [isOpen, setIsOpen] = useState<string | boolean>(false)
  const [idOpenReceive, setIdOpenReceive] = useState<boolean | string>(false)
  const [idOpen, setIdOpen] = useState<boolean | string>(false)
  useEffect(() => {
    handleTabChange()
  }, [searchParams])
  const handleTabChange = async () => {
    try {
      const { data } = await searchOrder(paramsObject)
      setDataOrderStatus(data.data)
    } catch (error: any) {
      console.log(error)
    }
  }
  const handleCancel = async ({ id, status }: typeOrderUpdate) => {
    try {
      const { data } = await updateOrder({id, status})
      toast.success('Bạn đã hủy đơn hàng thành công')
      handleTabChange()
      setIsOpen(false)
    } catch (error) {
      console.log(error)
      toast.error('Bạn hủy đơn hàng thất bại')
    }
  }
  const handleReceive = async ({ id, status }: typeOrderUpdate) => {
    try {
      const { data } = await updateOrder({ id, status })
      handleTabChange()
      setIdOpenReceive(false)
    } catch (error) {
      console.log(error)
      toast.error('Bạn nhận đơn hàng thất bại')
    }
  }
  const crumbs = generateBreadcrumbs(location.pathname)
  return (
    <>
      <div className='p-5 border rounded-3xl'>
        <ul className='flex space-x-4 lg:gap-[60px] gap-9 overflow-x-auto'>
          {menuItems.map((item: { title: string; status: string }, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveIndex(index)
                searchParams.set('status', `${item.status}`)
                setSearchParams(searchParams)
              }}
              className={`cursor-pointer py-2 ${activeIndex === index ? 'border-b-2 border-blue-500' : ''} lg:text-base text-sm`}
            >
              {item.title}
            </li>
          ))}
        </ul>
        {dataOrderStatus.length === 0 ? (
          <div>
            <CartEmpty title='Không có sản phẩm nào' />
          </div>
        ) : (
          <div className='max-h-[400px] overflow-y-auto '>
            {dataOrderStatus?.map((item: any, index) => (
              <div className='py-4 ' key={index}>
                <h3 onClick={() => setIdOpen(item._id)} className='cursor-pointer'>
                  Mã đơn hàng :{item.orderNumber}
                </h3>
                {item.items.map((product: any, index: number) => {
                  return (
                    <div>
                      <div className='flex justify-between py-6 items-center'>
                        <div className='flex gap-3'>
                          <img src={product.image} alt='' className='lg:w-[80px] lg:h-[100px] w-[55px] h-[75px]' />
                          <div className='flex flex-col'>
                            <p className='lg:text-lg text-sm w-[230px] truncate font-semibold'>{product.productName}</p>
                            <div className='flex text-sm font-light'>
                              <span>Phân loại hàng : </span>
                              <p className="lg:text-base text-sm">
                                {product.color.name},{product.size.name}
                              </p>
                            </div>
                            <span className='lg:text-sm text-xs font-light'>Số lượng : {product.quantity}</span>
                          </div>
                        </div>
                        <div>
                          <span className='lg:text-base text-sm'>{(product.price * 1000).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )
                })}
                <div className='flex justify-between py-3'>
                  <div>
                    {item.status === 'pending' ? (
                      <Button className='bg-[#e58231] hover:bg-[#dc975e]' onClick={() => setIsOpen(item._id)}>
                        Hủy
                      </Button>
                    ) : item.status === 'shipping' ? (
                      <Button className='bg-[#31e582] hover:bg-[#5edc97]' onClick={() => setIdOpenReceive(item._id)}>
                        Nhận hàng
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='py-4'>
                    <h3 className='font-semibold'>Tổng tiền : {(item.totalPrice * 1000).toLocaleString('vi-VN')}đ</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!!idOpen && <DialogOrderDetail open={idOpen} handleClose={() => setIdOpen(false)} />}
      {!!isOpen && (
        <DialogConfirm
          open={!!isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={() => handleCancel({ id: isOpen, status: 'cancelled' })}
          title='Bạn chắc chắn muốn hủy đơn hàng này?'
          status='Hủy'
        />
      )}
      {!!idOpenReceive && (
        <DialogConfirm
          open={!!idOpenReceive}
          onClose={() => setIdOpenReceive(false)}
          onSubmit={() => handleReceive({ id: idOpenReceive, status: 'delivered' })}
          title='Bạn đã nhận được đơn hàng này?'
          status='Nhận'
        />
      )}
    </>
  )
}

export default MyOrder
