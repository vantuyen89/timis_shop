import { useAuth } from '@/common/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { uploadFileCloudinary } from '@/lib/utils'
import { updateInformation } from '@/services/auth'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Bạn phải nhập tên'
  }),
  email: z.string().email({
    message: 'Sai định dạng email.'
  }),
  avatar: z.any()
})

const Information = () => {
  const { userAuth, setUserAuth } = useAuth()

  const [imagePreview, setImagePreview] = useState(userAuth?.avatar)
  const [img, setImg] = useState<any>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userAuth?.username,
      email: userAuth?.email
    }
  })

  useEffect(() => {
    form.reset({
      username: userAuth?.username,
      email: userAuth?.email
    })
  }, [userAuth, form])

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setImg(file)
    const reader: any = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const onSubmit = async (dataForm: any) => {
    try {
      let dataImg
      if (img === '') {
        dataImg = imagePreview
      } else {
        dataImg = await uploadFileCloudinary(img)
      }
      const dataCate = {
        username: dataForm.username,
        email: dataForm.email,
        avatar: dataImg
      }
      const { data } = await updateInformation(dataCate)
      setUserAuth?.(data.data)
      toast.success('Bạn sửa thông tin thành công')
    } catch (error) {
      toast.error('Bạn sửa thông tin thất bại')
    }
  }
  return (
    <div className='p-5 border rounded-3xl'>
      <h3 className='py-4'>Thông tin cá nhân</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ tên</FormLabel>
                <FormControl>
                  <Input placeholder='name' {...field} disabled={userAuth?.uid !== null} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email' {...field} type='email' disabled={userAuth?.uid !== null} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ảnh'
                    type='file'
                    {...field}
                    className=''
                    multiple={true}
                    onChange={(e) => handleFileChange(e)}
                    disabled={userAuth?.uid !== null}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Image Preview'
              style={{ width: '80px', height: '80px' }}
              className='rounded-full'
            />
          )}

          <Button type='submit'>Lưu</Button>
        </form>
      </Form>
    </div>
  )
}

export default Information
