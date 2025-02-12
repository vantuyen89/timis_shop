import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import instance from '@/config/instance'
import { cn, uploadFileCloudinary } from '@/lib/utils'
import { getProductById, updateProduct } from '@/services/product'
import { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiOutlineCloudUpload, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import ImageUploading from 'react-images-uploading'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

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
  thumbnail: z.string().refine(
    (data) => {
      return !!data
    },
    { message: 'Nhập ảnh sản phẩm' }
  ),
  images: z
    .array(
      z.object({
        url: z.string(),
        file: z.instanceof(File).optional()
      })
    )
    .refine(
      (data) => {
        return data.length !== 0
      },
      { message: 'Nhập ảnh khác' }
    ),
  featured: z.boolean()
})

const ProductUpdate = () => {
  const [previewUrl, setPreviewUrl] = useState({
    isLoading: false,
    url: ''
  })
  const [images, setImages] = useState([])
  const maxNumber = 69
  const { id } = useParams()

  const [category, setCategory] = useState([])
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
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
      thumbnail: '',
      images: []
    }
  })
  const control = form.control
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants'
  })
  useEffect(() => {
    ;(async () => {
      const { data } = await getProductById(id as string)
      console.log(data)
      const formattedData = data.variants.map((variant: any) => ({
        size: variant.size._id,
        color: variant.color._id,
        priceVar: variant.price
      }))
      form.reset({ ...data, category: data.category._id, variants: formattedData, images: data.images })
      setPreviewUrl({
        isLoading: false,
        url: data.thumbnail
      })
      setImages(data.images)
    })()
  }, [id])
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    const listNotFile = data.images.filter((image: any) => !image.file)
    const listFile = data.images.filter((image: any) => image.file)
    let arr: any = []
    if (listFile.length > 0) {
      for (let i = 0; i < listFile.length; i++) {
        const dataImg = await uploadFileCloudinary(listFile[i]?.url)
        arr.push(dataImg)
      }
    }
    const arrImg = arr.map((arr: any) => ({
      url: arr
    }))

    const imgArr = [...listNotFile, ...arrImg]
    const dataProduct = {
      name: data.name,
      price: data.price,
      countInstock: data.countInstock,
      discount: data.discount,
      featured: data.featured,
      images: imgArr,
      thumbnail: data.thumbnail,
      category: data.category,
      variants: data.variants,
      description: data.description,
      quantity: data.quantity
    }
    console.log(dataProduct)

    try {
      await updateProduct({ id, dataProduct })
      toast.success('Cập nhật sản phẩm thành công!')
      navigate('/admin/product')
    } catch (error) {
      toast.error('Cập nhật sản phẩm thất bại!')
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormLabel>Danh mục</FormLabel>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Lựa chọn danh mục' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Lựa chọn danh mục</SelectLabel>
                            {category?.map((category: any) => (
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
              <FormField
                control={form.control}
                name='thumbnail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh sản phẩm</FormLabel>
                    <FormControl>
                      <div className='w-full bg-white border rounded-sm'>
                        <label htmlFor='file-upload' className={cn('w-full relative ')}>
                          <div className='relative w-full bg-white '>
                            <div
                              className={cn(
                                'w-full h-[160px] flex justify-center items-center flex-col',
                                previewUrl?.url && 'hidden'
                              )}
                            >
                              <AiOutlineCloudUpload size={50} strokeWidth={1} />
                              <h3 className='mt-2 text-sm font-medium text-gray-900'>
                                <span>Chọn ảnh</span>
                              </h3>
                              <p className='mt-1 text-xs text-gray-500'>PNG, JPG, GIF.</p>
                            </div>

                            <div
                              className={cn(
                                ' relative flex justify-center items-center h-[160px]',
                                previewUrl?.url ? '' : 'hidden'
                              )}
                            >
                              <img
                                src={previewUrl?.url}
                                className={cn('size-[140px] object-cover border border-slate-100')}
                                id='preview'
                              />
                              {previewUrl?.isLoading && (
                                <div className='absolute inset-0 flex items-center justify-center w-full bg-slate-50/50'>
                                  <AiOutlineLoading3Quarters
                                    size={20}
                                    strokeWidth='4px'
                                    className='w-full animate-spin '
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </label>

                        <input
                          type='file'
                          name=''
                          id='file-upload'
                          accept='image/jpeg, image/png,image/svg,image/jpg,image/webp'
                          onChange={(event) =>
                            field.onChange(async () => {
                              setPreviewUrl({
                                url: URL.createObjectURL((event?.target as HTMLInputElement)?.files?.[0] as File),
                                isLoading: true
                              })
                              form.clearErrors('thumbnail')
                              const url = await uploadFileCloudinary(
                                (event?.target as HTMLInputElement)?.files?.[0] as File
                              )
                              field.onChange(url)
                              setPreviewUrl({
                                url: url,
                                isLoading: false
                              })
                            })
                          }
                          hidden
                          className='hidden outline-none focus-visible:ring-0 '
                        />
                      </div>
                    </FormControl>

                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh khác</FormLabel>
                    <FormControl>
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={async (imageList: any) => {
                          setImages(imageList)
                          field.onChange(imageList)
                          if (imageList.length > 0) form.clearErrors('images')
                        }}
                        maxNumber={maxNumber}
                        dataURLKey='url'
                      >
                        {({
                          imageList,
                          onImageUpload,

                          onImageUpdate,
                          onImageRemove,

                          dragProps
                        }) => (
                          // write your building UI
                          <div className={cn('w-full relative h-[160px]   grid grid-cols-4 grid-rows-2 gap-1 p-1 ')}>
                            {imageList?.map((image: any, index: number) => {
                              console.log(image)

                              return (
                                <div className='col-span-1 row-span-1' key={index}>
                                  <div
                                    // key={index}
                                    className='relative flex items-center justify-center w-full h-full border rounded '
                                  >
                                    <img
                                      src={image?.url}
                                      alt=''
                                      onClick={() => onImageUpdate(index)}
                                      className='cursor-pointer h-[90%] object-cover 	'
                                    />
                                    <AiFillCloseCircle
                                      className='absolute right-0 cursor-pointer top-2 right'
                                      size={20}
                                      onClick={() => onImageRemove(index)}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                            <button
                              type='button'
                              onClick={onImageUpload}
                              {...dragProps}
                              className={cn(
                                'col-span-1 row-span-1 relative w-full h-full border rounded flex justify-center items-center',
                                images.length === maxNumber && 'hidden'
                              )}
                            >
                              <AiOutlineCloudUpload size={50} strokeWidth={1} />
                            </button>
                          </div>
                        )}
                      </ImageUploading>
                    </FormControl>
                  </FormItem>
                )}
              />
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
              {fields?.map((item, index) => (
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
                                {size?.map((category: any) => (
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
                                  {color?.map((category: any) => (
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
          <Button type='submit'>cập nhật sản phẩm</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductUpdate
