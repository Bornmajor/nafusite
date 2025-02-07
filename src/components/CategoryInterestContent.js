import React, { useEffect, useState } from 'react';
import appLogo from '../assets/images/new_logo.png'

const CategoryInterestContent = ({categoryList,setCategoryList,handleCheckboxChange}) => {
  


  useEffect(()=>{
  console.log(categoryList)
  },[categoryList])
  

return (
<div  className=''>

<img src={appLogo} alt='App logo' width={'100px'}/>

<p className='bold  mb-2'>What are you interested in?</p>

<div className='horizontal-scrollable  my-3' style={{paddingLeft:0}}>

<input
type="checkbox"
className="btn-check"
name="color"
id="rings"
autocomplete="off" 
value="earrings"
onChange={(e) => handleCheckboxChange(e.target.value)}
checked={categoryList.includes('earrings')}
/>
<label className="btn btn-outline-primary category-checkbox-onboard-btn" for="rings">Rings</label>

<input
type="checkbox"
className="btn-check"
name="color"
id="bracelets"
autocomplete="off" 
value="bracelets"
onChange={(e) => handleCheckboxChange(e.target.value)}
checked={categoryList.includes('bracelets')}
/>
<label className="btn btn-outline-primary category-checkbox-onboard-btn" for="bracelets">Bracelets</label>


<input
type="checkbox"
className="btn-check"
name="color"
id="bags"
autocomplete="off" 
value="bags"
onChange={(e) => handleCheckboxChange(e.target.value)}
checked={categoryList.includes('bags')}
/>
<label className="btn btn-outline-primary category-checkbox-onboard-btn " for="bags">Hand bags</label>

<input
type="checkbox"
className="btn-check"
name="color"
id="necklace"
autocomplete="off" 
value="necklace"
onChange={(e) => handleCheckboxChange(e.target.value)}
checked={categoryList.includes('necklace')}
/>
<label className="btn btn-outline-primary category-checkbox-onboard-btn" for="necklace">Necklace</label>


</div>

</div>
);
}

export default CategoryInterestContent;
