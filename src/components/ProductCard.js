import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductCard = ({title,id,price,img_url,isLiked,width,height,mode}) => {

    const [productLiked,setIsProductLiked] = useState(isLiked);

    const toggleLikedBtn = () =>{
        setIsProductLiked(!productLiked)
    }

    
    return (
        <div className='product-card' key={id}>

             <Link to={`/product/${id}`}>
             <img src={img_url} className='product-img' width={width ? width : '180px'} height={height? height : '230px'}  />
             </Link>
             

            <div className='inner-container mt-2'>

 
            <Link className='text-content' to={`/product/${id}`}>
           
            <p className='title text-truncate '>{title}</p>
            <p className='price'>Ksh {price}</p>    

            </Link>

            {mode == 'edit' ?
             <Link className='edit-link' type='button'>
                edit
             </Link>

            :
           <div className='action-content'  onClick={toggleLikedBtn}>
                {!productLiked ? 
             <FaRegHeart size={22} color='#f29632' />
                  :    
             <FaHeart size={22} color='#f29632' className=''/>  
                }
            
            </div>
            
            }



            </div>

         

           
            {/* <button className='add-cart-btn btn-primary'>Add to cart</button> */}

            
        </div>
    );
}

export default ProductCard;
