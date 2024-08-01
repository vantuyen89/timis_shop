import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { postSize } from '@/services/product'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Nhập tên là chuỗi lớn hơn 2'
  })
})
const SizeAdd = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })
  const navigate = useNavigate()
  const onSubmit = async (dataForm:any) => {
    try {
      await postSize(dataForm)
      toast.success("Bạn thêm size thành công")
      navigate('/admin/size')
      
    } catch (error) {
      toast.error("Bạn thêm sản phẩm thất bại")
    }
  }
  return (
    <div className='p-9'>
      <h3 className='text-[25px] font-semibold'>Thêm Size</h3>
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
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default SizeAdd