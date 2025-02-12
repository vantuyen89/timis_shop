import { IProduct } from '@/interfaces/IProduct'
import { IoIosHeartEmpty } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ProdcutShop = (products: any) => {
  return (
    <>
      <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-7'>
        <>
          {products?.products?.data?.content?.map((product: IProduct) => {
            return (
              <div className='group' key={product._id}>
                <div>
                  <div className='relative overflow-hidden border rounded-2xl bg-[#F4F4F4] flex justify-center items-center '>
                    {/* <img src={bn1} className='py-6 w-full h-full' /> */}
                    <div className='relative group inline-block lg:h-full h-[200px]'>
                      <img
                        className='object-cover w-full h-full transition duration-300 transform group-hover:scale-50'
                        src={product.thumbnail}
                        alt='Image 1'
                      />
                      <img
                        className='absolute top-0 left-0 w-full h-full object-cover transition duration-300 opacity-0 group-hover:opacity-100'
                        src={product.images[0]?.url}
                        alt='Image 2'
                      />
                    </div>
                    <div className='absolute flex justify-center items-center -bottom-10 group-hover:bottom-14 transition-all duration-300 ease-in-out'>
                      <Link
                        to={`/shop/${product._id}`}
                        className='lg:w-[150px] w-[100px] lg:text-base text-sm lg:py-2 border text-white bg-[#000000] bg-opacity-30 text-center rounded-full leading-[40px] border-none transition-transform hover:scale-90 ease-in-out'
                      >
                        Xem nhanh
                      </Link>
                    </div>
                    <div className='absolute -right-10 top-5 group-hover:right-3 transition-all border-opacity-30 duration-300 ease-in-out border rounded-full p-1 border-[#545454]'>
                      <IoIosHeartEmpty className='text-[20px] border-opacity-30 text-[#545454]' />
                    </div>
                    <div className='absolute left-3 top-5 rounded-t-full rounded-b-full rounded-br-none  p-1 bg-[#f85656]'>
                      <p className='lg:text-[14px] text-xs p-1 text-white'>{product.discount}%</p>
                    </div>
                  </div>
                  <div className='my-4'>
                    <h3 className=' lg:text-base text-sm text-[#1A1E26] my-4 font-light w-70 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                      <Link to={`shop/${product._id}`}>{product.name}</Link>
                    </h3>

                    <div className='flex lg:h-[20px] h-[15px] gap-4'>
                      {Array.from(new Set(product.variants.map((variant: any) => variant.color.code))).map(
                        (colorCode: string, index: number) => (
                          <div
                            key={index}
                            className='rounded-full h-full lg:w-[20px] w-[15px]'
                            style={{ backgroundColor: `#${colorCode}` }}
                          ></div>
                        )
                      )}
                    </div>
                    <div className='flex gap-2 justify-start pl-2 my-4 items-center '>
                      <h5 className=' text-[#000] lg:text-base text-sm'>
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
    </>
  )
}

export default ProdcutShop