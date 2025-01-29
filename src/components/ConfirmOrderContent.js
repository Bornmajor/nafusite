import React, { useContext } from 'react';
import MyContext from '../context/context';
import { AiOutlineCheckCircle } from "react-icons/ai";

const ConfirmOrderContent = () => {
    const {toggleModal,uiTheme,setViewOrderType}= useContext(MyContext)
    return (
        <div className='confirm-order-container'>

            
            <AiOutlineCheckCircle fontSize={120} color={uiTheme}/>
            <p className='bold text-center text-primary'>Order confirmation goes here</p>

            <button className='btn btn-primary my-3'onClick={() => {
                //return state to intial
                setViewOrderType('confirm_address');
                toggleModal()
                }}>View order</button>
            
        </div>
    );
}

export default ConfirmOrderContent;
