import React ,{useState}from 'react';
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

const ProductPage = () => {
const params = useParams();

const [productLiked,setIsProductLiked] = useState(false);

const toggleLikedBtn = () =>{
    setIsProductLiked(!productLiked)
}


return (
    <>
    <div className='product-page-container'>

{/* <p>{params.prodId}</p> */}

<div className='breadcrumb-nav'>

<Link className='nav-route'>
Home
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16}/>

<Link className='nav-route'>
Category
</Link>

<MdOutlineArrowForwardIos className='route-icon' size={16} />

<Link className='nav-route'>
Product Name
</Link>

</div>


<div className='product-container'>

<div className='product-images-container'>

<img src={product_1} className='active-product-img' />

<div className='alternative-imgs'>

<img src={product_1} className='non-active-product-img' />
<img src={product_1} className='non-active-product-img' />
<img src={product_1} className='non-active-product-img' />
<img src={product_1} className='non-active-product-img' />

</div>

</div>


<div className='product-content'>

<p className='title my-2'>Product title</p>

<p className='pricing mb-2'>Ksh <span className='num'>500</span></p>

<p className='desc mb-4'>
Crafted in stunning 9-carat yellow gold, 
this ring bears the timeless message of 
affection with its engraved declaration: "I Love You".    
</p>

<form className='product-form'>

<div className='variants'>

<input type="radio" class="btn-check" name="color" id="option1" autocomplete="off" checked />
<label class="btn btn-outline-secondary" for="option1">Gold</label>

<input type="radio" class="btn-check" name="color" id="option2" autocomplete="off" />
<label class="btn btn-outline-secondary" for="option2">Silver</label>


</div>

<div className='variants'>

<input type="radio" class="btn-check" name="size" id="L" autocomplete="off" checked />
<label class="btn btn-outline-secondary" for="L">L</label>

<input type="radio" class="btn-check" name="size" id="XL" autocomplete="off" />
<label class="btn btn-outline-secondary" for="XL">XL</label>

<input type="radio" class="btn-check" name="size" id="XXXL" autocomplete="off" />
<label class="btn btn-outline-secondary" for="XXXL">XXXL</label>


</div>

<div className='quantity-container my-2'>

<div className='quantity'>

<button className='btn btn-secondary adjust-quantity-btn'>
<FaMinus size="14px" />
</button>

<input type="number" className='input-quantity' value="1"/> 

<button className='btn btn-secondary adjust-quantity-btn'>
<FaPlus size="14px"  />
</button>


</div>

</div>

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

<div className='similar-products'>

<Catalogue title="Similar products">
<ProductCard id="1" img_url={product_1} title="Product 1" price="500"/>
<ProductCard id="2" img_url={product_2} title="Product 2" price="500"/>
<ProductCard id="3" img_url={product_3} title="Product 1" price="500"/>
<ProductCard id="4" img_url={product_1} title="Product 1" price="500"/>
<ProductCard id="5" img_url={product_2} title="Product 2" price="500"/>
<ProductCard id="6" img_url={product_3} title="Product 1" price="500"/>
</Catalogue>

</div>

    </>

);
}

export default ProductPage;
