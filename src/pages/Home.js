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
    const [listAllProducts,setListAllProducts] =useState([]);
    const {errorFeedback} = useContext(MyContext);

    const [necklaceList,setNecklaceList] = useState([]);
    const [bagsList,setBagList] = useState([]);
    const [braceletList,setBraceletList] = useState([]);
    const [ringList,setRingList] = useState([]);



    const fetchAllProducts = async() =>{
        try{
        const querySnaphot = await getDocs(collection(db,"products"));
        const itemsArray = querySnaphot.docs.map((doc) => (
            {
                id:doc.id,
                ...doc.data()
            }
        ));
        const getCoverImage = (productImages) => {
            if (!productImages || productImages.length === 0) {
              return null; // Return null if productImages is empty or undefined
            }
          
            // Try to find an image with coverImg === "true"
            const coverImage = productImages.find((img) => img.coverImg === "true");
          
            // Return the coverImage if found, otherwise return the first image
            return coverImage || productImages[0];
          };

         // Map each product and include its selected cover image
    const updatedItems = itemsArray.map((item) => ({
        ...item,
        coverImage: getCoverImage(item.product_images),
      }));

      setListAllProducts(updatedItems);


        }catch(error){
            errorFeedback(`Something went wrong:${error.message}`);
            console.log(error.message);

        }

    }
    // const fetchProductsByCategory = async(category) =>{
    //     try{
    //         const productCollectionRef = collection(db,"products");

    //         const q = query(productCollectionRef,where("product_color","==", category));

    //         const querySnaphot = await getDocs(q);

    //        const itemsArray = querySnaphot.docs((item) => ({
    //           id:item.id,
    //         ...item.data() 
    //        }
    //        ));

    //        return itemsArray;



    //     }catch(error){
    //         errorFeedback(`Something went wrong:${error.message}`);
    //         console.log(error.message);  
    //     }

    // }

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
