import React, { useContext, useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import previewImg from '../assets/images/IMG_20241116_102001.jpg'
import { addDoc, collection, doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';
import { Button } from 'antd';
import emailjs from '@emailjs/browser';


const PaymentConfirmOrderContent = () => {

    const {userMail,errorFeedback,cartProductsArray,setViewOrderType
      ,viewOrderType,cartListData,successFeedback,setSessionOrderId,orderAddress, setOrderAddress,
      warningFeedback,updateLastUserActive
    } = useContext(MyContext);
     const [profileData, setProfileData] = useState(null);
     const [errorMessage,setErrorMessage] =useState('');
     const [isFormLoading, setIsFormLoading] = useState(false);
     const [transactionNumber,setTransactionNumber] = useState('')

        //calculate subtotal for cart p
    const calculateCartTotal = (cartData) => {
        // Map each item to its total (quality * price)
        const itemTotals = cartData.map(item => item.quantity * item.product_price);
      
        // Sum up the item totals
        const total = itemTotals.reduce((sum, itemTotal) => sum + itemTotal, 0);
      
        return total;
      };

      function formatDate(isoDate) { 
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12; // Convert to 12-hour format
    
        return `${day}/${month}/${year} ${hours}:${minutes}${amPm}`;
    }

    const fetchUserData = async () => {
        try {
            //if user login
          if (!userMail) return;
    
          const userDocRef = doc(db, "users", userMail);
          const docSnapshot = await getDoc(userDocRef);
    
          if (!docSnapshot.exists()) {
            console.log(`No user found with email: ${userMail}`);
            return;
          }
    
          const userData = { ...docSnapshot.data() };
          setProfileData(userData);


        } catch (error) {
          console.log(`Profile fetch data error: ${error.message}`);
          errorFeedback("Profile fetch data failed");
        }
      };
    //create order 
      const createOrder = async() =>{
        try{
            setIsFormLoading(true);
            //not login
         if(!userMail){return false;}


         if(!transactionNumber){
          errorFeedback('Transaction number field required');
          setIsFormLoading(false);
          return false
         }

         //valid transaction number
         if(transactionNumber.toString().length !== 10){
          errorFeedback('Transaction number should have 10 digits');
          setIsFormLoading(false);
           return false;
         }

         if (!/^[0-9]+$/.test(transactionNumber)) { 
          errorFeedback('Transaction number contain non-numeric value');
          setIsFormLoading(false);
          return false;  // Returns false if the string contains non-numeric characters
        }

        if (!orderAddress) {
          errorFeedback('Address required restart process');
          setIsFormLoading(false);
          return;
        }
         

         //saved address
         const userDocRef = doc(db, "users", userMail);
         const docSnapshot = await getDoc(userDocRef);
        
            
         const userData = { ...docSnapshot.data() };

         const contact_address = {
            "phone_number": userData.phone_number,
            "official_names":userData.official_names,
         
         };

         const address = {
          ...contact_address,...orderAddress
         }


        const orderCollectionRef =  collection(db,"orders");
        const orderData = {
            "email":userMail,
            "cart":cartListData,
            "address":address,
            "total_amount":calculateCartTotal(cartProductsArray),
            "status":"pending_payment",
            "transaction_no":transactionNumber,
            "order_date": new Date().toISOString(),

        }

        const docRef = await addDoc(orderCollectionRef,orderData);
        setSessionOrderId(docRef.id);

        //send notification about order via user email 

        const today_date = new Date().toISOString();
        const formData = {
          user_email: userMail,
          subject: `Order Confirmation - ${docRef.id}`,
          official_names: address.official_names,
          order_id: docRef.id,
          order_date:formatDate(today_date),
          total_amount:calculateCartTotal(cartProductsArray),
          address:`${orderAddress.location}, ${orderAddress.constituency}, ${orderAddress.county}`,
          url: `https://nafusite.netlify.app/order/${docRef.id}`,
          url_title: "View Order"
        };
  
        // Use `send()` instead of `sendForm()`
        emailjs.send('service_0rn51oq', 'template_19kepj5', formData, 'R4WeIwu9w49DIaE-_')
        .then((result) => {
         // console.log(result.text);
          successFeedback("Order notification sent");
          setIsFormLoading(false);
        
        })
        .catch((error) => {
          console.error(error);
          errorFeedback('Failed to send recovery email. Try again.');
          setIsFormLoading(false);
        });  



        //if created order
        setIsFormLoading(false);
        successFeedback('Order created!!');
        setViewOrderType('confirm');
        setOrderAddress('');

        await updateLastUserActive(userMail);


        }catch(error){
            console.log(`Create order error: ${error.message}`);
            errorFeedback("Create order failed");
            setIsFormLoading(false);
        }
      }

      const proceedConfirmContext = async() =>{
        //verify payment
         createOrder();
 
      }





  

      useEffect(()=>{
      fetchUserData();
      },[])
    




    return (
        <div className='payment-order-content'>

            

<div className='section address'>

<div className='d-flex justify-content-between'>
<p className='title bold'>Address</p>  <span className='app-link' onClick={() => setViewOrderType('confirm_address')}><MdModeEdit /> edit</span>
</div>

{profileData !== null ? 
<div class="section-container">
<div className='my-2'>
<p className='text-content text-truncate'> <MdEmail /> {userMail} </p>
<p className='text-content text-truncate'> <TiUser /> {profileData.official_names}</p>
<p className='text-content text-truncate'> <BsFillTelephoneFill /> {profileData.phone_number}</p>   
</div>

{orderAddress &&
<div className='my-2'>
<p className='text-content text-truncate'> <FaCity /> {orderAddress.county}</p>
<p className='text-content text-truncate'> <FaBuilding /> {orderAddress.constituency} </p>
<p className='text-content text-truncate'> <AiFillHome /> {orderAddress.location}</p>   
</div>
}


</div>
:
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'> {!errorMessage ? 'Loading': errorMessage }</p> 
   
</div>

}


              



</div>


<div className='section order'>

<div className='d-flex justify-content-between'>
<p className='title bold'>Order summary</p>  
</div>


<div class="section-container">
<div className='my-2'>
<p className='text-content text-truncate'> <span className='bold'>No of items</span>  <IoIosArrowRoundForward />{cartProductsArray.length} </p>
<p className='text-content text-truncate'> <span className='bold'>Delivery free</span> <IoIosArrowRoundForward /> Ksh 0 </p>
<p className='text-content text-truncate'> <span className='bold'>Total</span> <IoIosArrowRoundForward /> Ksh {calculateCartTotal(cartProductsArray)} </p>   
</div>

<div className='my-2'>

{
cartProductsArray.map((item) => 

<div className='summary-order-product' key={item.id}>
  <img src={item.coverImage.imageLink} className='img-product' alt={item.coverImage.imageLink}/>
<p className='prod-title text-truncate'>{item.product_title}</p>
<div>
<p>Ksh {item.product_price} x {item.quantity} </p>  
</div>



</div>    

) 
}

   
</div>
</div>

              



</div>


<div className='section payment'>

<div className='d-flex justify-content-between'>
{/* <p className='title bold'>Payment</p>  */}
</div>
<div class="form-floating mb-3">
  <input type="text"
   class="form-control"
    id="floatingInput"
   placeholder="072 123 1234"
   value={transactionNumber}
   onChange={(e) => setTransactionNumber(e.target.value)}
   />
  <label for="floatingInput">Transaction  Number</label>
</div>


<div class="section-container">


<div className='d-flex align-items-center my-3' style={{gap:'10px'}}>



 <Button className="btn btn-primary submit-form-btn " loading={isFormLoading} onClick={() => proceedConfirmContext()}> Confirm </Button>

{viewOrderType &&
<button className='btn btn-outline-primary' onClick={() => setViewOrderType('confirm_address')}>
Cancel</button>}


{/* <button className='btn btn-secondary'>Pay later</button>     */}
</div>




</div>


              



</div>




            
            
        </div>
    );
}

export default PaymentConfirmOrderContent;
