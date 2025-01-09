import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/style.css';
import '../src/assets/js/all'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import { MyContextProvider } from './context/context';



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
  
      ],
      errorElement:<ErrorPage />
    },
   
    
  ],
)
  return (
   <MyContextProvider>
    <RouterProvider router={router} />
   </MyContextProvider>
  );
}

export default App;

