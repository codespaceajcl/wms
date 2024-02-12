import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';
import './Enquiry.css';
import { allImages } from '../../../../Util/Images';

const Enquiry = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const enquiryHandler = (enquiry, name) => {
        navigate("/wms/enquiry/detail", { state: { serialNo: enquiry, name: name } })
    }

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "General Enquiry"]} />

            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> General Enquiry</h5>

                <div className='enquiry_main mt-5'>
                    <Row>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => enquiryHandler("sno", "Serial Number")}>
                                <img src={allImages.serialno_img} alt='' className='black' />
                                <img src={allImages.serialno_white} alt='' className='white' />
                                <h6>Serial Number</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => enquiryHandler("partNo", "Part Number")}>
                                <img src={allImages.partno_img} alt='' className='black' />
                                <img src={allImages.partno_white} alt='' className='white' />
                                <h6>Part Number</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => enquiryHandler("nomenclature", "NomenClature")}>
                                <img src={allImages.nomenclature_img} alt='' className='black' />
                                <img src={allImages.nomenclature__white} alt='' className='white' />
                                <h6>Nomenclature</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => enquiryHandler("transactions", "Transactions")}>
                                <img src={allImages.nomenclature_img} alt='' className='black' />
                                <img src={allImages.nomenclature__white} alt='' className='white' />
                                <h6>Transaction</h6>
                            </div>
                        </Col>
                        <Col md={4} sm={6}>
                            <div className='enquiry_box' onClick={() => enquiryHandler("location", "Location")}>
                                <img src={allImages.location_img} alt='' className='black' />
                                <img src={allImages.location_white} alt='' className='white' />
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
