import React, { useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft } from "react-icons/bi";
import { Col, Modal, Row, Table } from "react-bootstrap"
import ConsigeeApi from "../../../../Apis/Consigee.json";
import './Consignee.css';

const Consignee = () => {
  const navigate = useNavigate();
  const [consigneeModal, setConsigneeModal] = useState(false)
  const [moreModal, setMoreModal] = useState(false)
  const [skuModal, setSkuModal] = useState(false)

  const tableHead = ["S.No", "Name & Address", "Contact", "Assign"]
  const detailHead = ["SKU", "Quantity", "Business Type", "More"]
  const moreHead = ["Serial No", "Business Type", "Status", "Track", "Date"]
  const skuHead = ["Transaction ID", "Order/Invoice No", "Vehicle No", "Warehouse", "Destination",
    "Business Type", "Date", "Document", "Action"]

  const consigneeDetailModal = (
    <Modal show={consigneeModal}
      centered onHide={() => setConsigneeModal(!consigneeModal)} size='lg' className='consignee_detail_modal'>
      <Modal.Body>
        <div className='consignee_name_head'>
          <h6>Abdullah Shah Ghazi Sugar Mill</h6>
          <AiOutlineClose onClick={() => setConsigneeModal(!consigneeModal)} style={{ cursor: "pointer" }} />
        </div>
        <div className='consignee_table detail'>
          <Table responsive={true}>
            <thead>
              <tr>
                {detailHead.map((d) => (<th>{d}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30019</td>
                <td>testUIM</td>
                <td>T&T</td>
                <td><button onClick={() => setMoreModal(true)}>View</button></td>
              </tr>
              <tr>
                <td>30019</td>
                <td>testUIM</td>
                <td>T&T</td>
                <td><button onClick={() => setMoreModal(true)}>View</button></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )

  const consigneeMoreModal = (
    <Modal show={moreModal}
      centered onHide={() => setMoreModal(!moreModal)} size='lg' className='consignee_detail_modal more'>
      <Modal.Body>
        <div className='consignee_name_head'>
          <div>
            <BiChevronLeft />
            Back
          </div>

          <div className="search_box">
            <img src="/images/search_icon.png" alt="" />
            <input placeholder="search anything" style={{ maxWidth: "400px", width: "400px" }} />
          </div>

          <AiOutlineClose onClick={() => setMoreModal(!moreModal)} style={{ cursor: "pointer" }} />
        </div>
        <div className='more_details'>
          <Row>
            <Col md={3}>
              <h6>SKU/Part Number: </h6>
            </Col>
            <Col md={9}>
              <p>50117923</p>
            </Col>
            <Col md={3}>
              <h6>Nomenclature: </h6>
            </Col>
            <Col md={9}>
              <p>PRK28/4P-M12 - Polarized retro-reflective photoelectric sensor</p>
            </Col>
            <Col md={3}>
              <h6>UOM: </h6>
            </Col>
            <Col md={9}>
              <p>PKL97766</p>
            </Col>
            <Col md={3}>
              <h6>Quantity: </h6>
            </Col>
            <Col md={9}>
              <p>5124</p>
            </Col>
          </Row>
        </div>
        <div className='consignee_table detail'>
          <Table responsive={true}>
            <thead>
              <tr>
                {moreHead.map((d) => (<th>{d}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>111</td>
                <td>T&T</td>
                <td><b style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", color: "#329932" }}>
                  <img src='/images/correct_icon.png' alt='' width={"16px"} />OK</b></td>
                <td><img src='/images/track_icon.png' alt='' style={{ cursor: "pointer", width: "20px" }} onClick={() => setSkuModal(true)} /></td>
                <td>20/06/2018</td>
              </tr>
              <tr>
                <td>111</td>
                <td>T&T</td>
                <td><b style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", color: "#329932" }}>
                  <img src='/images/correct_icon.png' alt='' width={"16px"} />OK</b></td>
                <td><img src='/images/track_icon.png' alt='' style={{ cursor: "pointer", width: "20px" }} onClick={() => setSkuModal(true)} /></td>
                <td>20/06/2018</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )

  const skuDetailModal = (
    <Modal show={skuModal}
      centered onHide={() => setSkuModal(!skuModal)} size='xl' className='consignee_detail_modal sku_Detail'>
      <Modal.Body>
        <div className='consignee_name_head'>
          <div>
            50117924
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="search_box">
              <img src="/images/search_icon.png" alt="" />
              <input placeholder="search anything" style={{ maxWidth: "400px", width: "400px" }} />
            </div>

            <AiOutlineClose onClick={() => setSkuModal(!skuModal)} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className='consignee_table detail'>
          <Table responsive={true}>
            <thead>
              <tr>
                {skuHead.map((d) => (<th>{d}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AJCL-GRN-11</td>
                <td>AJCL-GRN-11</td>
                <td>For All HMTs</td>
                <td>WAREHOUSE <br /> JHOLDINGS <br /> PORT QASIM</td>
                <td>JHPL PORT <br />
                  QASIM SERVICE <br />
                  CENTRE</td>
                <td>JHPL</td>
                <td>2023-10-24</td>
                <td><a href=''>627102023001634.pdf</a></td>
                <td className='stock_out'><span>Stock Out</span></td>
              </tr>

              <tr>
                <td>AJCL-GRN-11</td>
                <td>AJCL-GRN-11</td>
                <td>For All HMTs</td>
                <td>WAREHOUSE <br /> JHOLDINGS <br /> PORT QASIM</td>
                <td>JHPL PORT <br />
                  QASIM SERVICE <br />
                  CENTRE</td>
                <td>JHPL</td>
                <td>2023-10-24</td>
                <td><a href=''>627102023001634.pdf</a></td>
                <td className='stock_in'><span>Stock In</span></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )

  return (
    <div>
      {consigneeDetailModal}
      {consigneeMoreModal}
      {skuDetailModal}

      <Breadcrumbs list={["Dashboard", "Consignee"]} />

      <div className='material_main consigee_main'>
        <div style={{ padding: "25px 30px" }}>
          <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />

            <div className="search_box consignee">
              <img src="/images/search_icon.png" alt="" />
              <input placeholder="search anything" />
            </div>
            Consignee
            <div className='create'><AiOutlineUserAdd style={{ fontSize: "17px" }} /> Add Consignee</div>
          </h5>
        </div>

        <div className='consignee_table'>
          <Table striped bordered responsive="sm">
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
                ConsigeeApi.map((c) => {
                  return (
                    <tr>
                      <td>{c.sno}</td>
                      <td><b>{c.name}</b> <br />
                        <span>{c.address}</span>
                      </td>
                      <td style={{ fontWeight: "600" }}>{c.contact}</td>
                      <td><button onClick={() => setConsigneeModal(!consigneeModal)}>View</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Consignee
