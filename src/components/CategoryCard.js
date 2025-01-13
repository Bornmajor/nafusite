import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({title,imgUrl,category}) => {
    return (
        <Link className='category-card' to={`/category/${category}`}>

            <img className='category-img' src={imgUrl} />
            <p className='title'>{title}</p>
            
        </Link>
    );
}

export default CategoryCard;
