import React, { useState } from 'react';
import UpdateAddressContent from './UpdateAddressContent';
import { Steps } from 'antd';

const PlaceOrderModalContent = () => {

    const [viewType,setViewType] = useState('confirm_address');

    return (
        <div className=''>

<Steps
className='my-2'
    current={2}
    items={[
      {
        title: 'Address',
    
      },
      {
        title: 'Payment',
      
      },
      {
        title: 'Confirmation',
        
      },
    ]}
  />
            
            {viewType == 'confirm_address' && 
            <UpdateAddressContent />
            }
            
        </div>
    );
}

export default PlaceOrderModalContent;
