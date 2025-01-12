import React from 'react';
import HorizontalCard from './HorizontalCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'

const CartModalContent = () => {
    return (
        <div className=''>
            <HorizontalCard id="1" mode="cart" title="Product 1" imgUrl={product_1} price="200"/>
            <HorizontalCard id="1" mode="cart" title="Product 1" imgUrl={product_1} price="200"/>

            
        </div>
    );
}

export default CartModalContent;
