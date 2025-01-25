import React,{useContext, useState} from 'react';
import HorizontalCard from './HorizontalCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Sheet } from 'react-modal-sheet';
import MyContext from '../context/context';
import { collection, getDocs,deleteDoc,query,where,doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const CartModalContent = () => {
    const [isOpen, setOpen] = useState(false);
    const {cartProductsArray,userMail,getCartProducts,contextHolder,warningFeedback} = useContext(MyContext);
    const toggleSheet = () =>{
        setOpen(!isOpen);
    }

    //calculate subtotal for cart p
    const calculateCartTotal = (cartData) => {
        // Map each item to its total (quality * price)
        const itemTotals = cartData.map(item => item.quantity * item.product_price);
      
        // Sum up the item totals
        const total = itemTotals.reduce((sum, itemTotal) => sum + itemTotal, 0);
      
        return total;
      };

      const clearCart = async() =>{
        try{
          const cartCollectionRef = collection(db,"cart");
          const q = query(cartCollectionRef,where("email","==",userMail));

          const querySnapshot = await getDocs(q);

          if(!querySnapshot.empty){
            //mean document exist proceed
      //exist delete matching field remove product from cart
      const updatePromises = querySnapshot.docs.map((docSnapshot) => {
      const docRef = doc(db, "cart", docSnapshot.id);
      return deleteDoc(docRef); // Delete the document
      });

      await Promise.all(updatePromises);
      console.log("Successfully cleared users' cart");
      setOpen(false)
           
      //reload cart 
      getCartProducts();
          }




        }catch(error){
          console.log(`Clear cart request failed:${error.message}`)

        }
      }

    return (
        <>
         <div className='cart-modal-container'>
         {contextHolder}
            
         { cartProductsArray.length !== 0
               &&
          <div className="cart-info">
            <p className="title bold">Summary</p>    

            

            <div>
            <p>Total items <IoIosArrowRoundForward fontSize="20px" /> <span className='bold'>{cartProductsArray.length}</span></p>   
            <p> Subtotal <IoIosArrowRoundForward fontSize="20px" /> <span>Ksh</span> <span className='bold'>{calculateCartTotal(cartProductsArray)}</span>
            </p>   

            </div>

               <div className="d-flex align-items-center my-3">
            <button className="btn btn-outline-primary cart-btn" onClick={() => clearCart()} >Clear cart</button> 
            <button className="btn btn-primary mx-2 cart-btn" onClick={() => warningFeedback('This feature unavailable')}>Pay now</button>     
            </div>
            
                


            </div>     
               
          }
                
            

            <div className="cart-products-container">

             
          
              {
                cartProductsArray.length !== 0
                ?
                <>
                     <div className='sm-cart-info'>

                <div className='d-flex align-items-center justify-content-between my-3 '>
                    <p className='main-header bold'>No. of items <IoIosArrowRoundForward fontSize="20px" /> <span  className='bold'>{cartProductsArray.length}</span></p>
                 <button className='btn btn-primary' onClick={() => toggleSheet()} >Order items</button>
                 </div>
                
                
              </div> 
                 {
                 cartProductsArray.map((item) => 
               
                <HorizontalCard id={item.id}
                 mode="cart"
                 title={item.product_title}
                 imgUrl={item.coverImage.imageLink}
                  price={item.product_price}
                  quantity={item.quantity}
                  color={item.product_color}
                  
                  />    
              
                ) 
                 }
                 
                </>
             
         
                :
                <p className='text-center bold p-3'>Cart empty</p>


              }  
            
            {/* <HorizontalCard id="1" mode="cart" title="Product 1" imgUrl={product_1} price="200"/> */}



            </div>

            
            
        </div>


        <Sheet isOpen={isOpen}
        onClose={() => setOpen(false)}
        detent='content-height'
        className='filter-bottom-tab'>
        <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content className='content-body'>

        <div className="cart-info">
            <p className="main-header bold mb-3">Summary</p>    

            

            <div>
            <p>No. of items <IoIosArrowRoundForward fontSize="20px" /> <span className='bold' >{cartProductsArray.length}</span></p>   
            <p> Subtotal <IoIosArrowRoundForward fontSize="20px" /> <span>Ksh</span> <span  className='bold'>{calculateCartTotal(cartProductsArray)}</span>
            </p>   

            </div>

               <div className="d-flex align-items-center justify-content-between my-4">
            <button className="btn btn-outline-primary cart-btn" onClick={() => clearCart()} >Clear cart</button> 
            <button className="btn btn-primary mx-2 cart-btn" onClick={() => warningFeedback('This feature unavailable')}>Make payment</button>     
            </div>
            

            </div>
    
        
        </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpen(false)}  />
        </Sheet>
        </>
       
    );
}

export default CartModalContent;
