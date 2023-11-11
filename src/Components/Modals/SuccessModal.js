import React from 'react';
import './Modals.css';
import { Modal } from 'react-bootstrap';

const SuccessModal = ({ show, setShow }) => {
  return (
    <Modal centered show={show} onHide={setShow} className='success'>
      <Modal.Body>
        <img src='/images/correct_icon.png' alt='' />
        <h2>Success!</h2>
        <p>Your form  has been submitted <br />
          successfully!</p>
      </Modal.Body>
    </Modal>
  )
}
export default SuccessModal