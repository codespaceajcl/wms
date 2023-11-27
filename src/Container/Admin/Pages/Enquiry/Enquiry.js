import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';
import './Enquiry.css';

const Enquiry = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "General Enquiry"]} />

            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> General Enquiry</h5>

                <div className='enquiry_main mt-5'>
                    <Row>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box'>
                                <img src='/images/serialno_img.png' alt='' className='black' />
                                <img src='/images/serialno_white.png' alt='' className='white' />
                                <h6>Serial Number</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box'>
                                <img src='/images/partno_img.png' alt='' className='black' />
                                <img src='/images/partno_white.png' alt='' className='white' />
                                <h6>Part Number</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => navigate('/enquiry/nomenclature')}>
                                <img src='/images/nomenclature_img.png' alt='' className='black' />
                                <img src='/images/nomenclature__white.png' alt='' className='white' />
                                <h6>Nomenclature</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box'>
                                <img src='/images/nameclature_img.png' alt='' className='black' />
                                <img src='/images/nameclature_white.png' alt='' className='white' />
                                <h6>Nomenclature</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box'>
                                <img src='/images/location_img.png' alt='' className='black' />
                                <img src='/images/location_white.png' alt='' className='white' />
                                <h6>Location</h6>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Enquiry
