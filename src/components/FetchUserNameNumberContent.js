import React, { useState } from 'react';
import appLogo from '../assets/images/new_logo.png'

const FetchUserNameNumberContent = ({officialName,setOfficialName,phonenumber,setPhonenumber}) => {



return (
<div>

<img src={appLogo} alt='App logo' width={'100px'}/>

<p className='bold  mb-2'>Almost there!</p>

<p className='mb-2'>Please provide your name and phone number so we can personalize your experience</p>

<div class="form-floating my-3">
<input type="text
" class="form-control"
id="floatingInput"
placeholder="Official names"
autoComplete='off'
value={officialName} 
onChange={(e) => setOfficialName(e.target.value)}
/>
<label for="floatingInput">Names</label>
</div>
<div class="form-floating">
<input type="text"
class="form-control"
id="floatingInput"
placeholder="Phone number"
autoComplete='off'
value={phonenumber} 
onChange={(e) => setPhonenumber(e.target.value)}
/>
<label for="floatingPassword">Phone number</label>
</div>

</div>
);
}

export default FetchUserNameNumberContent;
