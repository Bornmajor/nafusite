import React, { useContext, useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import { doc, getDocs, query, setDoc, updateDoc, where ,collection,deleteDoc} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ProductCard = ({title,id,price,img_url,isLiked,width,height,mode}) => {

    const [productLiked,setIsProductLiked] = useState(false);
    const {userMail,errorFeedback,wishlistData,getWishlistData,updateWishlistByAction } = useContext(MyContext);

    const toggleLikedBtn = () =>{
        setIsProductLiked(!productLiked);

        updateWishlistByAction(id);

    }

    
    useEffect(()=>{
        updateWishlistStatusUI();
        // console.log('Product card renders')
    },[wishlistData])



    //updates wishlist button when page loads
    const updateWishlistStatusUI = async() =>{
        try{
         //not login 
        if(!userMail){
          
            return false;
        }
      

       const wishlistExist = wishlistData.some(item => item.product_id == id);
       if(wishlistExist){
        
        setIsProductLiked(true)
       }else{
        setIsProductLiked(false)
       }

       console.log("Updating UI Product card wishlist..")
        // console.log(`Liked status for${id} is ${wishlistExist}`)
        }catch(error){
            console.error("Error removing field from documents:", error.message);
        }

    }



    //update wishlist doc based on two conditions and when it does not exist
    //when user clicks like button
  

    
    return (
        <div className='product-card' key={id}>

             <Link to={`/product/${id}`}>
             <img src={img_url} className='product-img' width={width ? width : '180px'} height={height? height : '180px'}  />
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
           <div className='action-content'  onClick={() => toggleLikedBtn()}>
                {!productLiked ? 
             <FaRegHeart size={22} color='#743d07 ' />
                  :    
             <FaHeart size={22} color='#743d07 ' className=''/>  
                }
            
            </div>
            
            }



            </div>

         

           
            {/* <button className='add-cart-btn btn-primary'>Add to cart</button> */}

            
        </div>
    );
}

export default ProductCard;
