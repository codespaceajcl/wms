import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Input from '../../../../../Components/Input/Input';
import { materialColorStyles } from '../../../../../Util/Helper';

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
                            <div className='input_field'>
                                <label>Full Name <span>*</span> </label>
                                <input placeholder="Enter Full Name" type='text' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Nick Name <span>*</span> </label>
                                <input placeholder="Enter Nick Name" type='text' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Phone <span>*</span> </label>
                                <input placeholder="0300 123456" type='tel' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Gender <span>*</span></label>
                            <Select options={[{value: "male", label: "Male"}, {value: "female", label: "Female"}]} placeholder="Select Gender" className='react_select' styles={materialColorStyles} />
                        </Col>
                        <Col md={12}>
                            <div className='input_field'>
                                <label>Address <span>*</span> </label>
                                <input placeholder="Enter Address" type='text' />
                            </div>
                        </Col>
                        <Col md={12} className='mt-3 d-flex align-items-center gap-3'>
                            <button className='submit_btn' type='submit'>Save Changes</button>
                            <button className='back_btn mt-0' type='button' onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default EditProfile
