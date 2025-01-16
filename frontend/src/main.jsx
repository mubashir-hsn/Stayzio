import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthProvider from './contextApi/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
     <AuthProvider>
        <RouterProvider router={router} />
        <Toaster/>
     </AuthProvider>
   </Provider>
)
