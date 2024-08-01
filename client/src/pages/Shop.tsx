import  {  useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ReactSlider from 'react-slider'
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
import CartEmpty from './cart/CartEmpty'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import ProdcutShop from './product/ProdcutShop'
import ProductLoading from './product/ProductLoading'
import { getAllColor, getALlSize, getProductShop, productMax } from '@/services/product'

const Shop = () => {
  const [pageIndex, setPageIndex] = useState(1)
  console.log(pageIndex);
  
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
  const handlePaging = async () => {
    try {
      const data = await getProductShop(paramsObject)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      handlePaging()
    }, 500);
    setIsLoading(false)
  }, [searchParams])
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getAllColor()
        setColor(data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getALlSize()

        setSize(data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const [maxPrice, setMaxPrice] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await productMax()
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

  return (
    <div className='container flex flex-col'>
      {isLoading && <ProductLoading />}
      <Breadcrumb crumbs={crumbs} />
      <div className='flex flex-col py-5 gap-3 border-b-2'>
        <h3 className='lg:text-[32px] text-[25px]  font-bold'>Man collection</h3>
        <p className='font-light lg:text-base text-sm  lg:w-[600px] w-full leading-8'>
          We not only help you design exceptional products, but also make it easy for you to share your designs with
          more like-minded people.
        </p>
      </div>
      <div className='grid lg:grid-cols-12  '>
        {/* <Button onClick={() => handleParamsSearch()}>CLick</Button> */}
        <div className='col-span-3 pr-5 '>
          <div className='pt-9 lg:flex-col flex lg:gap-1 gap-4 '>
            <Accordion type='single' collapsible className='w-full lg:flex-col flex gap-3'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='lg:w-0 w-[100px] lg:text-base text-sm'>Màu sắc</AccordionTrigger>
                <AccordionContent>
                  <div className='list-color grid grid-cols-2 gap-3 items-center'>
                    {color?.map((item: any) => {
                      console.log(item._id)
                      return (
                        <Label
                          htmlFor={item._id}
                          key={item._id}
                          className={cn(
                            `color-item relative lg:max-w-40 lg:max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`
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
                          <span className='capitalize lg:block hidden'>{item.name}</span>
                        </Label>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='lg:w-0 w-[100px] lg:text-base text-sm'>Size</AccordionTrigger>
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
              <div className='lg:w-full w-[150px] py-4 flex flex-col gap-4'>
                <h2 className='lg:text-base text-sm'>Giá sản phẩm</h2>
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
                <p className='lg:text-sm text-xs'>
                  Giá bạn muốn tìm : {(values[0] * 1000).toLocaleString('vi-VN')}đ -{' '}
                  {(values[1] * 1000).toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-9 flex flex-col'>
          <div className='flex lg:flex-row flex-col justify-between lg:pr-4 py-6 lg:gap-0 gap-4 '>
            {paramsObject?.search ? (
              <h4 className='lg:text-[25px] text-sm font-semibold'>KẾT QUẢ TÌM KIẾM THEO " {paramsObject?.search} "</h4>
            ) : (
              <div></div>
            )}

            <div>
              <Select onValueChange={handleOnChangeSelect}>
                <SelectTrigger className='lg:w-[180px] w-full'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lựa chọn</SelectLabel>
                    <SelectItem value='reset' className='cursor-pointer'>
                      Mặc định
                    </SelectItem>
                    <SelectItem value='1' className='cursor-pointer'>
                      Giá : thấp đến cao
                    </SelectItem>
                    <SelectItem value='-1' className='cursor-pointer'>
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
              <ProdcutShop products={products} />
            )}
          </div>
          <div className='flex justify-center py-4'>
            <Paginations
              pageCount={products?.data?.totalPage}
              handlePageClick={(event: any) => {
                console.log(event)

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
