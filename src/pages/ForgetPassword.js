import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/context';
import logo from '../assets/images/new_logo.png';
import { Button,Alert } from 'antd';
import validator from 'validator'; // Validate email
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import emailjs from '@emailjs/browser';

const ForgetPassword = () => {
  const { logOut, errorFeedback, successFeedback, contextHolder } = useContext(MyContext);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [successMsg,setSuccessMsg] = useState('');

  useEffect(() => {
    // Automatically log out user when on this page
    logOut();
  }, []);

  //get user token from server
  const getUserTokenFromServer = async () => {
    try {
      const userDocRef = doc(db, "users", email);
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        console.log(`No user found with email: ${email}`);
        successFeedback("We'll send a reset link if your email matches an account.");
        setIsFormLoading(false);
        return false;
      }

      const userData = docSnapshot.data();
      return userData.token;
    } catch (error) {
      console.error(`Get token request error: ${error.message}`);
      errorFeedback('Error retrieving user data.');
      setIsFormLoading(false);
      return false;
    }
  };

  const sendRecoveryMail = async () => {
    try {
      setIsFormLoading(true);

      if (!email.trim()) {
        errorFeedback('Email field is required!');
        setIsFormLoading(false);
        return;
      }

      if (!validator.isEmail(email)) {
        errorFeedback('Invalid email address!');
        setIsFormLoading(false);
        return;
      }

      const token = await getUserTokenFromServer();
      if (!token) return;

      const formData = {
        user_email: email,
        subject: "Reset password",
        message: "Someone recently requested a password change for your Nafusite account. If this was you, you can set a new password here:",
        url: `https://nafusite.netlify.app/reset-password/${email}/${token}`,
        url_title: "Reset password"
      };

    

      // Use `send()` instead of `sendForm()`
      emailjs.send('service_0rn51oq', 'template_6w5z9hw', formData, 'R4WeIwu9w49DIaE-_')
        .then((result) => {
          console.log(result.text);
          successFeedback("We'll send a reset link");
          setSuccessMsg("We'll send a reset link if your email matches an account.")
          setIsFormLoading(false);
          setEmail(''); // Clear email field
        })
        .catch((error) => {
          console.error(error);
          errorFeedback('Failed to send recovery email. Try again.');
          setIsFormLoading(false);
        });
    } catch (error) {
      console.error("Error sending email:", error.message);
      errorFeedback('An error occurred while sending the email.');
      setIsFormLoading(false);
    }
  };

  return (
    <div className='recovery-container'>
      {contextHolder}
      <div className='recovery-form-container'>
        <div className='d-flex align-items-center justify-content-center'>
          <img src={logo} className='logo-img' alt='App logo' />
        </div>

        {successMsg &&
       <Alert message={successMsg} type="success" showIcon closable /> 
        }
        

        <p className='title bold my-3'>Enter email address to recover your account</p>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className='my-3 pt-2'>
          <Button
            className='btn-primary submit-form-btn w-100'
            loading={isFormLoading}
            onClick={sendRecoveryMail}
          >
            Recover account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
