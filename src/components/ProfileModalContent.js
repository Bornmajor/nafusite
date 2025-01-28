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

    const counties = [
        { value: "mombasa", label: "Mombasa" },
        { value: "kwale", label: "Kwale" },
        { value: "kilifi", label: "Kilifi" },
        { value: "tana river", label: "Tana River" },
        { value: "lamu", label: "Lamu" },
        { value: "taita-taveta", label: "Taita-Taveta" },
        { value: "garissa", label: "Garissa" },
        { value: "wajir", label: "Wajir" },
        { value: "mandera", label: "Mandera" },
        { value: "marsabit", label: "Marsabit" },
        { value: "isiolo", label: "Isiolo" },
        { value: "meru", label: "Meru" },
        { value: "tharaka-nithi", label: "Tharaka-Nithi" },
        { value: "embu", label: "Embu" },
        { value: "kitui", label: "Kitui" },
        { value: "machakos", label: "Machakos" },
        { value: "makueni", label: "Makueni" },
        { value: "nyandarua", label: "Nyandarua" },
        { value: "nyeri", label: "Nyeri" },
        { value: "kirinyaga", label: "Kirinyaga" },
        { value: "murang'a", label: "Murang'a" },
        { value: "kiambu", label: "Kiambu" },
        { value: "turkana", label: "Turkana" },
        { value: "west pokot", label: "West Pokot" },
        { value: "samburu", label: "Samburu" },
        { value: "trans nzoia", label: "Trans Nzoia" },
        { value: "uasin gishu", label: "Uasin Gishu" },
        { value: "elgeyo marakwet", label: "Elgeyo Marakwet" },
        { value: "nandi", label: "Nandi" },
        { value: "bomet", label: "Bomet" },
        { value: "kericho", label: "Kericho" },
        { value: "kakamega", label: "Kakamega" },
        { value: "vihiga", label: "Vihiga" },
        { value: "bungoma", label: "Bungoma" },
        { value: "busia", label: "Busia" },
        { value: "siaya", label: "Siaya" },
        { value: "kisumu", label: "Kisumu" },
        { value: "homa bay", label: "Homa Bay" },
        { value: "migori", label: "Migori" },
        { value: "kisii", label: "Kisii" },
        { value: "nyamira", label: "Nyamira" },
        { value: "nairobi", label: "Nairobi" }
      ];

      
      
  

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

              if(location === '' || location.trim() === ' '){
                // Validate email
                errorFeedback('Location field required');
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
       setSecondaryNumber(userData.secondary_number);



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
