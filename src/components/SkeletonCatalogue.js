import React from 'react';
import SkeletonProductCard from './SkeletonProductCard';

const SkeletonCatalogue = () => {
    return (
        <div className='horizontal-scrollable'>
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />
         <SkeletonProductCard />

        </div>
    );
}

export default SkeletonCatalogue;
