import React, { useContext, useState } from 'react';
import MyContext from '../context/context';

const UpdateAddressContent = () => {
  const { listCounties } = useContext(MyContext);

  const [selectedCounty, setSelectedCounty] = useState('');
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');

  // Handle change in selected county
  const handleCountyChange = (event) => {
    const countyName = event.target.value;
    setSelectedCounty(countyName);
    setSelectedConstituency(''); // Reset constituency when county changes

    // Find the county object and update constituencies
    const county = listCounties.find((c) => c.county === countyName);
    if (county) {
      setConstituencies(county.constituencies);
    } else {
      setConstituencies([]);
    }
  };

  // Handle change in selected constituency
  const handleConstituencyChange = (event) => {
    const constituencyName = event.target.value;
    setSelectedConstituency(constituencyName);
  };

  return (
    <div className="address-form">
        {/* <p className='modal-title bold mb-2'>Confirm your address</p> */}
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">Your Names</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          placeholder="Jane Doe.."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phoneInput" className="form-label">Your Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="phoneInput"
          placeholder="+254 700 000 000"
        />
      </div>

      {/* County Select */}
      <div className="mb-3">
        <label htmlFor="countySelect" className="form-label">Select County</label>
        <select
          id="countySelect"
          className="form-select"
          value={selectedCounty}
          onChange={handleCountyChange}
        >
          <option value="">-- Select a county --</option>
          {listCounties.map((county) => (
            <option key={county.county} value={county.county}>
              {county.county}
            </option>
          ))}
        </select>
      </div>

      {/* Constituency Select */}
      <div className="mb-3">
        <label htmlFor="constituencySelect" className="form-label">Select Constituency</label>
        <select
          id="constituencySelect"
          className="form-select"
          value={selectedConstituency}
          onChange={handleConstituencyChange}
          disabled={constituencies.length === 0}
        >
          <option value="">
            {constituencies.length > 0 ? '-- Select a constituency --' : 'Please select a county first'}
          </option>
          {constituencies.map((constituency, index) => (
            <option key={index} value={constituency}>
              {constituency}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected County and Constituency */}
      <div className="mt-4">
        <h5>Selected Details:</h5>
        <p><strong>County:</strong> {selectedCounty || 'Not selected'}</p>
        <p><strong>Constituency:</strong> {selectedConstituency || 'Not selected'}</p>
      </div>
    </div>
  );
};

export default UpdateAddressContent;
