import React from 'react';
import './Modals.css';
import { Modal } from 'react-bootstrap';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const NoInternetModal = () => {
    return (
        <Modal centered show={true} className='error'>
            <Modal.Body>
                <MdSignalWifiConnectedNoInternet0 />

                <h2>Oops!</h2>
                <p>No Internet Connection</p>

            </Modal.Body>
        </Modal>
    )
}
export default NoInternetModal;