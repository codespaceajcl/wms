import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../../../Components/Loading/Loading';
import { Col, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generalEnquiry, generalEnquiryDetails } from '../../../../../Redux/Action/Admin';
import { login } from '../../../../../Util/Helper';
import Loader from '../../../../../Util/Loader';

const EnquiryDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const enquiryId = state.serialNo
    const enquiryName = state.name

    const [nomenModal, setNomenModal] = useState(false)
    const [filter, setFilter] = useState('')
    const [seNo, setSeNo] = useState('')

    const skuHead = ["Transaction ID", "Order/Invoice No", "Vehicle No", "Warehouse", "Destination",
        "Business Type", "Date", "Document", "Action"]

    const { loading, getGeneralEnquiryData } = useSelector((state) => state.generalEnquiryGet)
    const { loading: detailLoading, getEnquiryDetailData } = useSelector((state) => state.enquiryDetailGet)

    useEffect(() => {
        return () => {
            dispatch({ type: "GET_GENERAL_ENQUIRY_RESET" })
        }
    }, [])

    const searchHandler = () => {
        const postData = {
            search: filter,
            filter: enquiryId,
            email: login.email,
            token: login.token
        }

        const d = JSON.stringify(postData)
        dispatch(generalEnquiry(d))
        setFilter('')
    }

    const showDetailHandler = (id) => {
        setNomenModal(true)
        setSeNo(id)
        const postData = {
            serialNo: id
        }

        const d = JSON.stringify(postData)
        dispatch(generalEnquiryDetails(d))
    }

    const nomenClatureDetailModal = (
        <Modal show={nomenModal}
            centered onHide={() => setNomenModal(!nomenModal)} size='xl' className='consignee_detail_modal sku_Detail nomen_Detail'>
            <Modal.Body className={detailLoading && 'd-flex justify-content-center'}>
                {
                    detailLoading ? <Loader /> : <>
                        <div className='nomen_detail_head'>
                            <div>
                                Serial No
                                <br />
                                <span>{seNo}</span>
                            </div>

                            <AiOutlineClose onClick={() => setNomenModal(!nomenModal)} style={{ cursor: "pointer", fontSize: "17px" }} />
                        </div>
                        <div className='consignee_table detail'>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        {skuHead.map((d) => (<th>{d}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getEnquiryDetailData?.response?.map((n) => {
                                            return (
                                                <tr>
                                                    <td>{n.sgd}</td>
                                                    <td>{n.transactionalNumber}</td>
                                                    <td>{n.truckNumber}</td>
                                                    <td>{n.warehouse}</td>
                                                    <td>{n.destination}</td>
                                                    <td>{n.businessTypes}</td>
                                                    <td>{n.date}</td>
                                                    <td>{n.documentPath}</td>
                                                    <td className={n.transaction === 'stockout' ? 'stock_out' : 'stock_in'}><span>{n.transaction}</span></td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </>
                }
            </Modal.Body>
        </Modal>
    )

    return (
        <div>
            {nomenClatureDetailModal}
            <Breadcrumbs list={["Dashboard", "General Enquiry"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Search By {enquiryName}</h5>

                <div className='mt-5'>

                    <div className='search_bar'>
                        <input placeholder='Enter to Search' value={filter} onChange={(e) => setFilter(e.target.value)} />
                        <div className='search_icon' onClick={searchHandler}>
                            <AiOutlineSearch />
                        </div>
                    </div>

                    {
                        loading ? <Loading /> :
                            <div style={{ padding: "25px 30px" }}>
                                {
                                    getGeneralEnquiryData?.parts?.length > 0 ? <>
                                        <h5>
                                            <span style={{ color: "#329932" }}> {getGeneralEnquiryData?.parts?.length} Results Found </span>
                                            {/* <div className='create'>
                <img src='/images/export_icon.png' alt='' style={{ width: "20px", marginRight: "15px" }} />
                <img src='/images/check_icon.png' alt='' style={{ width: "25px" }} />
            </div> */}
                                        </h5>

                                        <Row className='mt-5' style={{ gap: "20px 0" }}>
                                            {
                                                getGeneralEnquiryData?.parts?.map((enq) => {
                                                    return (
                                                        <Col md={6}>
                                                            <div className='result_box'>
                                                                <div className='result_head'>
                                                                    <p>Nomenclature <br /></p>
                                                                    <h6>{enq.nomenclature}</h6>
                                                                </div>

                                                                <Row>
                                                                    <Col md={4}>
                                                                        <p>ID  <br /> <span>{enq.id}</span></p>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <p>Serial Number  <br /> <span>{enq.serialNo}</span></p>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                        <p>Pallet No  <br /> <span>{enq.pallotNo}</span></p>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <p>Part Number  <br /> <span>{enq.partNo}</span></p>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                        <p>Customer  <br /> <span>{enq.customer}</span></p>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <p>Business Type  <br /> <span>{enq.businessType}</span></p>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                        <p>Status  <br /> <span>{enq.status}</span></p>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <p>Pallet  <br /> <span>{enq.pallot}</span></p>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                        <p>Location  <br /> <span>{enq.location}</span></p>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <p>Warehouse  <br /> <span>{enq.warehouse}</span></p>
                                                                    </Col>

                                                                    <button onClick={() => showDetailHandler(enq.serialNo)}>View</button>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </> :
                                        <h5>
                                            <span style={{ color: "#329932" }}> No Results Found </span>
                                        </h5>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default EnquiryDetail