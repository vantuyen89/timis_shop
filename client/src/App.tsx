import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LayoutWebsite from './components/website/LayoutWebsite'
import Homepage from './pages/Homepage'
import NotFound from './pages/NotFound'
import LayoutAuth from './components/website/LayoutAuth'
import { Register } from './pages/auth/Register'
import { Signin } from './pages/auth/Signin'
import ProductDetail from './pages/product/ProductDetail'
import Cart from './pages/cart/Cart'
import Shop from './pages/Shop'
import LayoutAdmin from './components/website/LayoutAdmin'
import MainContent from './pages/admin/MainContent'
import ProductList from './pages/admin/product/ProductList'
import ProductAdd from './pages/admin/product/ProductAdd'
import SizeList from './pages/admin/product/size/SizeList'
import SizeAdd from './pages/admin/product/size/SizeAdd'
import CategoryList from './pages/admin/category/CategoryList'
import CategoryAdd from './pages/admin/category/CategoryAdd'
import ColorList from './pages/admin/product/color/ColorList'
import ColorAdd from './pages/admin/product/color/ColorAdd'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='' element={<LayoutWebsite />}>
          <Route index element={<Homepage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='auth' element={<LayoutAuth />}>
          <Route path='register' element={<Register />} />
          <Route path='signin' element={<Signin />} />
        </Route>
        <Route path='admin' element={<LayoutAdmin />}>
          <Route index element={<MainContent />} />
          <Route path='product' element={<ProductList />} />
          <Route path='productAdd' element={<ProductAdd />} />
          <Route path='size' element={<SizeList />} />
          <Route path='sizeAdd' element={<SizeAdd />} />
          <Route path='category' element={<CategoryList />} />
          <Route path='categoryAdd' element={<CategoryAdd />} />
          <Route path='color' element={<ColorList />} />
          <Route path='colorAdd' element={<ColorAdd />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
