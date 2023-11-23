import React from 'react';
import './Modals.css';
import { MdClose } from "react-icons/md";
import { Modal } from 'react-bootstrap';

const SuccessModal = ({ show, setShow }) => {
  return (
    <Modal centered show={show} onHide={setShow} className='success' style={{ backgroundColor: '#00000040' }}>
      <Modal.Body>
        <MdClose className='close_btn' onClick={setShow} />

        <div>
          <img src='/images/correct_icon.png' alt='' />
          <h2>Success!</h2>
          <p>Your form  has been submitted <br />
            successfully!</p>
        </div>
      </Modal.Body>
    </Modal >
  )
}
export default SuccessModal