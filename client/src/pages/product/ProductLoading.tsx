
import ClipLoader from 'react-spinners/ClipLoader'

const ProductLoading = ({loading} : any) => {
  return (
    <div className='flex justify-center items-center mt-[200px]'>
      <ClipLoader
        color={'#000000'}
        loading={loading}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default ProductLoading