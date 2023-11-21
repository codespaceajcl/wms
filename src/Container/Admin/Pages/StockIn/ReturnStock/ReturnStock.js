import React from 'react'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const ReturnStock = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Stock In</h5>
                <p>Select Any One</p>

                <div className='stockin_main mt-5'>
                    <Row className='justify-content-center'>
                        <Col md={5}>
                            <div className='stockin_box' onClick={() => navigate('/stock-in/return-stock/known')}>
                                <img src='/images/known_stock.png' alt='' className='black' />
                                <h6>Known Stock</h6>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className='stockin_box' onClick={() => navigate('/stock-in/return-stock/unknown')}>
                                <img src='/images/unknown_stock.png' alt='' className='black' />
                                <h6>Unknown Stock</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4 justify-content-center'>
                        <Col md={10}>
                            <button className='submit_btn' onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ReturnStock
