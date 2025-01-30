import React, { useContext, useState } from 'react';
import MyContext from '../context/context';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Alert } from 'antd';
import{ Button} from 'antd';
import { db } from '../firebase/firebaseConfig';
import { deleteDoc,doc } from 'firebase/firestore';

const ConfirmOrderContent = () => {
    const {toggleModal,uiTheme,setViewOrderType,sessionOrderId,userMail,errorFeedback,successFeedback}= useContext(MyContext);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [paymentMode,setPaymentMode] = useState('mpesa');

    const deleteOrder = async() =>{
        try{
             
        setIsFormLoading(true);
        if(!userMail)return false;
        //check if order id is created
        if(!sessionOrderId) return false;

        const orderRef = doc(db,"orders",sessionOrderId);

        await deleteDoc(orderRef);
         successFeedback('Order deleted');
         setIsFormLoading(false);
         toggleModal();


        }catch(error){
            console.log(`Delete order error : ${error.message}`);
            errorFeedback('Deleting order error');
            setIsFormLoading(false);

        }
    }
    return (
        <div className='confirm-order-container'>

        <Alert
        message="Please follow instructions to complete your order within 30 minues."
        type="warning"
        closable 
        showIcon
        />



         <div className='btns-payment-container my-3'>

            <button className='btn btn-success' onClick={() => setPaymentMode('mpesa')}>Mpesa</button>
            <button className='btn btn-danger'  onClick={() => setPaymentMode('airtel')}>Airtel Money</button>
            <button className='btn btn-warning'  onClick={() => setPaymentMode('equitel')}>Equitel</button>
            
         </div>   

         <div className='payment-instructions my-3'>

            {paymentMode == 'mpesa' &&
            <ol className='order-list'>
                <li>Open the M-Pesa menu from the SIM Toolkit, M-Pesa App, or dial *334#.</li>
                <li>Select Lipa na M-Pesa <MdKeyboardArrowRight /> Paybill.</li>
                <li>Enter Paybill Number: <b>247247</b> .</li>
                <li>Enter Account Number: <b>005405</b> .</li>
                <li>Enter the amount you want to pay.</li>
                <li>Enter your M-Pesa PIN and confirm.</li>
                <li>You will receive a confirmation SMS from M-Pesa.</li>
            </ol>
            }

            {
                paymentMode == 'airtel' &&
               <ol className='order-list airtel'>

                <li>Open Airtel Money from the SIM Toolkit or dial *334#.</li>
                <li>Select Make Payments <MdKeyboardArrowRight /> Paybill.</li>
                <li>Enter Paybill Number: <b>247247</b> .</li>
                <li>Enter Account Number: <b>005405</b> .</li>
                <li>Enter the amount you want to pay.</li>
                <li>Input your Airtel Money PIN and confirm.</li>
                <li>You will receive a confirmation SMS from Airtel Money.</li>
            </ol>  
            }

            {
                paymentMode == 'equitel' &&
                             <ol className='order-list equitel'>

                <li>Go to your Equitel SIM Toolkit or dial *247#.</li>
                <li>Select My Money <MdKeyboardArrowRight /> Send/Pay <MdKeyboardArrowRight /> Paybill.</li>
                <li>Enter Paybill Number: <b>247247</b> .</li>
                <li>Enter Account Number: <b>005405</b> .</li>
                <li>Enter the amount you want to pay.</li>
                <li>Confirm and enter your PIN.</li>
                <li>You will receive a confirmation message from Equity Bank.</li>
            </ol>  
            }


        </div>

        <div className='d-flex align-items-center my-3' style={{gap:'10px'}}>

        <button className='btn btn-primary' onClick={() => toggleModal()} >
         Okay 
        </button>    

        <Button className='btn btn-outline-primary submit-form-btn' loading={isFormLoading}  onClick={() => deleteOrder()} >
         Cancel order
        </Button> 
        </div>
        


        


        {/* <AiOutlineCheckCircle fontSize={120} color={uiTheme}/>
        <p className='bold text-center text-primary'>Order confirmation goes here</p>

        <button className='btn btn-primary my-3'onClick={() => {
        //return state to intial
        setViewOrderType('confirm_address');
        toggleModal()
        }}>View order
        </button> */}

        </div>
    );
}

export default ConfirmOrderContent;
