import React, { useContext, useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CatalogueSection from '../components/CatalogueSection';
import Catalogue from '../components/Catalogue';
import MainCategories from '../components/MainCategories';
import ProductCard from '../components/ProductCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import product_2 from '../assets/images/IMG_20241116_114701.jpg'
import product_3 from '../assets/images/IMG_20241116_115256.jpg'
import product_4 from '../assets/images/IMG_20241116_115343.jpg'
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
import { db } from '../firebase/firebaseConfig';
import { getDocs,collection, query, where } from 'firebase/firestore';
import MyContext from '../context/context';

const Home = () => {
   
    const {errorFeedback,listAllProducts,fetchAllProducts,contextHolder} = useContext(MyContext);

    const [necklaceList,setNecklaceList] = useState([]);
    const [bagsList,setBagList] = useState([]);
    const [braceletList,setBraceletList] = useState([]);
    const [ringList,setRingList] = useState([]);



const filterProductsByCategory = (category) =>{
    try{

        const filteredList = listAllProducts.filter((item) => item.product_category === category);

        return filteredList;
    }catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);

    }
}


const getNecklaceProducts = () =>{
    try{
        setNecklaceList(filterProductsByCategory('necklace'));       

    }catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);   
    }
    
}

const getBraceletsProducts = () =>{
    try{
        setBraceletList(filterProductsByCategory('bracelets'));       

    }catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);   
    }
    
}


const getRingsProducts = () =>{
    try{
        setRingList(filterProductsByCategory('earrings'));       

    }catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);   
    }
    
}

const getBagsProducts = () =>{
    try{
        setBagList(filterProductsByCategory('bags'));       

    }catch(error){
        errorFeedback(`Something went wrong:${error.message}`);
        console.log(error.message);   
    }
    
}
    


    useEffect(()=>{
    fetchAllProducts();
    },[]);

    useEffect(()=>{
        getNecklaceProducts();
        getBraceletsProducts();
        getRingsProducts();
        getBagsProducts();

    },[listAllProducts])

    return (
       <>
       {contextHolder}
       <HeroSection />
       <MainCategories />

       {listAllProducts.length !== 0 &&
       <Catalogue >
        {
         listAllProducts.map((item) => (
         <ProductCard id={item.id}
         width={`200px`}
         height={`200px`}
          img_url={item.coverImage.imageLink}
          title={item.product_title}
           price={item.product_price}
           />   
         ))    
        }

       </Catalogue>
       }

{necklaceList.length !== 0 &&
       <Catalogue title="Necklace" >
        {
         necklaceList.map((item) => (
         <ProductCard id={item.id}
         width={`200px`}
         height={`200px`}
          img_url={item.coverImage.imageLink}
          title={item.product_title}
           price={item.product_price}
           />   
         ))    
        }

       </Catalogue>
       }

{braceletList.length !== 0 &&
<Catalogue title="Bracelets" >
{
braceletList.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    
}

</Catalogue>
}


{ringList.length !== 0 &&
<Catalogue title="Earrings" >
{
ringList.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    
}

</Catalogue>
}

{bagsList.length !== 0 &&
<Catalogue title="Hand bags" >
{
bagsList.map((item) => (
<ProductCard id={item.id}
width={`200px`}
height={`200px`}
img_url={item.coverImage.imageLink}
title={item.product_title}
price={item.product_price}
/>   
))    
}

</Catalogue>
}
        




{/* <Catalogue title="Other category">
<ProductCard  img_url={product_1} title="Product 1" price="500"/>
<ProductCard  img_url={product_2} title="Product 2" price="500"/>
<ProductCard  img_url={product_3} title="Product 1" price="500"/>
<ProductCard  img_url={product_1} title="Product 1" price="500"/>
<ProductCard  img_url={product_2} title="Product 2" price="500"/>
<ProductCard  img_url={product_3} title="Product 1" price="500"/>
</Catalogue> */}

       <TestimonialSection />
       
   
       
       </>
    );
}

export default Home;
