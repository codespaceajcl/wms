import React from 'react';
import './Modals.css';
import { Modal } from 'react-bootstrap';
import {AiFillCloseCircle} from "react-icons/ai"

const ErrorModal = ({ show, setShow }) => {
    return (
        <Modal centered show={show} onHide={setShow} className='success'>
            <Modal.Body>
                <AiFillCloseCircle />
                <h2>Error!</h2>
                <p>This warehouse is already existed</p>
            </Modal.Body>
        </Modal>
    )
}
export default ErrorModal