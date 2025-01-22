import React,{useContext, useEffect, useState} from 'react';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import product_2 from '../assets/images/IMG_20241116_114701.jpg'
import product_3 from '../assets/images/IMG_20241116_115256.jpg'
import product_4 from '../assets/images/IMG_20241116_115343.jpg'
import ProductCard from '../components/ProductCard';
import { Sheet } from 'react-modal-sheet';
import { FaFilter } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { collection,query,getDocs,where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';


const CategoryPage = () => {
const [isOpen, setOpen] = useState(false);
const [listProduct,setListProducts] = useState([]);
const {errorFeedback} = useContext(MyContext)
const params = useParams();


const fetchProductsByCategory = async(category)=>{
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

  setListProducts(updatedItems);
  console.log(updatedItems);


}catch(error){
    errorFeedback(`Something went wrong:${error.message}`);
    console.log(error.message);  
}
}

useEffect(()=>{
fetchProductsByCategory(params.category)
},[params.category]);





return (
<div className='category-page-container'>

<Sheet isOpen={isOpen}
onClose={() => setOpen(false)}
detent='content-height'
className='filter-bottom-tab'>
<Sheet.Container>
<Sheet.Header />
<Sheet.Content className='content-body'>
    
<form name='sheet-bottom-form'>
<input className="form-control" 
type="text"
placeholder="Search product..." aria-label="Search product..."
/>

<select className="form-select my-2" aria-label="Default select example">
<option selected>Sort by</option>
<option value="1">Name</option>
<option value="2">Price</option>
<option value="3">Popularity</option>
</select>


<div className='category-list'>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Rings
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Bracelets
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Earrings
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Bags
</label>
</div>

</div>

<div className='variant-group '>

<div className='variants my-2'>

<input type="radio" className="btn-check " name="color" id="option1" autocomplete="off" checked />
<label className="btn btn-outline-secondary" for="option1">Gold</label>

<input type="radio" className="btn-check" name="color" id="option2" autocomplete="off" />
<label className="btn btn-outline-secondary  mx-2" for="option2">Silver</label>


</div>

<div className='variants'>

<input type="radio" className="btn-check" name="size" id="L" autocomplete="off" checked />
<label className="btn btn-outline-secondary" for="L">L</label>

<input type="radio" className="btn-check" name="size" id="XL" autocomplete="off" />
<label className="btn btn-outline-secondary mx-2" for="XL">XL</label>

<input type="radio" className="btn-check" name="size" id="XXXL" autocomplete="off" />
<label className="btn btn-outline-secondary mx-2" for="XXXL">XXXL</label>


</div>

</div>

<div className='action-group my-3'>

<button type='submit' className='btn btn-primary apply-btn'>Apply</button>
<button className='btn btn-outline-primary clear-btn mx-2'>Clear</button>

</div>

</form>




</Sheet.Content>
</Sheet.Container>
<Sheet.Backdrop onTap={() => setOpen(false)}  />
</Sheet>


<div className='filter-menu'>

<form name="form-1">

<input className="form-control" 
type="text"
placeholder="Search product..." aria-label="Search product..."
/>

<select className="form-select my-2" aria-label="Default select example">
<option selected>Sort by</option>
<option value="1">Name</option>
<option value="2">Price</option>
<option value="3">Popularity</option>
</select>


<div className='category-list'>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Rings
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Bracelets
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Earrings
</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="category" id="flexRadioDefault1" />
<label className="form-check-label" for="flexRadioDefault1">
Bags
</label>
</div>

</div>

<div className='variant-group '>

<div className='variants my-2'>

<input type="radio" className="btn-check " name="color" id="option1" autocomplete="off" checked />
<label className="btn btn-outline-secondary" for="option1">Gold</label>

<input type="radio" className="btn-check" name="color" id="option2" autocomplete="off" />
<label className="btn btn-outline-secondary  mx-2" for="option2">Silver</label>


</div>


</div>

<div className='action-group my-3'>

<button className='btn btn-primary apply-btn'>Apply</button>
<button className='btn btn-outline-primary clear-btn mx-2'>Clear</button>

</div>

</form>





</div>

<div className='result-container'>

<div className='filter-menu-btn'>
<button className='btn btn-primary my-2' onClick={() => setOpen(true)}>
<FaFilter /> Filter menu     
</button>    
</div>

{listProduct.length !== 0 ?

listProduct.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    

:
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'>Loading</p> 
   
</div>

}




</div>

</div>
);
}

export default CategoryPage;
