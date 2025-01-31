import React, { useContext } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import MyContext from '../context/context';
import { doc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Popconfirm } from 'antd';
import { IoCalendarClearSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const OrderCard = ({id,status,total_amount,order_date}) => {
    const {userMail,successFeedback,errorFeedback,setOrderList,orderList,fetchUsersOrders} = useContext(MyContext);

    const getStatusColor = (status) => {
        switch (status) {
          case "pending_payment":
            return "#f29632";
          case "paid":
            return "green";
          case "cancelled":
            return "red";
           case "completed":
            return "orange";
          default:
            return "black"; // Default color
        }
      };

       function formatDate(isoDate) {
              const date = new Date(isoDate);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
              const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
          
              return `${day}/${month}/${year}`;
          }

          const deleteOrder = async() =>{
            try{
                 
         
            if(!userMail)return false;

            //filter list to give immediate feedback
            const newOrderList = orderList.filter((item) => item.id !== id);

            setOrderList(newOrderList);
            

            const orderRef = doc(db,"orders",id);
    
            await deleteDoc(orderRef);
             successFeedback('Order deleted');

             fetchUsersOrders();


            
          
    
    
            }catch(error){
                console.log(`Delete order error : ${error.message}`);
                errorFeedback('Deleting order error');
           
    
            }
        }

        const confirm = (e) => {
            console.log(e);
            deleteOrder();
           
          };
          const cancel = (e) => {
           // console.log(e);
     
          };
      

    return (
        <div className='order-card' key={id}>

            <Link className='inner-container' to={`/order/${id}`}>
             <p className='order-id long-text bold text-truncate'>Order: {id}</p>
            <p className='status bold' style={{
                color: getStatusColor(status) 
            }}><TbAlertSquareRoundedFilled /> {status}</p>  
            </Link>

            <Link className='inner-container' to={`/order/${id}`}>
            <p><IoCalendarClearSharp /> {formatDate(order_date)} </p>
            <p> <span className='bold'>Ksh</span>. {total_amount} </p>
            </Link>

                <Popconfirm
                title="Cancel this order?"
                // description="Are you sure to delete this item?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                >
                <span className='clickable-item' title='Cancel order' >
                <IoMdCloseCircle fontSize={30}/>
                </span>  
                </Popconfirm>
           

           

         


            
        </div>
    );
}

export default OrderCard;
