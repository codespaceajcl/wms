import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row } from 'react-bootstrap';
import Input from '../../../../Components/Input/Input';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';
import { materialColorStyles } from "../../../../Util/Helper";
import { Field, Formik } from 'formik';
import { rmaListSchema } from '../../../../Util/Validations';

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

                <Formik
                    validationSchema={rmaListSchema}
                    initialValues={{
                        companyName: "",
                        contactName: "",
                        address: "",
                        country: "",
                        phone: "",
                        email: "",
                        no_products: null,
                        countrySelected: false,
                        citySelected: false,
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        setShow(true);
                    }}
                >
                    {({
                        handleSubmit,
                        errors,
                        touched,
                    }) => (
                        <Row className='justify-content-around align-items-center mt-5'>
                            <Col md={6}>
                                <Field
                                    component={Input}
                                    name="companyName"
                                    label="Company Name"
                                />
                            </Col>
                            <Col md={6}>
                                <Field
                                    component={Input}
                                    name="contactName"
                                    label="Contact Name"
                                />
                            </Col>
                            <Col md={12}>
                                <Field
                                    component={Input}
                                    name="address"
                                    label="Address"
                                />
                            </Col>
                            <Col md={6}>
                                <label className='react_select_label'>Country</label>
                                <Select options={options} placeholder="Select Country" styles={materialColorStyles} />

                                {errors.countrySelected && touched.countrySelected ? (
                                    <p className='error_para'> {errors.countrySelected} </p>
                                ) : (
                                    <p className='error_para' style={{ color: "transparent" }}> no error</p>
                                )}
                            </Col>
                            <Col md={6}>
                                <label className='react_select_label'>City</label>
                                <Select options={options} placeholder="Select City" styles={materialColorStyles} />

                                {errors.citySelected && touched.citySelected ? (
                                    <p className='error_para'> {errors.citySelected} </p>
                                ) : (
                                    <p className='error_para' style={{ color: "transparent" }}> no error</p>
                                )}

                            </Col>
                            <Col md={6}>
                                <Field
                                    component={Input}
                                    name="phone"
                                    label="Phone"
                                />
                            </Col>
                            <Col md={6}>
                                <Field
                                    component={Input}
                                    name="email"
                                    label="Email"
                                />
                            </Col>
                            <Col md={12}>
                                <Field
                                    component={Input}
                                    name="no_products"
                                    label="No of Products"
                                />
                            </Col>
                            <Col md={12}>
                                <Form.Check
                                    type={'checkbox'}
                                    label={`I agree to the terms and conditions`}
                                />
                            </Col>
                            <Col md={12}>
                                <button className='submit_btn' type='button' onClick={handleSubmit}>Submit</button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RMA
