import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const HorizontalCard = ({title,id,imgUrl,price,mode}) => {

return (
<div className='horizontal-card'>

<img  className='prod-img' src={imgUrl} alt=''/>

<div className='product-details-content' style={{display:mode == 'wishlist' ? 'flex ' : '',gap:'20px'}}>

<p className='title'>{title}</p>

<p className='pricing'>Ksh {price}</p>

</div>

{mode == 'cart' &&

<div className='quantity'>

<div className='set_quantity'>

<select class="form-select" aria-label="Default select example">
  <option selected value="1"> 1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
</select>

</div>

<div>
<p>Color: Red </p>
<p>Size: XL </p>    
</div>


</div>
}


<IoMdCloseCircle fontSize={25}/>


</div>
);
}

export default HorizontalCard;
