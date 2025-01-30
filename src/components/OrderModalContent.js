import React, { useContext, useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { collection,getDocs,query,where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';

const OrderModalContent = () => {

    
   const {fetchUsersOrders,orderList} = useContext(MyContext)      

   
    

    useEffect(()=>{
     fetchUsersOrders();
    },[])
    return (
        <div className='view-order-modal'>
 
            {
             
            orderList.length !== 0 ?
              orderList.map((item) => 
              <OrderCard id={item.id} status={item.status} total_amount={item.total_amount} order_date={item.order_date} />
             )
            
             :
             <p className='text-center bold p-3'>No orders</p>
             }

         
          {/* <OrderCard id="#1234ABV" status="completed" total_amount={'2000'} />
          <OrderCard id="#1234ABV" status="cancelled" total_amount={'2000'} /> */}
            
        </div>
    );
}

export default OrderModalContent;
