import React, { useContext, useState } from 'react';
import MyContext from '../context/context';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Alert } from 'antd';
import{ Button} from 'antd';
import { db } from '../firebase/firebaseConfig';
import { deleteDoc,doc } from 'firebase/firestore';
import {Tabs} from 'antd';

const ConfirmOrderContent = () => {
    const {toggleModal,uiTheme,setViewOrderType,sessionOrderId,userMail,errorFeedback,successFeedback,updateLastUserActive}= useContext(MyContext);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [paymentMode,setPaymentMode] = useState('mpesa');
    const [alignValue, setAlignValue] = useState('center');

    const deleteOrder = async() =>{
        try{
             
        setIsFormLoading(true);
        if(!userMail)return false;
        //check if order id is created
        if(!sessionOrderId) return false;

        const orderRef = doc(db,"orders",sessionOrderId);

        await deleteDoc(orderRef);
         successFeedback('Order deleted');

         await updateLastUserActive(userMail);
         setIsFormLoading(false);
         toggleModal();


        }catch(error){
            console.log(`Delete order error : ${error.message}`);
            errorFeedback('Deleting order error');
            setIsFormLoading(false);

        }
    }

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

              const onChange = (key) => {
                console.log(key);
              };


    return (
        <div className='confirm-order-container'>

        <Alert
        message="Please follow instructions to complete your order in the next 10 minutes.Use your transaction number to make a payment."
        type="warning"
        closable 
        showIcon
        />

        {/* <Alert
        message="Use your transaction number to make a payment."
        type="warning"
        className='mt-2'
        closable 
        showIcon
        /> */}
        



       
         <div className='payment-instructions my-3'>
             
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

        <div className='d-flex align-items-center my-3' style={{gap:'10px'}}>

        <button className='btn btn-primary' onClick={() => toggleModal()} >
         Okay 
        </button>    

        <Button className='btn btn-outline-primary submit-form-btn' disabled loading={isFormLoading}  onClick={() => deleteOrder()} >
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
