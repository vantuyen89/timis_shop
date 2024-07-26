import React, { useEffect, useState, useTransition } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ReactSlider from 'react-slider'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Paginations from '@/components/Pagination'
import queryString from 'query-string'
import instance from '@/config/instance'
import { IProduct } from '@/interfaces/IProduct'
import ProductLoading from './product/ProductLoading'
import CartEmpty from './cart/CartEmpty'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'

const Shop = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [products, setProduct] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const location = useLocation()
  const crumbs = generateBreadcrumbs(location.pathname)
  const handleReset = () => {
    setSearchParams(new URLSearchParams({}))
    handlePaging()
  }
  useEffect(() => {
    handlePaging()
  }, [searchParams])
  const handlePaging = async () => {
    try {
      setIsLoading(true)
      const data = await instance.post(`/product/shop`, paramsObject)
      setProduct(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    ;(async () => {
      try {
        const data = await instance.get(`/color/getAllColor`)
        setColor(data.data)
      } catch (error) {}
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      try {
        const data = await instance.get(`/size/getAllSize`)

        setSize(data.data)
      } catch (error) {}
    })()
  }, [])
  const [maxPrice, setMaxPrice] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await instance.get(`product/productPriceMax`)
        setMaxPrice(data.data)
        return data.data
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const [values, setValues] = useState([0, maxPrice])
  const handleOnChangeSelect = (value: string) => {
    switch (value) {
      case 'reset':
        handleReset()
        setValues([0, maxPrice])
        break
      case '1':
        searchParams.set('sort', '1')
        setSearchParams(searchParams)
        break
      case '-1':
        searchParams.set('sort', '-1')
        setSearchParams(searchParams)
        break
      default:
        break
    }
  }

  if (isLoading) {
    return <ProductLoading />
  }
  return (
    <div className='container flex flex-col'>
      <Breadcrumb crumbs={ crumbs} />
      <div className='flex flex-col py-5 gap-3 border-b-2'>
        <h3 className='text-[32px] font-bold'>Man collection</h3>
        <p className='font-light w-[600px] leading-8'>
          We not only help you design exceptional products, but also make it easy for you to share your designs with
          more like-minded people.
        </p>
      </div>
      <div className='grid grid-cols-12'>
        {/* <Button onClick={() => handleParamsSearch()}>CLick</Button> */}
        <div className='col-span-3 pr-5 '>
          <div className='pt-9'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Màu sắc</AccordionTrigger>
                <AccordionContent>
                  <div className='list-color grid grid-cols-2 gap-3 items-center'>
                    {color?.map((item: any) => {
                      console.log(item._id)
                      return (
                        <Label
                          htmlFor={item._id}
                          key={item._id}
                          className={cn(
                            `color-item relative max-w-40 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`
                            // { item._id === searchParams.get('color')? 'has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d] ' : ' ' }
                          )}
                        >
                          <input
                            className='peer'
                            onChange={(event) => {
                              const color = event.target.value
                              searchParams.set('color', color)
                              setSearchParams(searchParams)
                            }}
                            type='radio'
                            hidden
                            // defaultChecked={color._id === defaultColor}
                            name='choose-color'
                            id={item._id}
                            value={item._id}
                          />
                          <span
                            style={{
                              backgroundColor: `#${item.code}`
                            }}
                            className={`color shadow-md w-5 h-5 rounded-full bg-orange-300`}
                          />
                          <span className='capitalize'>{item.name}</span>
                        </Label>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent>
                  <div className='list-color grid grid-cols-3 gap-3 items-center'>
                    {size?.map((item: any) => {
                      return (
                        <Label
                          htmlFor={item._id}
                          key={item._id}
                          className={cn(
                            `color-item relative max-w-45 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-2 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] ${item._id === searchParams.get('size') ? 'has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d] ' : ' '}`
                          )}
                        >
                          <input
                            className='peer'
                            onChange={(event) => {
                              const size = event.target.value
                              searchParams.set('size', size)
                              setSearchParams(searchParams)
                            }}
                            type='radio'
                            hidden
                            // defaultChecked={color._id === defaultColor}
                            name='choose-color'
                            id={item._id}
                            value={item._id}
                          />
                          <span className='capitalize text-xs'>{item.name}</span>
                        </Label>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div>
              <div className='w-full py-4 flex flex-col gap-4'>
                <h2>Giá sản phẩm</h2>
                <ReactSlider
                  className='horizontal-slider'
                  thumbClassName='example-thumb'
                  trackClassName='example-track'
                  min={0}
                  max={maxPrice}
                  value={values}
                  onChange={debounce((values: any) => {
                    const minPriceSearch = values[0]
                    const maxPriceSearch = values[1]
                    searchParams.set('priceMin', minPriceSearch)
                    searchParams.set('priceMax', maxPriceSearch)
                    setSearchParams(searchParams)
                    setValues(values)
                  }, 100)}
                  pearling
                  minDistance={0}
                />
                <p>
                  Giá bạn muốn tìm : {(values[0] * 1000).toLocaleString('vi-VN')}đ -{' '}
                  {(values[1] * 1000).toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-9 flex flex-col'>
          <div className='flex justify-between pr-4 py-6'>
            {paramsObject?.search ? (
              <h4 className='text-[25px]'>KẾT QUẢ TÌM KIẾM THEO {paramsObject?.search}</h4>
            ) : (
              <div></div>
            )}

            <div>
              <Select onValueChange={handleOnChangeSelect}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lựa chọn</SelectLabel>
                    <SelectItem
                      value='reset'
                      className='cursor-pointer'
                    
                    >
                      Mặc định
                    </SelectItem>
                    <SelectItem
                      value='1'
                      className='cursor-pointer'
                    >
                      Giá : thấp đến cao
                    </SelectItem>
                    <SelectItem
                      value='-1'
                      className='cursor-pointer'
                    >
                      Giá : cao đến thấp
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            {products?.data?.content.length === 0 ? (
              <div className='mx-auto'>
                <CartEmpty title='Không có sản phẩm nào' />
              </div>
            ) : (
              <div className='w-full grid lg:grid-cols-3 grid-cols-2 gap-7'>
                <>
                  {products?.data?.content?.map((product: IProduct) => {
                    return (
                      <div className='group'>
                        <div>
                          <div className='relative overflow-hidden border rounded-2xl bg-[#F4F4F4] flex justify-center items-center '>
                            {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                            <div className='relative group inline-block'>
                              <img
                                className='object-cover w-full h-full transition duration-300 transform group-hover:scale-50'
                                src={product.thumbnail}
                                alt='Image 1'
                              />
                              <img
                                className='absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100'
                                src={product.images[0]}
                                alt='Image 2'
                              />
                            </div>
                            <div className='absolute flex justify-center items-center -bottom-10 group-hover:bottom-14 transition-all duration-300 ease-in-out'>
                              <Link
                                to={`/shop/${product._id}`}
                                className='w-[150px] border text-white bg-[#000000] bg-opacity-30 text-center rounded-full leading-[40px] border-none transition-transform hover:scale-90 ease-in-out'
                              >
                                Xem nhanh
                              </Link>
                            </div>
                            <div className='absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]'>
                              <IoIosHeartEmpty className='text-[20px] border-opacity-30 text-[#545454]' />
                            </div>
                            <div className='absolute left-3 top-5 rounded-t-full rounded-b-full rounded-br-none  p-1 bg-[#f85656]'>
                              <p className='text-[14px] p-1 text-white'>{product.discount}%</p>
                            </div>
                          </div>
                          <div className='my-4'>
                            <h3 className=' lg:text-base text-[14px] text-[#1A1E26] my-4 font-light w-70 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                              <Link to={`shop/${product._id}`}>{product.name}</Link>
                            </h3>
                            <div className='flex h-[20px] gap-4'>
                              {product.variants?.map((color: any, index: number) => {
                                return (
                                  <div
                                    className={`rounded-full h-full w-[20px]`}
                                    style={{
                                      backgroundColor: `#${color?.color?.code}`
                                    }}
                                    key={index}
                                  ></div>
                                )
                              })}
                            </div>
                            <div className='flex gap-2 justify-start pl-2 my-4 items-center '>
                              <h5 className='text-[18px] text-[#000]'>
                                {(product.price * 1000).toLocaleString('vi-VN')}đ
                              </h5>
                              {/* <span className='text-[15px] text-[#767676]'>
                        <del>${(product.price*((100-(product.discount)/100)/100)).toLocaleString('vi-VN')}đ</del>
                      </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              </div>
            )}
          </div>
          <div className='flex justify-center py-4'>
            <Paginations
              pageCount={products?.data?.totalPage}
              handlePageClick={(event: any) => {
                console.log(event);
                
                setPageIndex(event.selected + 1)
                searchParams.set('pageIndex', event.selected + 1)
                setSearchParams(searchParams)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
