import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Input from '../../../../../Components/Input/Input';

const EditProfile = () => {
    const navigate = useNavigate();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Edit Profile"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Edit Profile</h5>

                <Form className='mt-5'>
                    <Row className='justify-content-around'>
                        <Col md={6}>
                            <Input label={'Full Name'} placeholder='Enter Full Name' />
                        </Col>
                        <Col md={6}>
                            <Input label={'Nick Name'} placeholder='Enter Nick Name' />
                        </Col>
                        <Col md={6}>
                            <Input label={'Phone'} placeholder='0300 123456' />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Country</label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>City</label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Gender</label>
                            <Select options={options} placeholder="Select Gender" className='react_select' />
                        </Col>
                        <Col md={12}>
                            <Input label={'Address'} placeholder='Enter Address' />
                        </Col>
                        <Col md={12} className='mt-3'>
                            <button className='submit_btn' type='submit'>Save Changes</button>
                            <button className='back_btn' type='button' onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default EditProfile
