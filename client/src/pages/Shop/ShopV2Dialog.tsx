import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import CategorySearch from './CategorySearch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import ReactSlider from 'react-slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
interface Props {
  color: any[]
  size: any[]
  values: number[]
  setValues: any
  maxPrice: number
  open: boolean
  onClose: () => void
}
const ShopV2Dialog = ({ color, size, values, setValues, maxPrice, open, onClose }: Props) => {
  // const matches = useMediaQuery('(min-width: 768px)')
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(color)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side={'top'} className='px-5'>
        <div className='pt-9 lg:flex-col lg:gap-1 gap-4 '>
          <CategorySearch />
          <Accordion type='single' collapsible className='w-full lg:flex-col gap-3'>
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
      </SheetContent>
    </Sheet>
  )
}

export default ShopV2Dialog
