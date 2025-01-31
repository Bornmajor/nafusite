import React from 'react';
import { Skeleton } from 'antd';

const SkeletonProductCard = () => {
    return (
        <div className='skeleton-product-card'>

        <Skeleton.Image
       active={true} 
       style={{
           width:'165px',
           height:'165px'
       }}
       /> 

       <div className='d-flex align-items-center justify-content-between px-1 my-2'>

       <div className='d-flex flex-column '>
        <Skeleton.Button active={true} style={{width:'120px',height:'15px'}} />
       <Skeleton.Button active={true} style={{width:'60px',height:'10px'}} />    
           </div>
       

        <Skeleton.Avatar active={true} shape='circle'  style={{width:'25px',height:'25px'}} />   
       </div>

       
      </div>
    );
}

export default SkeletonProductCard;
