import React, { useEffect } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Input from '../../../../Components/Input/Input';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import { login, materialColorStyles } from "../../../../Util/Helper";
import { Field, Formik } from 'formik';
import { rmaListSchema } from '../../../../Util/Validations';
import { errorNotify } from '../../../../Util/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { postRmaForm } from '../../../../Redux/Action/Admin';
import { Document, Page, pdfjs } from 'react-pdf';
import Loader from '../../../../Util/Loader';
import './RMA.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const RMA = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [noOfProducts, setNoOfProducts] = useState(null)
    const [checked, setChecked] = useState(false);
    const [previewPdf, setPreviewPdf] = useState('')
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [productDetails, setProductDetails] = useState(null)
    const [noOfPro, setNoOfPro] = useState([])

    const { loading, rmaData } = useSelector((state) => state.postRma)

    useEffect(() => {
        if (rmaData?.response === 'success') {
            setPreviewPdf(rmaData?.document)
            setShow(true)
            setProductDetails(null)
            setChecked(false)
            dispatch({ type: "POST_RMA_FORM_RESET" })
        }
    }, [rmaData])

    const handleNoOfProducts = (e) => {
        let value = parseInt(e.target.value);
        value = Math.min(Math.max(value, 1), 100);

        setNoOfProducts(value)

        setNoOfPro(Array.from({ length: value }, (_, index) => index));

        const newProductData = Array.from({ length: value }, (_, index) => ({
            [`productName${index + 1}`]: '',
            [`quantity${index + 1}`]: '',
            [`reason${index + 1}`]: '',
            [`description${index + 1}`]: '',
        }));

        setProductDetails(newProductData);
    }

    const reasonOptions = [
        { value: 'damage', label: 'Damage' },
        { value: 'faulty', label: 'Faulty' },
    ]

    const handleNoOfProductChange = (i, name, value) => {
        // let v = parseInt(value);
        // v = Math.min(Math.max(value, 1), 100);

        setProductDetails((prevData) => {
            const updatedData = [...prevData];
            updatedData[i][name] = value;
            return updatedData;
        });
    };

    const handleReasonChange = (i, name, value) => {
        setProductDetails((prevData) => {
            const updatedData = [...prevData];
            updatedData[i][name] = value;
            return updatedData;
        });
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const onButtonClick = () => {
        const pdfUrl = previewPdf
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "rma.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const modal = <Modal centered className='preview_doc_modal' show={show}>
        <Modal.Body>
            <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
                {
                    loading ? <Loader color={"#fff"} /> : previewPdf?.length > 0 ?
                        <div className='preview_show_data'>
                            <MdClose onClick={() => setShow(!show)} className='close_icon' />

                            <button onClick={onButtonClick} className='download_pdf_btn'>Download</button>

                            <Document file={previewPdf} onLoadSuccess={onDocumentLoadSuccess} loading={<div style={{ height: "200px" }}> <Loader color={"#fff"} /> </div>}>
                                <Page pageNumber={pageNumber} />
                            </Document>
                        </div> : null
                }
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "RMA"]} />

            {/* <SuccessModal show={show} setShow={() => setShow(!show)} /> */}

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
                        city: "",
                        phone: "",
                        email: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        const formData = new FormData();
                        let isFormValid = true;

                        productDetails && productDetails?.forEach((proData, index) => {
                            if (proData[`productName${index + 1}`].length === 0 || proData[`quantity${index + 1}`].length === 0 || proData[`reason${index + 1}`].length === 0 || proData[`description${index + 1}`].length === 0) {
                                isFormValid = false;
                            }

                            formData.append(`productName${index + 1}`, proData[`productName${index + 1}`])
                            formData.append(`quantity${index + 1}`, proData[`quantity${index + 1}`])
                            formData.append(`reason${index + 1}`, proData[`reason${index + 1}`])
                            formData.append(`description${index + 1}`, proData[`description${index + 1}`])
                        })

                        if (values.companyName.length === 0 || values.contactName.length === 0 || values.address.length === 0 || values.country.length === 0 || values.city.length === 0 || values.phone.length === 0 || values.email.length === 0) {
                            isFormValid = false;
                        }

                        if (!isFormValid) {
                            errorNotify('Please fill in all the required fields.')
                            return;
                        }

                        formData.append('companyName', values.companyName)
                        formData.append('contactName', values.contactName)
                        formData.append('address', values.address)
                        formData.append('country', values.country)
                        formData.append('city', values.city)
                        formData.append('phone', values.phone)
                        formData.append('companyEmail', values.email)
                        formData.append('noOfProducts', noOfProducts)
                        formData.append("email", login.email)
                        formData.append("token", login.token)

                        if (!checked) {
                            errorNotify("Please agree on terms and condition")
                            return;
                        }

                        dispatch(postRmaForm(formData))

                        resetForm()

                    }}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Row className='mt-5 mb-3'>
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
                                    <Field
                                        component={Input}
                                        name="country"
                                        label="Country Name"
                                    />
                                </Col>
                                <Col md={6}>
                                    <Field
                                        component={Input}
                                        name="city"
                                        label="City Name"
                                    />
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
                                <Col md={4} className='input_field'>
                                    <label>No of Products</label>
                                    <input
                                        onChange={handleNoOfProducts}
                                        value={noOfProducts}
                                        type='Number'
                                    />
                                </Col>
                            </Row>

                            {
                                noOfPro?.map((p, index) => {
                                    const isEven = index % 2 === 0;
                                    const rowClass = isEven ? 'product_even' : 'product_odd';

                                    return (
                                        <Row className={`${rowClass}`}>
                                            {
                                                <>
                                                    <Col md={4} className='input_field'>
                                                        <label>Product Name</label>
                                                        <input
                                                            onChange={(e) => handleNoOfProductChange(index, `productName${index + 1}`, e.target.value)}
                                                            type='text'
                                                        />
                                                    </Col>
                                                    <Col md={4} className='input_field'>
                                                        <label>Quantity</label>
                                                        <input
                                                            onChange={(e) => handleNoOfProductChange(index, `quantity${index + 1}`, e.target.value)}
                                                            type='Number'
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <label className='react_select_label'>Reason of Return</label>
                                                        <Select options={reasonOptions} placeholder="Select" styles={materialColorStyles}
                                                            onChange={(type) => handleReasonChange(index, `reason${index + 1}`, type.value)} />
                                                    </Col>
                                                    <Col md={12} className='input_field my-3'>
                                                        <label style={{ fontSize: "12px" }}>Please provide detailed comments related to your return so we can complete your request. Missing information can delay processing of your RMA.</label>
                                                        <textarea rows={3}
                                                            onChange={(e) => handleNoOfProductChange(index, `description${index + 1}`, e.target.value)}
                                                        ></textarea>
                                                    </Col>
                                                </>
                                            }
                                        </Row>
                                    )
                                })
                            }
                            <Row className='mt-3'>
                                <Col md={12}>
                                    <Form.Check
                                        type={'checkbox'}
                                        label={`I agree to the terms and conditions`}
                                        onChange={(e) => setChecked(e.target.checked)}
                                    />
                                </Col>
                                <Col md={12}>
                                    <button className='submit_btn' type='button' onClick={handleSubmit}>
                                        {loading ? <Spinner animation='border' size='sm' /> : "Submit"}</button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RMA
