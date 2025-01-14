import React, { useContext,useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import AppModal from '../components/AppModal';
import MyContext from '../context/context';
import AppLoader from '../components/AppLoader';


const Root = () => {
const {isAppLoading,setIsAppLoading,setNavBarIsOpen} = useContext(MyContext);
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

},[location])

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
</>


}



</>
);
}

export default Root;
