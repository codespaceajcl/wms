import React, { useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import './Notifications.css';
import { Col, Modal, Row } from 'react-bootstrap';
import { MdThumbDown, MdThumbUp, MdOutlineFileDownload } from "react-icons/md";

const Notifications = () => {
    const [showRequest, setShowRequest] = useState(false)
    const [showDots, setShowDots] = useState(false)

    const modal = <Modal centered show={showRequest} onHide={() => setShowRequest(false)} className='request_modal'>
        <Modal.Body>
            <div className='request_head'>
                <h6>Request</h6>
                <AiOutlineClose onClick={() => setShowRequest(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className='request_div'>
                <p>Sohaib has request to revert <span>119054353534</span>  transaction! </p>

                <div>
                    <button onClick={() => setShowRequest(!showRequest)}> <MdThumbUp /> Approve</button>
                    <button onClick={() => setShowRequest(!showRequest)}> <MdThumbDown /> Reject</button>
                </div>
                <button className='download_btn'> <MdOutlineFileDownload /> Download Delivery Challan</button>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "Notifications"]} />

            <div className='material_main notifications'>
                <div className='main_heading'>
                    <h4>Notifications <span>2</span></h4>
                    <div>
                        <p>Mark all as read</p>

                        <div className='dots_dropdown'>
                            <BsThreeDotsVertical onClick={() => setShowDots(!showDots)} />

                            {
                                showDots && <div>
                                    <a>Export to PDF</a>
                                    <a>Export to CSV</a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='notifications_show unread'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img4.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Admin</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>8 min ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img1.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Edward Curr</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <div>
                                <button onClick={() => setShowRequest(true)}>View</button>
                                <button>Deny</button>
                            </div>
                            <span>17 min ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
                <div className='notifications_show'>
                    <Row>
                        <Col md={1}>
                            <img src='/images/notification_img3.png' alt='' />
                        </Col>
                        <Col md={11}>
                            <h6>Maria Hill</h6>
                            <p>Your request to revert <span>119054</span> transaction have been approved by <span>Admin Owais</span></p>
                            <span>1 day ago</span>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Notifications
