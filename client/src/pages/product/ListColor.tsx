import { Label } from '@/components/ui/label';
import instance from '@/config/instance';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import React, { useRef, useState } from 'react'
interface Props {
  variants: any[]
  setColorCart: (colorId: string | null) => void
  sizeCart: string
}
const ListColor = ({ variants, setColorCart, sizeCart }: Props) => {
  const checkVariant1 = variants.filter(variant => variant.size._id === sizeCart)
  const checkVariant = Array.from(new Set(checkVariant1.map((v: any) => v.color._id)))
  const isVariantColors = Array.from(new Set(variants.map((v:any) => v.color._id)))
  const [colorId, setColorId] = useState<string | null>(null)
  const inputRef = useRef(null)
  
  const { data: color, isLoading, isError } = useQuery({
    queryKey: ['color'],
    queryFn: async () => {
      const response = await instance(`/color/getAllColor`)
      return response.data
    },
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error </div>
  
  
  return (
    <div className='list-color grid grid-cols-3 gap-3 items-center'>
      {color.map((item: any) => {

        
        return (
          <Label
            htmlFor={item._id}
            key={item._id}
            className={cn(
              `color-item relative max-w-40 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d] ${colorId !== null ? `has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`: " " }  hover:border-[#ee4d2d] `,
              !!sizeCart
                && !checkVariant.includes(item._id) && 'disabled'
                
            )}
          >
            <input
              ref={inputRef}
              className='peer'
              onClick={(event) => {
                if ((event.target as any).value === colorId) {
                  setColorId(null)
                  setColorCart(null)
                } else {
                  setColorId((event.target as any).value)
                  setColorCart((event.target as any).value)
                }
              }}
              type='radio'
              hidden
              
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
  )
}

export default ListColor