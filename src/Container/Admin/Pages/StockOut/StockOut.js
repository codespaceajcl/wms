import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row, Form, Modal } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import Select from 'react-select';
import { FiChevronRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import './StockOut.css';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { materialColorStyles, nomenStyles } from "../../../../Util/Helper";

const StockOut = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState('FIFO')
    const [tab2, setTab2] = useState('AUTO')
    const [showCart, setShowCart] = useState(false)
    const [selectPart, setSelectPart] = useState(null)
    const [isCartEmpty, setIsCartEmpty] = useState(true)
    const [showSerialLoader, setSerialLoader] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [selectCheckbox, setSelectCheckbox] = useState(null)

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const partOption = [
        {
            value: 'CCB-84901-2001-10', label: 'CCB-84901-2001-10'
        },
        {
            value: 'CCB-84901-2001-10', label: 'CCB-84901-2001-10'
        }
    ]

    useEffect(() => {

        setSerialLoader(true)

        setTimeout(() => {
            setSerialLoader(false)
        }, 2000)


    }, [quantity])

    const generateElements = () => {
        const elements = [];
        for (let i = 0; i < quantity; i++) {
            elements.push(<TableRow>
                <TableCell padding="checkbox">
                    <Checkbox onChange={(e) => setSelectCheckbox(e.target.value)}
                        style={{ color: "green" }}
                    />
                </TableCell>
                <TableCell>001</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell colSpan={2}>501179241</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>50117924</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    PRK28/4P-M12 - Polarized retro-reflective
                    photoelectric sensor
                </TableCell>
            </TableRow>);
        }
        return elements;
    };

    const stockOutModel = (
        <Modal show={showModal} onHide={() => setShowModal(false)} size='lg' className='stock_out_modal'>
            <Modal.Body>
                <div className='stock_out_model_head' style={{ backgroundColor: "#003A70" }}>
                    <div>
                        Pallet No: <span>1000015</span> | Address: <span>W01AA01A1</span>
                    </div>
                    <AiOutlineClose onClick={() => setShowModal(!showModal)} style={{ cursor: "pointer" }} />
                </div>

                <div className='stock_out_search'>
                    <Row>
                        <Col md={8}>
                            <div>
                                <img src='/images/search_icon.png' alt='' />
                                <input placeholder='Search by ID, Pallet No, or Serial No' />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <button className={tab === 'FIFO' ? 'active' : ''} onClick={() => setTab('FIFO')}>FIFO</button>
                                <button className={tab === 'LIFO' ? 'active' : ''} onClick={() => setTab('LIFO')}>LIFO</button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='stock_out_quantity'>
                    <Row className='align-items-end'>
                        <Col md={6}>
                            <label>Quantity</label>
                            <div>
                                <input placeholder='Enter Quantity' onChange={(e) => setQuantity(e.target.value)} />
                                <FiChevronRight />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                <button className={tab2 === 'AUTO' ? 'active' : ''} onClick={() => setTab2('AUTO')}>
                                    <img src='/images/auto_icon.png' />  Auto</button>
                                <button className={tab2 === 'MANUAL' ? 'active' : ''} onClick={() => setTab2('MANUAL')}>
                                    <img src='/images/manual_icon.png' /> Manual</button>
                            </div>
                        </Col>
                    </Row>
                </div>
                {
                    quantity > 0 ? <div>
                        {
                            showSerialLoader ?
                                <div className='show_loader'>
                                    <img src='/images/brand_loader.gif' alt='' width={100} />
                                    <p>Auto Serial No Selection Mode</p>
                                </div> : <>
                                    <Table className='stock_out_pallet_table' responsive>
                                        <TableHead>
                                            <TableRow className=''>
                                                <TableCell></TableCell>
                                                <TableCell colSpan={4}>S No.</TableCell>
                                                <TableCell colSpan={4}>Serial No</TableCell>
                                                <TableCell colSpan={4}>Part No</TableCell>
                                                <TableCell>Description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {generateElements()}
                                        </TableBody>
                                    </Table>
                                    {
                                        selectCheckbox &&
                                        <Row className='justify-content-center my-3'>
                                            <Col md={5}>
                                                <button className='add_btn' onClick={() => {
                                                    setIsCartEmpty(false)
                                                    setShowModal(false)
                                                }}>Add</button>
                                            </Col>
                                            <Col md={5}>
                                                <button className='discard_btn'>Discard</button>
                                            </Col>
                                        </Row>
                                    }
                                </>
                        }
                    </div> : <div style={{ margin: "60px 0", textAlign: "center" }}> <p style={{ fontSize: "20px", fontWeight: "600" }}>No Quantity Added</p> </div>
                }
            </Modal.Body>
        </Modal>
    )

    return (
        <div>
            {stockOutModel}
            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <Breadcrumbs list={["Dashboard", "Stock Out"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Stock Out (SO)

                    <div className='debug'> <img src='/images/debug_icon.png' alt='' /> Debug </div>
                </h5>
                <p>Please fill out this form with the required information</p>

                <Form>
                    <Row className='mt-5 justify-content-center'>
                        <Col md={6}>
                            <label className='react_select_label'>Source/ Dispatch Warehouse <span>*</span></label>
                            <Select options={options} placeholder="Select Warehouse" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Business Type <span>*</span></label>
                            <Select options={options} placeholder="Select Business" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Select Destination <span>*</span></label>
                            <Select options={options} placeholder="Select Destination" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Destination Consignee/Warehouse<span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Customer<span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <Input label={'Dispatch Date'} type="Date" isRequired={true} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Builty Number <span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Seal Number <span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>PO/Order Number <span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                        <Col md={6}>
                            <label className='react_select_label'>Vehicle Number <span>*</span></label>
                            <Select options={options} placeholder="Select" styles={materialColorStyles} />
                        </Col>
                    </Row>
                </Form>

                <hr />

                <Row className='mb-5'>
                    <Col md={12}>
                        <label className='react_select_label'>Part No/ SKU/ NSN/ Nomenclature <span>*</span></label>
                        <Select styles={nomenStyles} options={partOption} onChange={(e) => setSelectPart(e)} placeholder="Search Part No/Noms/NSN" className='react_select_inhouse stock_out' />
                    </Col>
                </Row>

                {
                    selectPart &&
                    <div className='show_stockout_result'>
                        <div className='stockout_result_head'>
                            <div>
                                <p>Search Result</p>
                                <h6>“CCB-84901-2001-10”</h6>
                            </div>
                            <MdClose onClick={() => setSelectPart(null)} />
                        </div>

                        <div className='stockout_show_result'>
                            {
                                isCartEmpty ?
                                    <div className='ware_pallet'>
                                        <p>Warehouse Pallets</p>
                                        <img src='/images/empty_cart.png' alt='' />
                                    </div> :
                                    <div className='ware_pallet_fill_cart'>
                                        <p>Warehouse Pallets</p>

                                        <div style={{ position: "relative" }} onClick={() => setShowCart(!showCart)}>
                                            <img src='/images/fill_cart.png' alt='' />
                                            <span>4</span>
                                        </div>
                                    </div>
                            }

                            <div className='mt-4 mx-2 px-2'>
                                <Row style={{ transition: "all 0.3s ease" }}>
                                    <Col md={showCart ? 7 : 12} style={{ transition: "all 0.3s ease" }}>
                                        <Row className={showCart ? 'adjust_height' : ''}>
                                            <Col md={showCart ? 4 : 2} sm={3} xs={6} onClick={() => setShowModal(true)}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/filled_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>148</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/empty_rack.png' alt='' className='rack' />
                                                        <span style={{ color: "#000" }}>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>105</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/faulty_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>1</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/filled_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>148</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/empty_rack.png' alt='' className='rack' />
                                                        <span style={{ color: "#000" }}>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>105</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/faulty_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>1</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/filled_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>148</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/empty_rack.png' alt='' className='rack' />
                                                        <span style={{ color: "#000" }}>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>105</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/faulty_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>1</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/filled_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>148</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/empty_rack.png' alt='' className='rack' />
                                                        <span style={{ color: "#000" }}>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>105</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={showCart ? 4 : 2} sm={3} xs={6}>
                                                <div className='stockout_pallet_box'>
                                                    <div>
                                                        <img src='/images/faulty_rack.png' alt='' className='rack' />
                                                        <span>W01AA01A1</span>
                                                    </div>

                                                    <h6><span>1</span> <br /> 100050</h6>

                                                    <div className='location'>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/from_loc.png' className='f_loc' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W01AA0148 </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={3} xs={3}>
                                                                <img src='/images/to_loc.png' />
                                                            </Col>
                                                            <Col md={9} xs={9}>
                                                                <p> W02AA0348 </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        showCart && <Col md={5} style={{ transition: "all 0.3s ease" }}>
                                            <div className='main_cart'>
                                                <h4>Cart</h4>

                                                <div className='cart_body'>
                                                    <div className='cart_dsc'>
                                                        <div className='show_rack'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span>W01AA01A1</span>
                                                        </div>

                                                        <div className='added_cart'>
                                                            <img src='/images/correct_icon.png' alt='' />
                                                            <p>Added To Cart</p>
                                                        </div>

                                                        <div className='cart_detail'>
                                                            <h6>Part No</h6>
                                                            <p>50117924</p>
                                                        </div>
                                                        <div className='cart_detail'>
                                                            <h6>Description</h6>
                                                            <p>PRK28/4P-M12  ..........</p>
                                                        </div>
                                                        <div className='cart_detail'>
                                                            <h6>Quantity</h6>
                                                            <p>4</p>
                                                        </div>
                                                        <div className='cart_detail'>
                                                            <h6>Pallet No</h6>
                                                            <p>50117924-1</p>
                                                        </div>
                                                        <div className='cart_detail'>
                                                            <h6>Location</h6>
                                                            <p>W01AA01A1</p>
                                                        </div>

                                                        <div>
                                                            <button className='remove_btn'>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    }
                                </Row>

                                {
                                    !isCartEmpty &&
                                    <Row className='mt-3 btn_actions'>
                                        <Col md={6}>
                                            <button onClick={() => setShow(true)}>Dispatch</button>
                                        </Col>
                                        <Col md={6}>
                                            <button>Discard</button>
                                        </Col>
                                    </Row>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default StockOut
