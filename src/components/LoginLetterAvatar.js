import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import MyContext from '../context/context';

const LoginLetterAvatar = ({email}) => {
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

       >
      {uppercaseLetters} 
      </Dropdown.Toggle>

      <Dropdown.Menu className='drop-menu'>
      <Dropdown.Item onClick={() => {
      setModalType('profile')
      toggleModal();  
      }}>
         Profile
      </Dropdown.Item>
        <Dropdown.Item onClick={() => logOut()}>Log out</Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>

  
  </>


);
}

export default LoginLetterAvatar;
