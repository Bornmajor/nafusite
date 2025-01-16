import React, { useContext, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import product_1 from '../assets/images/IMG_20241116_102001.jpg'
import MyContext from '../context/context';


const AddProductImagesContent = () => {
    const [imageLink,setImageLink] = useState('');
    const [coverImg,setCoverImg] = useState(false);
    const [isSwitchDisabled,setIsSwitchDisabled] = useState(false);
    const {uploadProdImages,setUploadProdImages,errorFeedback} = useContext(MyContext);

    const updateImageArray = () => {
        if(!imageLink){
            errorFeedback('Image link required');
            return false;
        }
        //updates array of images for the product
        setUploadProdImages((prev) => [...prev,{imageLink,coverImg}]);

        if(coverImg){
            setIsSwitchDisabled(true)
        }

        setImageLink('');
        setCoverImg(false);
        console.log(uploadProdImages);


    } 

    const removeImageFromArray = (img_link)=>{
       //removes an image from images under preview
        const updatedArray = uploadProdImages.filter((img) => img.imageLink !== img_link);
        setUploadProdImages(updatedArray);

    }
return (
<div className=''>

<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Add image link</label>
<input type="text"
 className="form-control"
 value={imageLink}
 onChange={(e) => setImageLink(e.target.value)}
id="exampleInputtext"
 aria-describedby="emailHelp" />
</div>

{!isSwitchDisabled
&&
<div className="form-check form-switch">
<input className="form-check-input"
type="checkbox"
role="switch"
value="true"
onChange={(e) => setCoverImg(e.target.value)}
id="flexSwitchCheckDefault"
 />
<label className="form-check-label" for="flexSwitchCheckDefault">Make cover image</label>
</div>

}


<div className='d-flex justify-content-end'>
<button className='btn btn-primary mt-2' onClick={()=> updateImageArray()}>
   Add image
</button>    
</div>


<div className='preview-image-container horizontal-scrollable mt-3' style={{paddingLeft:0}}>

     {uploadProdImages.map((item) => (
      <div className='preview' id={item.imageLink}>
        <span className='remove-preview' onClick={() => removeImageFromArray(item.imageLink) }>
            <IoIosCloseCircle  className='close-icon' />
       </span>
        <img className='img-view' src={item.imageLink} width="100px" />

    </div>   
     ))}
    
   


</div>


</div>
);
}

export default AddProductImagesContent;
