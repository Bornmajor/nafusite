
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/dashboard/css/dashboard.css'
import '../src/assets/css/style.css';
import '../src/assets/js/all'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import CategoryPage from './pages/CategoryPage';
import { MyContextProvider } from './context/context';
import ProductPage from './pages/ProductPage';
import Dashboard from './pages/Dashboard';
import OverviewBoard from './pages/OverviewBoard';
import ProductsBoard from './pages/ProductsBoard';




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
        }
  
      ],
      errorElement:<ErrorPage />
    },
    {
      path:"/dashboard",
      element:<Dashboard />,
      children:[
        {
          index:true,
          element:<OverviewBoard />
        },
        {
          path:"/dashboard/products",
          element:<ProductsBoard />
        }
      ]
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

