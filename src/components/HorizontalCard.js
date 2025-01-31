import React, { useContext } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import MyContext from '../context/context';

const HorizontalCard = ({title,id,imgUrl,price,mode,quantity,color}) => {
  const {updateWishlistByAction,removeProductCart } = useContext(MyContext)

return (
<div className='horizontal-card'  key={id}>

<Link to={`/product/${id}`}>
<img  className='prod-img' src={imgUrl} alt=''/>
</Link>




<Link to={`/product/${id}`} className='product-details-content'>
<p className='title text-truncate '>{title}</p>

<p className='pricing bold'>Ksh {price}</p>

{mode == 'cart' &&

<div className='quantity'>
  {color &&
 <p> <span className='text-muted'>Color:</span> <span>{color}</span></p> 
  }

<p> <span className='text-muted'>Quantity:</span> <span>{quantity}</span></p>
{/* <p>1</p> <p></p> */}

</div>

}
</Link>





{mode == 'cart' ?
//if cart mode
<span onClick={() => removeProductCart(id) }>
<IoMdCloseCircle fontSize={30} />
</span>
:
//if wishist mode
<span onClick={() => updateWishlistByAction(id,'remove')}>
<IoMdCloseCircle fontSize={30}/>
</span>

}







</div>
);
}

export default HorizontalCard;
