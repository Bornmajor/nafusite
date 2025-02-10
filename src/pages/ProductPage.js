import React ,{useContext, useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaMinus,FaPlus  } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Catalogue from '../components/Catalogue';
import ProductCard from '../components/ProductCard';
import { collection, getDoc,doc,query,where,getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { Modal } from 'react-bootstrap';
import Description from '../components/Description';
import SkeletonCatalogue from '../components/SkeletonCatalogue';
import { BsCartXFill,BsCartCheckFill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RiFullscreenFill } from "react-icons/ri";

const ProductPage = () => {
const params = useParams();

const [productLiked,setIsProductLiked] = useState(false);
const [isCart,setIsCart] = useState(false);
const {errorFeedback,capitalizeFirstLetter,updateWishlistByAction,userMail,
    wishlistData,cartListData,removeProductCart,getCartProducts,
    successFeedback,contextHolder,updateLastUserActive

}= useContext(MyContext);

const [product,setProduct] = useState(null);
const [similarProductsList,setSimilarProductsList] = useState([])
const location = useLocation();
const [show, setShow] = useState(false);
const [quantity,setQuantity] = useState(1);
const [color,setColor] = useState('');
const [errorMessage,setErrorMessage] = useState('');
const [largeImage,setLargeImage] = useState('');

const updateLargeImage = (imageLink) => {
    setLargeImage(imageLink);
}

const toggleModal = ()=> {
    setShow(!show);

}

const incrementQuantity = () =>{
    if(quantity > 7){
     return false
    }else{
        setQuantity(quantity + 1)
    }
}

const decrementQuantity = () =>{
    if(quantity < 2){
     return false;
    }else{
        setQuantity(quantity - 1)
    }
}



//scroll up when user access this view
useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    // console.log(`Scroll page ${location.pathname} up`)
  }, [location.pathname]); // Trigger on route change

const toggleLikedBtn = () =>{
    setIsProductLiked(!productLiked)
    updateWishlistByAction(params.prodId)

}

const toggleCartBtn = () =>{
    setIsCart(!isCart);
   // toggleProductCart();
}

// Function to get the cover image from an array of images
const getCoverImage = (productImages) => {
    if (!productImages || productImages.length === 0) {
      return null; // Return null if productImages is empty or undefined
    }
  
    // Try to find an image with coverImg === "true"
    const coverImage = productImages.find((img) => img.coverImg === "true");
  
    // Return the coverImage if found, otherwise return the first image
    return coverImage || productImages[0];
  };

const getProductById = async(id) =>{

try{
const prodCollRef = collection(db,"products");

const docRef = doc(prodCollRef,id);
const docSnapshot  =  await getDoc(docRef);

if (!docSnapshot.exists()) {
    console.log(`No product found with the ID: ${id}`);
    setErrorMessage('Product does not exist!')
    return false;

    }

const productData = { id: docSnapshot.id, ...docSnapshot.data() };  // Include doc ID with data
console.log(productData);  // Log the product data

//update header title
document.title = productData.product_title;


    // Use getCoverImage to get the cover image from product_images
const coverImage = getCoverImage(productData.product_images);

 //set largeview image
 setLargeImage(coverImage.imageLink);

// Add coverImage to the product data
productData.coverImage = coverImage;


    
    setProduct(productData);
    fetchSimilarProducts(productData.product_category) 



}catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);
}

}

const fetchSimilarProducts = async(category)=>{
    try{
    const productCollectionRef = collection(db,"products");

    const q = query(productCollectionRef,where("product_category","==", category));

    const querySnaphot = await getDocs(q);

    const itemsArray = querySnaphot.docs.map((item) => ({
        id:item.id,
    ...item.data() 
    }
    ));

    const getCoverImage = (productImages) => {
        if (!productImages || productImages.length === 0) {
          return null; // Return null if productImages is empty or undefined
        }
      
        // Try to find an image with coverImg === "true"
        const coverImage = productImages.find((img) => img.coverImg === "true");
      
        // Return the coverImage if found, otherwise return the first image
        return coverImage || productImages[0];
      };

     // Map each product and include its selected cover image
const updatedItems = itemsArray.map((item) => ({
    ...item,
    coverImage: getCoverImage(item.product_images),
  }));

    //remove currrent itemon
    const updatedfilteredItems = updatedItems.filter((item) => item.id !== params.prodId);
    setSimilarProductsList(updatedfilteredItems)


}catch(error){
    errorFeedback(`Something went wrong:${error.message}`);
    console.log(error.message);  
}
}

useEffect(()=>{
getProductById(params.prodId);

},[params.prodId])


  //updates wishlist button when page loads
  const updateWishlistStatusUI = async() =>{
    try{
     //not login 
    if(!userMail){
      
        return false;
    }
  

   const wishlistExist = wishlistData.some(item => item.product_id == params.prodId && item.email == userMail);
   if(wishlistExist){
    
    setIsProductLiked(true)
   }else{
    setIsProductLiked(false)
   }

   console.log("Updating UI Product card wishlist..")
    // console.log(`Liked status for${id} is ${wishlistExist}`)
    }catch(error){
        console.error("Updating wishlist ui:", error.message);
    }

}

   const updateCartProductPageUI = () =>{
    if(!userMail){
        //user not login

        return false;
    }

    

    //check if user has product in their cart
     const productExistOnCart = cartListData.some(item => item.product_id == params.prodId && item.email == userMail);
     if(productExistOnCart){
        setIsCart(true)
     }else{
        setIsCart(false)
     }

   }


   useEffect(()=>{
    //uppdates ui on product page for cart btn if changes on cartListData
    updateCartProductPageUI()

   },[cartListData]);

   useEffect(()=>{
        updateWishlistStatusUI();
        // console.log('Product card renders')
    },[wishlistData]);

    //update userlast activetime on server
    const updateUserActivity = async() =>{

        if(userMail){
            await updateLastUserActive(userMail);
        }

    }

    useEffect(()=>{
        updateUserActivity();
    },[userMail]);

    //submit form for adding product to cart
    const submitCartForm = async(e) =>{
        try{
         e.preventDefault(); 

         toggleCartBtn();   
         toggleModal();
         
         //check user has login
         if(!userMail){
            return false;
         }

         await updateLastUserActive(userMail);
         
         const cartCollectionRef = collection(db,"cart");
         const newDocRef = doc(cartCollectionRef);

         

         await setDoc(newDocRef,{
         "product_id":params.prodId,
         quantity,"product_color":color,
         email:userMail,
         "product_price":product.product_price
         
         });

         successFeedback('Product added to cart');
         getCartProducts();


        }catch(error){
            console.log(`Add product cart error:${error.message}`)
        }
       




    }
    
    


return (
    <>
    {product !== null ?
    <>
    {contextHolder}
    <div className='' >
<div className='product-page-container'>

{/* <p>{params.prodId}</p> */}

<div className='breadcrumb-nav'>

<Link className='nav-route' to="/">
Home
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16}/>

<Link className='nav-route' to={`/category/${product.product_category}`}>
{capitalizeFirstLetter(product.product_category)}
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16} />

<Link className='nav-route'>
{product.product_title}
</Link>

</div>


<div className='product-container'>

<div className='product-images-container'>

{product.coverImage && 
<img src={largeImage} className='active-product-img' alt={product.name}  />  


}

{/* <img src={product.coverImage.imageLink} className='active-product-img' 
alt={product.name}  /> */}

<div className='alternative-imgs'>

{product.product_images.length > 1 &&
<>
{product.product_images.map((item)=> 
<img
src={item.imageLink} 
className={`non-active-product-img ${largeImage == item.imageLink && 'active-large-img'}`}
 alt={item.imageLink}
 onClick={() => updateLargeImage(item.imageLink)}
 />)}

</>

}

{/* <img src={product_1} className='non-active-product-img' />
<img src={product_1} className='non-active-product-img' />
<img src={product_1} className='non-active-product-img' /> */}

</div>

</div>


<div className='product-content'>

<p className='title my-2'>{product.product_title}</p>

<p className='pricing mb-2'>Ksh <span className='num'>{product.product_price}</span></p>

<p className='desc mb-4'>
<Description text={product.product_desc}  maxLength={200} />    
  
</p>

<div className='product-form'>



<div className='action-btn-container '>

{!product.isStock ?

<button className='btn btn-danger product-action-btn' disabled> <MdRemoveShoppingCart /> Out of stock</button>
:

!isCart ?

userMail ?

<button className='btn btn-primary product-action-btn' onClick={toggleModal}>
    <span className='d-flex align-items-center justify-content-center gap-10'>
   <BsCartCheckFill />
    Add to cart
    </span>
   
 </button>
:
<button className='btn btn-primary product-action-btn' onClick={() => errorFeedback('Login to add product to your cart')}>Add to cart</button>
:
<button className='btn btn-outline-primary product-action-btn' onClick={() => 
    {
     toggleCartBtn();
    removeProductCart(params.prodId) }    
    } >
        <span className='d-flex align-items-center justify-content-center gap-10'>
    <BsCartXFill />   
    Remove from cart   
        </span>
   
    </button>

}    



{/* <button className='btn btn-primary' onClick={()=> toggleCartBtn()}><FaCheck /> Added to cart</button> */}





{/* <button className='btn btn-outline-primary mx-2'>Buy Now</button> */}

<div className='wishlist-content'  onClick={toggleLikedBtn}>
{!productLiked ? 
<FaRegHeart size={24} color='#f29632' className='wishlist-icon mx-3' />
:    
<FaHeart size={24} color='#f29632' className='wishlist-icon mx-3'/>  
}

</div>

</div>

</div>


</div>



</div>



</div>
</div>
<div className='similar-products'>

{similarProductsList.length !== 0 ?

<Catalogue title="Similar products">
{
similarProductsList.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    
}

</Catalogue>

:
<SkeletonCatalogue />
}




</div>
    </>


:
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'> {!errorMessage ? 'Loading': errorMessage }</p> 
   
</div>


}


<Modal show={show} onHide={toggleModal}>
<Modal.Header style={{border:'none'}} closeButton>
<Modal.Title>Select variants</Modal.Title>
</Modal.Header>
<Modal.Body>

<form onSubmit={submitCartForm}>

<div className='container-group-form-variants mb-4'>
<div className='variants'>

{
product !== null  && (
product.product_color.length !== 0 &&

product.product_color.map((item) => (
<>
<input type="radio"
onChange={(e)=> setColor(e.target.value)}
 className="btn-check"
 name="product_color" value={item} id={item} autocomplete="off" required/>
<label
  className={`btn ${
    item == 'gold'
      ? 'btn-outline-warning'
      : item == 'black'
      ? 'btn-outline-secondary'
      : item == 'white'
      ? 'btn-outline-secondary'
      : '' // Default case if no condition matches
  }  `}
  htmlFor={item}
>
  {capitalizeFirstLetter(item)}
</label>
</>    
))    
)    




}       



</div>    

<div className='quantity-container my-2'>

<div className='quantity'>

<button className='btn btn-primary adjust-quantity-btn' onClick={decrementQuantity} type='button'>
<FaMinus size="12px" />
</button>

<input type="number" className='input-quantity' value={quantity} required/> 

<button className='btn btn-primary adjust-quantity-btn'  onClick={incrementQuantity} type='button'>
<FaPlus size="12px"  />
</button>


</div>

</div>

</div>


<button className="btn btn-primary my-4 w-100" type='submit'>Add to cart</button>

</form> 




</Modal.Body>

</Modal>

    </>

);
}

export default ProductPage;
