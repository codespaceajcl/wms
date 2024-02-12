import React, { useEffect, useState } from 'react';
import './Notification.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Util/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { approveRevert, getUserNotifications, rejectRevert } from '../../Redux/Action/Admin';
import { AiOutlineClose } from "react-icons/ai";
import { MdThumbDown, MdThumbUp, MdOutlineFileDownload } from "react-icons/md";
import { Col, Modal, Row, Spinner } from 'react-bootstrap';
import { allImages } from '../../Util/Images';

const Notification = ({ loading, notificationData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [saveTnNum, setSaveTnNum] = useState({})
    const [showRequest, setShowRequest] = useState(false)

    const { loading: approveLoading, approveRevertData } = useSelector((state) => state.approvedRevert)
    const { loading: rejectLoading, rejectRevertData } = useSelector((state) => state.rejectedRevert)

    const userFound = JSON.parse(localStorage.getItem("currentUser"))

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
                    <button onClick={approveHandler}>{approveLoading ?
                        <Spinner animation='border' size='sm' /> : <> <MdThumbUp /> Approve </>} </button>

                    <button onClick={rejectHandler}>
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

    return (
        <div className='notification_main'>
            {modal}
            <div className='notifcation_head'>
                <h6>Notification</h6>
                {/* <p>Mark All as Read</p> */}
            </div>

            {
                loading ? <Loader /> :
                    <div className='notification_details'>
                        {
                            notificationData?.approvals?.map((a) => {
                                return (
                                    <div className='notify'>
                                        <div>
                                            <img src={allImages.notification_img1} alt='' />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: "500" }}>{a.text}</p>
                                            <div>
                                                <button onClick={() => viewHandler(a)}>View</button>
                                                {/* <button>Deny</button> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            notificationData?.messages?.map((m) => {
                                const getSplitEmail = m.text.split(" ")
                                const getEmail = getSplitEmail[getSplitEmail.length - 1]
                                return (
                                    <div className='notify'>
                                        <div>
                                            <img src={allImages.notification_img4} alt='' />
                                        </div>
                                        <div>
                                            <h6>{getEmail}</h6>
                                            <p>{m.text}</p>
                                            {/* <span>1 day ago</span> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }

            <h5 onClick={() => navigate('/wms/all-notifications')}>See All Notification</h5>
        </div>
    )
}

export default Notification
