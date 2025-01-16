import { createContext,useEffect,useState } from "react";
import { message } from "antd";

const MyContext = createContext();

export const MyContextProvider  = (props) =>{
    const [uiTheme,setUiTheme] = useState('#025cde');
    const [textColor,setTextColor] = useState('black');
    const [messageApi, contextHolder] = message.useMessage();
    const [navBarIsOpen,setNavBarIsOpen] = useState(false);
    const [isAppLoading,setIsAppLoading] = useState(true)
    const [modeTheme,setModeTheme] = useState('light');
    const [modalType,setModalType]= useState('');
    const [userToken,setUserToken] = useState('');
    const [userMail,setUserMail] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [uploadProdTitle,setUploadProdTitle] = useState('');
    const [uploadProdPrice,setUploadProdPrice] = useState('');
    const [uploadProdDesc,setUploadProdDesc] = useState('');
    const [uploadProdColor,setUploadProdColor] = useState('none');
    const [uploadProdImages,setUploadProdImages] = useState([]);
    const [uploadProdCategory,setProdCategory] = useState("");




    const toggleModal = () =>{

      setShowModal(!showModal);
      
    }
    
    const fetchUserTokenFromDevice = async() =>{
      //fetch stored token from device
     const email = localStorage.getItem('nafusiteUserEmail');
     const token = localStorage.getItem('nafusiteUserToken');

     if(token){
      //assign token and userEmail
      setUserMail(email);
      setUserToken(token)

     }{
      //no stored tokens
      console.log(`Stored tokens ${email} ${token}`);
       
     }


    };

    const logOut = () =>{
      try{
       setIsAppLoading(true) 
          //remove tokens
      localStorage.removeItem('nafusiteUserEmail');
      localStorage.removeItem('nafusiteUserToken');

      setUserToken('')
      setUserMail('');
      
       setTimeout(() => {
        setIsAppLoading(false);
       }, 1000);


      }catch(error){
        errorFeedback(error.message)
      }

    
      


    }

    useEffect(()=>{
     fetchUserTokenFromDevice();
    },[])


    const successFeedback = (msg) => {
      messageApi.open({
        type: 'success',
        content: msg,
      });
    };
    const errorFeedback = (msg) => {
      messageApi.open({
        type: 'error',
        content: msg,
      });
    };

    const warningFeedback = (msg) => {
      messageApi.open({
        type: 'warning',
        content: msg,
      });
    };

   
  const toggleNavbar = () => setNavBarIsOpen(!navBarIsOpen);


    return(
      <MyContext.Provider value={{
        uiTheme,setUiTheme,
        textColor,setTextColor,
        successFeedback,errorFeedback,contextHolder,
        warningFeedback,
        navBarIsOpen,setNavBarIsOpen,
        toggleNavbar,isAppLoading,setIsAppLoading,
        showModal, setShowModal,toggleModal,
        modalType,setModalType,fetchUserTokenFromDevice,
        userToken,setUserToken,userMail,setUserMail,
        logOut,
        uploadProdTitle,uploadProdPrice,uploadProdDesc, uploadProdColor,uploadProdImages,uploadProdCategory,
        setUploadProdTitle,setUploadProdPrice,setUploadProdDesc,setUploadProdColor,setUploadProdImages,
        setProdCategory
        
       
  
       
      }}>
        {props.children}
      </MyContext.Provider>
    )
}

export default MyContext;