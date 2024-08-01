import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { parseISO, format } from 'date-fns'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { debounce } from 'lodash'
import DialogConfirm from '@/components/DialogConfirm'
import { toast } from 'sonner'
import { authPaging, banUser, unbanUser } from '@/services/auth'

export interface typeSearch {
  keyword: string
  tab: number
}
const AuthAdmin = () => {
  const [searchObject, setSearchObject] = useState({
    keyword: '',
    tab: 1
  })
  const debounced = debounce((inputValue: string) => {
    setSearchObject((prev) => ({
      ...prev,
      pageIndex: 1,
      keyword: inputValue
    }))
  }, 300)
  const [idBan, setIdBan] = useState<string | boolean>(false)
  const [idUnBan, setIdUnBan] = useState<string | boolean>(false)
  const [dataUser, setDataUser] = useState([])
  useEffect(() => {
    handlePagingUser()
  }, [searchObject])
  const handlePagingUser = async () => {
    try {
      const { data } = await authPaging(searchObject)
      console.log(data)
      setDataUser(data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleBanUser = async (id: string | boolean) => {
    try {
      const { data } = await banUser(id as string)
      console.log(data)
      handlePagingUser()
      setIdBan(false)
      toast.success('Đã cấm người dùng')
    } catch (error) {
      console.log(error)
      toast.error('Cấm người dùng thất bại')
    }
  }
  const handleUnbanUser = async (id: string | boolean) => {
    try {
      const { data } = await unbanUser(id as string)
      console.log(data)
      handlePagingUser()
      setIdUnBan(false)
      toast.success('Bỏ cấm người dùng thành công')
    } catch (error) {
      console.log(error)
      toast.error('Bỏ cấm người dùng thất bại')
    }
  }
  return (
    <div className='flex flex-col gap-5 px-4'>
      <div className='flex justify-between p-6'>
        <h4>Danh sách Người dùng</h4>
      </div>
      <Input
        placeholder='Tìm kiếm người dùng'
        className='w-[40%] md:text-base text-xs'
        onChange={(event) => (
          <Input
            placeholder='Tìm kiếm người dùng'
            className='w-[40%] md:text-base text-xs'
            onChange={(event) => debounced(event.target.value)}
          />
        )}
      />
      <Tabs value={`${searchObject.tab}`} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value='1'
            onClick={() => {
              setSearchObject((prev) => ({ ...prev, tab: 1 }))
            }}
          >
            Tài khoản
          </TabsTrigger>
          <TabsTrigger
            value='-1'
            onClick={() => {
              setSearchObject((prev) => ({ ...prev, tab: -1 }))
            }}
          >
            Tài khoản cấm
          </TabsTrigger>
        </TabsList>
      </Tabs>
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
            <TableHead>Email</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Thời gian tạo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataUser?.map((data: any, index: number) => {
            const parsedDate = parseISO(data.createdAt)
            const formattedDate = format(parsedDate, 'MM/dd/yyyy')

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <img src={data.avatar} alt={data.name} className='w-[60px] h-[60px] object-cover' />
                </TableCell>

                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <div className='flex'>
                    <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                      {data.block === true ? (
                        <div onClick={() => setIdUnBan(data._id)} className='bg-blue-500'>
                          Bỏ Cấm
                        </div>
                      ) : (
                        <div onClick={() => setIdBan(data._id)} className='bg-red-500'>
                          Cấm
                        </div>
                      )}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {!!idBan && (
        <DialogConfirm
          open={!!idBan}
          onClose={() => setIdBan(false)}
          onSubmit={() => handleBanUser(idBan)}
          status='Cấm'
          title='Bạn muốn cấm tài khoản này'
        />
      )}
      {!!idUnBan && (
        <DialogConfirm
          open={!!idUnBan}
          onClose={() => setIdUnBan(false)}
          onSubmit={() => handleUnbanUser(idUnBan)}
          status='Bỏ Cấm'
          title='Bạn muốn bỏ cấm tài khoản này'
        />
      )}
    </div>
  )
}

export default AuthAdmin
