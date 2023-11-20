import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './StockIn.css';

const StockIn = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Stock In</h5>
                <p>Select Any One</p>

                <div className='stockin_main mt-5'>
                    <Row>
                        <Col md={4}>
                            <div className='stockin_box' onClick={() => navigate('/stock-in/shipment-stock')}>
                                <img src='/images/purchase_stock.png' alt='' className='black' />
                                <h6>Shipment/ <br />
                                    Purchases <br />
                                    Stock</h6>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='stockin_box' onClick={() => navigate('/stock-in/return-stock')}>
                                <img src='/images/return_stock.png' alt='' className='black' />
                                <h6>Returned <br />
                                    Stock</h6>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='stockin_box' onClick={() => navigate('/stock-in/transfer-stock')}>
                                <img src='/images/transfer_stock.png' alt='' className='black' />
                                <h6>Transferred  <br /> Stock</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={12}>
                            <button className='submit_btn' onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default StockIn
