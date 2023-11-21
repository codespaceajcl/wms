import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Input from '../../../../Components/Input/Input';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';

const RMA = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const materialSubmitHandler = (e) => {
        e.preventDefault();

        setShow(true)
    }

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "RMA"]} />

            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Return Merchandise Authorization</h5>
                <p>Please fill out this form with the required information</p>

                <Form onSubmit={materialSubmitHandler} className='mt-5'>
                    <Row className='justify-content-around'>
                        <Col md={6}>
                            <Input label={'Company Name'} />
                        </Col>
                        <Col md={6}>
                            <Input label={'Contact Name'} />
                        </Col>
                        <Col md={12}>
                            <Input label={'Address'} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>City</label>
                            <Select options={options} placeholder="Select City" className='react_select' />
                        </Col>
                        <Col md={6}>
                            <Input label={'Country'} />
                        </Col>
                        <Col md={6}>
                            <Input label={'Phone'} />
                        </Col>
                        <Col md={6}>
                            <Input label={'Email'} />
                        </Col>
                        <Col md={12}>
                            <Input label={'No of Products'} />
                        </Col>
                        <Col md={12}>
                            <Form.Check
                                type={'checkbox'}
                                label={`I agree to the terms and conditions`}
                            />
                        </Col>
                        <Col md={12}>
                            <button className='submit_btn' type='submit'>Submit</button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default RMA
