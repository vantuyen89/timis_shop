import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { registerAuth } from '@/services/auth'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Bắt buộc phải nhập tên'
  }),
  email: z
    .string()
    .min(1, {
      message: 'Bắt buộc phải nhập email'
    })
    .email({
      message: 'Email không đúng đinh dạng'
    }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  }),
  confirmPassword: z
    .string({
      required_error: 'Required'
    })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
})

export function Register() {
  const [checkPass, setCheckPass] = useState(false)
  const [checkPassConfim, setCheckPassConfim] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('xác nhận mật khẩu không khớp')
      return
    }
    console.log(data)
    const dataRegister = {
      username: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }

    try {
      const user = await registerAuth(dataRegister)
      toast.success('Đăng ký thành công!')
      navigate('/auth/signin')
    } catch (error) {
      toast.error('Bạn đăng ký thất bại')
    }
  }
  return (
    <div className='relative'>
      <Button className='absolute -top-[80px] left-9 flex gap-2'>
        <FaArrowLeft />
        <Link to={'/'}> Quay lại</Link>
      </Button>
      <div className='flex flex-col justify-center border rounded-2xl w-[400px] h-[500px] items-center mx-auto  bg-white bg-opacity-10 border-opacity-5'>
        <h5 className='font-bold text-[30px]'>Đăng ký</h5>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full px-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Tên người dùng</FormLabel>
                  <FormControl>
                    <Input placeholder='Tên người dùng' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input placeholder='Mật khẩu' {...field} type={checkPass ? 'text' : 'password'} />
                    </FormControl>
                    {checkPass ? (
                      <FaRegEyeSlash
                        onClick={() => setCheckPass((prev) => !prev)}
                        size={18}
                        className='absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer'
                      />
                    ) : (
                      <FaRegEye
                        onClick={() => setCheckPass((prev) => !prev)}
                        size={18}
                        className='absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer'
                      />
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input placeholder='Xác nhận mật khẩu' {...field} type={checkPassConfim ? 'text' : 'password'} />
                    </FormControl>
                    {checkPassConfim ? (
                      <FaRegEyeSlash
                        onClick={() => setCheckPassConfim((prev) => !prev)}
                        size={18}
                        className='absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer'
                      />
                    ) : (
                      <FaRegEye
                        onClick={() => setCheckPassConfim((prev) => !prev)}
                        size={18}
                        className='absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer'
                      />
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full my-3 bg-gradient-to-r from-purple-600 to-fuchsia-600'>
              Submit
            </Button>
          </form>
          <FormDescription className='text-neutral-900 text-base'>
            <span>Bạn đã có tài khoản?</span>
            <Link to={'/auth/signin'} className='text-neutral-900 text-base font-semibold'>
              Đăng nhập
            </Link>
          </FormDescription>
        </Form>
      </div>
    </div>
  )
}
