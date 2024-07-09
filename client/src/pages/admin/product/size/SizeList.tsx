import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import instance from '@/config/instance'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

const SizeList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`size/getAllSize`)
      setData(data)
    })()
  }, [])
  return (
    <div>
      <div className='flex justify-between p-6'>
        <h4>Danh sách Size</h4>
        <Button>
          <Link to={'/admin/sizeAdd'}>Thêm Size</Link>
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
            <TableHead>Thời gian tạo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data: any, index: number) => {
            console.log(data);
            
            const parsedDate = parseISO(data.createdAt)
            const formattedDate = format(parsedDate, 'MM/dd/yyyy')
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>Sửa</button>
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

export default SizeList
