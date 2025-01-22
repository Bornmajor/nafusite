import React, { useContext, useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import { doc, getDocs, query, setDoc, updateDoc, where ,collection,deleteDoc} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ProductCard = ({title,id,price,img_url,isLiked,width,height,mode}) => {

    const [productLiked,setIsProductLiked] = useState(false);
    const {userMail,errorFeedback,wishlistData,getWishlistData, } = useContext(MyContext);

    const toggleLikedBtn = () =>{
        setIsProductLiked(!productLiked);

        updateWishlistByAction();

    }

    
    useEffect(()=>{
        updateWishlistStatusUI();
        console.log('Product card renders')
    },[wishlistData])



    //updates wishlist button when page loads
    const updateWishlistStatusUI = async() =>{
        try{
         //not login 
        if(!userMail){
          
            return false;
        }
        //empy wishlist data
        if(wishlistData.length == 0){

            return false;

        }

       const wishlistExist = wishlistData.some(item => item.product_id == id && item.email == userMail);
       if(wishlistExist){
        
        setIsProductLiked(true)
       }else{
        setIsProductLiked(false)
       }
        console.log(`Liked status for${id} is ${wishlistExist}`)
        }catch(error){
            console.error("Error removing field from documents:", error.message);
        }

    }



    //update doc based on two conditions and when it does not exist
    //when user clicks like button
    //this function toggles between add and removing wishlist from server
    const updateWishlistByAction = async() =>{
        try{
         
        if(!userMail){
            errorFeedback('Login to save an item')
            return false;
        }    

         const wishlistCollRef =  collection(db,"wishlist");
         const q = query(
            wishlistCollRef,
            where("product_id","==",id),
            where("email","==",userMail)
         )
         const querySnapshot = await getDocs(q);

         if (querySnapshot.empty) {
            //does not exist
            console.log("No matching documents found. Creating a new document...");

            //AUTO generate doc id
            const newDocRef = doc(wishlistCollRef);

            await setDoc(newDocRef,{
            "product_id":id,
            "email":userMail
            });


         }else{
            //exist delete matching field
            const updatePromises = querySnapshot.docs.map((docSnapshot) => {
                const docRef = doc(db, "wishlist", docSnapshot.id);
                return deleteDoc(docRef); // Delete the document
              });
        
              await Promise.all(updatePromises);
              console.log("Successfully removed specified field from matching documents.");
         }

         //refetch wishlist data
         getWishlistData();
         //update ui
         //updateWishlistStatusUI();
        

        

        }catch(error){
            console.error("Error removing field from documents:", error.message);


        }
    }

    
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
