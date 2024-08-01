import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '@/config/instance'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { uploadFileCloudinary } from '@/lib/utils'
import { postCategory } from '@/services/category'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nhập tên là chuỗi lớn hơn 2'
  }),
  description: z.string().min(1, {
    message: 'Bạn phải nhập mô tả cho danh mục'
  }),
  imageUrl: z.string()
})
const CategoryAdd = () => {
  const [img, setImg] = useState<any>('')
  const [imgUrl, setImgUrl] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl:''
    }
  })
   const [imagePreview, setImagePreview] = useState(null)
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setImg(file)
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const navigate = useNavigate()
  const onSubmit = async (dataForm: any) => {
    if (img === '') {
      toast.error('Vui lòng chọn ảnh danh mục')
      return
    }
    try {
      const dataImg = await uploadFileCloudinary(img)
      const dataCate = {
        name: dataForm.name,
        description: dataForm.description,
        imageUrl: dataImg
      }
      const { data } = await postCategory(dataCate)
      toast.success('Bạn thêm danh mục thành công')
      navigate('/admin/category')
    } catch (error) {
      toast.error('Bạn thêm danh mục thất bại')
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
                <FormLabel>Tên danh mục</FormLabel>
                <FormControl>
                  <Input placeholder='Tên color' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên color Code</FormLabel>
                <FormControl>
                  <Textarea placeholder='Type your description here.' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh Danh mục</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ảnh'
                    type='file'
                    {...field}
                    className=''
                    multiple={true}
                    onChange={(e) => handleFileChange(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreview && <img src={imagePreview} alt='Image Preview' style={{ width: '80px', height: '80px' }} />}

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CategoryAdd
