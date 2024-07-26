import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import instance from '@/config/instance'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { parseISO, format } from 'date-fns'

const ProductList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data } = await instance.get(`product/getAllProducts`)
      setData(data)
    })()
  }, [])
  return (
    <div>
      <div className='flex justify-between p-6'>
        <h4>Danh sách sản phẩm</h4>
        <Button>
          <Link to={'/admin/productAdd'}>Thêm sản phẩm</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>STT</TableHead>
            <TableHead>
              <i>
                <b>Name</b>
              </i>
            </TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Thời gian tạo</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data: any, index: number) => {
            const parsedDate = parseISO(data.createdAt)
            const formattedDate = format(parsedDate, 'MM/dd/yyyy')
            
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  <img src={data.thumbnail} alt={data.name} className='w-[60px] h-[60px] object-cover' />
                </TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.category.name}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{data.discount}</TableCell>
                <TableCell>
                  <div className='flex'>
                    <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                      <Link to={`/admin/productUpdate/${data._id}`}>Cập nhật</Link>
                    </button>
                    <button className='text-white bg-red-500 px-4 py-2 rounded-md ml-4'>Xóa</button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductList
