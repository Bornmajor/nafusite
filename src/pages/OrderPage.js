import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Alert } from 'antd';
import preview_img from '../assets/images/IMG_20241116_102001.jpg'
import { LiaTimesSolid } from "react-icons/lia";
import { RiUserFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import {Tabs }from 'antd';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import MyContext from '../context/context';

const OrderPage = () => {
    const params = useParams();

    const [alignValue, setAlignValue] = useState('center');
    const {errorFeedback } = useContext(MyContext);
    const [errorMessage,setErrorMessage] = useState('');
    const [order,setOrder] = useState(null);
    

    const onChange = (key) => {
        console.log(key);
      };

      const MpesaTabContent = () =>{
        return(
        <ol className='order-list'>
        <li>Open the M-Pesa menu from the SIM Toolkit, M-Pesa App, or dial *334#.</li>
        <li>Select Lipa na M-Pesa <MdKeyboardArrowRight /> Paybill.</li>
        <li>Enter Paybill Number: <b>247247</b> .</li>
        <li>Enter Account Number: <b>005405</b> .</li>
        <li>Enter the amount you want to pay.</li>
        <li>Enter your M-Pesa PIN and confirm.</li>
        <li>You will receive a confirmation SMS from M-Pesa.</li>
        </ol>
        )
        }
        
        const AirtelTabContent = () =>{
        return(
        <ol className='order-list airtel'>
        
        <li>Open Airtel Money from the SIM Toolkit or dial *334#.</li>
        <li>Select Make Payments <MdKeyboardArrowRight /> Paybill.</li>
        <li>Enter Paybill Number: <b>247247</b> .</li>
        <li>Enter Account Number: <b>005405</b> .</li>
        <li>Enter the amount you want to pay.</li>
        <li>Input your Airtel Money PIN and confirm.</li>
        <li>You will receive a confirmation SMS from Airtel Money.</li>
        </ol> 
        )
        }
        
        const EquitelTabContent = () =>{
        return(
        <ol className='order-list equitel'>
        
        <li>Go to your Equitel SIM Toolkit or dial *247#.</li>
        <li>Select My Money <MdKeyboardArrowRight /> Send/Pay <MdKeyboardArrowRight /> Paybill.</li>
        <li>Enter Paybill Number: <b>247247</b> .</li>
        <li>Enter Account Number: <b>005405</b> .</li>
        <li>Enter the amount you want to pay.</li>
        <li>Confirm and enter your PIN.</li>
        <li>You will receive a confirmation message from Equity Bank.</li>
        </ol> 
        )
        }


      const items = [
        {
          key: '1',
          label: 'Mpesa',
          children: <MpesaTabContent />
        },
        {
          key: '2',
          label: 'Airtel',
          children: <AirtelTabContent />
        },
        {
          key: '3',
          label: 'Equitel',
          children: <EquitelTabContent />
        },
      ];

      function formatISODate(isoDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', options).replace(/ at /i, ' at '); // Replace " at " with a space for better readability
      }
      
 

      const getOrderById = async() =>{
        try{
        const orderCollectionRef =  collection(db,"orders");

        const docRef = doc(orderCollectionRef,params.orderId);
        const docSnapshot = await getDoc(docRef);

        if(!docSnapshot.exists()){
            setErrorMessage('Order ID doesnot exist');
            return false;

        }

        const orderData = {id:docSnapshot.id,...docSnapshot.data()};

        // Fetch product details
        const productsWithDetails = await Promise.all(
            orderData.cart.map(async (item) => {
                const productData = await getProductById(item.product_id);
                return {
                    ...productData,
                    product_quantity:item.quantity,
                    product_color:item.product_color
                };
            })
        );

        orderData.products = productsWithDetails;

        console.log('List of order data');
        console.log(orderData);
        setOrder(orderData);





        }catch(error){
            console.log(`Fetch order by id error:${error.message}`);
            errorFeedback(`Failed to fetch order`);


        }
      }

      
      const getProductById = async (id) => {
        try {
            const prodCollRef = collection(db, "products");
            const docRef = doc(prodCollRef, id);
            const docSnapshot = await getDoc(docRef);
    
            if (!docSnapshot.exists()) {
                console.log(`No product found with the ID: ${id}`);
                setErrorMessage('Product does not exist!');
                return null;
            }
    
            const productData = { id: docSnapshot.id, ...docSnapshot.data() };
    
            // Get cover image
            const getCoverImage = (productImages) => {
                if (!productImages || productImages.length === 0) {
                    return null;
                }
                return productImages.find((img) => img.coverImg === "true") || productImages[0];
            };
    
            productData.coverImage = getCoverImage(productData.product_images);
            return productData;
        } catch (error) {
            errorFeedback(`Fetching product failed: ${error.message}`);
            console.log(error.message);
            return null;
        }
    };
    

      useEffect(()=>{
      getOrderById();
      },[params.orderId]);



    return (
        <>

       

          {order !== null ?
           <div className='single-order-container-page'>
          <>
             <div className='group-section'>


            <div className='topic-page'>
             <div className='my-3'>
                {order.status == 'pending_payment' && (<Alert className='alert-status my-2' message="Pending payment" type="warning" />)              }
                {order.status == 'cancelled' && (<Alert className='alert-status my-2' message="Cancelled" type="danger" />)}
                 {order.status == 'completed' && (<Alert className='alert-status my-2' message="Completed" type="success" />)}
                 {order.status == 'paid' && (<Alert className='alert-status my-2' message="Paid" type="success" />)}

                

               <p className='page-header'>Order ID: <span className='bold'>{params.orderId}</span></p>  
               
             </div>

             <p className='date-time my-2'>
                {formatISODate(order.order_date)}
                {/* January 18,2025 at 3:00PM */}
                
                 </p>

            </div>

            <div className='section'>

                <div className='section-titles'>

                    <p className='title'>Items</p>

                    <p>Subtotal : Ksh {order.total_amount}</p>

                </div>

                    <div className='content'>

                    <div className="products-item-container my-3">


                   
            {order.products.map((product) => (
            <Link className='product-item-card' key={product.id} to={`/product/${product.id}`}>
            <img src={product.coverImage.imageLink || preview_img} className='img-product' />
            <div className='prod-category-title'>
            <p className='category'>{product.product_category || 'Unknown Category'}</p>
            <p className='long-text bold text-truncate'>{product.product_title || 'No Name'}</p>
            </div>
            <div className='quantity-price'>
            <p>{product.product_quantity}</p>
            <p>x</p>
            <p className='price'>{product.product_price || 'N/A'}</p>
            <p>=</p>
            <p>Ksh {product.product_quantity * product.product_price || 'N/A'}</p>
            </div>
            </Link>
            ))}



                    
                    </div>



  

                </div>

            </div>
            
            <div className='section'>

                <div className='section-titles'>

                    <p className='title'>Address</p>

                 </div>

          
                <div className='content address-section'>

                    <Alert message="Delivery" className='alert-address my-2' type="warning" />

                    <p className='location'>{order.address.location}</p>
                    <p className='county-constituency my-2 text-muted'>{order.address.county},{order.address.constituency}</p>

                </div>

                <div className='content address-section'>

                <Alert message="Owner" className='alert-address my-2' type="warning" />

               <div className='d-flex flex-wrap gap-30'>

                <div className='receiver-address' >
                <p className='owner-name'> <RiUserFill /> {order.address.official_names}</p>
                <p className='owner-email'><MdAttachEmail /> {order.email}</p>
                <p className='owner-pone'> <MdPhone /> {order.address.phone_number}</p>
                </div>
                

                <p className="transaction-number"><FaMoneyBillTransfer /> {order.transaction_no} <span className='bold'>(transaction no.)</span></p>
                
               </div>
              

                </div>


            </div>     

            </div>



            <div className="section">

            <div className='section-titles'>

            <p className='title'>Payment method</p>

            </div>

            <Alert
            message="Use your transaction number to make a payment."
            type="warning"
            className='mt-2'
            closable 
            showIcon
            />


                <Tabs
                className='payement-tabs'
                
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                indicator={{
                size: (origin) => origin - 20,
                align: alignValue,
                }}
                />



            </div>
          </>
           </div>

           :

             <div className='d-flex align-items-center justify-content-center inner-loader' >
            <div className='loader'></div>  <p className='bold mx-2'> {!errorMessage ? 'Loading': errorMessage }</p> 

            </div>
           
          
           }

         
           
           

            
        
        </>
        
    );
}

export default OrderPage;
