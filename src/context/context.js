import { createContext,useEffect,useState } from "react";
import { message } from "antd";
import { collection, getDocs, query, where,deleteDoc,setDoc,doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


const MyContext = createContext();

export const MyContextProvider  = (props) =>{
    const [uiTheme,setUiTheme] = useState('#025cde');
    const [textColor,setTextColor] = useState('black');
    const [messageApi, contextHolder] = message.useMessage();
    const [navBarIsOpen,setNavBarIsOpen] = useState(false);
    const [isAppLoading,setIsAppLoading] = useState(true)
    const [modeTheme,setModeTheme] = useState('light');
    const [modalType,setModalType]= useState('');
    const [isModalLarge,setIsModalLarge] = useState('')

    const [userToken,setUserToken] = useState('');
    const [userMail,setUserMail] = useState('');

    const [wishlistData,setWishlistData] = useState([]);
    const [cartListData,setCartListData] = useState([]);
     const [listAllProducts,setListAllProducts] =useState([]);
     const [currentUserWishlist,setCurrentUserWishlist] = useState([])
     const  [cartProductsArray,setCartProductsArray] = useState([]);


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



    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


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


  //fetch all product from wishlist  collection
  const getWishlistData = async() =>{
    try{
      if(!userMail){
         //user not logiin
        setWishlistData([]);
        return false;
      }
      const wishlistColRef = collection(db,"wishlist");
      const q  = query(wishlistColRef,where("email","==",userMail))
      const querySnapshot = await getDocs(q);
      const itemsArray = querySnapshot.docs.map((doc) => (
        {
        id:doc.id,
        ...doc.data()
      }))

      setWishlistData(itemsArray);
      console.log(`Wishlist data:`);
      console.log(itemsArray);


    }catch(error){
      console.log(`Fetch wishlist data:${error.message}`);

    }
  }
  //fetch from cart collection  by current user
  const getCartProducts = async()=>{
  try{
    if(!userMail){
      //user not logiin
      setCartListData([]);
      return false;
    }

    const cartCollectionRef = collection(db,"cart");
    const q = query(cartCollectionRef,where("email","==",userMail));
    const querySnapshot = await getDocs(q);

    const itemsArray = querySnapshot.docs.map((doc) => (
      {
      id:doc.id,
      ...doc.data()  
      }
      
    ));

    setCartListData(itemsArray);
    
    console.log('List cart data by user:')
    console.log(itemsArray);

  }catch(error){
    console.log(`Get all current user cart products request:${error.message}`);
  }

  }

     const fetchAllProducts = async() =>{
          try{
          const querySnaphot = await getDocs(collection(db,"products"));
          const itemsArray = querySnaphot.docs.map((doc) => (
              {
                  id:doc.id,
                  ...doc.data()
              }
          ));
          const getCoverImage = (productImages) => {
              if (!productImages || productImages.length === 0) {
                return null; // Return null if productImages is empty or undefined
              }
            
              // Try to find an image with coverImg === "true"
              const coverImage = productImages.find((img) => img.coverImg === "true");
            
              // Return the coverImage if found, otherwise return the first image
              return coverImage || productImages[0];
            };
  
           // Map each product and include its selected cover image
      const updatedItems = itemsArray.map((item) => ({
          ...item,
          coverImage: getCoverImage(item.product_images),
        }));
  
        setListAllProducts(updatedItems);
        console.log(`List of all products:`);
        console.log(updatedItems)
  
  
          }catch(error){
              errorFeedback(`Something went wrong:${error.message}`);
              console.log(error.message);
  
          }
  
      }

      const checkIfTokenExpired = async() =>{
        try{

          if(!userMail){
            return false;
          }

          const userCollectionRef = collection(db,"users");
          const q = query(userCollectionRef,where("token","==",userToken),where("email","==",userMail));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            //no matching token so force logout on user
            console.log("No matching token in Firestore");
            logOut();
            
          }else{
            console.log("matching token in Firestore");
          } 

        }catch(error){
          console.log(`Check token expired:${error.message}`);

        }
      }

        //this function toggles between add and removing wishlist from server
    const updateWishlistByAction = async(prod_id) =>{
      try{
       
      if(!userMail){
          errorFeedback('Login to save an item')
          return false;
      }    
   

       const wishlistCollRef =  collection(db,"wishlist");
       const q = query(
          wishlistCollRef,
          where("product_id","==",prod_id),
          where("email","==",userMail)
       )
       const querySnapshot = await getDocs(q);

       if (querySnapshot.empty) {
          //does not exist
          console.log("No matching documents found. Creating a new document...");

          //AUTO generate doc id
          const newDocRef = doc(wishlistCollRef);

          await setDoc(newDocRef,{
          "product_id":prod_id,
          "email":userMail
          });


       }else{
        warningFeedback('Removing product from wishlist');
          //exist delete matching field
          const updatePromises = querySnapshot.docs.map((docSnapshot) => {
              const docRef = doc(db, "wishlist", docSnapshot.id);
              return deleteDoc(docRef); // Delete the document
            });
      
            await Promise.all(updatePromises);
            console.log("Successfully removed specified field from matching documents.");
       }

       //refetch wishlist data
       getWishlistData();
       //update ui
       //updateWishlistStatusUI();
      

      

      }catch(error){
          console.error("Error removing field from documents:", error.message);
          errorFeedback('Remove request failed');


      }
  }

     //return product array wishlisted by user
      const filterProductsByWishlist = () => {

          // Extract the product_id values from wishlistData
          const wishlistProductIds = wishlistData.map((item) => item.product_id);
          //console.log(wishlistProductIds);

                  // Filter productData to include only products with matching product_id
          const userWishlist = listAllProducts.filter((product) => wishlistProductIds.includes(product.id));
          
          console.log('List of products array wishlisted by user')
          console.log(userWishlist);

         setCurrentUserWishlist(userWishlist);
  
   

          
      };

      //return product array added to cart by user inject quantity and color from cart to final array
      const filterProductsByUserCart = () =>{
        
        const mergedData = cartListData.map(cartItem => {
          const product = listAllProducts.find(product => product.id === cartItem.product_id);
          if (product) {
            return {
              ...product,
              product_color: cartItem.product_color,
              quantity: cartItem.quality
            };
          }
          return null; // Handle cases where product is not found
        }).filter(item => item !== null); // Remove nulls for unmatched products
    

    
         
        console.log('List of products array added to cart by user') 
        console.log(mergedData)
        setCartProductsArray(mergedData);  
      }


         //add or remove product from cart
         const removeProductCart = async(prod_id) =>{
          try{
           
            if(!userMail){
              //not login
              return false;
           }   
          
           warningFeedback('Removing product from cart');
           const cartCollRef =  collection(db,"cart");
           const q = query(
            cartCollRef,
              where("product_id","==",prod_id),
              where("email","==",userMail)
           )
           const querySnapshot = await getDocs(q);
    
           if (!querySnapshot.empty) {
                //exist delete matching field remove product from cart
                const updatePromises = querySnapshot.docs.map((docSnapshot) => {
                  const docRef = doc(db, "cart", docSnapshot.id);
                  return deleteDoc(docRef); // Delete the document
                });
          
                await Promise.all(updatePromises);
                console.log("Successfully removed specified field from matching documents.");
            
    
           }else{
            //does not exist
            console.log("No matching documents found. Creating a new document...");
    
           }
    
           //refech cartdata
           getCartProducts();
  
      
          }catch(error){
              console.log(`Removing product from cart request:${error.message}`);
              errorFeedback('Remove request failed');
          }
      
         }
  
       useEffect(()=>{
        fetchAllProducts();
       },[]);

      useEffect(()=>{
      filterProductsByWishlist();

      },[wishlistData,listAllProducts])

      useEffect(() =>{
       filterProductsByUserCart();  
      },[cartListData,listAllProducts])
      



    useEffect(()=>{
     fetchUserTokenFromDevice();
     getWishlistData();
     getCartProducts();
    checkIfTokenExpired();
    },[userMail])



    return(
      <MyContext.Provider value={{
        uiTheme,setUiTheme,
        textColor,setTextColor,
        successFeedback,errorFeedback,contextHolder,
        warningFeedback,
        navBarIsOpen,setNavBarIsOpen,
        toggleNavbar,isAppLoading,setIsAppLoading,
        showModal, setShowModal,toggleModal,
        modalType,setModalType,isModalLarge,setIsModalLarge,fetchUserTokenFromDevice,
        userToken,setUserToken,userMail,setUserMail,
        logOut,
        uploadProdTitle,uploadProdPrice,uploadProdDesc, uploadProdColor,uploadProdImages,uploadProdCategory,
        setUploadProdTitle,setUploadProdPrice,setUploadProdDesc,setUploadProdColor,setUploadProdImages,
        setProdCategory,
        capitalizeFirstLetter,
        wishlistData,getWishlistData,
        cartListData,setCartListData,removeProductCart,getCartProducts,cartProductsArray,setCartProductsArray,
        listAllProducts,fetchAllProducts,
        updateWishlistByAction,
        currentUserWishlist,

      }}>
        {props.children}
      </MyContext.Provider>
    )
}

export default MyContext;