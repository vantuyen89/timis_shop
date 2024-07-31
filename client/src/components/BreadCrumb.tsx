
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const labelMap : any = {
  '': 'Home',
  'shop': 'Sản phẩm',
  'cart': 'Giỏ hàng',
  'order': 'Thanh toán',
  'myorder': 'Đơn hàng của tôi'
}

export const generateBreadcrumbs = (pathname:any) => {
  const pathArray = pathname.split('/').filter((i: any) => i)

  
  const crumbs = pathArray.map((path:any, index:any) => {
    const href = `/${pathArray.slice(0, index + 1).join('/')}`

    return { label:labelMap[path] ||  path.charAt(0).toUpperCase() + path.slice(1), href }
  })

  
  return crumbs
}

const Breadcrumb = ({crumbs}:any) => {
  return (
    <nav className='flex mb-4' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center'>
          <Link to='/' className='inline-flex items-center text-sm font-medium'>
            Trang chủ
          </Link>
          {crumbs.length > 0 && <FaAngleRight />}
        </li>
        {crumbs.map((crumb: any, index: number) => (
          <li key={index} className='inline-flex items-center'>
            {index !== crumbs.length - 1 ? (
              <Link to={crumb.href} className='inline-flex items-center text-sm font-medium'>
                {crumb.label}
              </Link>
            ) : (
              <span className='inline-flex items-center text-sm font-medium'>{crumb.label}</span>
            )}
            {index !== crumbs.length - 1 && <FaAngleRight />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
