import React, { useContext, useEffect, useState } from 'react';
import UpdateAddressContent from './UpdateAddressContent';
import PaymentConfirmOrderContent from './PaymentConfirmOrderContent';
import { Steps } from 'antd';
import MyContext from '../context/context';
import { TbCancel } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import ConfirmOrderContent from './ConfirmOrderContent';


const PlaceOrderModalContent = () => {

     const {viewOrderType,setViewOrderType,showModal} = useContext(MyContext);
    const [currentStep,setCurrentStep] = useState(0);
    const [StepsArray,setStepsArray] = useState([
      {
        title: 'Address',
    
      },
      {
        title: 'Payment',
      
      },
      {
        title: 'Confirmation',
        
      },
    ])
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 450);

    const handleViewportChange = () => {
      if (window.innerWidth < 450) {
        console.log("Viewport is below 400px! Triggering function...");
        // Add any function you want to run here
        setStepsArray([
          {
            icon:<FaAddressCard />,
        
          },
          {
            icon:<MdPayment/>,
          
          },
          {
            icon:<IoCheckmarkCircleSharp />,
            
          },
        ])

          
      } else {
        console.log("Viewport is above 400px!");
      }
    };

    useEffect(() => {
      const handleResize = () => {
        const smallScreen = window.innerWidth < 450;
        setIsSmallScreen(smallScreen);
  
        if (smallScreen) {
          handleViewportChange();
        }
      };
  
      // Attach event listener
      window.addEventListener('resize', handleResize);
  
      // Run initially to check current screen size
      handleResize();
  
      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(()=>{
      //update stepper when order place order changes
    if(viewOrderType == 'payment'){
      setCurrentStep(1)
    }else if(viewOrderType == 'confirm'){
      setCurrentStep(3);
    }
    },[viewOrderType]);


    useEffect(()=>{

      setViewOrderType('confirm_address');

    },[showModal])



   


    return (
        <div className=''>

<Steps
className='my-3'
responsive={false}
    current={currentStep}
    items={StepsArray}
  />
            
            {viewOrderType == 'confirm_address' && 
            <UpdateAddressContent />
            }

           {viewOrderType == 'payment' && 
            <PaymentConfirmOrderContent />
            }

    {viewOrderType == 'confirm' && 
    <ConfirmOrderContent />
    }

       
            
 

            
        </div>
    );
}

export default PlaceOrderModalContent;
