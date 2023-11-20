import React, { useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row, Table } from 'react-bootstrap';
import Input from '../../../../../Components/Input/Input';
import { useNavigate } from 'react-router-dom';

const ShipmentStock = () => {
    const navigate = useNavigate();
    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Stock In (ASN)
                    <div className='create serial_generate'> <img src='/images/serial_icon.png' alt='' /> Generate Serial No</div>
                </h5>

                <Form style={{ padding: "0 20px" }}>
                    <Row className='mt-5'>
                        <Col md={5}>
                            <label className='react_select_label'>Order <span>*</span></label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        <Col md={5}>
                            <Input label={'Transactional Number'} placeholder="Enter PO/Invoice/Lot/Shipment No" isRequired={true} />
                        </Col>
                        <Col md={5} className='mt-3'>
                            <Input label={'Vehicle Number'} placeholder="Enter Consignee" isRequired={true} />
                        </Col>
                        <Col md={5} className='mt-3'>
                            <Input label={'Receiving Date'} type="Date" isRequired={true} />
                        </Col>
                        <Col md={5} className='mt-3'>
                            <label className='react_select_label'>Business Type <span>*</span></label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        <Col md={5} className='mt-3'>
                            <Input label={'Warehouse'} placeholder="PakistanNone01_Agility Port Qasim" isRequired={true} />
                        </Col>
                        <Col md={5} className='mt-3'>
                            <label className='react_select_label'>Customer <span>*</span></label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        {/* <Col md={9} className='mt-4'>
                            <button className='submit_btn' type='submit'>Generate Report</button>
                        </Col> */}
                    </Row>
                </Form>

                <div className='shipment_stock_main'>
                    <h6>Select Item & Upload Serialization</h6>

                    <Row className='my-2 mx-2 align-items-center'>
                        <Col md={8}>
                            <Select options={options} placeholder="Search Part No/Noms/NSN" className='react_select_inhouse stock' />
                        </Col>
                        <Col md={4}>
                            <p className='serialization_para'>
                                <span>UIM Serialization Template</span> <br />
                                <span>Equipment Serialization Template</span>
                            </p>
                        </Col>
                    </Row>

                    <Row className=''>
                        <div className='report_summary_table'>
                            <Table striped bordered responsive>
                                <thead>
                                    <tr className='super_head'>
                                        <th colSpan={2}>S.No</th>
                                        <th colSpan={3}>Part Number</th>
                                        <th colSpan={3}>Nomenclature</th>
                                        <th colSpan={3}>NSN</th>
                                        <th colSpan={3}>Sterilization</th>
                                        <th colSpan={2}>Quantity</th>
                                        <th colSpan={2}>Remove</th>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ShipmentStock
