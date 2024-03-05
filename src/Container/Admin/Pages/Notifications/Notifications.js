import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import './Notifications.css';
import { Col, Modal, Row, Spinner } from 'react-bootstrap';
import { MdThumbDown, MdThumbUp, MdOutlineFileDownload } from "react-icons/md";
import { approveRevert, getUserNotifications, rejectRevert } from '../../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../Util/Loader';
import { allImages } from '../../../../Util/Images';

const Notifications = () => {
    const dispatch = useDispatch();
    const [showRequest, setShowRequest] = useState(false)
    const [showDots, setShowDots] = useState(false)
    const [saveTnNum, setSaveTnNum] = useState({})

    const { loading, getNotifyData } = useSelector((state) => state.notificationData)
    const { loading: approveLoading, approveRevertData } = useSelector((state) => state.approvedRevert)
    const { loading: rejectLoading, rejectRevertData } = useSelector((state) => state.rejectedRevert)

    const userFound = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        const data = {
            // email: userFound.email,
            email: "sohaib.akram@ajcl.net",
            token: userFound.token
        }

        const formData = JSON.stringify(data)
        dispatch(getUserNotifications(formData))
    }, [])

    useEffect(() => {
        if (approveRevertData?.response === "success") {
            const data = {
                // email: userFound.email,
                email: "sohaib.akram@ajcl.net",
                token: userFound.token
            }

            const formData = JSON.stringify(data)
            dispatch(getUserNotifications(formData))
            dispatch({ type: "APPROVE_REVERT_RESET" })
            setShowRequest(false)
        }
    }, [approveRevertData])

    useEffect(() => {
        if (rejectRevertData?.response === "success") {
            const data = {
                // email: userFound.email,
                email: "sohaib.akram@ajcl.net",
                token: userFound.token
            }

            const formData = JSON.stringify(data)
            dispatch(getUserNotifications(formData))
            dispatch({ type: "REJECT_REVERT_RESET" })
            setShowRequest(false)
        }
    }, [rejectRevertData])

    const approveHandler = () => {
        const d = {
            email: "sohaib.akram@ajcl.net",
            tn: saveTnNum.tn
        }
        const formData = JSON.stringify(d)
        dispatch(approveRevert(formData))
    }

    const rejectHandler = () => {
        const d = {
            email: "sohaib.akram@ajcl.net",
            tn: saveTnNum.tn
        }
        const formData = JSON.stringify(d)
        dispatch(rejectRevert(formData))
    }

    const modal = <Modal centered show={showRequest} onHide={() => setShowRequest(false)} className='request_modal'>
        <Modal.Body>
            <div className='request_head'>
                <h6>Request</h6>
                <AiOutlineClose onClick={() => setShowRequest(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className='request_div'>
                <p>{saveTnNum.text}</p>

                <div>
                    <button onClick={approveHandler} disabled={approveLoading}>{approveLoading ?
                        <Spinner animation='border' size='sm' /> : <> <MdThumbUp /> Approve </>} </button>

                    <button onClick={rejectHandler} disabled={rejectLoading}>
                        {rejectLoading ?
                            <Spinner animation='border' size='sm' /> : <> <MdThumbDown /> Reject </>}
                    </button>
                </div>
                <div className='mt-3'>
                    <a className='download_btn' target='_blank'
                        href={`https://crms.ajcl.net/wms/challans/${saveTnNum.tn}.pdf`}>
                        <MdOutlineFileDownload /> Download Delivery Challan</a>
                </div>
            </div>
        </Modal.Body>
    </Modal>

    const viewHandler = (tn) => {
        setShowRequest(true)
        setSaveTnNum(tn)
    }

    const mergeNotificationData = getNotifyData?.approvals?.concat(getNotifyData?.messages)

    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "Notifications"]} />

            <div className='material_main notifications'>
                <div className='main_heading'>
                    <h4>Notifications <span>{mergeNotificationData ? mergeNotificationData.length : 0}</span></h4>
                    <div>
                        {/* <p>Mark all as read</p> */}

                        {/* <div className='dots_dropdown'>
                            <BsThreeDotsVertical onClick={() => setShowDots(!showDots)} />

                            {
                                showDots && <div>
                                    <a>Export to PDF</a>
                                    <a>Export to CSV</a>
                                </div>
                            }
                        </div> */}
                    </div>
                </div>
                {
                    loading ? <Loader /> :
                        <>
                            {
                                getNotifyData?.approvals?.map((a) => {
                                    return (
                                        <div className='notifications_show unread'>
                                            <Row>
                                                <Col md={1} sm={1} xs={2}>
                                                    <img src={allImages.notification_img1} alt='' />
                                                </Col>
                                                <Col md={11} sm={11} xs={10}>
                                                    <p style={{ fontWeight: "500" }}>{a.text}</p>
                                                    <div>
                                                        <button onClick={() => viewHandler(a)}>View</button>
                                                        {/* <button>Deny</button> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                            {
                                getNotifyData?.messages?.map((m) => {
                                    const getSplitEmail = m.text.split(" ")
                                    const getEmail = getSplitEmail[getSplitEmail.length - 1]
                                    return (
                                        <div className='notifications_show'>
                                            <Row>
                                                <Col md={1} sm={1} xs={2}>
                                                    <img src={allImages.notification_img4} alt='' />
                                                </Col>
                                                <Col md={11} sm={11} xs={10}>
                                                    <h6>{getEmail}</h6>
                                                    <p>{m.text}</p>
                                                    {/* <span>1 day ago</span> */}
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}
export default Notifications