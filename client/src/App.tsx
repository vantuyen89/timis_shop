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
import Shop from './pages/Shop/Shop'
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
import PrivateRoute from './routes/PrivateRouter'
import Order from './pages/order/Order'
import MyOrder from './pages/order/MyOrder'
import OrderSuccess from './pages/order/OrderSuccess'
import MyInfor from './components/MyInfor'
import Information from './pages/auth/Information'
import OrderPending from './pages/admin/order/OrderPending'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import SizeUpdate from './pages/admin/product/size/SizeUpdate'
import ColorUpdate from './pages/admin/product/color/ColorUpdate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import AuthAdmin from './pages/admin/auth/AuthAdmin'
import ProtectedRouter from './routes/ProtectedRouter'
import MainMessage from './pages/admin/messageAdmin/MainMessage'
import OrderProcessing from './pages/order/OrderProcessing'

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<LayoutWebsite />}>
          <Route index element={<Homepage />} />
          <Route path='/shop/:id' element={<ProductDetail />} />
          <Route
            path='/cart'
            element={
              <ProtectedRouter>
                <Cart />
              </ProtectedRouter>
            }
          />
          <Route
            path='/order'
            element={
              <ProtectedRouter>
                <Order />
              </ProtectedRouter>
            }
          />
          <Route path='/shop' element={<Shop />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='/myinfor'
            element={
              <ProtectedRouter>
                <MyInfor />
              </ProtectedRouter>
            }
          >
            <Route index element={<Information />} />
            <Route path='myorder' element={<MyOrder />} />
          </Route>
          <Route
            path='/order/success'
            element={
              <ProtectedRouter>
                <OrderSuccess />
              </ProtectedRouter>
            }
          />
          <Route path='/order/processing' element={<OrderProcessing />} />
        </Route>

        <Route path='auth' element={<LayoutAuth />}>
          <Route path='register' element={<Register />} />

          <Route path='signin' element={<Signin />} />
        </Route>

        <Route
          path='admin'
          element={
            <PrivateRoute>
              <LayoutAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<MainContent />} />
          <Route path='product' element={<ProductList />} />
          <Route path='productUpdate/:id' element={<ProductUpdate />} />
          <Route path='productAdd' element={<ProductAdd />} />
          <Route path='size' element={<SizeList />} />
          <Route path='sizeAdd' element={<SizeAdd />} />
          <Route path='sizeUpdate/:id' element={<SizeUpdate />} />
          <Route path='category' element={<CategoryList />} />
          <Route path='categoryAdd' element={<CategoryAdd />} />
          <Route path='categoryUpdate/:id' element={<CategoryUpdate />} />
          <Route path='color' element={<ColorList />} />
          <Route path='colorAdd' element={<ColorAdd />} />
          <Route path='colorUpdate/:id' element={<ColorUpdate />} />
          <Route path='order' element={<OrderPending />} />
          <Route path='auth' element={<AuthAdmin />} />
          <Route path='message' element={<MainMessage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
