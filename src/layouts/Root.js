import React, { useContext,useEffect } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import AppModal from '../components/AppModal';
import MyContext from '../context/context';
import AppLoader from '../components/AppLoader';
import RegisterOnBoardingModal from '../components/RegisterOnBoardingModal';
import { collection, getDoc, getDocs,doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';



const Root = () => {
const {isAppLoading,setIsAppLoading,setNavBarIsOpen,setShowModal,setShowRegisterBoard,userMail} = useContext(MyContext);
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
  const fetchData = async () => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('onboarding')) {
      const query = searchParams.get('onboarding');
      console.log('Search query:', query);

      if (!userMail) {
        return; // Early return if userMail is not available
      }

      const docRef = doc(db, "user_interest", userMail);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        if (query === 'registration') {
          setShowRegisterBoard(true);
        }
      }
    }
  };

  fetchData(); // Call the async function
 }, [location.search,userMail]); // Re-run the effect when the search params change

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
