import { getAllComing } from '@/services/productcomings'
import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { IProductComing } from '@/interfaces/IProduct'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import AddProductComing from './AddProductComing'

const ProductComing = () => {
  const [open, setOpen] = useState<string | boolean>(false)
  const {
    data: productComing,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['productComing'],
    queryFn: async () => {
      try {
        const { data } = await getAllComing()
        return data
      } catch (error) {
        console.error('Error fetching product coming data:', error)
      }
    }
  })

  if (isError) return <div>Error</div>
  return (
    <div>
      <div className='flex justify-end'>
        <Button onClick={() => setOpen(true)} className='m-3 '>
          Thêm sản phẩm Sales
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>STT</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Ngày hết</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productComing?.data?.map((data: IProductComing, index: number) => {
            // console.log(data?.date)

            // const date = new Date(data?.date)
            const formattedDate = format(data?.comingDate, 'yyyy-MM-dd')

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.productId.name}</TableCell>
                <TableCell>
                  <img
                    src={data.productId.thumbnail}
                    alt={data.productId.name}
                    className='w-[60px] h-[60px] object-cover'
                  />
                </TableCell>
                <TableCell>
                  <div className={cn(data?.active ? 'bg-green-500' : 'bg-red-500', 'rounded-full w-3 h-3')}></div>
                </TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <HiOutlineDotsVertical />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className='flex'>
                        <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                          <div onClick={() => setOpen(data?._id)}>
                            Cập nhật
                          </div>
                        </button>
                        <button className='text-white bg-red-500 px-4 py-2 rounded-md ml-4'>Xóa</button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {!!open && <AddProductComing open={open} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default ProductComing
