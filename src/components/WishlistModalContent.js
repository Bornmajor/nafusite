import React, { useContext, useEffect, useState } from 'react';
import HorizontalCard from './HorizontalCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import MyContext from '../context/context';

const WishlistModalContent = () => {

 

    const {currentUserWishlist,contextHolder} = useContext(MyContext);



    return (
        <div className=''>
            {contextHolder}

            {
                currentUserWishlist.length !== 0 ?
                currentUserWishlist.map((item) => (
                                           
                <HorizontalCard 
                id={item.id}
                mode="wishlist" 
                title={item.product_title}
                imgUrl={item.coverImage.imageLink}
                price={item.product_price}
                />
                   
                ))
                
                  
                :
                <p className='text-center bold p-3'>No saved items</p>


            }

          
            {/* <HorizontalCard id="1" mode="wishlist" title="Product 1" imgUrl={product_1} price="200"/>
            <HorizontalCard id="1" mode="wishlist" title="Product 1" imgUrl={product_1} price="200"/> */}


            
            
        </div>
    );
}

export default WishlistModalContent;
