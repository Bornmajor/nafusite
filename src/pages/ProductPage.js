import React ,{useContext, useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaMinus,FaPlus  } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Catalogue from '../components/Catalogue';
import ProductCard from '../components/ProductCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import product_2 from '../assets/images/IMG_20241116_114701.jpg'
import product_3 from '../assets/images/IMG_20241116_115256.jpg'
import product_4 from '../assets/images/IMG_20241116_115343.jpg'
import { collection, getDoc,doc,query,where,getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';
import { useLocation } from 'react-router-dom';

const ProductPage = () => {
const params = useParams();

const [productLiked,setIsProductLiked] = useState(false);
const {errorFeedback,capitalizeFirstLetter}= useContext(MyContext);
const [product,setProduct] = useState(null);
const [similarProductsList,setSimilarProductsList] = useState([])
const location = useLocation();

//scroll up when user access this view
useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location.pathname]); // Trigger on route change

const toggleLikedBtn = () =>{
    setIsProductLiked(!productLiked)
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

    }

const productData = { id: docSnapshot.id, ...docSnapshot.data() };  // Include doc ID with data
console.log(productData);  // Log the product data

    // Use getCoverImage to get the cover image from product_images
const coverImage = getCoverImage(productData.product_images);

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

    setSimilarProductsList(updatedItems)


}catch(error){
    errorFeedback(`Something went wrong:${error.message}`);
    console.log(error.message);  
}
}

useEffect(()=>{
getProductById(params.prodId);
},[])

useEffect(()=>{
// fetchSimilarProducts(product.product_category) 
},[product]);


return (
    <>
    {product !== null ?
    <>
    
    <div className='d-flex flex-column align-items-center justify-content-center' >
<div className='product-page-container'>

{/* <p>{params.prodId}</p> */}

<div className='breadcrumb-nav'>

<Link className='nav-route'>
Home
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16}/>

<Link className='nav-route'>
{capitalizeFirstLetter(product.product_category)}
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16} />

<Link className='nav-route'>
{product.product_title}
</Link>

</div>


<div className='product-container'>

<div className='product-images-container'>

{product.coverImage && <img src={product.coverImage.imageLink} className='active-product-img' alt={product.name}  />}



<div className='alternative-imgs'>

{product.product_images.length > 1 &&
<>
{product.product_images.map((item)=> <img src={item.imageLink} className='non-active-product-img' alt="" />)}


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
{product.product_desc}   
</p>

<form className='product-form'>

{/* <div className='variants'>

<input type="radio" class="btn-check" name="color" id="option1" autocomplete="off" checked />
<label class="btn btn-outline-secondary" for="option1">Gold</label>

<input type="radio" class="btn-check" name="color" id="option2" autocomplete="off" />
<label class="btn btn-outline-secondary" for="option2">Silver</label>


</div> */}

{/* <div className='variants'>

<input type="radio" class="btn-check" name="size" id="L" autocomplete="off" checked />
<label class="btn btn-outline-secondary" for="L">L</label>

<input type="radio" class="btn-check" name="size" id="XL" autocomplete="off" />
<label class="btn btn-outline-secondary" for="XL">XL</label>

<input type="radio" class="btn-check" name="size" id="XXXL" autocomplete="off" />
<label class="btn btn-outline-secondary" for="XXXL">XXXL</label>


</div> */}

{/* <div className='quantity-container my-2'>

<div className='quantity'>

<button className='btn btn-secondary adjust-quantity-btn'>
<FaMinus size="14px" />
</button>

<input type="number" className='input-quantity' value="1"/> 

<button className='btn btn-secondary adjust-quantity-btn'>
<FaPlus size="14px"  />
</button>


</div>

</div> */}

<div className='action-btn-container '>

<button className='btn btn-primary'>Add to cart</button>
<button className='btn btn-outline-primary mx-2'>Buy Now</button>

<div className='wishlist-content'  onClick={toggleLikedBtn}>
{!productLiked ? 
<FaRegHeart size={24} color='#f29632' className='wishlist-icon mx-3' />
:    
<FaHeart size={24} color='#f29632' className='wishlist-icon mx-3'/>  
}

</div>

</div>
</form>


</div>



</div>



</div>
</div>
<div className='similar-products'>

{similarProductsList.length !== 0 &&
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
}




</div>
    </>


:
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'>Loading</p> 
   
</div>


}


    </>

);
}

export default ProductPage;
