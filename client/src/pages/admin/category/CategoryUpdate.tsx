import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '@/config/instance'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { uploadFileCloudinary } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nhập tên là chuỗi lớn hơn 2'
  }),
  description: z.string().min(1, {
    message: 'Bạn phải nhập mô tả cho danh mục'
  }),
  imageUrl: z.string()
})
const CategoryUpdate = () => {
  const [img, setImg] = useState<any>('')
  console.log(img);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: ''
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
  const { id } = useParams()
  useEffect(() => {
    ;(async () => {
      const { data } = await instance.get(`category/getCateById/${id}`)
      form.reset({
        name: data.name,
        description: data.description,
      })
      setImagePreview(data.imageUrl)
    })()
  }, [id])
  const onSubmit = async (dataForm: any) => {
    try {
      let dataImg
      if (imagePreview === '') {
        dataImg = await uploadFileCloudinary(img)
      } else {
        dataImg = imagePreview
      }
      const dataCate = {
        name: dataForm.name,
        description: dataForm.description,
        imageUrl: dataImg
      }
      
      const { data } = await instance.put(`category/updateCateById/${id}`, dataCate)
      toast.success('Bạn cập nhật danh mục thành công')
      navigate('/admin/category')
    } catch (error) {
      toast.error('Bạn cập nhật danh mục thất bại')
    }
  }
  return (
    <div className='p-9'>
      <h3 className='text-[25px] font-semibold'>Cập nhật danh mục</h3>
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
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder='Mô tả' {...field} />
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

          <Button type='submit'>Cập nhật</Button>
        </form>
      </Form>
    </div>
  )
}

export default CategoryUpdate
