import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface Props {
  pageCount: number
  handlePageClick: ({ selected }: { selected: number }) => void
  size?: 'sm' | 'md'
}

function Paginations({ pageCount, handlePageClick, size = 'md' }: Props) {
  return (
    <>
      <ReactPaginate
        breakLabel='. . .'
        nextLabel={<FaAngleRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<FaAngleLeft />}
        renderOnZeroPageCount={null}
        pageLinkClassName={cn(
          'border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100',
          size === 'md' && 'md:w-10 md:h-10',
          size === 'sm' && 'md:w-8 md:h-8'
        )}
        previousLinkClassName={cn(
          'border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100',
          size === 'md' && 'md:w-10 md:h-10',
          size === 'sm' && 'md:w-8 md:h-8'
        )}
        nextLinkClassName={cn(
          'border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100',
          size === 'md' && 'md:w-10 md:h-10',
          size === 'sm' && 'md:w-8 md:h-8'
        )}
        disabledLinkClassName={'border-zinc-200 cursor-not-allowed text-zinc-200'}
        breakLinkClassName={cn(
          'border w-8 h-8  flex items-end justify-center rounded-md hover:bg-gray-100',
          size === 'md' && 'md:w-10 md:h-10',
          size === 'sm' && 'md:w-8 md:h-8'
        )}
        activeLinkClassName={'border-blue-500  text-blue-500 font-medium'}
        containerClassName={'flex gap-1'}
      />
    </>
  )
}

export default Paginations
