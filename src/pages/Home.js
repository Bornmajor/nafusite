import React from 'react';
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

const Home = () => {
    return (
       <>
       <HeroSection />
       <MainCategories />

       <Catalogue title="For You">
        <ProductCard  img_url={product_1} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
        <ProductCard  img_url={product_1} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
       </Catalogue>


       <Catalogue title="Other category">
        <ProductCard  img_url={product_4} title="Product 1" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_1} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
       </Catalogue>


       <Catalogue title="Other category">
        <ProductCard  img_url={product_1} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
        <ProductCard  img_url={product_1} title="Product 1" price="500"/>
        <ProductCard  img_url={product_2} title="Product 2" price="500"/>
        <ProductCard  img_url={product_3} title="Product 1" price="500"/>
       </Catalogue>

       <TestimonialSection />
       
       <Footer />
       
       </>
    );
}

export default Home;
