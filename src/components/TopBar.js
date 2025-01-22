import React, { useContext,useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import appLogo from '../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import LoginLetterAvatar from './LoginLetterAvatar';



const TopBar = () => {
const { toggleNavbar, navBarIsOpen,toggleModal,setModalType,userMail,logOut } = useContext(MyContext);
const location = useLocation();

// Update active navigation when you are on the current page
const getNavLinkClass = (path) => {
return location.pathname === path ? 'navlink active-nav-link' : 'navlink';
};

const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => {
// Change state based on scroll position
setIsScrolled(window.scrollY > 0);
};

window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);


const [isHidden, setIsHidden] = useState(false); // Tracks whether the navbar is hidden
const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position

useEffect(() => {
const handleScroll = () => {
const currentScrollY = window.scrollY;

if (currentScrollY > lastScrollY && currentScrollY > 10) {
// Hide navbar when scrolling down
setIsHidden(true);
console.log('Scrolling down');
} else {
// Show navbar when scrolling up
setIsHidden(false);
console.log('Scrolling up');
}

setLastScrollY(currentScrollY);
};

window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);

//remove email section
function usernameWithoutEmail(username) {
  const atIndex = username.indexOf('@');
  if (atIndex !== -1) {
    return username.substring(0, atIndex);
  } else {
    return username; // Username doesn't contain "@"
  }
}

return (
<>
<Navbar expand="lg" 
className={`bg-body-tertiary `}
id='navbar'
sticky={isHidden ? "":"top"}
>
<Container fluid>
<Navbar.Brand to='/' as={Link} className='navlink'>
<img src={appLogo} alt='App logo' width={60} />
{/* <span className='navbar-app-title'>Local connect</span> */}
</Navbar.Brand>
<Navbar.Toggle aria-controls="offcanvasNavbar" className='menu-top-navbar' onClick={toggleNavbar} />
<Navbar.Offcanvas
id="offcanvasNavbar"
aria-labelledby="offcanvasNavbarLabel"
className="offcanvas-fullwidth"
placement="end"
show={navBarIsOpen}
onHide={toggleNavbar}
>
<Offcanvas.Header closeButton>
<Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body >

<Nav className='justify-content-end flex-grow-1 pe-3'>




{/* <Nav.Link to="/" id="nav-home-link" className={getNavLinkClass('/')} as={Link}>Home</Nav.Link> */}
<Nav.Link to="/category/necklace" className={getNavLinkClass('/category/necklace')} as={Link}>Necklace</Nav.Link>
<Nav.Link to="/category/bracelets" className={getNavLinkClass('/category/bracelets')} as={Link}>Bracelets</Nav.Link>
<Nav.Link to="/category/earrings" className={getNavLinkClass('/category/earrings')} as={Link}>Earrings</Nav.Link>
<Nav.Link to="/category/bags" className={getNavLinkClass('/category/bags')} as={Link}>Hand bags</Nav.Link>

<Nav.Link to="/#pricing-section"
className={`${getNavLinkClass('/staff')} link-sm-device`}  
onClick={() => {
setModalType('wishlist')
toggleModal()  
}} as={Link}> 
<FaHeart  color='black'  /> Wishlist (1)
</Nav.Link>
<Nav.Link to="/#pricing-section"
 className={`${getNavLinkClass('/staff')} link-sm-device`} 
 onClick={() => {
  setModalType('cart')
  toggleModal()  
  }}
 as={Link}>
  <FaCartShopping color='black'/> Cart (1)
 </Nav.Link>


 {userMail !== '' 
 ?
 <>
  <Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device mt-4`}
as={Link}>
<FaUserCircle fontSize={20} color='#f29632' /> {usernameWithoutEmail(userMail) }

</Nav.Link> 

<Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device`}
as={Link}
onClick={() => logOut()}>
<TbLogout fontSize={20} color='#f29632' /> Log out

</Nav.Link> 
 
 </>


 : 
 
<Nav.Link
to="/#pricing-section"
className={`${getNavLinkClass('/staff')} link-sm-device`}
onClick={() => {
  setModalType('account')
  toggleModal()  
  }}
as={Link}>
<FaUserAlt color='black' /> Login
</Nav.Link> 
 
 }





</Nav>
<Nav className='justify-content-end flex-grow-1 pe-3 top-right-nav-content'>
<a type="button" className="position-relative mx-2" 
onClick={() => {
setModalType('wishlist')
toggleModal()  
}}
>
<FaHeart size={25} color='black'  />
<span className="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
2
<span class="visually-hidden">unread messages</span>
</span>
</a>

<a type="button" class="position-relative mx-2"
onClick={() => {
setModalType('cart')
toggleModal()  
}}
>

<FaCartShopping size={25} color='black'/>
<span class="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
2
<span class="visually-hidden">unread messages</span>
</span>
</a>

{userMail !== '' ? 
//if logged in
<LoginLetterAvatar email={userMail}/>
:
<Link className='mx-2'
onClick={() => {
setModalType('account')
toggleModal()  
}}
>
<FaUserAlt size={25} color='black' />
</Link>

}


</Nav>
</Offcanvas.Body>
</Navbar.Offcanvas> 
</Container>
</Navbar>
</>
);
}

export default TopBar;
