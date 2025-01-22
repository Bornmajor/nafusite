import React,{useState} from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import ProductCard from '../components/ProductCard';
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import product_2 from '../assets/images/IMG_20241116_114701.jpg'
import product_3 from '../assets/images/IMG_20241116_115256.jpg'
import product_4 from '../assets/images/IMG_20241116_115343.jpg'
import Modal from 'react-bootstrap/Modal';
import CreateProductModalContent from '../components/CreateProductModalContent';
import AddProductImagesContent from '../components/AddProductImagesContent';
import { useContext } from 'react';
import MyContext from '../context/context';
import { Button } from 'antd';
import { db } from '../firebase/firebaseConfig';
import { collection,addDoc} from "firebase/firestore";

const ProductsBoard = () => {
const [show, setShow] = useState(false);
const [publishState,setpublishState] = useState('create_product');
const { 
    uploadProdTitle,uploadProdPrice,uploadProdDesc,uploadProdColor,uploadProdCategory,
    setUploadProdTitle,setUploadProdPrice,setUploadProdDesc,
    errorFeedback,contextHolder,uploadProdImages,setUploadProdImages,setUploadProdColor,setProdCategory,
    successFeedback
} = useContext(MyContext);
const [isFormLoading,setIsFormLoading] = useState(false);
 const [isOnline, setIsOnline] = useState(navigator.onLine);




const handleToggleModal = () =>{
setShow(!show);
}

//check first form before images is filled
const proceedAddImages = () => {
if(uploadProdTitle !== '' && uploadProdPrice !== '' && uploadProdDesc !== '' && uploadProdCategory  !== ''){
console.log(`Product name - ${uploadProdTitle},price - ${uploadProdPrice},Desc -${uploadProdDesc},Color - ${uploadProdColor},Category - ${uploadProdCategory}`);      
setpublishState('add_images');
  
}else{
errorFeedback('All fields required');
}


}

const publishProduct = async() => {
try{

 //disable submit btn
setIsFormLoading(true);  

//check internet if available 
if(!isOnline){     
errorFeedback('Internet required to complete request!!')
//enable submit btn
setIsFormLoading(false);  
return false;
}

//check for all selected entries 
if(uploadProdTitle !== '' && uploadProdPrice !== '' && uploadProdDesc !== '' && uploadProdColor !== '' && uploadProdCategory  !== '' &&  !uploadProdImages){
errorFeedback('All fields required');
setIsFormLoading(false);  
return false;
}

//upload to firestore db
//check internet if available 
if(!isOnline){     
errorFeedback('Internet required to complete request!!')
//enable submit btn
setIsFormLoading(false);  
return false;
}

 // Firestore products collection
 

 const prodCollectionRef = collection(db, "products");
 const data = {
    product_title:uploadProdTitle,
    product_price:uploadProdPrice,
    product_desc:uploadProdDesc,
    product_color:uploadProdColor,
    product_category:uploadProdCategory,
    product_images:uploadProdImages
}
//nstead of using doc(db, "products"), which requires an even number of path segments, we use collection(db, "products") to reference the collection.

//addDoc() automatically generates a unique document ID.
await addDoc(prodCollectionRef, data);

console.log(`Product name - ${uploadProdTitle},price - ${uploadProdPrice},Desc -${uploadProdDesc},Color - ${uploadProdColor}`)

console.log(uploadProdImages);
setUploadProdTitle()
setUploadProdPrice()
setUploadProdDesc()
setUploadProdColor();
setUploadProdImages([]);

setShow(false);
successFeedback('Image published');
//unlock submit btn
setIsFormLoading(false);     

}catch(error){
errorFeedback(`Something went wrong: ${error.message}`);
setIsFormLoading(false);  

}




}

return (
<>
{contextHolder}
<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

<h1 className="h2">Products</h1>

<div className="btn-toolbar">

<button type="button" className="btn btn-sm btn-primary" onClick={()=> handleToggleModal()}>
<IoAddCircleSharp fontSize={23} /> Add product
</button>


</div>



</div>
{/*content goes here*/}


<div className="list-product-board">

<ProductCard id="1" img_url={product_1} title="Product 1" price="500" width="150px" height="200px" mode="edit"/>
<ProductCard id="2" img_url={product_2} title="Product 2" price="500" width="150px" height="200px" mode="edit"/>
<ProductCard id="3" img_url={product_3} title="Product 1" price="500" width="150px" height="200px" mode="edit"/>
<ProductCard id="4" img_url={product_1} title="Product 1" price="500" width="150px" height="200px"mode="edit"/>
<ProductCard id="5" img_url={product_2} title="Product 2" price="500" width="150px" height="200px"mode="edit"/>
<ProductCard id="6" img_url={product_3} title="Product 1" price="500" width="150px" height="200px" mode="edit"/>

</div>



</main>       

{/*modal */}
<Modal show={show} onHide={handleToggleModal}>
<Modal.Header style={{border:'none'}} closeButton>
<Modal.Title>Publish product</Modal.Title>
</Modal.Header>
<Modal.Body>

    {publishState === 'create_product'&& <CreateProductModalContent />  }
    {publishState === 'add_images'&& <AddProductImagesContent/> }
   


{publishState === 'create_product' 
 && 
<button className='btn btn-primary w-100 my-2' onClick={() => proceedAddImages()} >
    Proceed
</button>
}

{publishState === 'add_images' 
 && 
 <div className='d-flex justify-content-end align-items-center mt-3'>
 <button className='btn btn-outline-primary my-2 w-25' onClick={() => setpublishState('create_product')} >
   Back
</button>

 {/* <button className='btn btn-primary mx-2 w-75' onClick={() => publishProduct()}>
   Done
</button> */}

<Button className='submit-btn mx-2 w-75' loading={isFormLoading} onClick={() => publishProduct()}>
  Done
   </Button>
 </div>

}


</Modal.Body>

</Modal>

</>

);
}

export default ProductsBoard;
