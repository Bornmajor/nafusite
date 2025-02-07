import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MyContext from '../context/context';
import WishlistModalContent from './WishlistModalContent';
import CartModalContent from './CartModalContent';
import AccountModalContent from './AccountModalContent';
import ProfileModalContent from './ProfileModalContent';
import PlaceOrderModalContent from './PlaceOrderModalContent';
import OrderModalContent from './OrderModalContent';

const AppModal = () => {
  const { showModal, toggleModal,modalType,isModalLarge,setIsModalLarge } = useContext(MyContext);
  const [title,setTitle] = useState('');
  const [errorMessage,setErrorMessage] = useState('')
  const [isFullScreen,setIsFullScreen] = useState(false);

   // Function to check viewport width
   const checkViewportWidth = () => {
    const isBelow575px = window.matchMedia('(max-width: 575px)').matches;
 

    // Run your function here if the viewport is below 575px
    if (isBelow575px) {
    //  console.log('Below 575px');
     setIsFullScreen(true)
    }else{
      // console.log('Above 575px')
      setIsFullScreen(false)
    }
  };

   // Add event listener for viewport changes
   useEffect(() => {
    // Check viewport width on initial render
    checkViewportWidth();

    // Add a resize event listener to check viewport width dynamically
    window.addEventListener('resize', checkViewportWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, []);


  useEffect(()=>{

    if(modalType == 'wishlist'){
      setTitle('Wishlist');
    }else if(modalType == 'cart'){
      setTitle('Cart');
    }else if(modalType == 'profile'){
      setTitle('Profile')
    }else if(modalType == 'place_order'){
      setTitle('Place order')
    }else if(modalType == 'orders'){
      setTitle('Orders')
    } else{
      setTitle('');
    }

 

  },[modalType]);

  useEffect(()=>{
  if(isModalLarge == 'extra-large'){

  }
  },[isModalLarge])

  //modify size of modal
useEffect(()=>{
  if(modalType == 'cart'){
    setIsModalLarge('lg');  
  }else{
  
    setIsModalLarge('');
  }
  },[modalType]);

   //set full screen for certain

  


  const renderModalContent = () => {
    switch (modalType) {
      case 'wishlist':
        return (
         <WishlistModalContent />
        );
      case 'cart':
        return (
         <CartModalContent />
        );
      case 'account':
        return (
          <AccountModalContent />
        );
      case 'profile':
        return (
          <ProfileModalContent />
        );
      case 'place_order':
        return (
          <PlaceOrderModalContent />
        );
        case 'orders':
          return (
            <OrderModalContent />
          );
      default:
        return (
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'> {!errorMessage ? 'Loading': errorMessage }</p> 
</div>

        );
    }
  };

  return (
    <>
      <Modal
        show={showModal}
       onHide={toggleModal}
      size={isModalLarge}
      fullscreen={isFullScreen}
       >
        <Modal.Header style={{border:'none'}} closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingTop:'10px'}}>{renderModalContent()}</Modal.Body>
      
      </Modal>
    </>
  );
};

export default AppModal;
