import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/images/logo.png'
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiFillAmazonSquare } from "react-icons/ai";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

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

<p className='header'>Important Links</p>

<Link className='links'>Necklace</Link>
<Link className='links'>Rings</Link>
<Link className='links'>Bracelets</Link>
<Link className='links'>Earrings</Link>
</div>


<div className='inner-container'>

<div className='social-icons-container'>

<FaInstagramSquare className='social_icon' />
<FaWhatsappSquare  className='social_icon'/>
<AiFillAmazonSquare className='social_icon'/>
<AiFillTikTok className='social_icon'/>


</div>


</div>


    
</div>
);
}

export default Footer;
