import React, { useContext,useEffect } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import AppModal from '../components/AppModal';
import MyContext from '../context/context';
import AppLoader from '../components/AppLoader';
import RegisterOnBoardingModal from '../components/RegisterOnBoardingModal';



const Root = () => {
const {isAppLoading,setIsAppLoading,setNavBarIsOpen,setShowModal,setShowRegisterBoard} = useContext(MyContext);
const location = useLocation();

useEffect(()=>{

// Your code to run when the route changes
console.log('Route changed:', location.pathname);



setTimeout(() => {
setIsAppLoading(false)  
}, 2500);

//scroll to given div when url has hash #div
setTimeout(() => {
if (location.hash) {
const elementId = location.hash.substring(1); // Remove the '#' from the hash
const element = document.getElementById(elementId);

if (element) {
element.scrollIntoView({ behavior: "smooth" });
}
}
}, 1000);

//close navbar on change route
setNavBarIsOpen(false);
//close modals when change route
setShowModal(false);

},[location]);


useEffect(() => {
   // Parse search params from the URL
   const searchParams = new URLSearchParams(location.search);

   // Check if a specific search param exists
   if (searchParams.has('onboarding')) {
     const query = searchParams.get('onboarding');
     console.log('Search query:', query);

     // Perform your function here
     if(query == 'registration'){
      setShowRegisterBoard(true);
     }
    
     
   }
 }, [location.search]); // Re-run the effect when the search params change

return (
<>
{isAppLoading ? 
   <div className='d-flex justify-content-center align-items-center vh-100'>
   <AppLoader /> 
   </div>
:
<>
<TopBar />
<Outlet />
<Footer />
<AppModal />
<RegisterOnBoardingModal />
</>


}



</>
);
}

export default Root;
