import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import instance from '@/config/instance'
import { Checkbox } from '@/components/ui/checkbox'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { uploadFileCloudinary } from '@/lib/utils'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router-dom'
import { postProduct } from '@/services/product'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Bạn phải nhập tên sản phẩm'
  }),
  price: z.number().min(1, 'Phải lớn hơn 0'),
  quantity: z.number().min(1, 'Phải lớn hơn 0'),
  description: z.string().min(1, {
    message: 'Bạn phải nhập mô tả cho sản phẩm'
  }),
  countInstock: z.number().min(1, 'Phải lớn hơn 0'),
  discount: z.number().min(1, 'Phải lớn hơn 0'),
  category: z.string().nonempty('Mời bạn chọn Category'),
  variants: z.array(
    z.object({
      color: z.string().nonempty('Mời bạn chọn color'),
      size: z.string().nonempty('Mời bạn chọn size'),
      priceVar: z.number().min(1, 'Phải lớn hơn 0')
    })
  ),
  featured: z.boolean()
})

const ProductAdd = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await instance.get('category/getAll')
        setCategory(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const [size, setSize] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await instance.get('size/getAllSize')
        setSize(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const [color, setColor] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await instance.get('color/getAllColor')
        setColor(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variants: [{ size: '', color: '', priceVar: 0 }],
      category: '',
      name: '',
      price: 0,
      discount: 0,
      featured: false,
      countInstock: 0,
      description: '',
      quantity: 0,
    }
  })
  const control = form.control
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants'
  })
  const [img, setImg] = useState<any>()
  const [thumbnail, setThumbnail] = useState<any>('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imagePreviewArray, setImagePreviewArray] = useState([])
  const handleFileChange = (event:any) => {
    const file = event.target.files[0]
    setThumbnail(file)
    const reader : any = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const handleFileChangeArray = (event: any) => {
    const files = Array.from(event.target.files)
    setImg(files)

    const previews:any[] = files.map((file: any) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result)
        }
      })
    })
    Promise.all(previews).then((previews:any) => {
      setImagePreviewArray(previews)
    })
  }
  // console.log(img)
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    if (thumbnail === '') {
      toast.error('Vui lòng chọn ảnh thumbnail')
      return
    }
    if (img === undefined) {
      toast.error('Vui lòng chọn ảnh sản phẩm')
      return
    }
    const dataThumbnail = await uploadFileCloudinary(thumbnail)
    let arr: any = []
    for (let i = 0; i < img.length; i++) {
      const dataImg = await uploadFileCloudinary(img[i])
      arr.push(dataImg)
    }
    const dataProduct = {
      name: data.name,
      price: data.price,
      countInstock: data.countInstock,
      discount: data.discount,
      featured: data.featured,
      images: arr,
      thumbnail: dataThumbnail,
      category: data.category,
      variants: data.variants,
      description: data.description,
      quantity: data.quantity,
    }
    console.log(dataProduct)
    
    try {
      await postProduct(dataProduct)
      toast.success('Thêm sản phẩm thành công!')
      navigate('/admin/product')
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại!')
    }
  }

  return (
    <div className='p-9'>
      <h3 className='text-[25px] font-semibold'>Thêm sản phẩm</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex w-full gap-4'>
            <div className='w-[50%] flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder='Tên' {...field} className='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Giá sản phẩm'
                        type='number'
                        {...field}
                        className=''
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Số lượng'
                        type='number'
                        {...field}
                        className=''
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Giảm giá'
                        type='number'
                        {...field}
                        className=''
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='featured'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mt-5'>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Featured</FormLabel>
                    </div>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='w-[50%] flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='countInstock'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng sản phẩm còn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Số lượng sản phẩm'
                        type='number'
                        {...field}
                        className=''
                        onChange={(event) => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : ''}>
                        <FormLabel>Danh mục</FormLabel>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Lựa chọn danh mục' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Lựa chọn danh mục</SelectLabel>
                            {category.map((category: any) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Array Ảnh sản phẩm</FormLabel>
              <Input
                placeholder='Ảnh'
                type='file'
                className=''
                multiple={true}
                onChange={(e) => handleFileChangeArray(e)}
              />
              {imagePreviewArray && (
                <div className='flex flex-wrap gap-4'>
                  {imagePreviewArray.map((image: any) => (
                    <img key={image} src={image} alt='Image Preview' style={{ width: '80px', height: '80px' }} />
                  ))}
                </div>
              )}
              <FormLabel>Ảnh sản phẩm</FormLabel>
              <Input placeholder='Ảnh' type='file' className='' multiple={true} onChange={(e) => handleFileChange(e)} />
              {imagePreview && <img src={imagePreview} alt='Image Preview' style={{ width: '80px', height: '80px' }} />}
            </div>
          </div>
          <FormField
            name='description'
            control={control}
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Type your message here.' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h3 className='text-[14px]'>Thêm Variant</h3>
          <div className='flex flex-col w-full border p-9 gap-5 rounded-lg items-center'>
            <ul className='flex w-full flex-col justify-between gap-4'>
              {fields.map((item, index) => (
                <li key={item.id} className='flex  w-full justify-between gap-4'>
                  <FormField
                    control={control}
                    name={`variants.${index}.size`}
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : ''}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Lựa chọn Size' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Lựa chọn Size</SelectLabel>
                                {size.map((category: any) => (
                                  <SelectItem key={category._id} value={category._id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex flex-col w-full gap-2'>
                    <FormField
                      name={`variants.${index}.color`}
                      control={control}
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col'>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : ''}>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Lựa chọn color' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Lựa chọn Color</SelectLabel>
                                  {color.map((category: any) => (
                                    <SelectItem key={category._id} value={category._id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name={`variants.${index}.priceVar`}
                    control={control}
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Giá'
                            type='number'
                            {...field}
                            className=''
                            onChange={(event) => field.onChange(+event.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 ? (
                    <button type='button' onClick={() => remove(index)}>
                      <CiCircleMinus size={25} />
                    </button>
                  ) : (
                    <button type='button' onClick={() => remove(index)} disabled className='opacity-10 '>
                      <CiCircleMinus size={25} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button type='button' onClick={() => append({ size: '', color: '', priceVar: 0 })}>
              <CiCirclePlus size={25} />
            </button>
          </div>
          <Button type='submit'>Thêm sản phẩm</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductAdd
