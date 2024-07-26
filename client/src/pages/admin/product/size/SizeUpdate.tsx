import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '@/config/instance'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Nhập tên là chuỗi lớn hơn 2'
  })
})
const SizeUpdate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`size/getSizeId/${id}`)
      console.log(data)
      form.reset(data)
    })()
  }, [id])
  const onSubmit = async (dataForm: any) => {
    try {
      const { data } = await instance.put(`size/updateSize/${id}`, dataForm)
      toast.success('Bạn cập nhật size thành công')
      navigate('/admin/size')
    } catch (error) {
      toast.error('Bạn cập nhật sản phẩm thất bại')
    }
  }
  return (
    <div className='p-9'>
      <h3 className='text-[25px] font-semibold'>Cập nhật Kích thước</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder='Tên size' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Cập nhật</Button>
        </form>
      </Form>
    </div>
  )
}

export default SizeUpdate
