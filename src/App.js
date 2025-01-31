
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

        }
  
      ],
      errorElement:<ErrorPage />
    }

   
    
  ],
)
  return (
   <MyContextProvider>
    <RouterProvider router={router} />
   </MyContextProvider>
  );
}

export default App;

