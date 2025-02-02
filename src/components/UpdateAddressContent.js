import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/context';
import { Button } from 'antd';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { IoIosArrowBack } from "react-icons/io";
import { LuMapPinCheckInside } from "react-icons/lu";
import { MdAddLocationAlt } from "react-icons/md";

const UpdateAddressContent = () => {
  const { listCounties, errorFeedback, userMail,
     successFeedback, setViewOrderType, viewOrderType,toggleModal,
     setOrderAddress,orderAddress
     } = useContext(MyContext);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const [officialName, setOfficialName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [location, setLocation] = useState('');
  const [profileData, setProfileData] = useState(null);

  const [selectedCounty, setSelectedCounty] = useState('');
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [addressView,setAddressView] = useState('select_address');
  const [addressList,setAddressList] = useState([]);
  const [errorAddressEntry,setErrorAddressEntry] = useState(false);

  // Fetch user data from Firestore
  const fetchUserData = async () => {
    try {
      if (!userMail) return;

      const userDocRef = doc(db, "users", userMail);
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        console.log(`No user found with email: ${userMail}`);
        return;
      }

      const userData = { ...docSnapshot.data() };
      setProfileData(userData);
      setOfficialName(userData.official_names || '');
      setPhonenumber(userData.phone_number || '');
      setAddressList(userData.address);
     // setLocation(userData.location || '');
      // setSelectedCounty(userData.county || '');
      // setSelectedConstituency(userData.constituency || '');
    } catch (error) {
      console.log(`Profile fetch data error: ${error.message}`);
      errorFeedback("Profile fetch data failed");
    }
  };

  // Handle county change
  const handleCountyChange = (event) => {
    const countyName = event.target.value;
    setSelectedCounty(countyName);
    setSelectedConstituency('');

    const county = listCounties.find((c) => c.county === countyName);
    setConstituencies(county ? county.constituencies : []);
  };

  // Handle constituency change
  const handleConstituencyChange = (event) => {
    setSelectedConstituency(event.target.value);
  };

  // Ensure constituency updates based on fetched county data
  useEffect(() => {
    if (selectedCounty) {
      const county = listCounties.find((c) => c.county === selectedCounty);
      setConstituencies(county ? county.constituencies : []);
    }
  }, [selectedCounty, listCounties]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const submitForm = async () => {
    setIsFormLoading(true);
    try {
      if (!userMail) return;
      if (!officialName.trim()) {
        errorFeedback('Name field required');
        setIsFormLoading(false);
        return;
      }
      if (!phonenumber.trim()) {
        errorFeedback('Phone number required');
        setIsFormLoading(false);
        return;
      }
      if (!orderAddress) {
        errorFeedback('Select delivery address');
        setErrorAddressEntry(true);
        setIsFormLoading(false);
        return;
      }

      setErrorAddressEntry(false);

      
      
      const userDocRef = doc(db, "users", userMail);
      await updateDoc(userDocRef, {
        official_names: officialName,
        phone_number: phonenumber,
        });

      successFeedback("Profile saved!!");
      setViewOrderType('payment');
      fetchUserData();
    } catch (error) {
      console.log(`Profile update error: ${error.message}`);
      errorFeedback("Profile failed to update");
    }
    setIsFormLoading(false);
  };
  
  //function update address of current user in users' collection
  const updateAddress = async () => {
    setIsFormLoading(true);
    try {
      if (!userMail) return;
   
      if (!location.trim()) {
        errorFeedback('Location field required');
        setIsFormLoading(false);
        return;
      }
      if (!selectedCounty && !selectedConstituency) {
        errorFeedback('County & constituency field required');
        setIsFormLoading(false);
        return;
      }
      
      
      const userDocRef = doc(db, "users", userMail);
      
      //new address
      const new_address = {
        county: selectedCounty,
        constituency: selectedConstituency,
        location,
      }
      await updateDoc(userDocRef, {
       address: arrayUnion(new_address)
      });

      successFeedback("Profile saved!!");
      setAddressView('select_address');
      //setViewOrderType('payment');
      fetchUserData();
    } catch (error) {
      console.log(`Add Profile error: ${error.message}`);
      errorFeedback("Saving address to failed!!");
    }
    setIsFormLoading(false);
  };

  //update order Address context
  const updateOrderAddress = (location,county,constituency) =>{

    const orderAddressObject = {
      county,
      constituency,
      location,
      
    }
    setOrderAddress(orderAddressObject);
    setErrorAddressEntry(false)


  

  }
  // useEffect(()=>{
  //   console.log(orderAddress);
  // },[orderAddress]);

  return (
    <div className="address-form">
      {addressView == 'select_address' && (
        <>

      <div className="mb-3">
        <label className="form-label">Your Names</label>
        <input type="text" className="form-control" value={officialName} onChange={(e) => setOfficialName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Phone Number</label>
        <input type="text" className="form-control" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
      </div>


      <div className='d-flex justify-content-between'>
      <p className='bold'>Select delivery address 
        {errorAddressEntry && <p style={{color:'red',fontSize:'12px'}}>*Select an item here</p>} 
        
        </p>
      <span className='app-link d-flex align-items-center mx-2' onClick={() => setAddressView('add_address')}>
        <MdAddLocationAlt fontSize={'22px'} /> Add 
        
       </span>
      </div>
     
      <div className='horizontal-scrollable' style={{paddingLeft:0}}>
        
        {
        addressList &&
        addressList.length !== 0 ?

        addressList.map((item,index) => 

        <div className='my-2' key={index}>
        <input type="radio"
         className="btn-check "
          name="address"
           id={index} 
           autocomplete="off"
           onChange={() => updateOrderAddress(item.location,item.county,item.constituency)}
           
           />
       <label className="btn btn-outline-secondary location-card" for={index}>
       
       <LuMapPinCheckInside fontSize={'18px'}/>

       <div className='d-flex flex-column justify-content-between '>
       <p className='area'>{item.location}</p>
       <p className=''>{item.county} , {item.constituency} </p>
       </div>

       </label>
       </div>

        )  
        :
        <div className='d-flex flex-column justify-content-center my-1'>
          <p className='app-link text-center' onClick={() => setAddressView('add_address')}>Add address</p>
        </div>
          
       
        

        }
     


       

        </div>

    
        </>
      )}

      {addressView == 'add_address' &&
      <div className='add_address_section'>
        
        <div className="mb-3">
        <label className="form-label">Select County</label>
        <select className="form-select" value={selectedCounty} onChange={handleCountyChange}>
          <option value="">-- Select a county --</option>
          {listCounties.map((county) => (
            <option key={county.county} value={county.county}>{county.county}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Select Constituency</label>
        <select className="form-select" value={selectedConstituency} onChange={handleConstituencyChange} disabled={!constituencies.length}>
          <option value="">{constituencies.length ? '-- Select a constituency --' : 'Please select a county first'}</option>
          {constituencies.map((constituency, index) => (
            <option key={index} value={constituency}>{constituency}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Area / Apartment / House</label>
        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className='d-flex flexwrap'>
      <Button className="btn btn-primary submit-form-btn" loading={isFormLoading} onClick={() => updateAddress()} >Save</Button>
      <button className='btn btn-outline-primary mx-2' onClick={() => setAddressView('select_address')}> Back</button>
        </div>

      
     
     
      
      </div>
      }


       {addressView == 'select_address' 
       &&
       

        <div className='d-flex align-items-center' style={{ gap: '10px', }}>
        <Button className="btn btn-primary submit-form-btn" loading={isFormLoading} onClick={submitForm}> Confirm</Button>
        {viewOrderType &&
         <button className='btn btn-outline-primary' onClick={() =>toggleModal()}>
          Cancel process</button>}
      </div>
       }
     

    </div>
  );
};

export default UpdateAddressContent;
