import React from 'react';
import appLogo from '../assets/images/new_logo.png'

const WelcomeMessageContent = () => {
    return (
        <div className='onboarding-register-content d-flex justify-content-center align-items-center flex-column'>

            <img src={appLogo} alt='App logo' width={'150px'}/>

            <p className='text-center my-2'>Welcome to <span className='app-link bold'>Nafusite jewellery store</span></p>

            <p className='text-center'>We're thrilled to have you on board. Let's     |
            |  get started on your journey with us. </p>

            
            
        </div>
    );
}

export default WelcomeMessageContent;
