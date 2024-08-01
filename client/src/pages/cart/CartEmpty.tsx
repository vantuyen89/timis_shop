

interface Props {
  title: string
}
const CartEmpty = ({ title }:Props) => {
  return (
    <div className='container'>
      <div className='flex flex-col justify-center items-center py-8 gap-5'>
        <img
          src='https://res.cloudinary.com/dzurnefms/image/upload/v1721568295/project_cn/fcx9ric4pee0fwdqcypf.png'
          alt=''
        />
        <h3>{title}</h3>
       
      </div>
    </div>
  )
}

export default CartEmpty