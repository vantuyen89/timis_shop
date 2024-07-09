import React, { useState } from 'react'

interface PriceFilterProps {
  priceRanges: { label: string; value: string; count: number }[]
  onChange: (selectedRange: string | null) => void
}

const PriceFilter: React.FC<PriceFilterProps> = ({ priceRanges, onChange }) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null)

  const handleCheckboxChange = (value: string | null) => {
    let updatedRange = value
    if (selectedRange === value) {
      updatedRange = null
    }
    setSelectedRange(updatedRange)
    onChange(updatedRange)
  }

  return (
    <div className='w-full p-4'>
      <h2 className='text-lg font-semibold mb-2'>Price</h2>
      <ul>
        {priceRanges.map((range) => (
          <li key={range.value} className='flex justify-between items-center mb-2'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-black rounded border-gray-300'
                value={range.value}
                checked={selectedRange === range.value}
                onChange={() => handleCheckboxChange(range.value)}
              />
              <span className='ml-2 text-sm'>{range.label}</span>
            </label>
            <span className='text-sm'>{range.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PriceFilter
