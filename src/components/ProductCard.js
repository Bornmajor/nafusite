import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductCard = ({title,id,price,img_url,isLiked}) => {

    const [productLiked,setIsProductLiked] = useState(isLiked);

    const toggleLikedBtn = () =>{
        setIsProductLiked(!productLiked)
    }
    return (
        <div className='product-card' key={id}>

             <img src={img_url} className='product-img'  />

            <div className='inner-container mt-2'>

            <div className='text-content'>
           
            <p className='title text-truncate '>{title}</p>
            <p className='price'>Ksh {price}</p>    

            </div>

            <div className='action-content'  onClick={toggleLikedBtn}>
                {!productLiked ? 
             <FaRegHeart size={22} />
                  :    
             <FaHeart size={22} color='black' className=''/>  
                }
            
            </div>

            </div>

         

           
            <button className='add-cart-btn btn-primary'>Add to cart</button>

            
        </div>
    );
}

export default ProductCard;
