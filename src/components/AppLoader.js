import React from 'react'
import appLogo from '../assets/images/logo.png'

const AppLoader = ({statusMsg}) => {
 
  
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <img src={appLogo} width="180px" />
        <div style={{fontWeight:'600',margin:'10px'}}>{statusMsg}</div>
        <div className='loader'></div>
    </div>
  )
}

export default AppLoader