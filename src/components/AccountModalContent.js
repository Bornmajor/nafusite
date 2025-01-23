import React,{useContext, useState,useEffect} from 'react';
import { MdAttachEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../context/context';
import {Input} from 'antd';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import {db} from '../firebase/firebaseConfig'
import validator from 'validator'; //validate email

const AccountModalContent = () => {
   const [isFormLoading,setIsFormLoading] = useState(false);
   const [email,setEmail] = useState('');
   const [pwd,setPwd] = useState('');
   const {errorFeedback,contextHolder,successFeedback,fetchUserTokenFromDevice,toggleModal} = useContext(MyContext);
   const [authType,setAuthType] = useState('login');
   const [isOnline, setIsOnline] = useState(navigator.onLine);
   const navigate = useNavigate();



  useEffect(() => {
    // Event listener for online status
    const handleOnline = () => {
      setIsOnline(true);
    };

    // Event listener for offline status
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

   // Function to generate a random 16-character token
const generateToken = () => {
  return [...Array(32)]
    .map(() => Math.random().toString(36)[2])
    .join('');
};

   const submitForm = async() =>{
    try{
      setIsFormLoading(true);

        //check if email
    if(email === '' || email.trim() === ' '){
      // Validate email
      errorFeedback('Email required');
      setIsFormLoading(false);     
      return false;

    }
    if(pwd === '' || pwd.trim() === ' '){
      // Validate password
      errorFeedback('Password required');
      setIsFormLoading(false);  
      return false;

    }
    if(!validator.isEmail(email)){
      //validate email
      errorFeedback('Email address invalid');
      //enable submit btn
      setIsFormLoading(false);  

      return false;
    }

  
    //check internet if available 
    if(!isOnline){     
       errorFeedback('Internet required to complete request!!')
         //enable submit btn
      setIsFormLoading(false);  
       return false;
    }
    // Firestore Users collection
    const usersCollection = "users";

    if(authType == 'register'){
    
      //tries to register a user
     if(pwd.length < 8){
      //check password length
        errorFeedback('Password too short try atleast 8 characters');
        //enable submit btn
        setIsFormLoading(false);  
        return false;
      }
       // Registration
       const userDocRef = doc(db, usersCollection, email); // Use email as the document ID
       const userDoc = await getDoc(userDocRef);
 
       if (userDoc.exists()) {
         // User already exists
         errorFeedback("User with this email already exists");
         //enable submit btn
         setIsFormLoading(false);  
       } else {
         // Hash password using bcrypt
         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(pwd, salt);
 
         // Generate a token
         const token = generateToken();
 
         // Save user to Firestore
         await setDoc(userDocRef, { email, password: hashedPassword, token });
         
         // Store email and token in localStorage
         localStorage.setItem("nafusiteUserEmail", email);
         localStorage.setItem("nafusiteUserToken", token);
 
         successFeedback("User registered successfully");
        //  console.log("User registered:", { email, token });

        //fetch token
        fetchUserTokenFromDevice();

         //enable submit btn
         setIsFormLoading(false);  

         //close modal
         toggleModal();

         setTimeout(() => {
          navigate('/')
         }, 1500);
       }


    }else{
      //tries to  logging a user

       // Login
       const userDocRef = doc(db, usersCollection, email);
       const userDoc = await getDoc(userDocRef);
 
       if (!userDoc.exists()) {
         // User does not exist
         errorFeedback("No user found with this email");
              //enable submit btn
              setIsFormLoading(false); 
       } else {
         const userData = userDoc.data();
 
         // Compare hashed password
         const isPasswordMatch = bcrypt.compareSync(pwd, userData.password);
         if (isPasswordMatch) {
           // Generate a new token for this session
           const newToken = generateToken();
 
           // Update token in Firestore
           await updateDoc(userDocRef, { token: newToken });
 
           // Store email and token in localStorage
           localStorage.setItem("nafusiteUserEmail", email);
           localStorage.setItem("nafusiteUserToken", newToken);
 
           successFeedback("User logged in successfully");
           console.log("Login successful:", { email, newToken });

           //fetch token
        fetchUserTokenFromDevice();
              //enable submit btn
         setIsFormLoading(false);
         //close modal
         toggleModal();
         
         } else {
           // Incorrect password
           errorFeedback("Authentication failed!Verify your email address or password");
                //enable submit btn
         setIsFormLoading(false); 
         }
       }
 
    } 

    }catch(error){
      errorFeedback(`Something went wrong: ${error.message}`);
          //enable submit btn
          setIsFormLoading(false); 
          console.log(email,pwd)
    }

 

   


   }



return (
<div className='account-setup-container'>
{contextHolder}
<p className='header mb-2'>{authType === 'login' ? 'Verify your identity to login':'Setup your account'}</p>
<Input
type='email'
className='input-form mb-3'
value={email} 
onChange={(e) => setEmail(e.target.value)}
placeholder="Email"
required
/>

<Input.Password
className='input-form mb-2'
value={pwd}
onChange={(e) => setPwd(e.target.value)}
placeholder="Password"
required
/>

<Button className='submit-btn w-100' loading={isFormLoading} onClick={() => submitForm()}>
  {authType === 'login' ? 'Login':'Create account'}
   </Button>

<div class="form-check form-switch my-3">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" value="keep_me_in" checked />
  <label class="form-check-label" for="flexSwitchCheckDefault">Keep me sign In</label>
</div>

<div className='alternative-link-container my-3'>
  {authType === 'login' ?
   <Link className='alternative-link' onClick={() => setAuthType('register')}>Create an account </Link>
    :
   <Link className='alternative-link' onClick={() => setAuthType('login')}>Already have an account</Link> 
   }
 

<Link className='alternative-link mx-3'>Forgot password</Link>





</div>





</div>
);
}

export default AccountModalContent;
