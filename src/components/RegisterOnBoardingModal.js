import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MyContext from '../context/context';
import WelcomeMessageContent from './WelcomeMessageContent';
import CategoryInterestContent from './CategoryInterestContent';
import FetchUserNameNumberContent from './FetchUserNameNumberContent';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { db } from '../firebase/firebaseConfig';
import { addDoc,collection,doc,updateDoc,getDoc } from 'firebase/firestore';

const RegisterOnBoardingModal = () => {
    // const [showRegisterBoard, setShowRegisterBoard] = useState(false);
    const {showRegisterBoard, setShowRegisterBoard,userMail,errorFeedback,updateLastUserActive,successFeedback} = useContext(MyContext)
    const [isDismissable,setIsDismissable] = useState(false);
    const navigate = useNavigate();
    const [isFormLoading,setIsFormLoading] = useState(false);
    const [officialName,setOfficialName] = useState('');
const [phonenumber,setPhonenumber] = useState('');
const [categoryList,setCategoryList] = useState([]);


const handleCheckboxChange = (value) => {
    
    setCategoryList((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If the value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add the value to the array
        return [...prevSelected, value];
      }
    });
  

  
  };

    const [contentType,setContentType] = useState('welcome-message');

    const toggleRegisterBoard = ()  =>{
        setShowRegisterBoard(!setShowRegisterBoard);
    }

    const skipOnBoard = () =>{
        setContentType('welcome-message');
        setIsDismissable(true);
        setShowRegisterBoard(false);

        navigate('/');
    }

    const proceedUserData = () => {
        if(categoryList.length == 0){
            setIsFormLoading(false);
            errorFeedback('Select atleast one item')
            return false;
        }

        setContentType('fetch-user-data')
    }
    const savedUsersInterest = async() =>{
        try{

            setIsFormLoading(true);

            if(!userMail){
                setIsFormLoading(false);
                return false;
            }

            if(categoryList.length == 0){
                setIsFormLoading(false);
                errorFeedback('Select atleast one item')
                return false;
            }
         const userInterestCollection =  collection(db,"user_interest");
        
        await addDoc(userInterestCollection,{
          email:userMail,
          category:categoryList
         });

         setContentType('fetch-user-data');
         setIsFormLoading(false);


        }catch(error){
            console.log(`Failed to save user interest:${error.message}`);
            errorFeedback(`Failed to save user interest`)

        }
    }

       const updateUserData = async() =>{
             setIsFormLoading(true);
            try{
                //check users login
                if(!userMail){
                return false;
                }
    
                if(officialName === '' || officialName.trim() === ' '){
                    // Validate email
                    errorFeedback('Name field required');
                    setIsFormLoading(false);     
                    return false;
    
                  }
                  if(phonenumber === '' || phonenumber.trim() === ' '){
                    // Validate email
                    errorFeedback('Phone number required');
                    setIsFormLoading(false);     
                    return false;
    
                  }
    
    
                  const userDocRef = doc(db,"users",userMail);
                  const userDoc = await getDoc(userDocRef);
                  
                  if(userDoc.exists()){
                    //if doc exist
                    const data ={
                        "official_names":officialName,
                        "phone_number":phonenumber,
                    } 
                    await updateDoc(userDocRef,data);
                    await savedUsersInterest();
                    successFeedback("Profile updated");
                    successFeedback("Thank for your time");
    
                      //update last user active time 
                  await updateLastUserActive(userMail);
    
                    setIsFormLoading(false);   
                    skipOnBoard();
              
    
                  }
    
    
                
    
            }catch(error){
                console.log(`Profile update error:${error.message}`);
                errorFeedback("Profile failed to update");
    
            }
    
        }
    
 
 

    return (
        <>
         <Modal
        show={showRegisterBoard}
        onHide={toggleRegisterBoard}
        backdrop={!isDismissable && 'static'}
        keyboard={false}
      >
        <Modal.Header style={{border:'none'}} closeButton={isDismissable}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {contentType == 'welcome-message' && 
            <>
             <WelcomeMessageContent />
             <div className='d-flex justify-content-center my-3'>
                <button className='btn btn-primary' onClick={() => setContentType('category-interest')}>Get started</button> 
                </div>
           
            </>
           

            }

            {contentType == 'category-interest' && 
            <CategoryInterestContent
             categoryList={categoryList} 
             setCategoryList={setCategoryList}
             handleCheckboxChange={handleCheckboxChange}
             
             />
            }

            {contentType == 'fetch-user-data' && 
            <FetchUserNameNumberContent
              officialName={officialName}
             setOfficialName={setOfficialName}
              phonenumber={phonenumber}
              setPhonenumber={setPhonenumber} />
            }

        {['category-interest', 'fetch-user-data'].includes(contentType) && (
        <div className='d-flex justify-content-between align-items-center pt-3 mt-4'>
            <div className='d-flex gap-10'>
            <button className='btn btn-outline-primary'
             onClick={
                contentType == 'category-interest' ? () => setContentType('welcome-message') 
                :() => setContentType('category-interest')}
                >
                 PREV
              </button>

            <Button
                className='btn btn-primary onboard-content-change-btn'
                variant='primary'
                loading={isFormLoading}
                onClick={
                    contentType == 'category-interest' ? () =>  proceedUserData()
                    :() => updateUserData()
                }
            >
                NEXT
            </Button>
            </div>

            <a className='app-link font-18' onClick={skipOnBoard}>
            Skip
            </a>
        </div>
        )}
            



           
         
        </Modal.Body>
       
       
      </Modal>
        
        </>
    );
}

export default RegisterOnBoardingModal;
