import React from 'react';
import CategoryCard from './CategoryCard';
import ringImg from '../assets/images/icons8-wedding-rings-100.png'
import braceletImg from '../assets/images/icons8-bracelet-90.png'
import bagImg from '../assets/images/icons8-bag-100.png'
import necklaceImg from '../assets/images/icons8-necklace-100.png'

const MainCategories = () => {
    return (
        <div className='major-product-categories'>          
          
          <CategoryCard title="Rings" imgUrl={ringImg} category="rings"/>
          <CategoryCard title="Bracelets" imgUrl={braceletImg} category="bracelets"/>
          <CategoryCard title="Bags" imgUrl={bagImg} category="bags"/>
          <CategoryCard title="Necklace" imgUrl={necklaceImg} category="necklace"/>

            
        </div>
    );
}

export default MainCategories;
