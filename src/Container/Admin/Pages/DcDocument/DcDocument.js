import React, { useEffect, useRef } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { BsArrowLeftShort, BsFilter } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';
import './DcDocument.css';
import { login, partColorStyles } from "../../../../Util/Helper";
import GridView from './GridView';
import { listDeliveryChallan, postDcDocument, revertDocument } from '../../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../Util/Loader';
import { successNotify } from '../../../../Util/Toast';
import { usePDF } from 'react-to-pdf';
import { allImages } from '../../../../Util/Images';
import { FaDownload } from "react-icons/fa";

const DcDocument = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    const parentRef = useRef(null);
    const filterRef = useRef(null);
    const { toPDF, targetRef } = usePDF({ filename: 'dcdocument.pdf' });

    const [show, setShow] = useState(false)
    const [view, setView] = useState('table')
    const [revertModal, setRevertModal] = useState(false)
    const [pageNum, setPageNum] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const [showDownload, setShowDownload] = useState(false)
    const [getRevert, setGetRevert] = useState({})
    const [getDc, setGetDc] = useState({})
    const [uploadFile, setUploadFile] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null);

    const tableHead = ["S.No", "DC No", "Vehicle", "Origin", "Destination", "Date", "Transaction By", "Transaction Number", "Status", "Action"]

    const { loading, getDcData } = useSelector((state) => state.getDc)
    const { loading: postLoading, revertData } = useSelector((state) => state.postRevert)
    const { loading: dcLoading, dcDocumentData } = useSelector((state) => state.postDc)

    useEffect(() => {
        if (revertData?.response === 'success') {
            successNotify("Revert Successfully!")
            dispatch({ type: "REVERT_DOCUMENT_RESET" })
            setRevertModal(false)

            const formData = new FormData();

            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(listDeliveryChallan(pageNum, formData))
        }
    }, [revertData])

    useEffect(() => {
        if (dcDocumentData?.response === 'success') {
            successNotify("Dc Uploaded Successfully!")
            dispatch({ type: "POST_DC_DOCUMENT_RESET" })
            setShowConfirm(false)

            const formData = new FormData();

            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(listDeliveryChallan(pageNum, formData))
        }
    }, [dcDocumentData])

    const [totalElements] = useState(getDcData?.count);
    const [elementsPerPage] = useState(getDcData?.response?.length);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [showNext, setShowNext] = useState(false)

    useEffect(() => {
        const pages = Math.ceil(totalElements / elementsPerPage);
        setNumberOfPages(pages);
        setShowNext(pageNum >= numberOfPages)
    }, [totalElements, elementsPerPage]);

    useEffect(() => {
        const formData = new FormData();

        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(listDeliveryChallan(pageNum, formData))

    }, [pageNum])

    const handleClickOutside = (event) => {
        if (parentRef.current && !parentRef.current.contains(event.target)) {
            setShowDownload(false);
        }

        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setShowFilter(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const options = [
        { value: 'PakistanStorage_None01/Agility Port Qasim', label: 'PakistanStorage_None01/Agility Port Qasim' }
    ]

    const showView = (view) => {
        setView(view)
    }

    const revertDoneHandler = () => {
        const formData = new FormData();

        formData.append("email", login.email)
        formData.append("token", login.token)
        formData.append("transaction", getRevert.id)

        dispatch(revertDocument(formData))
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
                                DC NO: <span>{getRevert.dc}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                Transactional No: <span>{getRevert.transactionalNumber}</span>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <p>Do you really want to revert this transaction?</p>

                    <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                        <button onClick={revertDoneHandler}> {postLoading ? <Spinner animation='border' size='sm' /> : 'Yes'} </button>
                        <button onClick={() => setRevertModal(!revertModal)} className='no_btn'> No</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )

    const revertHandler = (c) => {
        setGetRevert(c)
        setRevertModal(true)
    }

    const uploadRef = (c) => {
        fileInputRef.current.click();
        setGetDc(c)
    }

    const uploadDcHandler = (e) => {
        const file = e.target.files[0]
        setUploadFile(file)
        setShowConfirm(true)
    }

    const uploadFileHandler = () => {
        const formData = new FormData();

        formData.append("email", login.email)
        formData.append("token", login.token)
        formData.append("signedDocument", uploadFile)
        formData.append("id", getDc.id)

        dispatch(postDcDocument(formData, getDc.id))
    }

    const modal = <Modal show={showConfirm} centered className='logout_modal'>
        <Modal.Body>
            <h3>Are you sure you want to Upload the File?</h3>
            <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
                <button onClick={uploadFileHandler}> {dcLoading ? <Spinner animation="border" size="sm" /> : 'Yes'}</button>
                <button className='no_btn' onClick={() => {
                    setUploadFile(null)
                    setShowConfirm(false)
                }}>No</button>
            </div>
        </Modal.Body>
    </Modal>

    const handleDownload = () => {
        const headers = ["DC No", "Vehicle", "Origin", "Destination", "Date", "Transaction By", "Transaction Number", "Status"];
        const rows = filteredData?.map((c, i) => {
            return [
                c.dc,
                c.vehicleNumber,
                c.origin,
                c.destination,
                c.date,
                c.transactionBy,
                c.transactionalNumber,
                c.status
            ];
        });

        const csvContent = `${headers.join(',')}\n${rows.map(row => row.join(',')).join('\n')}`;

        const blob = new Blob([csvContent], { type: 'text/csv' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'dcdocument.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCheckboxChange = (status) => {
        setSelectedStatus(status === selectedStatus ? null : status);
    };

    const filteredData = getDcData?.response?.filter((c) => {
        return selectedStatus ? c.status === selectedStatus : true;
    });

    return (
        <div>
            {revertViewModal}
            {modal}
            <Breadcrumbs list={["Dashboard", "DC Document"]} />

            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> <span className='web_head'>Delivery Challan Documents</span>
                    <span className='mob_head'>Delivery Challan <br /> Documents</span>

                    <div className='download_report'>
                        <div style={{ position: "relative" }} ref={parentRef}>
                            <span onClick={() => setShowDownload(!showDownload)}><AiOutlinePlus style={{ fontSize: "15px" }} /> Download Report
                            </span>
                            {
                                showDownload && <div className='filter_div' style={{ minWidth: "180px" }}>
                                    <div className='checkbox_div' onClick={handleDownload} style={{display: "block"}}>
                                        <label style={{ cursor: "pointer" }} s>Download as CSV</label>
                                    </div>
                                    <div className='checkbox_div' onClick={() => toPDF()} style={{display: "block"}}>
                                        <label style={{ cursor: "pointer" }}>Download as PDF</label>
                                    </div>
                                </div>
                            }
                        </div>

                        <div style={{ position: "relative" }} ref={filterRef}>
                            <span onClick={() => setShowFilter(!showFilter)}><BsFilter style={{ fontSize: "15px" }} /> Filter</span>

                            {
                                showFilter && <div className='filter_div'>
                                    {/* <div>
                                        <label>From</label>
                                        <input type='date' />
                                    </div>
                                    <div>
                                        <label>To</label>
                                        <input type='date' />
                                    </div> */}
                                    <div className='checkbox_div'>
                                        <input
                                            type='radio'
                                            checked={selectedStatus === 'In-transit'}
                                            onChange={() => handleCheckboxChange('In-transit')}
                                        />
                                        <label>In-Transit</label>
                                    </div>
                                    <div className='checkbox_div'>
                                        <input
                                            type='radio'
                                            checked={selectedStatus === 'Delivered'}
                                            onChange={() => handleCheckboxChange('Delivered')}
                                        />
                                        <label>Delivered</label>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </h5>
                <p>Change the location of the equipment present in warehouse</p>

                <Row className='mt-5'>
                    <div className='dc_document_search'>
                        <Select styles={partColorStyles} options={options} placeholder="Select DC" className='react_select_inhouse dc_doc' />
                        <div className='change_table_icons'>
                            <img src={allImages.ChangeGridView} alt='' onClick={() => showView('table')} className={view === 'table' ? 'active' : null} />
                            <img src={allImages.ChangeTableView} alt='' onClick={() => showView('grid')} className={view === 'grid' ? 'active' : null} />
                        </div>
                    </div>
                </Row>

                <Row>
                    {
                        view === 'table' &&
                        <Col md={12}>
                            {
                                loading ? <div className='my-5'> <Loader /> </div> :
                                    <div className='consignee_table inhouse dc_doc mt-4'>
                                        <div ref={targetRef}>
                                            <div className='select_inhouse_table'>
                                                <h6 style={{ fontSize: "15px" }}>Delivery Challan Documents </h6>
                                            </div>
                                            <Table bordered responsive hover>
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
                                                        filteredData?.map((c, i) => {
                                                            return (
                                                                <tr>
                                                                    <td> {i + 1}</td>
                                                                    <td><span className='dc_download'>{c.dc} <a href={c?.documentPath} target='_blank'> <FaDownload /> </a> </span></td>
                                                                    <td>{c.vehicleNumber}</td>
                                                                    <td>{c.origin}</td>
                                                                    <td>{c.destination}</td>
                                                                    <td>{c.date}</td>
                                                                    <td>{c.transactionBy}</td>
                                                                    <td>{c.transactionalNumber}</td>
                                                                    <td style={c.status === 'In-transit' ? { color: "#B99C00" } : { color: "#329932" }}>{c.status}</td>
                                                                    <td>
                                                                        {
                                                                            c.status === 'In-transit' ? <>
                                                                                <button className='upload_dc' onClick={() => uploadRef(c)}>
                                                                                    <input ref={fileInputRef} onChange={uploadDcHandler} type='file' style={{ display: "none" }} />
                                                                                    Upload DC
                                                                                </button>
                                                                                <button className='revert' onClick={() => revertHandler(c)}>Revert</button>
                                                                            </> :
                                                                                <a className='revert' style={{ backgroundColor: "#2ba62b" }} href={c.signedDoc} target='_blank'>Download</a>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className='pagination_div'>
                                            {
                                                pageNum > 1 &&
                                                <h6 onClick={() => setPageNum(pageNum - 1)}>Previous</h6>
                                            }
                                            <p>Pg No: {pageNum}</p>

                                            {
                                                showNext &&
                                                <h6 onClick={() => setPageNum(pageNum + 1)}>Next</h6>
                                            }
                                        </div>
                                    </div>
                            }
                        </Col>
                    }

                    {
                        view === 'grid' &&
                        <Col md={12} className='mt-4 grid_view_col'>
                            <GridView setGetDc={setGetDc} setShowConfirm={setShowConfirm} setUploadFile={setUploadFile} setGetRevert={setGetRevert} loading={loading} pageNum={pageNum} setPageNum={setPageNum} showNext={showNext} getDcData={filteredData} revertModal={revertModal} setRevertModal={() => setRevertModal(!revertModal)} />
                        </Col>
                    }
                </Row>

            </div>
        </div>
    )
}

export default DcDocument
