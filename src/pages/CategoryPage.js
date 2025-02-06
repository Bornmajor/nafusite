import React,{useContext, useEffect, useState} from 'react';
import empty_list_img from '../assets/images/empty_list.png'
import ProductCard from '../components/ProductCard';
import { Sheet } from 'react-modal-sheet';
import { FaFilter } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { collection,query,getDocs,where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';


const CategoryPage = () => {
const [isOpen, setOpen] = useState(false);
const [listProducts,setListProducts] = useState([]);
const {errorFeedback} = useContext(MyContext)
const params = useParams();
const [sortBy,setSortBy] = useState('');
const [category,setCategory] = useState(params.category);
const [colorItems,setColorItems] = useState([]);
const [filterListItems,setFilteredListItems] = useState([]);
const navigate = useNavigate();
const [isPageLoading,setIsPageLoading] = useState(true);



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
  setFilteredListItems(updatedItems)
  console.log(updatedItems);

  //set page loader to off
  setIsPageLoading(false);



}catch(error){
    errorFeedback(`Something went wrong:${error.message}`);
    console.log(error.message);  

      //set page loader to off
  setIsPageLoading(false);
}
}

useEffect(()=>{
fetchProductsByCategory(params.category);
},[params.category]);


const handleCheckboxChange = (value) => {
    
  setColorItems((prevSelected) => {
    if (prevSelected.includes(value)) {
      // If the value is already in the array, remove it
      return prevSelected.filter((item) => item !== value);
    } else {
      // Otherwise, add the value to the array
      return [...prevSelected, value];
    }
  });




};


const applyFilters = () => {

  //close sheet 
  setOpen(false);
   const filters = 
    {
      category:params.category,  // Only show necklaces
      sortBy: sortBy,       // Sort by price descending
      color: colorItems   
    }
 

    const filteredList = listProducts
    .filter(product => {
        // Filter by selected colors (ensure product_color exists)
        if (filters.color.length > 0 && product.product_color) {
            const hasMatchingColor = filters.color.some(color => product.product_color.includes(color));
            if (!hasMatchingColor) return false;
        }
        return true;
    })
    .sort((a, b) => {
        // Sorting by price (descending) if available
        if (filters.sortBy === "price") {
            return Number(b.product_price || 0) - Number(a.product_price || 0);
        }
        // Sorting by name (ascendin)
        if (filters.sortBy === "name") {
            return (a.product_title || "").localeCompare(b.product_title || "");
        }
        return 0; // No sorting
    });
 
 setFilteredListItems(filteredList);
      console.log(filteredList)
};

const clearFilters = () =>{

    //close sheet 
    setOpen(false);

  //reset sort_by and colors array

  setSortBy('');
  setColorItems([]);
  setFilteredListItems(listProducts)
  
}



//update category
useEffect(()=>{
navigate(`/category/${category}`)
},[category])



return (
<div className='category-page-container'>

<Sheet isOpen={isOpen}
onClose={() => setOpen(false)}
detent='content-height'
className='filter-bottom-tab'>
<Sheet.Container>
<Sheet.Header />
<Sheet.Content className='content-body'>
    
<div name='sheet-bottom-form'>


<div className='select-container'>
{/* <label className='bold'>Sort by</label> */}
<select
 className="form-select my-3"
 aria-label="Default select example"
 onChange={(e) => setSortBy(e.target.value)}
 >
<option value="" selected={sortBy == ''}>Sort by</option>
<option value="price" selected={sortBy == 'price'}>Price</option>
<option value="name" selected={sortBy == 'name'}>Name</option>
</select>

</div>


<div className='category-list'>

<div className="form-check">
<input className="form-check-input"
 type="radio"
 name="category"
 id="flexRadioDefault1"
 value="necklace"
 onChange={(e) => setCategory(e.target.value)}
 checked={category == 'necklace'}
 />
<label className="form-check-label" for="flexRadioDefault1">
Necklace
</label>
</div>

<div className="form-check">
<input
 className="form-check-input"
  type="radio"
   name="category"
   id="flexRadioDefault1"
   value="bracelets"
   onChange={(e) => setCategory(e.target.value)}
   checked={category == 'bracelets'}
   />
<label className="form-check-label" for="flexRadioDefault1">
Bracelets
</label>
</div>

<div className="form-check">
<input
className="form-check-input"
type="radio"
name="category"
id="flexRadioDefault1"
value="earrings"
onChange={(e) => setCategory(e.target.value)}
checked={category == 'earrings'}
/>
<label className="form-check-label" for="flexRadioDefault1">
Earrings
</label>
</div>

<div className="form-check">
<input
 className="form-check-input"
type="radio"
name="category"
id="flexRadioDefault1"
value="bags"
onChange={(e) => setCategory(e.target.value)}
checked={category == 'bags'}
    />
<label className="form-check-label" for="flexRadioDefault1">
Bags
</label>
</div>

</div>

<div className='variant-group '>

<div className='variants my-3'>

<input
type="checkbox"
className="btn-check"
name="color"
id="gold-sm"
autocomplete="off" 
value="gold"
onChange={(e)=> handleCheckboxChange('gold') }

/>
<label className="btn btn-outline-primary font-14" for="gold-sm">Gold</label>

<input
type="checkbox"
className="btn-check"
name="color"
id="white-sm"
autocomplete="off"
value="white"
onChange={(e)=> handleCheckboxChange('white') }
/>
<label className="btn btn-outline-primary  font-14 mx-2" for="white-sm">
  White
  </label>

<input
 type="checkbox"
className="btn-check"
name="color"
id="black-sm"
autocomplete="off"
value="black"
onChange={(e)=> handleCheckboxChange('black') }

     />
<label className="btn btn-outline-primary  font-14 " for="black-sm">Black</label>

</div>


</div>

<div className='action-group my-3'>

<button type='submit' className='btn btn-primary apply-btn w-75' onClick={() => applyFilters()}>Apply</button>
<button className='btn btn-outline-primary clear-btn mx-2' onClick={() => clearFilters()}>Clear</button>

</div>

</div>




</Sheet.Content>
</Sheet.Container>
<Sheet.Backdrop onTap={() => setOpen(false)}  />
</Sheet>


<div className='filter-menu'>

<div name="form-1">

{/* <input className="form-control" 
type="text"
placeholder="Search product..." aria-label="Search product..."
/> */}

<div className='select-container'>
{/* <label className='bold'>Sort by</label> */}
<select
 className="form-select my-3"
 aria-label="Default select example"
 onChange={(e) => setSortBy(e.target.value)}
 >
<option value="" selected={sortBy == ''}>Sort by</option>
<option value="price" selected={sortBy == 'price'}>Price</option>
<option value="name" selected={sortBy == 'name'}>Name</option>
</select>

</div>



<div className='category-list'>

<div className="form-check">
<input className="form-check-input"
 type="radio"
 name="category"
 id="flexRadioDefault1"
 value="necklace"
 onChange={(e) => setCategory(e.target.value)}
 checked={category == 'necklace'}
 />
<label className="form-check-label" for="flexRadioDefault1">
Necklace
</label>
</div>

<div className="form-check">
<input
 className="form-check-input"
  type="radio"
   name="category"
   id="flexRadioDefault1"
   value="bracelets"
   onChange={(e) => setCategory(e.target.value)}
   checked={category == 'bracelets'}
   />
<label className="form-check-label" for="flexRadioDefault1">
Bracelets
</label>
</div>

<div className="form-check">
<input
className="form-check-input"
type="radio"
name="category"
id="flexRadioDefault1"
value="earrings"
onChange={(e) => setCategory(e.target.value)}
checked={category == 'earrings'}
/>
<label className="form-check-label" for="flexRadioDefault1">
Earrings
</label>
</div>

<div className="form-check">
<input
 className="form-check-input"
type="radio"
name="category"
id="flexRadioDefault1"
value="bags"
onChange={(e) => setCategory(e.target.value)}
checked={category == 'bags'}
    />
<label className="form-check-label" for="flexRadioDefault1">
Bags
</label>
</div>

</div>

<div className='variant-group '>

<div className='variants my-3'>

<input
type="checkbox"
className="btn-check"
name="color"
id="gold"
autocomplete="off" 
value="gold"
onChange={(e)=> handleCheckboxChange('gold') }

/>
<label className="btn btn-outline-primary font-14" for="gold">Gold</label>

<input
type="checkbox"
className="btn-check"
name="color"
id="white"
autocomplete="off"
value="white"
onChange={(e)=> handleCheckboxChange('white') }
/>
<label className="btn btn-outline-primary  font-14 mx-2" for="white">
  White
  </label>

<input
 type="checkbox"
className="btn-check"
name="color"
id="black"
autocomplete="off"
value="black"
onChange={(e)=> handleCheckboxChange('black') }

     />
<label className="btn btn-outline-primary  font-14 " for="black">Black</label>

</div>


</div>

<div className='action-group my-3'>

<button className='btn btn-primary apply-btn' onClick={() => applyFilters()}>Apply</button>
<button className='btn btn-outline-primary clear-btn mx-2' onClick={() => clearFilters()}>Clear</button>

</div>

</div>



</div>

<div className='result-container'>

<div className='filter-menu-btn'>
<button className='btn btn-primary my-2' onClick={() => setOpen(true)}>
<FaFilter /> Filter menu     
</button>    
</div>

{filterListItems.length !== 0 ?

filterListItems.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    

:


isPageLoading ?

<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'>Loading</p> 
   
</div>

 
:

<div className='d-flex align-items-center p-3 flex-column inner-loader' >
<img src={empty_list_img} width={'150px'}   alt="No items"/>  <p className='bold mx-2'>No items</p> 
   
</div>


}




</div>

</div>
);
}

export default CategoryPage;
