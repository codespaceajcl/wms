import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { BsArrowLeftShort, BsFilter } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';
import DcApi from "../../../../Apis/DcDocument.json";
import './DcDocument.css';
import GridView from './GridView';

const DcDocument = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [view, setView] = useState('table')
    const [revertModal, setRevertModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const tableHead = ["S.No", "Order No", "DC No", "Vehicle", "Origin", "Destination", "Date", "Requested", "Status", "Action"]

    const options = [
        { value: 'PakistanStorage_None01/Agility Port Qasim', label: 'PakistanStorage_None01/Agility Port Qasim' }
    ]

    const showView = (view) => {
        setView(view)
    }

    const revertViewModal = (
        <Modal show={revertModal}
            centered onHide={() => setRevertModal(!revertModal)} className='consignee_detail_modal revert'>
            <Modal.Body>
                <div className='consignee_name_head'>
                    <div>
                        Revert
                    </div>

                    <AiOutlineClose onClick={() => setRevertModal(!revertModal)} style={{ cursor: "pointer" }} />
                </div>
                <div className='revert_detail'>
                    <Row>
                        <Col md={6}>
                            <div>
                                DC NO: <span>212092023162642</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                Order NO: <span>212092023162642</span>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <p>Do you really want to revert this transaction?</p>

                    <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                        <button onClick={() => setRevertModal(!revertModal)}> Yes</button>
                        <button onClick={() => setRevertModal(!revertModal)} className='no_btn'> No</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )

    return (
        <div>
            {revertViewModal}
            <Breadcrumbs list={["Dashboard", "DC Document"]} />

            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Delivery Challan Documents

                    <div className='download_report'>
                        <div>
                            <AiOutlinePlus style={{ fontSize: "15px" }} /> Download Report
                        </div>

                        <div style={{ position: "relative" }}>
                            <span onClick={() => setShowFilter(!showFilter)}><BsFilter style={{ fontSize: "15px" }} /> Filter</span>

                            {
                                showFilter && <div className='filter_div'>
                                <div>
                                    <label>From</label>
                                    <input type='date' />
                                </div>
                                <div>
                                    <label>To</label>
                                    <input type='date' />
                                </div>
                                <div className='checkbox_div'>
                                    <input type='checkbox' />
                                    <label>In-Transit</label>
                                </div>
                                <div className='checkbox_div'>
                                    <input type='checkbox' />
                                    <label>Delivered</label>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </h5>
                <p>Change the location of the equipment present in warehouse</p>

                <Row className='mt-5'>
                    <div className='d-flex align-items-center'>
                        <Select options={options} placeholder="Select DC" className='react_select_inhouse dc_doc' />
                        <div className='change_table_icons'>
                            <img src='/images/change_table_view.png' alt='' onClick={() => showView('table')} className={view === 'table' ? 'active' : null} />
                            <img src='/images/change_grid_view.png' alt='' onClick={() => showView('grid')} className={view === 'grid' ? 'active' : null} />
                        </div>
                    </div>
                </Row>

                <Row>
                    {
                        view === 'table' &&
                        <Col md={12}>
                            <div className='consignee_table inhouse dc_doc mt-4'>
                                <div className='select_inhouse_table'>
                                    <h6 style={{ fontSize: "15px" }}>Delivery Challan Documents </h6>
                                </div>
                                <Table bordered responsive="lg" size='lg'>
                                    <thead>
                                        <tr>
                                            {
                                                tableHead.map((th) => (
                                                    <th>{th}</th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            DcApi.map((c, i) => {
                                                return (
                                                    <tr>
                                                        <td>{c.s_no}</td>
                                                        <td><a href=''>{c.order_no}</a></td>
                                                        <td>{c.dc_number}</td>
                                                        <td>{c.vehicle_no}</td>
                                                        <td>{c.Origin}</td>
                                                        <td>{c.destination}</td>
                                                        <td>{c.Date}</td>
                                                        <td>{c.requested}</td>
                                                        <td style={c.status === 'In-transit' ? { color: "#B99C00" } : { color: "#329932" }}>{c.status}</td>
                                                        <td>
                                                            <button className='upload_dc'>Upload DC</button>
                                                            <button className='revert' onClick={() => setRevertModal(true)}>Revert</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    }

                    {
                        view === 'grid' &&
                        <Col md={12} className='mt-4 grid_view_col'>
                            <GridView revertModal={revertModal} setRevertModal={() => setRevertModal(!revertModal)} />
                        </Col>
                    }
                </Row>

            </div>
        </div>
    )
}

export default DcDocument
