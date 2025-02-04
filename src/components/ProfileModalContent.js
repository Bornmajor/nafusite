import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'antd';
import {Button} from 'antd';
import MyContext from '../context/context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Select from 'react-select'
import { FaLocationDot } from "react-icons/fa6";



const ProfileModalContent = () => {
    const [officialName,setOfficialName] = useState('');
    const [phonenumber,setPhonenumber] = useState('');
    const [location,setLocation] = useState('');
    const [secondaryNumber,setSecondaryNumber] = useState('');
    const [isFormLoading,setIsFormLoading] = useState(false);
    const [profileData,setProfileData]  = useState(null);
    const [userCounty,selectUserCounty] = useState([]);
    const{errorFeedback,userMail,successFeedback} = useContext(MyContext);


      
      
  

    const onChangeCounty = (e) => {
      //  console.log(`selected ${e.value}`);
      };

    const submitForm = async() =>{
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
                successFeedback("Profile updated");

                setIsFormLoading(false);   

                fetchUserData();

              }


            

        }catch(error){
            console.log(`Profile update error:${error.message}`);
            errorFeedback("Profile failed to update");

        }

    }

    const fetchUserData = async() =>{
        try{
        //check users login
        if(!userMail){
        return false;
        }

        setIsFormLoading(true);

        const userDocRef = doc(db,"users",userMail);
        const  docSnapshot  = await getDoc(userDocRef);

        if (!docSnapshot.exists()) {
        console.log(`No user found with email:${userMail} `);
        return false;

        }
        const userData = { ...docSnapshot.data() };  // Include doc ID with data

        
       //console.log(userData);
       //disable loader
       setProfileData(userData);

       //assign datta fetched from server
       setOfficialName(userData.official_names);
       setPhonenumber(userData.phone_number);
       setLocation(userData.location);

       setIsFormLoading(false);
       



        }catch(error){
            console.log(`Profile fetch data error:${error.message}`);
            errorFeedback("Profile fetch data failed");
        }

    }


    useEffect(()=>{
        fetchUserData();
    },[])

    return (
        <div className='profile-modal'>

<Input
type='text'
className='input-form mb-3'
value={userMail} 
disabled
/>



<Input
type='text'
className='input-form mb-3'
value={officialName} 
onChange={(e) => setOfficialName(e.target.value)}
placeholder="Names"
required
/>




<Input
type='text'
className='input-form mb-3'
value={phonenumber} 
onChange={(e) => setPhonenumber(e.target.value)}
placeholder="Phone address"
required
/>

{/* <div className='d-flex justify-content-between mb-3'>
    <p className='text-truncate' style={{maxWidth:'200px'}}><FaLocationDot /> <span>Mombasa </span>,<span>Tononoka</span> </p>
     <p className='app-link' >edit</p>
</div>

<div className='locations-container'>
<Select className='mb-2' options={counties} onChange={onChangeCounty} placeholder="Select your county"/>


<Input
type='text'
className='input-form mb-3'
value={location} 
onChange={(e) => setLocation(e.target.value)}
placeholder="Your address location"
required
/>    
</div> */}


{/* <Input
type='text'
className='input-form mb-3'
value={secondaryNumber} 
onChange={(e) => setSecondaryNumber(e.target.value)}
placeholder="Secondary phone number"

/> */}


<Button className='submit-btn w-100 my-3' loading={isFormLoading} onClick={() => submitForm()}>
  Update profile
</Button>



            
            
        </div>
    );
}

export default ProfileModalContent;
