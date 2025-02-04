import React, { useContext, useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { collection,getDocs,query,where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';

const OrderModalContent = () => {

    
   const {fetchUsersOrders,orderList,setOrderList} = useContext(MyContext);
   const [statusType,setStatusType] = useState('pending_payment');  
   const [filteredOrderList,setFilteredOrderList] = useState([]);   
   
   
   const filterOrderListByStatus = () =>{
   const filteredList = orderList.filter((item) => item.status == statusType);
   setFilteredOrderList(filteredList);
  // console.log(filteredList);
   
   }
   useEffect(()=>{
     fetchUsersOrders();
    },[]);

   useEffect(()=>{
    filterOrderListByStatus(); 
      
   },[orderList,statusType]);


   
    

    

    return (
        <div className='view-order-modal'>

          <div className='horizontal-scrollable my-3' style={{paddingLeft:0}}>

          <input type="radio" className="btn-check "
           name="status"
            id="pending_payment"
           autocomplete="off"
           value="pending_payment"
           onChange={(e) => setStatusType(e.target.value)}
           checked={statusType == 'pending_payment'}
            />
          <label className="btn btn-outline-primary status-order-tab"
           for="pending_payment"
           >Pending
           </label>

           <input type="radio"
           className="btn-check "
            name="status"
             id="paid"
            autocomplete="off"
            value="paid"  
            onChange={(e) => setStatusType(e.target.value)}
            checked={statusType == 'paid'}
              />
          <label className="btn btn-outline-primary status-order-tab"
           for="paid">
            Paid
            </label>

            <input type="radio"
           className="btn-check"
            name="status"
             id="cancelled"
            autocomplete="off"
            value="cancelled"
            onChange={(e) => setStatusType(e.target.value)}
            checked={statusType == 'cancelled'}
            />
          <label className="btn btn-outline-primary status-order-tab"
           for="cancelled">
            Cancelled
            </label>

          <input type="radio"
           className="btn-check "
            name="status"
             id="completed"
            autocomplete="off"
            value="completed"  
            onChange={(e) => setStatusType(e.target.value)}
            checked={statusType == 'completed'}
              />
          <label className="btn btn-outline-primary status-order-tab"
           for="completed">
            Completed
            </label>

        


          </div>
 
            {
             
             filteredOrderList.length !== 0 ?

            filteredOrderList.map((item) => 
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
