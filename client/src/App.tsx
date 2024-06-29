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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='' element={<LayoutWebsite />}>
          <Route index element={<Homepage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart/> } />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='auth' element={<LayoutAuth />}>
          <Route path='register' element={<Register/>} />
          <Route path='signin' element={<Signin/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
