import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ProductLoading from '@/pages/product/ProductLoading'
import { toast } from 'sonner'
import DialogOrderDetail from '@/components/DialogOrderDetail'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { postOrderAdmin, updateOrder } from '@/services/order'

interface typeMutate {
  id: string
  status: string
}
const OrderPending = () => {
  const query = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams({ status: 'pending' })
  const [idOpen, setIdOpen] = useState<boolean | string>(false)
  const paramsObject = Object.fromEntries(searchParams.entries())
  const {
    data: order,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ['orderPending', paramsObject],
    queryFn: async () => {
      const { data } = await postOrderAdmin(paramsObject)
      return data.data
    }
  })
  const { mutate } = useMutation({
    mutationFn: async ({ id, status }: typeMutate) => {
      try {
        await updateOrder({ id, status })
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      toast.success('Bạn đã xác nhận đơn hàng')
      query.invalidateQueries({ queryKey: ['orderPending'] })
    },
    onError: () => {
      toast.error('Xác nhận đơn hàng thất bại')
    }
  })
  const handleConfirm = (id: string) => {
    if (paramsObject.status === 'pending') {
      mutate({ id, status: 'confirm' })
    } else if (paramsObject.status === 'confirm') {
      mutate({ id, status: 'shipping' })
    }
  }
  let titleStatus: string
  if (paramsObject.status === 'pending') {
    titleStatus = 'Xác nhận'
  } else if (paramsObject.status === 'confirm') {
    titleStatus = 'Xác nhận Ship'
  }
  let titleConfirm: string
  if (paramsObject.status === 'pending') {
    titleConfirm = 'Danh sách đơn hàng cần xác nhận'
  } else if (paramsObject.status === 'confirm') {
    titleConfirm = 'Danh sách đơn hàng xác nhận'
  } else if (paramsObject.status === 'shipping') {
    titleConfirm = 'Danh sách đơn hàng đang giao hàng'
  } else if (paramsObject.status === 'delivered') {
    titleConfirm = 'Danh sách đơn hàng đã giao hàng thành công'
  } else {
    titleConfirm = 'Danh sách đơn hàng đã hủy'
  }
  const handleStatus = (value: string) => {
    switch (value) {
      case 'pending':
        searchParams.set('status', 'pending')
        setSearchParams(searchParams)
        query.invalidateQueries({ queryKey: ['orderPending'] })
        break
      case 'confirm':
        searchParams.set('status', 'confirm')
        setSearchParams(searchParams)
        query.invalidateQueries({ queryKey: ['orderPending'] })
        break
      case 'shipping':
        searchParams.set('status', 'shipping')
        setSearchParams(searchParams)
        query.invalidateQueries({ queryKey: ['orderPending'] })
        break
      case 'delivered':
        searchParams.set('status', 'delivered')
        setSearchParams(searchParams)
        query.invalidateQueries({ queryKey: ['orderPending'] })
        break
      case 'canceled':
        searchParams.set('status', 'cancelled')
        setSearchParams(searchParams)
        query.invalidateQueries({ queryKey: ['orderPending'] })
        break
      default:
        break
    }
  }
  if (isFetching)
    return (
      <div>
        <ProductLoading />
      </div>
    )
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <div>
      <div className='flex justify-between p-6'>
        <h4 className='text-xl font-semibold'>{titleConfirm}</h4>
        <Select onValueChange={(value) => handleStatus(value)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Đơn hàng' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Đơn hàng</SelectLabel>
              <SelectItem value='pending'>Đơn cần xác nhận</SelectItem>
              <SelectItem value='confirm'>Đơn xác nhận </SelectItem>
              <SelectItem value='shipping'>Đơn Ship</SelectItem>
              <SelectItem value='delivered'>Đơn giao</SelectItem>
              <SelectItem value='canceled'>Đơn Hủy</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>STT</TableHead>
            <TableHead>Mã Đơn hàng</TableHead>
            <TableHead>Thành tiền</TableHead>
            <TableHead>Thời gian đặt hàng</TableHead>
            <TableHead>
              {paramsObject.status === 'delivered' ||
              paramsObject.status === 'shipping' ||
              paramsObject.status === 'cancelled' ? (
                <></>
              ) : (
                <>Xác nhận</>
              )}
            </TableHead>
            <TableHead>Chi tiết</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.map((data: any, index: number) => {
            const parsedDate = parseISO(data.createdAt)
            const formattedDate = format(parsedDate, 'MM/dd/yyyy')
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.orderNumber}</TableCell>
                <TableCell>{(data.totalPrice * 1000).toLocaleString('vi-VN')}đ</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  {paramsObject.status === 'delivered' || paramsObject.status === 'canceled' ? (
                    <></>
                  ) : (
                    <Button className='bg-blue-400 hover:bg-blue-300' onClick={() => handleConfirm(data._id)}>
                      {titleStatus}
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => setIdOpen(data._id)}>Chi tiết đơn hàng</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {!!idOpen && <DialogOrderDetail open={idOpen} handleClose={() => setIdOpen(false)} />}
    </div>
  )
}

export default OrderPending
