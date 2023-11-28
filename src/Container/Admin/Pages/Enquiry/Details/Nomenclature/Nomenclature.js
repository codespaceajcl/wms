import React from 'react'
import Breadcrumbs from '../../../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../../../../../Components/Loading/Loading';
import { Col, Modal, Row, Table } from 'react-bootstrap';
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai"
import nomenClatureApi from "../../../../../../Apis/NomenClature.json";

const Nomenclature = () => {
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [nomenModal, setNomenModal] = useState(false)

    const skuHead = ["Transaction ID", "Order/Invoice No", "Vehicle No", "Warehouse", "Destination",
        "Business Type", "Date", "Document", "Action"]

    const searchHandler = (e) => {
        e.preventDefault();
        setShowLoader(true)

        setTimeout(() => {
            setShowResult(true)
            setShowLoader(false)
        }, 1500)
    }

    const nomenClatureDetailModal = (
        <Modal show={nomenModal}
            centered onHide={() => setNomenModal(!nomenModal)} size='xl' className='consignee_detail_modal sku_Detail nomen_Detail'>
            <Modal.Body>
                <div className='nomen_detail_head'>
                    <div>
                        Nomenclature
                        <br />
                        <span>Encoder TK320.SG.500.11/30 - (Wheel)</span>
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
                                nomenClatureApi.map((n) => {
                                    console.log(n)
                                    return (
                                        <tr>
                                            <td>{n.Transaction_id}</td>
                                            <td>{n.Order_Invoice}</td>
                                            <td>{n.Vehicle_No}</td>
                                            <td>{n.Warehouse}</td>
                                            <td>{n.Destination}</td>
                                            <td>{n.Business_type}</td>
                                            <td>{n.Date}</td>
                                            <td><a href=''>{n.Document}</a></td>
                                            <td className={n.Action === 'Stock Out' ? 'stock_out' : 'stock_in'}><span>{n.Action}</span></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
        </Modal>
    )

    return (
        <div>
            {nomenClatureDetailModal}
            <Breadcrumbs list={["Dashboard", "General Enquiry"]} />

            {
                showResult ? <div className='material_main consigee_main'>
                    <div style={{ padding: "25px 30px" }}>
                        <h5> <BsArrowLeftShort onClick={() => setShowResult(false)} />

                            <span style={{ color: "#329932" }}> 4 Results Found </span>
                            <div className='create'>
                                <img src='/images/export_icon.png' alt='' style={{ width: "20px", marginRight: "15px" }} />
                                <img src='/images/check_icon.png' alt='' style={{ width: "25px" }} />
                            </div>
                        </h5>

                        <Row className='mt-5'>
                            <Col md={6}>
                                <div className='result_box'>
                                    <div className='result_head'>
                                        <p>Nomenclature <br /></p>
                                        <h6>Encoder TK320.SG.500.11/30 - (Wheel)</h6>
                                    </div>

                                    <Row>
                                        <Col md={4}>
                                            <p>ID  <br /> <span>001</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Serial Number  <br /> <span>Encod-WH-FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Pallet No  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Part Number  <br /> <span>FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Customer  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Business Type  <br /> <span>T&T</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Status  <br /> <span>ok</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Pallet  <br /> <span>10000344</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Location  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Warehouse  <br /> <span>PAKISTANNone_01</span></p>
                                        </Col>

                                        <button onClick={() => setNomenModal(true)}>View</button>
                                    </Row>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='result_box'>
                                    <div className='result_head'>
                                        <p>Nomenclature <br /></p>
                                        <h6>Encoder TK320.SG.500.11/30 - (Wheel)</h6>
                                    </div>

                                    <Row>
                                        <Col md={4}>
                                            <p>ID  <br /> <span>001</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Serial Number  <br /> <span>Encod-WH-FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Pallet No  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Part Number  <br /> <span>FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Customer  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Business Type  <br /> <span>T&T</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Status  <br /> <span>ok</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Pallet  <br /> <span>10000344</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Location  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Warehouse  <br /> <span>PAKISTANNone_01</span></p>
                                        </Col>

                                        <button>View</button>
                                    </Row>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='result_box'>
                                    <div className='result_head'>
                                        <p>Nomenclature <br /></p>
                                        <h6>Encoder TK320.SG.500.11/30 - (Wheel)</h6>
                                    </div>

                                    <Row>
                                        <Col md={4}>
                                            <p>ID  <br /> <span>001</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Serial Number  <br /> <span>Encod-WH-FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Pallet No  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Part Number  <br /> <span>FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Customer  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Business Type  <br /> <span>T&T</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Status  <br /> <span>ok</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Pallet  <br /> <span>10000344</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Location  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Warehouse  <br /> <span>PAKISTANNone_01</span></p>
                                        </Col>

                                        <button>View</button>
                                    </Row>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='result_box'>
                                    <div className='result_head'>
                                        <p>Nomenclature <br /></p>
                                        <h6>Encoder TK320.SG.500.11/30 - (Wheel)</h6>
                                    </div>

                                    <Row>
                                        <Col md={4}>
                                            <p>ID  <br /> <span>001</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Serial Number  <br /> <span>Encod-WH-FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Pallet No  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Part Number  <br /> <span>FE009789-001</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Customer  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Business Type  <br /> <span>T&T</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Status  <br /> <span>ok</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Pallet  <br /> <span>10000344</span></p>
                                        </Col>

                                        <Col md={4}>
                                            <p>Location  <br /> <span>00</span></p>
                                        </Col>
                                        <Col md={8}>
                                            <p>Warehouse  <br /> <span>PAKISTANNone_01</span></p>
                                        </Col>

                                        <button>View</button>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div> :
                    <div className='material_main'>
                        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Search By Nomenclature</h5>

                        <div className='mt-5'>

                            <div className='search_bar'>
                                <input placeholder='Encoder TK320.SG.500.11/30 - (Wheel)' />
                                <select id="cars" name="cars">
                                    <option value="volvo">Nomenclature</option>
                                    <option value="volvo">Volvo XC90</option>
                                    <option value="saab">Saab 95</option>
                                    <option value="mercedes">Mercedes SLK</option>
                                    <option value="audi">Audi TT</option>
                                </select>
                                <div className='search_icon' onClick={searchHandler}>
                                    <AiOutlineSearch />
                                </div>
                            </div>

                            {
                                showLoader && <Loading />
                            }
                        </div>
                    </div>
            }

        </div>
    )
}

export default Nomenclature
