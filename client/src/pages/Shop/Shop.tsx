import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ReactSlider from 'react-slider'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Paginations from '@/components/Pagination'
import CartEmpty from '../cart/CartEmpty'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'
import Breadcrumb, { generateBreadcrumbs } from '@/components/BreadCrumb'
import ProdcutShop from '../product/ProdcutShop'
import ProductLoading from '../product/ProductLoading'
import { getAllColor, getALlSize, getProductShop, productMax } from '@/services/product'
import CategorySearch from './CategorySearch'
import { IoFilterOutline } from 'react-icons/io5'
import ShopV2Dialog from './ShopV2Dialog'
import SelectSort from './SelectSort'

const Shop = () => {
  // const [pageIndex, setPageIndex] = useState(1)
  const [products, setProduct] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [open, setOpen] = useState<boolean>(false)
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
    }, 100)
    window.scrollTo(0, 0)
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
  const [maxPrice, setMaxPrice] = useState<number>(5000)
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
      <div className='py-4'>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className='flex flex-col py-5 gap-3 border-b-2'>
        <h3 className='lg:text-[32px] text-[25px]  font-bold'>TIMIS FASHION STYLE</h3>
        <p className='font-light lg:text-base text-sm  lg:w-[600px] w-full leading-8'>
          Mỗi chiếc áo tại cửa hàng chúng tôi không chỉ đơn thuần là một món đồ, mà là một tác phẩm nghệ thuật tinh tế,
          được thiết kế để tôn vinh vẻ đẹp và phong cách riêng của bạn. Hãy để trang phục của bạn nói lên câu chuyện của
          chính mình!
        </p>
      </div>
      <div className='w-full lg:hidden flex justify-between pt-6'>
        <div
          onClick={() => {
            setOpen(true)
          }}
          className='cursor-pointer'
        >
          <IoFilterOutline size={25} />
        </div>
        <div className='cursor-pointer'>
          <SelectSort handleOnChangeSelect={handleOnChangeSelect} />
        </div>
      </div>
      <div className='grid lg:grid-cols-12  '>
        {/* <Button onClick={() => handleParamsSearch()}>CLick</Button> */}

        <div className='lg:grid lg:col-span-3 hidden  pr-5 '>
          <div className='pt-9 lg:flex-col flex lg:gap-1 gap-4 '>
            <CategorySearch />
            <Accordion type='single' collapsible className='w-full lg:flex-col flex gap-3'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='lg:w-0 w-[100px] lg:text-base text-sm'>Màu sắc</AccordionTrigger>
                <AccordionContent>
                  <div className='list-color grid grid-cols-2 gap-3 items-center'>
                    {color?.map((item: any) => {
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

            <div className='lg:block hidden'>
              <SelectSort handleOnChangeSelect={handleOnChangeSelect} />
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
                // setPageIndex(event.selected + 1)
                searchParams.set('pageIndex', event.selected + 1)
                setSearchParams(searchParams)
              }}
            />
          </div>
        </div>
      </div>
      {open && (
        <ShopV2Dialog
          color={color}
          size={size}
          values={values}
          setValues={setValues}
          maxPrice={maxPrice}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default Shop
