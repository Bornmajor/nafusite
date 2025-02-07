import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/images/new_logo.png'
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiFillAmazonSquare } from "react-icons/ai";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
return (
<div className='footer'> 

<div className='inner-container'>

    <div className='branding'>

    <img src={appLogo} alt="" width="100px"/>
    <p className='motto'>Fine Fun Gems</p>

    </div>   
    

</div>

<div className='inner-container'>

<p className='header'>Contact Us</p>

<p> <MdEmail /> nafusiteenterprises@gmail.com</p>
<p><BsFillTelephoneFill />  0101514005 </p>

</div>

<div className='inner-container'>

<p className='header'>Categories</p>

<Link className='links'>Necklace</Link>
<Link className='links'>Rings</Link>
<Link className='links'>Bracelets</Link>
<Link className='links'>Earrings</Link>
</div>


<div className='inner-container'>

<div className='social-icons-container'>

<a href='https://www.instagram.com/nafusite/'  target="_blank">
<FaInstagramSquare className='social_icon' />
</a>

<a href="https://www.whatsapp.com/channel/0029Vamchlk8PgsBZqyi0h1P"  target="_blank">
<FaWhatsappSquare  className='social_icon'/>    
</a>

<a href='https://web.facebook.com/profile.php?id=61567239771071'  target="_blank">
<FaFacebookSquare className='social_icon'/>    
</a>


<a href='https://www.tiktok.com/@nafusite'  target="_blank">
<AiFillTikTok className='social_icon'/>    
</a>



</div>


</div>


    
</div>
);
}

export default Footer;
