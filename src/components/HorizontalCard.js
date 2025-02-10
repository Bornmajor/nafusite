import React, { useState,useContext, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import MyContext from '../context/context';
import { FaMinus,FaPlus  } from "react-icons/fa";
import { Alert } from 'antd';
import { IoMdPricetag } from "react-icons/io";
import { IoColorPalette } from "react-icons/io5";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { GoNoEntry } from "react-icons/go";

const HorizontalCard = ({title,prod_id,imgUrl,price,mode,quantity,color,cart_id,isStock}) => {
  const {updateWishlistByAction,removeProductCart ,errorFeedback,contextHolder,successFeedback,getCartProducts} = useContext(MyContext);
 const [productQuantity,setProductQuantity] = useState(quantity);
 const [isQuantityChange,setIsQuantityChange] = useState(0);


  const incrementQuantity = () =>{

    if(productQuantity > 7){
     return false
    }else{
        setProductQuantity(productQuantity + 1);
        //tracks changes in quantiy
        setIsQuantityChange(productQuantity + 1)

       // updateQuantityCart(cart_id);
    }


}

const decrementQuantity = () =>{
    if(productQuantity < 2){
     return false;
    }else{
        setProductQuantity(productQuantity - 1)
           //tracks changes in quantiy
           setIsQuantityChange(productQuantity - 1)
        // console.log(productQuantity);
      //  updateQuantityCart(cart_id);
    }
}



const updateQuantityCart = async(prod_id) =>{
  try{

    // if(!prod_id){
    //   return false;
    // }
    //console.log(prod_id)

    const docRef = doc(db,"cart",prod_id);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){

      console.log(productQuantity)
      //if exist

     await updateDoc(docRef,{
        quantity:productQuantity
      });

    console.log('Updated product quantity')

    //refretch cart product
 getCartProducts()


    }else{
      console.log(`Id does not exist:${prod_id}`)
    }

    
  }catch(error){
    console.log(`Failed to update quantity cart:${error}`);
    errorFeedback(`Failed to update quantity cart`)

  }
}

useEffect(()=>{

  //only run code when there are changes in quantity
  if(mode == 'cart'){
    updateQuantityCart(cart_id);   
  }



 
},[productQuantity])


return (
<div className={`horizontal-card  `}  key={prod_id}>
{contextHolder}
<div  className={`d-flex flex-column  gap-30 ${ mode == 'cart' && (!isStock && 'blurred-product-card') }`}>
<Link to={`/product/${prod_id}`} >
<img  className='prod-img' src={imgUrl} alt={imgUrl} />  
</Link>

{mode == 'cart' &&

<>
 <span className='app-link clickable-item  bold cart-remove-sm ' onClick={() => removeProductCart(prod_id) }>Remove</span>



</>
 
}


</div>




<div className={`product-details-content ${ mode == 'cart' && (!isStock && 'blurred-product-card') }`}>

<Link to={`/product/${prod_id}`} className='d-flex flex-column gap-20'>
<p className='title text-truncate '>{title}</p>
{mode == 'cart' &&

color &&
<>
<Alert className='alert-cart-color-tag' message={color} type="warning" showIcon  icon={<IoColorPalette />}/>
{/* <p> <span className='text-muted'>Color:</span> <span>{color}</span></p>  */}
</>

}


{
  mode == 'cart' &&
!isStock
&&
<p className='out-of-stock-message text-danger'> <GoNoEntry /> Out of stock</p>
}

</Link>

<div className='d-flex flex-column gap-20'>


<Link to={`/product/${prod_id}`} className='pricing bold'>
  <span>Ksh {price}</span>
  </Link> 

{mode == 'cart' &&

<div className='cart-quantity-container'>



  
  <button className='btn btn-primary adjust-quantity-btn' onClick={decrementQuantity} type='button'>
  <FaMinus size="10px" />
  </button>
  
  <input type="number" className='input-quantity' value={productQuantity} required/> 
  
  <button className='btn btn-primary adjust-quantity-btn'  onClick={incrementQuantity} type='button'>
  <FaPlus size="10px"  />
  </button>
  

{/* <p> <span className='text-muted'>Quantity:</span> <span>{quantity}</span></p> */}
{/* <p>1</p> <p></p> */}

</div>

}
</div>



</div>





{mode == 'cart' ?
//if cart mode
<span className='delete-horizontal-icon' onClick={() => removeProductCart(prod_id) }>
<IoMdCloseCircle fontSize={30} />
</span>
:
//if wishist mode
<span  onClick={() => updateWishlistByAction(prod_id,'remove')}>
<IoMdCloseCircle fontSize={30}/>
</span>

}







</div>
);
}

export default HorizontalCard;
