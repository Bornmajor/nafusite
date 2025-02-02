import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import MyContext from '../context/context';

const LoginLetterAvatar = ({email,isDroppable,width,height}) => {
  const {logOut,setModalType,toggleModal} = useContext(MyContext);

// Extract the first two characters
const firstTwoLetters = email.substring(0, 2); 

// Convert to uppercase
const uppercaseLetters = firstTwoLetters.toUpperCase();

return (
  <>
  <Dropdown className='dropdown-avatar'>
      <Dropdown.Toggle variant="secondary" 
      className='login-letter-avatar'
      style={{width: width ? width :'42px',height:height ? height :'42px'}}

       >
      {uppercaseLetters} 
      </Dropdown.Toggle>

    {
      isDroppable &&
      <Dropdown.Menu className='drop-menu'>
    <Dropdown.Item onClick={() => {
    setModalType('profile')
    toggleModal();
    
    }}>
        Profile
    </Dropdown.Item>
    <Dropdown.Item  onClick={() =>{
      setModalType('orders');
      toggleModal();

    }}>Orders</Dropdown.Item>
      <Dropdown.Item onClick={() => logOut()}>Log out</Dropdown.Item>
    
    </Dropdown.Menu>}

    </Dropdown>

  
  </>


);
}

export default LoginLetterAvatar;
