import React from 'react';
import quote_img_l from  '../assets/images/icons8-quotes-90-l.png'
import quote_img_2 from  '../assets/images/icons8-quotes-90-r.png'


const TestimonialCard = ({desc,username,imgUrl}) => {
    return (
        <div className='testimonial-card'>
            
            <div className='desc-container'>
            <img src={quote_img_l} className='mx-1' width="20px" />
            <p className='desc'>{desc}</p>
            <img src={quote_img_2} className='mx-1' width="20px" />    
            </div>
            

            

            <div className='user-profile'>
                
                <img src={imgUrl} alt="" className='profile-icon-img'/>
                <p className='username mt-1 mx-2'>{username}</p>

            </div>
            
        </div>
    );
}

export default TestimonialCard;
