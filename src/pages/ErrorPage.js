import React, { useState } from 'react'
import { useRouteError,useNavigate } from 'react-router-dom'
import errorImg from '../assets/images/error.png'
import error404 from '../assets/images/404.png'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    // const [errorMsg,setErrorMsg] = useState('Something went wrong');

    

  return (
    <div className="d-flex justify-content-center align-items-sm-center flex-column my-5">
        {/* {error.status} */}
        <img className='align-self-center' width='150px' src={error.status == '404' ? error404 : errorImg} />

        <h3 className='text-center'>{error.status == '404' ? 'Page not found' : 'Something went wrong'}</h3>

        <Link role="button" className="btn btn-primary m-3 d-flex align-self-center" 
            to="/">
            Return Home
        </Link>
        
    </div>
  )
}

export default ErrorPage