import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/context';
import { Button } from 'antd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const UpdateAddressContent = () => {
  const { listCounties, errorFeedback, userMail, successFeedback, setViewOrderType, viewOrderType,toggleModal } = useContext(MyContext);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const [officialName, setOfficialName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [location, setLocation] = useState('');
  const [profileData, setProfileData] = useState(null);

  const [selectedCounty, setSelectedCounty] = useState('');
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');

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
      setLocation(userData.location || '');
      setSelectedCounty(userData.county || '');
      setSelectedConstituency(userData.constituency || '');
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
      await updateDoc(userDocRef, {
        official_names: officialName,
        phone_number: phonenumber,
        county: selectedCounty,
        constituency: selectedConstituency,
        location,
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

  return (
    <div className="address-form">
      <div className="mb-3">
        <label className="form-label">Your Names</label>
        <input type="text" className="form-control" value={officialName} onChange={(e) => setOfficialName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Phone Number</label>
        <input type="text" className="form-control" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
      </div>
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
        <label className="form-label">Area</label>
        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className='d-flex align-items-center' style={{ gap: '10px', }}>
        <Button className="btn btn-primary submit-form-btn" loading={isFormLoading} onClick={submitForm}> Confirm</Button>
        {viewOrderType &&
         <button className='btn btn-outline-primary' onClick={() =>toggleModal()}>
          Cancel process</button>}
      </div>
    </div>
  );
};

export default UpdateAddressContent;
