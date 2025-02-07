
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/style.css';
import '../src/assets/js/all'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './layouts/Root';
import ErrorPage from './pages/ErrorPage';
import CategoryPage from './pages/CategoryPage';
import { MyContextProvider } from './context/context';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import { ConfigProvider, } from 'antd';




function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Root />,
      children:[
        {
         index:true,
         element:<Home/>
        },
        {
          path:"/product/:prodId",
          element:<ProductPage />
        },
        {
          path:"/category/:category",
          element:<CategoryPage />
        },
        {
          path:"/order/:orderId",
          element:<OrderPage />

        },
        
      ],
      errorElement:<ErrorPage />
    },
    {
      path:"/forget-password",
      element:<ForgetPassword />,
      errorElement:<ErrorPage />
    },
    {
      path:"/reset-password/:email/:token",
      element:<ResetPassword />,
      errorElement:<ErrorPage />
    }

   
    
  ],
)
  return (
   <MyContextProvider>
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#f29632',

        // Alias Token
        // colorBgContainer: '#f29632',
      },
    }}
  >
     <RouterProvider router={router} /> 
  </ConfigProvider>
  
   </MyContextProvider>
  );
}

export default App;

