import React, { useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Breadcrumbs from '../../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row, Table } from 'react-bootstrap';
import Input from '../../../../../../Components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { FileUploader } from "react-drag-drop-files";

const KnownStock = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Stock Return (SRN)
                </h5>

                <Form style={{ padding: "0 20px" }}>
                    <Row className='mt-2'>
                        <Col md={5} className='mt-3'>
                            <label className='react_select_label'>Order <span>*</span></label>
                            <Select options={options} placeholder="Select" className='react_select' />
                        </Col>
                        <Col md={5} className='mt-3'>
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

                    <Row>
                        <div className='report_summary_table stock_in_shipment'>
                            <Table striped bordered responsive>
                                <thead>
                                    <tr className='super_head'>
                                        <th>S.No</th>
                                        <th>Part Number</th>
                                        <th>Nomenclature</th>
                                        <th>NSN</th>
                                        <th>Sterilization</th>
                                        <th>Quantity</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>139P04763-51</td>
                                        <td>INTERNAL PILOT HANDLE</td>
                                        <td>---</td>
                                        <td> <input type='file' className='sterilize' /> </td>
                                        <td>001</td>
                                        <td> <MdClose className='remove_icon' /> </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Row>

                    <h6>Assign Pallet at Warehouse</h6>

                    <Row>
                        <div className='report_summary_table stock_in_shipment'>
                            <Table striped bordered responsive>
                                <thead>
                                    <tr className='super_head'>
                                        <th>S.No</th>
                                        <th>Part Number</th>
                                        <th>Nomenclature</th>
                                        <th>Pallet ID</th>
                                        <th>Quantity</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>139P04763-51</td>
                                        <td>INTERNAL PILOT HANDLE</td>
                                        <td>1122332211</td>
                                        <td> 2 </td>
                                        <td>
                                            <select className='location_select'>
                                                <option value="10001212">10001212</option>
                                                <option value="10001213">10001213</option>
                                                <option value="10001214">10001214</option>
                                                <option value="10001215">10001215</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Row>

                    <h6>Assign Location at Warehouse</h6>

                    <Row>
                        <div className='report_summary_table stock_in_shipment'>
                            <Table striped bordered responsive>
                                <thead>
                                    <tr className='super_head'>
                                        <th>S.No</th>
                                        <th>Pallet No</th>
                                        <th>No Of Locations</th>
                                        <th>Store/Storage</th>
                                        <th>Rack</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1122332211</td>
                                        <td>
                                            <select className='location_select'>
                                                <option value="10001212">001</option>
                                                <option value="10001213">002</option>
                                                <option value="10001214">003</option>
                                                <option value="10001215">004</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className='location_select'>
                                                <option value="10001212">W01</option>
                                                <option value="10001213">W02</option>
                                                <option value="10001214">W03</option>
                                                <option value="10001215">W04</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className='location_select'>
                                                <option value="10001212">W01AB</option>
                                                <option value="10001213">W01AC</option>
                                                <option value="10001214">W01AD</option>
                                                <option value="10001215">W01AE</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className='location_select'>
                                                <option value="10001212">W01AB</option>
                                                <option value="10001213">W01AC</option>
                                                <option value="10001214">W01AD</option>
                                                <option value="10001215">W01AE</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </div>

                <Row className='file_upload_handler'>
                    <Col md={12}>
                        <FileUploader handleChange={handleChange} name="file"
                            types={["JPG", "PNG", "GIF"]} label="Attached Stock Document" />
                        <img src='/images/stock_doc_icon.png' />
                    </Col>
                </Row>

                <div className='mx-3'>
                    <button className='submit_btn'>Submit</button>
                    <button className='back_btn' onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default KnownStock
