import { Label } from '@/components/ui/label'
import instance from '@/config/instance'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import React, { useRef, useState } from 'react'
interface Props {
  variants: any[]
  setSizeCart: (sizeId: string | null) => void
  colorCart: string
}
const ListSize = ({ variants, setSizeCart,colorCart }: Props) => {
   const checkVariant1 = variants.filter((variant) => variant.color._id === colorCart)
   const checkVariant = Array.from(new Set(checkVariant1.map((v: any) => v.size._id)))
  const isVariantSizes = Array.from(new Set(variants.map((v: any) => v.size._id)))
  const [colorId, setColorId] = useState<string | null>(null)
  const inputRef = useRef(null)
  const {
    data: size,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['size'],
    queryFn: async () => {
      const response = await instance(`/size/getAllSize`)
      return response.data
    }
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error </div>

  // const handleLabelClick = () => {
  //   // console.log(inputRef.current?.checked);
  //   if (inputRef.current?.checked) {
  //     setColorId(inputRef.current?.value)
  //     setSizeCart(inputRef.current?.value)
  //   } else {
  //     setColorId(null)
  //   }
  //   // console.log(colorId);
  // }
  return (
    <div className='list-size grid grid-cols-3 gap-3'>
      {size.map((item: any) => {
        return (
          <Label
            htmlFor={item._id}
            key={item._id}
            className={cn(
              `size-item relative max-w-40 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`,
              !!colorCart
                ? checkVariant.includes(item._id) || 'disabled'
                : isVariantSizes.includes(item._id) || 'disabled'
            )}
            onClick={() => {
              setSizeCart(null)
            }}
          >
            <input
              ref={inputRef}
              className='peer'
              onChange={(event) => {
                console.log(event)
                setSizeCart(event.target.value)
              }}
              type='radio'
              hidden
              // defaultChecked={color._id === defaultColor}
              name='choose-size'
              id={item._id}
              value={item._id}
            />
            {/* <span
              style={{
                backgroundColor: `#${item.code}`
              }}
              className={`color shadow-md w-5 h-5 rounded-full bg-orange-300`}
            /> */}
            <span className='capitalize'>{item.name}</span>
          </Label>
        )
      })}
    </div>
  )
}

export default ListSize