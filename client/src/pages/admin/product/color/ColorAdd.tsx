import { Button } from '@/components/ui/button'
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '@/config/instance'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nhập tên là chuỗi lớn hơn 2'
  }),
  code: z.string().min(6, {
    message: 'Nhập mã color'
  }).max(6, {
    message: 'Mã color phải có 6 ký tự'
  })
})
const ColorAdd = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: ''
    }
  })
  const navigate = useNavigate()
  const onSubmit = async (dataForm: any) => {
    try {
      const { data } = await instance.post(`color/addColor`, dataForm)
      toast.success('Bạn thêm color thành công')
      navigate('/admin/color')
    } catch (error) {
      toast.error('Bạn thêm color thất bại')
    }
  }
  return (
    <div className='p-9'>
      <h3 className='text-[25px] font-semibold'>Thêm Color</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder='Tên color' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên color Code</FormLabel>
                <FormControl>
                  <Input placeholder='Tên color code' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ColorAdd
