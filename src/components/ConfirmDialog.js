import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'antd';
import { useEffect } from 'react';


const ConfirmDialog = ({action,confirmText,children}) => {
const [openConfirm, setOpenConfirm] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);


useEffect(()=>{
console.log(openConfirm);
},[openConfirm]);

const handleClose = () => setOpenConfirm(false);

const handleOk = async() => {

setConfirmLoading(true);

await action();

// setOpenConfirm(false);
// setConfirmLoading(false);

// setTimeout(() => {
// setOpenConfirm(false);
// setConfirmLoading(false);
// }, 2000);
};
const handleCancel = () => {
console.log('Clicked cancel button');
setOpenConfirm(false);
};

return (
<>

<Modal show={openConfirm} onHide={handleClose}>
<Modal.Header style={{border:'none'}} closeButton>
<Modal.Title>Confirm Modal</Modal.Title>
</Modal.Header>
<Modal.Body>
    <p className='bold'>
     {confirmText}   
    </p>

    
</Modal.Body>
<Modal.Footer  style={{border:'none'}}>
<Button className="btn btn-outline-primary confirm-btn" onClick={handleCancel} disabled={confirmLoading}>
Cancel
</Button>
<Button className='btn-primary confirm-btn' onClick={handleOk} loading={confirmLoading}>
Ok
</Button>
</Modal.Footer>
</Modal>

<span onClick={() => setOpenConfirm(true)}>
{children}    
</span>


</>
);
}

export default ConfirmDialog;
