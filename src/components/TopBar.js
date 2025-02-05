import React, { useContext,useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, NavLink } from 'react-router-dom';
import MyContext from '../context/context';
import appLogo from '../assets/images/new_logo.png';
import { useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import LoginLetterAvatar from './LoginLetterAvatar';
import { BsBagCheckFill } from "react-icons/bs";
import { SiPantheon } from 'react-icons/si';
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ringImg from '../assets/images/icons8-wedding-rings-100.png'
import braceletImg from '../assets/images/icons8-bracelet-90.png'
import bagImg from '../assets/images/icons8-bag-100.png'
import necklaceImg from '../assets/images/icons8-necklace-100.png'



const TopBar = () => {
const { toggleNavbar, navBarIsOpen,toggleModal,
  setModalType,userMail,logOut,wishlistData,cartListData,modalType,setIsModalLarge } = useContext(MyContext);
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
<img className='top-bar-logo-img' src={appLogo} alt='App logo'  />
{/* <span className='navbar-app-title'>Local connect</span> */}
</Navbar.Brand>

<div className='toggle-wishlist-cart-container'>

 <span className='wishlist-cart-sm-container mx-1'>
  <a type="button" className="position-relative mx-2" 
onClick={() => {
  
setModalType('wishlist')
toggleModal();
}}
>
<FaHeart size={25} color='black'  />
<span className="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
{wishlistData.length}
<span class="visually-hidden">unread messages</span>
</span>
</a>

<a type="button" class="position-relative mx-3"
onClick={() => {
setModalType('cart')
toggleModal();
}}
>

<FaCartShopping size={25} color='black'/>
<span class="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
{cartListData.length}
<span class="visually-hidden">unread messages</span>
</span>
</a>  
  </span> 


<Navbar.Toggle aria-controls="offcanvasNavbar" className='menu-top-navbar' onClick={toggleNavbar} >
  <CgMenuRight  fontSize={'28px'} color='#f29632' />
  </Navbar.Toggle>
</div>



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


<div className='link-sm-device mb-3 pb-3'>
{userMail !== '' ? 

//if logged in
<div className='d-flex align-items-center gap-10'>

  <span onClick={() => {
  setModalType('profile')
  toggleModal();
  }}>
    <LoginLetterAvatar email={userMail} isDroppable={false} width={'53px'} height={'53px'}/>
  </span>

 
 <div>
  <p className='font-20'>{usernameWithoutEmail(userMail)}</p> 
  <p className='clickable-item' onClick={() =>  logOut()}> <FiLogOut /> logout</p>
  </div>


</div>

:
<span  className='clickable-item mx-2'
onClick={() => {
setModalType('account')
toggleModal();
}}
>
  <div className='d-flex align-items-center gap-10'>
   <FaUserCircle size={30} color='black' />  <p className='font-20'>Sign In</p> 
  </div>

</span>

}
</div>





{/* <Nav.Link to="/" id="nav-home-link" className={getNavLinkClass('/')} as={Link}>Home</Nav.Link> */}

{
 userMail && 
  <Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device`}
onClick={() => {
setModalType('orders');
toggleModal();   
}}>
Orders

</Nav.Link>}

<Nav.Link to="/category/necklace" className={`${getNavLinkClass('/category/necklace')}`} as={Link}>
 Necklace
</Nav.Link>
<Nav.Link to="/category/bracelets" className={`${getNavLinkClass('/category/bracelets')}`} as={Link}>
 Bracelets
</Nav.Link>
<Nav.Link to="/category/earrings" className={`${getNavLinkClass('/category/earrings')} `} as={Link}>
 Earrings
</Nav.Link>
<Nav.Link to="/category/bags" className={`${getNavLinkClass('/category/bags')}`} as={Link}>
 Hand bags
</Nav.Link>

{/* <Nav.Link to="/#none"
className={`${getNavLinkClass('/staff')} link-sm-device`}  
onClick={() => {
setModalType('wishlist');
toggleModal();

}} as={Link}> 
<FaHeart  color='black'  /> Wishlist ({wishlistData.length})

</Nav.Link>
<Nav.Link to="/#none"
 className={`${getNavLinkClass('/staff')} link-sm-device`} 
 onClick={() => {
  setModalType('cart')
  toggleModal();
 
  }}
 as={Link}>
  <FaCartShopping color='black'/> Cart ({cartListData.length})
 </Nav.Link> */}


 {/* {userMail !== '' 
 ?
 <div className='mt-4'>
  <Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device mt-4`}
onClick={() =>{
  setModalType('profile');
  toggleModal();
}}
>
<FaUserCircle fontSize={20} color='#f29632' /> {usernameWithoutEmail(userMail) }

</Nav.Link> 

<Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device`}
onClick={() => {
 setModalType('orders');
  toggleModal();   
}}>
  <BsBagCheckFill fontSize={18} color='#f29632'/> Orders
</Nav.Link>

<Nav.Link
className={`${getNavLinkClass('/staff')} link-sm-device`}
as={Link}
onClick={() => logOut()}>
<TbLogout fontSize={20} color='#f29632' /> Log out

</Nav.Link> 
 
 </div>

 : 
 
<Nav.Link
to="/#pricing-section"
className={`${getNavLinkClass('/staff')} link-sm-device mt-3`}
onClick={() => {
  setModalType('account')
  toggleModal();
  
  }}
>
<FaUserAlt color='black' /> Login
</Nav.Link> 
 
 } */}





</Nav>
<Nav className='justify-content-end align-items-center flex-grow-1 pe-3 top-right-nav-content'>
<a type="button" className="position-relative mx-2" 
onClick={() => {
  
setModalType('wishlist')
toggleModal();
}}
>
<FaHeart size={25} color='black'  />
<span className="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
{wishlistData.length}
<span class="visually-hidden">unread messages</span>
</span>
</a>

<a type="button" class="position-relative mx-2"
onClick={() => {
setModalType('cart')
toggleModal();
}}
>

<FaCartShopping size={25} color='black'/>
<span class="badge-icon position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
{cartListData.length}
<span class="visually-hidden">unread messages</span>
</span>
</a>

{userMail !== '' ? 
//if logged in
<LoginLetterAvatar email={userMail} isDroppable={true}/>
:
<span  className='clickable-item mx-2'
onClick={() => {
setModalType('account')
toggleModal();
}}
>
<FaUserCircle size={28} color='black' />
</span>

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
