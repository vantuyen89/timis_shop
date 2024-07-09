import React, { useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { Link } from 'react-router-dom'
import bn1 from '@/images/bn1.png'
import bn2 from '@/images/bn2.png'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import PriceRangeSlider from './Test'
import PriceFilter from './Test'
import Paginations from '@/components/Pagination'
const Shop = () => {
  const [minPrice, setMinPrice] = useState(1)
  const [maxPrice, setMaxPrice] = useState(500)
  const [pageIndex, setPageIndex] = useState(1)
  const handleMinPriceChange = (e: any) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1)
    setMinPrice(value)
  }

  const handleMaxPriceChange = (e: any) => {
    const value = Math.max(Number(e.target.value), minPrice + 1)
    setMaxPrice(value)
  }
  const products = [
    {
      id: 1,
      name: 'Product 1 quá đẹp , quá đẹp quá đẹp quá đẹp quá',
      price: 100000,
      sale: 10
    },
    {
      id: 2,
      name: 'Product 2 , quá đẹp quá đẹp quá đẹp quá',
      price: 150000,
      sale: 20
    },
    {
      id: 3,
      name: 'Product 3 , quá đẹp quá đẹp quá đẹp quá',
      price: 80000,
      sale: 0
    },
    {
      id: 4,
      name: 'Product 4 , quá đẹp quá đẹp quá đẹp quá',
      price: 120000,
      sale: 15
    },
    {
      id: 5,
      name: 'Product 5',
      price: 200000,
      sale: 25
    },
    {
      id: 6,
      name: 'Product 6',
      price: 90000,
      sale: 5
    },
    {
      id: 7,
      name: 'Product 7',
      price: 110000,
      sale: 0
    },
    {
      id: 8,
      name: 'Product 8',
      price: 130000,
      sale: 18
    }
  ]
  const sizes = ['29', '30', '31', '32', '34','35', '36']
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  console.log(selectedSize);
  
  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    console.log(size);
  }

  const handleSizeChangeCheck = (size: string) => {
    setSelectedSize(size)
    console.log(size)
  }
  const priceRanges = [
    { label: '$0 - 99', value: '0-99', count: 14 },
    { label: '$100 - 199', value: '100-199', count: 46 },
    { label: '$200 - 299', value: '200-299', count: 9 },
    { label: '$300 - 399', value: '300-399', count: 5 },
    { label: '$400+', value: '400+', count: 11 }
  ]

  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)

  const handlePriceChange = (selectedRange: string | null) => {
    setSelectedPriceRange(selectedRange)
    console.log('Selected Price Range:', selectedRange)
  }
  return (
    <div className='container flex flex-col'>
      <div className='flex flex-col py-5 gap-3 border-b-2'>
        <h3 className='text-[32px] font-bold'>Man collection</h3>
        <p className='font-light w-[600px] leading-8'>
          We not only help you design exceptional products, but also make it easy for you to share your designs with
          more like-minded people.
        </p>
      </div>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 pr-5 '>
          <div className='pt-9'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1' onClick={() => setSelectedSize(null)}>
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent>
                  <div className='grid grid-cols-4 gap-2'>
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeChange(size)}
                        className={`px-4 py-2 border rounded ${selectedSize === size ? 'border-black bg-gray-200' : 'border-gray-300'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Màu sắc</AccordionTrigger>
                <AccordionContent>
                  <AccordionContent>
                    <div className='grid grid-cols-4 gap-2'>
                      {sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => handleSizeChangeCheck(size)}
                          className={`px-4 py-2 border rounded ${selectedSize === size ? 'border-black bg-gray-200' : 'border-gray-300'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3' onClick={() => setSelectedPriceRange(null)}>
                <AccordionTrigger>Mức giá</AccordionTrigger>
                <AccordionContent>
                  <PriceFilter priceRanges={priceRanges} onChange={handlePriceChange} />
                  <div className='mt-4'>
                    <h2 className='text-lg font-semibold'>Selected Price Range:</h2>
                    <p>{selectedPriceRange ? selectedPriceRange : 'None'}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className='col-span-9 flex flex-col'>
          <div className='flex justify-between pr-4 py-6'>
            <h4 className='text-[25px]'>KẾT QUẢ TÌM KIẾM THEO 'ĐẦM'</h4>
            <div>
              <NavigationMenu className=''>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='rounded-2xl border'>Sắp xếp theo</NavigationMenuTrigger>
                    <NavigationMenuContent className='md:w-[200px] lg:w-[140px] p-2'>
                      <NavigationMenuLink className='w-full text-[12px] font-light flex flex-col gap-1'>
                        <Button className='w-full text-[12px] bg-[#f2f2f2] hover:bg-[#dedede] text-black'>
                          Sản phẩm Mới nhất
                        </Button>
                        <Button className='w-full text-[12px] bg-[#f2f2f2] hover:bg-[#dedede] text-black'>
                          Tăng dần
                        </Button>
                        <Button className='w-full text-[12px] bg-[#f2f2f2] hover:bg-[#dedede] text-black'>
                          Giảm dần
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div>
            <div className='w-full grid lg:grid-cols-3 grid-cols-2 gap-7'>
              {products.map((product) => {
                return (
                  <div className='group'>
                    <div>
                      <div className='relative overflow-hidden border rounded-2xl bg-[#F4F4F4] flex justify-center items-center '>
                        {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                        <div className='relative group inline-block'>
                          <img
                            className='object-cover w-full h-full transition duration-300 transform group-hover:scale-50'
                            src={bn1}
                            alt='Image 1'
                          />
                          <img
                            className='absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100'
                            src={bn2}
                            alt='Image 2'
                          />
                        </div>
                        <div className='absolute flex justify-center items-center -bottom-10 group-hover:bottom-14 transition-all duration-300 ease-in-out'>
                          <Link
                            to={'/'}
                            className='w-[150px] border text-white bg-[#000000] bg-opacity-30 text-center rounded-full leading-[40px] border-none transition-transform hover:scale-90 ease-in-out'
                          >
                            Xem nhanh
                          </Link>
                        </div>
                        <div className='absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]'>
                          <IoIosHeartEmpty className='text-[20px] border-opacity-30 text-[#545454]' />
                        </div>
                        <div className='absolute left-3 top-5 rounded-t-full rounded-b-full rounded-br-none  p-1 bg-[#f85656]'>
                          <p className='text-[14px] p-1 text-white'>50%</p>
                        </div>
                      </div>
                      <div className='my-4'>
                        <h3 className=' lg:text-base text-[14px] text-[#1A1E26] my-4 font-light w-70 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                          {product.name}
                        </h3>
                        <div className='flex gap-2 justify-start pl-2 my-4 items-center '>
                          <h5 className='text-[18px] text-[#000]'>{product.price.toLocaleString('vi-VN')}đ</h5>
                          <span className='text-[15px] text-[#767676]'>
                            <del>${(80000).toLocaleString('vi-VN')}đ</del>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex justify-center py-4'>
            <Paginations
              pageCount={8}
              handlePageClick={(event: any) => {
                console.log(event.selected)
                setPageIndex(event.selected + 1)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
