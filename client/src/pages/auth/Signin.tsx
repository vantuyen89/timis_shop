





import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Email'
  })
})

export function Signin() {
  const [checkPass, setCheckPass] = useState(false)
  const form = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className='relative'>
      <Button className='absolute -top-[80px] left-9 flex gap-2'>
        <FaArrowLeft />
        <Link to={'/'}> Quay lại</Link>
      </Button>
      <div className='flex flex-col justify-center border rounded-2xl w-[400px] h-[500px] items-center mx-auto  bg-white bg-opacity-10 border-opacity-5'>
        <h5 className='font-bold text-[30px]'>Đăng nhập</h5>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full px-5'>
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
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input placeholder='Password' {...field} type={checkPass ? 'text' : 'password'} />
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
            <Button type='submit' className='w-full my-3 bg-gradient-to-r from-purple-600 to-fuchsia-600'>
              Submit
            </Button>
          </form>
          <FormDescription className='text-white text-base'>
            Bạn chưa tài khoản?{' '}
            <Link to={'/auth/register'} className='text-neutral-900 text-base font-semibold'>
              Đăng ký
            </Link>
          </FormDescription>
        </Form>
      </div>
    </div>
  )
}

