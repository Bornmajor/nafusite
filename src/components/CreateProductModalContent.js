import React, { useContext } from 'react';
import MyContext from '../context/context';

const CreateProductModalContent = () => {
const { uploadProdTitle,uploadProdPrice,uploadProdDesc,uploadProdCategory,
setUploadProdTitle,setUploadProdPrice,setUploadProdDesc,
setUploadProdColor,uploadProdColor,setProdCategory,
} = useContext(MyContext);

return (
<form className=''>

<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Product name</label>
<input type="text"
className="form-control" 
id="exampleInputtext" 
aria-describedby="emailHelp" 
value={uploadProdTitle}
onChange={(e) => setUploadProdTitle(e.target.value) }
required
/>
</div>

<div className='d-flex my-2'>
<div class="form-check">
<input class="form-check-input"
type="radio"
name="color" 
value="gold"
onChange={(e)=> setUploadProdColor(e.target.value) }
id="flexRadioDefault1" />
<label class="form-check-label" for="flexRadioDefault1">
Gold
</label>
</div>

<div class="form-check mx-3">
<input class="form-check-input"
type="radio"
name="color"
value="black"
onChange={(e)=> setUploadProdColor(e.target.value) }
id="flexRadioDefault1" />
<label class="form-check-label" for="flexRadioDefault1">
Black
</label>
</div>

<div class="form-check">
<input class="form-check-input"
type="radio"
name="color"
value="white"
id="flexRadioDefault1" 
onChange={(e)=> setUploadProdColor(e.target.value) }
/>
<label class="form-check-label" for="flexRadioDefault1">
White
</label>
</div>




<div class="form-check mx-2">
<input class="form-check-input"
type="radio"
name="none"
value="none"
id="flexRadioDefault1" 
checked 
onChange={(e)=> setUploadProdColor(e.target.value) }
/>
<label class="form-check-label" for="flexRadioDefault1">
None
</label>
</div>

</div>

<div className="my-3">
<select class="form-select" aria-label="Default select example"
 name="category"
 onChange={(e) => setProdCategory(e.target.value)}
 >
  <option selected value="">Category</option>
  <option value="bracelets">Bracelets</option>
  <option value="necklace">Necklace</option>
  <option value="earrings">Earrings</option>
  <option value="bags">Bags</option>
</select>
</div>



<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Price</label>
<input type="number"
className="form-control"
id="exampleInputtext"
aria-describedby="emailHelp" 
value={uploadProdPrice}
onChange={(e) => setUploadProdPrice(e.target.value) }
required
/>
</div>

<div class="mb-3">
<label for="exampleFormControlTextarea1" className="form-label">Description</label>
<textarea className="form-control"
id="exampleFormControlTextarea1"
rows="3"
value={uploadProdDesc}
onChange={(e) => setUploadProdDesc(e.target.value) }
required
></textarea>
</div>

</form>
);
}

export default CreateProductModalContent;
