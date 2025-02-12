import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getAllProducts } from '@/services/product'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { getProductComingById, postProductComing, updateProductComing } from '@/services/productcomings'
import { IProductComingPost } from '@/interfaces/IProduct'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const formSchema = z.object({
  id: z.string().min(2, {
    message: 'Bắt buộc phải chọn'
  }),
  date: z.date({
    required_error: 'Chưa chọn ngày kết thúc'
  }),
  active: z.boolean().default(false).optional()
})
interface Props {
  open: boolean | string
  onClose: () => void
}
const AddProductComing = ({ open, onClose }: Props) => {
  console.log(open)

  const queryClient = useQueryClient()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [clN, setClN] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      date: undefined,
      active: false
    }
  })
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  useEffect(() => {
    if (typeof open === 'string') {
      ;(async () => {
        try {
          const { data } = await getProductComingById(open as string)
          const newDataReset = {
            id: data.data.productId._id,
            date: new Date(data.data.comingDate),
            active: data.data.active
          }
          console.log(data)

          form.reset(newDataReset)
          setClN(data?.data?.productId?._id)
        } catch (error) {
          console.error('Error:', error)
        }
      })()
    }
  }, [open])
  const handlePostComing = async (data: IProductComingPost) => {
    try {
      await postProductComing(data)
      queryClient.invalidateQueries({
        queryKey: ['productComing']
      })
      toast.success('Bạn thêm sản phẩm thành công')
      onClose()
    } catch (error) {
      toast.error('Bạn thêm sản phẩm thất bại')
      console.log(error)
    }
  }
  const handleUpdateComing = async (id: string, data: IProductComingPost) => {
    try {
      await updateProductComing({ id, data })
      queryClient.invalidateQueries({
        queryKey: ['productComing']
      })
      toast.success('Bạn cập nhật sản phẩm thành công')
      onClose()
    } catch (error) {
      toast.error('Bạn cập nhật sản phẩm thất bại')
      console.log(error)
    }
  }
  const onSubmit = (data: any) => {
    const dataPost = { product: data?.id, date: data?.date, active: data?.active }
    if (typeof open === 'string') {
      handleUpdateComing(open, dataPost as any)
    } else {
      handlePostComing(dataPost as any)
    }
  }

  return (
    <Dialog open={!!open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[725px] max-h-[600px]'>
        <DialogHeader>
          <DialogTitle>{typeof open === 'string' ? 'Cập nhật' : 'Thêm'} sản phẩm chờ</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sản phẩm</FormLabel>
                  <FormControl>
                    <div className='h-[250px] overflow-auto border rounded-lg m-5'>
                      {loading ? (
                        <div className='p-4 text-center text-gray-500'>Loading products...</div>
                      ) : (
                        <div className='flex flex-col'>
                          {products.map((product: any, index) => (
                            <div
                              key={product._id || index}
                              className={cn(
                                'p-4 border-b hover:bg-orange-200  flex justify-between items-center cursor-pointer',
                                clN === product._id ? 'bg-orange-200' : ''
                              )}
                              onClick={() => {
                                field.onChange(product._id)
                                setClN(product._id)
                              }}
                            >
                              {product.name}
                              <img src={product?.thumbnail} alt='' className='w-10 h-12' />
                            </div>
                          ))}
                        </div>
                      )}

                      {!loading && products.length === 0 && (
                        <div className='p-4 text-center text-gray-500'>No products found</div>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between gap-4'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-5/6'>
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                            <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today || date < new Date('1900-01-01')
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='active'
                render={({ field }) => {
                  return (
                    <FormItem className='w-2/6'>
                      <FormLabel>
                        <div className='flex flex-row items-center h-10 px-2 mt-6 space-x-3 space-y-0 border rounded-sm cursor-pointer hover:bg-slate-100'>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div>Hoạt động</div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            </div>
            <Button type='submit'>{typeof open === 'string' ? 'Cập nhật' : 'Thêm'}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductComing
