
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './pages/auth/AuthContext.tsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollTop.tsx'
import { SocketContextProvider } from './pages/auth/SocketContext.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Provider store={store}>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </Provider>
      </AuthProvider>
      <Toaster richColors position='top-right' />
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
)
