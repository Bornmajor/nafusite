import React, { useContext,useEffect,useState } from 'react';
import logo from '../assets/images/new_logo.png';
import { Button,Input } from 'antd';
import validator from 'validator'; // Validate email
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../context/context';
import { db } from '../firebase/firebaseConfig';
import { collection,query,getDocs,where,updateDoc,doc } from 'firebase/firestore';
import bcrypt from "bcryptjs";

const ResetPassword = () => {

    const params = useParams();
    const { logOut, errorFeedback, successFeedback, contextHolder,generateToken } = useContext(MyContext);
     const [isFormLoading, setIsFormLoading] = useState(false);
     const [pwd,setPwd] = useState('');
     const [email,setEmail] = useState(params.email)
     const [token,setToken] = useState(params.token);
     const [isPageLoading,setIsPageLoading] = useState(true);
     const navigate = useNavigate();
     const [errorMessage,setErrorMessage] = useState('');
    
        useEffect(() => {
          // Automatically log out user when on this page
          const performActions = async () => {
            logOut(); 
            await verifyToken();
            setIsPageLoading(false);
          };
      
          performActions();
        }, []);

        const verifyToken = async() =>{
            try{


            const userCollectionRef = collection(db,"users");
            const q = query(userCollectionRef,where("token","==",token),where("email","==",email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                //no matching document
                console.log("Token or email incorrect!");
                errorFeedback('Reset password link invalid or expired request a new');

                setTimeout(() => {
                navigate('/');     
                }, 500);
               

                return false;
            }else{
                return true;
            }
            

            }catch(error){
                console.log(`Error verifying token${error.message}`);
                errorFeedback(`Something went wrong`);
            }
        }

 
        const updatePasswordForm = async() =>{
            try{
                setIsFormLoading(true);   

            if (!pwd.trim()) {
                errorFeedback('Password field is required!');
                setIsFormLoading(false);
                return false;
                }

                //check Password must be at least 8 characters long
                if (pwd.length < 8) {
                    errorFeedback("Password must be at least 8 characters long.");
                    setIsFormLoading(false);
                    return false;
                  }
                 //checkPassword must include at least one uppercase letter.
                  if (!/[A-Z]/.test(pwd)) {
                    errorFeedback("Password must include at least an uppercase letter.");
                    setIsFormLoading(false);
                    return false;
                  }
                 //check Password must include at least one lowercase letter.
                  if (!/[a-z]/.test(pwd)) {
                    errorFeedback("Password must include at least a lowercase letter.");
                    setIsFormLoading(false);
                    return false;
                  }

                  //check for numeric value in password
                  if (!/[0-9]/.test(pwd)) {
                    errorFeedback("Password must include at least a number.");
                    setIsFormLoading(false);
                    return false;
                  }

                  //check Password must include at least one special character.
                  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd)) {
                    errorFeedback("Password must include at least a special character.");
                    setIsFormLoading(false);
                    return false;
                  }

                 const isTokenOk = await verifyToken();
                 
                 if(!isTokenOk){
                    return false;
                 }

                 //update password
                   // Hash password using bcrypt
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(pwd, salt);

                    const newToken = generateToken();
                    
                    const userDocRef = doc(db, "users", email);
                    

                    // Update token in Firestore
                await updateDoc(userDocRef, { token: newToken, password:hashedPassword,isActive: true  });

                successFeedback('Successfully reset your password');
               // setIsFormLoading(false);

                setTimeout(() => {
                  navigate('/');  
                }, 2000);


            }catch(error){
                console.log(`Update password error${error.message}`);
                errorFeedback('Something went wrong while updating password');
                setIsFormLoading(false);

            }

        }

    return (
        <>
  {contextHolder}
        {isPageLoading ?
<div className='d-flex align-items-center justify-content-center inner-loader' >
<div className='loader'></div>  <p className='bold mx-2'> {!errorMessage ? 'Loading': errorMessage }</p> 
   
</div>
        :
     <div className='recovery-container'>
      
        <div className='recovery-form-container'>
          <div className='d-flex align-items-center justify-content-center'>
            <img src={logo} className='logo-img' alt='App logo' />
          </div>
  
          <p className='title bold my-3'>Create a new password</p>
  
          <div className="mb-3">
          
            <Input.Password
              type="password"
              id="floatingInput"
              className='input-form '
              placeholder="New password"
              value={pwd}                
              onChange={(e) => setPwd(e.target.value)}
            />
            
          </div>

          
  
          <div className='my-3 pt-2'>
            <Button
              className='btn-primary submit-form-btn w-100'
              loading={isFormLoading}
              onClick={updatePasswordForm}
            >
             Update password
            </Button>
          </div>
        </div>
      </div>

       }
     
        </>
      
    );
}

export default ResetPassword;
