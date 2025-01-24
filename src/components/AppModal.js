import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MyContext from '../context/context';
import WishlistModalContent from './WishlistModalContent';
import CartModalContent from './CartModalContent';
import AccountModalContent from './AccountModalContent';

const AppModal = () => {
  const { showModal, toggleModal,modalType,isModalLarge,setIsModalLarge } = useContext(MyContext);
  const [title,setTitle] = useState('');


  useEffect(()=>{

    if(modalType == 'wishlist'){
      setTitle('Wishlist');
    }else if(modalType == 'cart'){
      setTitle('Cart');
    }else{
      setTitle('');
    }

  },[modalType])


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
      default:
        return (
          <div>
            <p>Loading</p>
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
