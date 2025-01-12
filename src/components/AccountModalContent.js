import React from 'react';
import { MdAttachEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const AccountModalContent = () => {
return (
<div className='account-setup-container'>

<div class="input-group mb-3">
<span class="input-group-text" id="basic-addon1">
<MdAttachEmail />    
</span>
<input type="email"
class="form-control" 
placeholder="Email address" 
aria-label="Username" 
aria-describedby="basic-addon1" />
</div>


<div class="input-group mb-3">
<span class="input-group-text" id="basic-addon1">
<FaUserCircle />    
</span>
<input type="text"
class="form-control" 
placeholder="Username" 
aria-label="Username" 
aria-describedby="basic-addon1" />
</div>

<Button className='submit-btn' loading={true}>
    Submit
</Button>

<div className='alternative-link-container my-2'>
<Link className='alternative-link'>Already have account</Link>  
<br />  
<Link className='alternative-link'>Forgot password</Link>



<div class="form-check form-switch my-2">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
  <label class="form-check-label" for="flexSwitchCheckDefault">Keep me sign In</label>
</div>

</div>





</div>
);
}

export default AccountModalContent;
