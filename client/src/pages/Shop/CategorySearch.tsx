import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getAllCategory } from '@/services/category'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const CategorySearch = () => {
  const [category, setCategory] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getAllCategory()
        console.log(data);
        
        setCategory(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  const handleSearchCategory = (id: string) => {
    searchParams.set('category', id)
    searchParams.set('pageIndex', '1')
    setSearchParams(searchParams)
    const paramsObject: any = Object.fromEntries(searchParams.entries())
    setSearchParams((prev) => ({
      ...prev,
      category: paramsObject.category,
      pageIndex: 1
    }))
  }
  return (
    <div className='flex flex-col w-full gap-3 rounded-lg'>
      <h3 className='font-semibold leading-7 tracking-wide text-uppercase lg:text-base md:text-sm sm:text-xs'>
        Danh mục sản phẩm
      </h3>
      <ScrollArea className='h-[45vh]'>
        <div className='flex flex-col'>
          {category?.map((cate: any) => {
            return (
              <Label
                key={cate?._id}
                className={cn(
                  `relative max-w-40 max-h-[50px] overflow-hidden flex items-center font-thin border-[#e9e9e9] cursor-pointer py-2 gap-2 rounded   hover:underline has-[:checked]:underline has-[:checked]:font-bold`
                )}
              >
                <input
                  type='radio'
                  hidden
                  name='choose-color'
                  id={cate._id}
                  value={cate._id}
                  checked={searchParams.get('category') === cate._id ? true : false}
                  onChange={() => handleSearchCategory(cate._id)}
                />
                <span
                  className={cn(
                    `lg:text-base md:text-sm sm:text-xs `,
                    searchParams.get('category') === cate._id ? 'font-bold' : 'font-normal'
                  )}
                >
                  {cate.name}
                </span>
              </Label>
            )
          })}
        </div>
      </ScrollArea>

      <hr />
    </div>
  )
}

export default CategorySearch
