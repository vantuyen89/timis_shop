import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { getAllCategory } from '@/services/category'

const CategoryList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data } = await getAllCategory()
      setData(data)
    })()
  }, [])
  return (
    <div>
      <div className='flex justify-between p-6'>
        <h4>Danh sách Category</h4>
        <Button>
          <Link to={'/admin/categoryAdd'}>Thêm Category</Link>
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
            <TableHead>Description</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Thời gian tạo</TableHead>
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
                  <img src={data.imageUrl} alt={data.name} className='w-[90px] h-[90px] ' />
                </TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.slug}</TableCell>
                <TableCell>{formattedDate}</TableCell>

                <TableCell>
                  <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                    <Link to={`/admin/categoryUpdate/${data._id}`}>Cập nhật</Link>
                  </button>
                  <button className='text-white bg-red-500 px-4 py-2 rounded-md ml-4'>Ẩn</button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoryList
