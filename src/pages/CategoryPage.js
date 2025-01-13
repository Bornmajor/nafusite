import React,{useState} from 'react';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import product_2 from '../assets/images/IMG_20241116_114701.jpg'
import product_3 from '../assets/images/IMG_20241116_115256.jpg'
import product_4 from '../assets/images/IMG_20241116_115343.jpg'
import ProductCard from '../components/ProductCard';
import { Sheet } from 'react-modal-sheet';
import { FaFilter } from "react-icons/fa6";


const CategoryPage = () => {
const [isOpen, setOpen] = useState(false);
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




<ProductCard id="1" img_url={product_1} title="Product 1" price="500"/>
<ProductCard id="2" img_url={product_2} title="Product 2" price="500"/>
<ProductCard id="3" img_url={product_3} title="Product 1" price="500"/>
<ProductCard id="4" img_url={product_1} title="Product 1" price="500"/>
<ProductCard id="5" img_url={product_2} title="Product 2" price="500"/>
<ProductCard id="6" img_url={product_3} title="Product 1" price="500"/>



</div>

</div>
);
}

export default CategoryPage;
