import  { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getCartAllUser, getCartByUserId } from '@/services/cart'
import { reduce } from 'lodash'
import { ICity, ICommune, IDistrict } from '@/interfaces/Address'
import { callCity, callCommune, callDistrict } from '@/services/address'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { createOrder } from '@/services/order'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { fetApiCArt } from '@/store/slice/cartSlice'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
const Order = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    phone: z.string().min(2, {
      message: 'Phone must be at least 2 characters.'
    }),
    address: z.string({
      message: 'Bạn phải nhập địa chỉ'
    }),
    city: z.string({
      message: 'Bạn phải nhập tỉnh/thành phố'
    }),
    district: z.string({
      message: 'Bạn phải nhập quận/huyện'
    }),
    commune: z.string({
      message: 'Bạn phải nhập xã/phường'
    })
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const query = useQueryClient()
  const onSubmit =async (data: any) => {
    const orderItem = cartUser.map((order: any) => {
      return {
        productName: order?.productId?.name,
        price: order?.productId?.price,
        quantity: order?.quantity,
        image: order?.productId?.thumbnail,
        color: order?.color?._id,
        size: order?.size?._id
      }
    })
    if (orderItem.length === 0) {
      toast.error('Chưa có sản phẩm nào trong giỏ hàng')
      return
      
    }
    const cityName = city?.find((city) => city.idProvince === data.city)
    const districtName = district?.find((district) => district.idDistrict === data.district)
    const communeName = commune?.find((commune) => commune.idCommune === data.commune)
    const customInfor = {
      name: data.username,
      phone:data.phone,
      address: data.address,
      city: cityName?.name,
      district: districtName?.name,
      commune: communeName?.name,
      payment: paymentMethod
    }
    const dataOrder = { items: orderItem, customInfor: customInfor, totalPrice: (Number(priceSale) + caculatorTotal()) }
    try {
      await createOrder(dataOrder)
      toast.success('Đặt hàng thành công!')
      const data = await getCartByUserId()
      dispatch(fetApiCArt(data))
      query.invalidateQueries({
        queryKey: ['productCart', 1]
      })
      navigate('/order/success')
      return 
    } catch (error) {
      toast.error('Đặt hàng thất bại!')
    }
  }

  const [cartUser, setCartUser] = useState([])
  const [city, setCity] = useState<ICity[] | null>(null)
  const [district, setDistrict] = useState<IDistrict[] | null>(null)
  const [commune, setCommune] = useState<ICommune[] | null >(null)
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng')
  let priceSale: any
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getCartAllUser()
        setCartUser(data?.items)
        priceSale
        return data.items
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      const { data } = await callCity()
      setCity(data)
    })()
  }, [])
  if (cartUser.length > 0 && cartUser.length < 3) {
    priceSale = (30000).toLocaleString('vi-VN')
  } else if (cartUser.length >= 3 && cartUser.length <= 8) {
    priceSale = (15000).toLocaleString('vi-VN')
  } else if (cartUser.length > 8) {
    priceSale = (0).toLocaleString('vi-VN')
  }
  const caculatorTotal = () => {
    if (!cartUser) return 0
    return reduce(cartUser, (total, product: any) => total + product?.productId?.price * product.quantity, 0)
  }
  let totalPrice: any = ((Number(priceSale) + caculatorTotal()) * 1000).toLocaleString('vi-VN')

  const handleOnChangeCity = async (idProvince: string) => {
    try {
      const { data } = await callDistrict(idProvince)
      setDistrict(data)
    } catch (error: any) {
      toast.error(error.response!.data!.message)
    }
  }

  const handleOnChangeDistrict = async (idDistrict: string) => {
    try {
      const { data } = await callCommune(idDistrict)
      setCommune(data)
    } catch (error: any) {
      toast.error(error.response!.data!.message)
    }
  }
  const location = useLocation()
  const crumbs = generateBreadcrumbs(location.pathname)
  return (
    <div className='container'>
      <div className='flex py-4 gap-2'>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className='grid grid-cols-1'>
        <div className='col-span-1 pb-5'>
          <h3 className='text-center text-2xl py-8 font-bold'>Đơn hàng của bạn</h3>
          <div className='w-full'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='flex flex-col w-full gap-5'>
                  <h3 className='text-lg text-[#595959] font-semibold'>Thông tin người nhận</h3>
                  <div className='flex w-full gap-5 justify-between'>
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem className='w-[50%]'>
                          <FormLabel>Tên người nhận</FormLabel>
                          <FormControl>
                            <Input placeholder='Tên người nhận' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem className='w-[50%]'>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder='Số điện thoại' {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className='flex flex-col w-full gap-5'>
                  <h3 className='text-lg text-[#595959] font-semibold'>Địa chỉ người nhận</h3>
                  <div className='flex w-full gap-5 justify-between'>
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem className='w-[33%]'>
                          <FormLabel>Thành phố</FormLabel>
                          <Select
                            onValueChange={(e) => {
                              setDistrict(null)
                              setCommune(null)
                              form.setValue('district', null as any)
                              form.setValue('commune',( null as any))
                              handleOnChangeCity(e)

                              field.onChange(e)
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Lựa chọn thành phố' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {city?.map((city: any) => {
                                return (
                                  <SelectItem value={city.idProvince} className='' key={city.idProvince}>
                                    <p>{city.name}</p>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='district'
                      render={({ field }) => (
                        <FormItem className='w-[33%]'>
                          <FormLabel>Quận , Huyện</FormLabel>
                          <Select
                            onValueChange={(e) => {
                              field.onChange(e)
                              console.log('e2', e)

                              setCommune(null)
                              handleOnChangeDistrict(e)
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Lựa chọn quận , huyện' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {district?.map((district: any) => {
                                return (
                                  <SelectItem value={district.idDistrict} className='' key={district.idDistrict}>
                                    {district.name}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='commune'
                      render={({ field }) => (
                        <FormItem className='w-[33%]'>
                          <FormLabel>Xã , Phường</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Lựa chọn xã , phường' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {commune?.map((commune: any) => {
                                return (
                                  <SelectItem value={commune.idCommune} className='' key={commune.idCommune}>
                                    {commune.name}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem className=''>
                        <FormLabel>Địa chỉ chi tiết</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder='Địa chỉ chi tiết ...' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full'>
                  <h3 className='text-lg text-[#595959] font-semibold pb-6'>Sản phẩm</h3>
                  <table className='w-full text-center'>
                    <thead className=''>
                      <tr>
                        <th className='text-left lg:text-base text-sm'>Sản phẩm</th>
                        <th className='lg:text-base text-sm'>Giá</th>
                        <th className='lg:text-base text-sm'>Số lượng</th>
                        <th className='lg:text-base text-sm'>Thành tiền</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartUser.map((item: any, index) => (
                        <tr key={index}>
                          <td className='py-3'>
                            <div className='flex lg:flex-row flex-col gap-3 items-center'>
                              <img
                                src={item.productId.thumbnail}
                                alt=''
                                className='lg:w-[55px] lg:h-[80px] w-[40px] h-[65px]'
                              />
                              <div className='flex flex-col'>
                                <span className='lg:text-sm text-xs'>{item.productId?.name}</span>
                                <span className='lg:text-sm text-xs'>
                                  {item.color.name},{item.size.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='lg:text-sm text-xs'>
                            {(item.productId?.price * 1000).toLocaleString('vi-VN')}đ
                          </td>
                          <td className='lg:text-sm text-xs'>{item.quantity}</td>
                          <td className='lg:text-sm text-xs'>
                            {(item.productId?.price * item.quantity * 1000).toLocaleString('vi-VN')}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='pt-5 '>
                    <h3 className='text-lg text-[#595959] font-semibold pb-6'>Phương thức thanh toán</h3>
                    <div className='flex gap-2'>
                      <Label
                        htmlFor={'paymentMethod1'}
                        className={cn(
                          `relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`
                        )}
                      >
                        <input
                          className='peer'
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          type='radio'
                          hidden
                          name='choose-size'
                          id='paymentMethod1'
                          value='paymentMethod1'
                          checked={paymentMethod === 'Thanh toán khi nhận hàng'}
                        />
                        <span className='capitalize'>Thanh toán khi nhận hàng</span>
                      </Label>
                      <Label
                        htmlFor={'paymentMethod2'}
                        className={cn(
                          `relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`
                        )}
                      >
                        <input
                          className='peer'
                          hidden
                          type='radio'
                          name='paymentMethod'
                          id='paymentMethod2'
                          value='paymentMethod2'
                          checked={paymentMethod === 'VNPAY'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className='capitalize'>Thanh toán VNPAY</span>
                      </Label>
                    </div>
                  </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-between'>
                  <h3 className='text-lg text-[#595959] font-semibold pb-6'>Chi tiết thanh toán</h3>
                  <div className='lg:w-[400px] w-full border rounded-3xl flex flex-col p-5 gap-7 mt-9'>
                    <h3 className='text-[20px] font-medium'>Thông tin chi tiết</h3>
                    <div className='flex justify-between'>
                      <span className='text-[#9D9EA2] text-[14px]'>Tổng tiền</span>
                      <span className='text-[14px]'>
                        {((caculatorTotal() as number) * 1000).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#9D9EA2] text-[14px]'>Phí vận chuyển</span>
                      <span className='text-[14px]'>{priceSale}đ</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#9D9EA2] text-[14px]'>Thanh toán</span>
                      <span className='text-[14px]'>{totalPrice}đ</span>
                    </div>
                    <Button type='submit' className='bg-[#000] h-[60px] text-white'>
                      Mua hàng
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className='row-span-2'></div>
      </div>
    </div>
  )
}

export default Order
