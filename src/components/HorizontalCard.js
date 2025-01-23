import React, { useContext } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import MyContext from '../context/context';

const HorizontalCard = ({title,id,imgUrl,price,mode}) => {
  const {updateWishlistByAction} = useContext(MyContext)

return (
<div className='horizontal-card' key={id}>

<a href={`/product/${id}`}>
<img  className='prod-img' src={imgUrl} alt=''/>
</a>




<a href={`/product/${id}`} className='product-details-content'>
<p className='title text-truncate bold'>{title}</p>

<p className='pricing'>Ksh {price}</p>

{mode == 'cart' &&

<div className='quantity'>

<p>1</p> <p>Red </p>

</div>

}
</a>





{mode == 'cart' ?
//if cart mode
<Link >
<IoMdCloseCircle fontSize={30}/>
</Link>
:
//if wishist mode
<Link onClick={() => updateWishlistByAction(id)}>
<IoMdCloseCircle fontSize={30}/>
</Link>

}





</div>
);
}

export default HorizontalCard;
