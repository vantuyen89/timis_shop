import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
interface Props {
  handleOnChangeSelect: (value: string) => void
}
const SelectSort = ({ handleOnChangeSelect }: Props) => {
  return (
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
  )
}

export default SelectSort
