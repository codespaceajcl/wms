import React from 'react';
import './Modals.css';
import { MdClose } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { allImages } from '../../Util/Images';

const SuccessModal = ({ show, setShow, para }) => {
  return (
    <Modal centered show={show} onHide={setShow} className='success' style={{ backgroundColor: '#00000040' }}>
      <Modal.Body>
        <MdClose className='close_btn' onClick={setShow} />

        <div>
          <img src={allImages.correct_icon} alt='' />
          <h2>Success!</h2>
          {
            para ? <p>{para}</p> :
              <p>Your form  has been submitted <br />
                successfully!</p>
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default SuccessModal