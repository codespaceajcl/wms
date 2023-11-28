import React, { useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft } from "react-icons/bi";
import { Col, Modal, Row, Table, Form } from "react-bootstrap"
import ConsigeeApi from "../../../../Apis/Consigee.json";
import './Consignee.css';
import Input from '../../../../Components/Input/Input';
import SuccessModal from '../../../../Components/Modals/SuccessModal';

const Consignee = () => {
  const navigate = useNavigate();
  const [consigneeModal, setConsigneeModal] = useState(false)
  const [moreModal, setMoreModal] = useState(false)
  const [skuModal, setSkuModal] = useState(false)
  const [addConsigneeModal, setAddConsigneeModal] = useState(false)
  const [show, setShow] = useState(false)

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
          <Table responsive>
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
          <div onClick={() => setMoreModal(!moreModal)}>
            <BiChevronLeft />
            Back
          </div>

          <div className="search_box">
            <img src="/images/search_icon.png" alt="" />
            <input placeholder="search anything" />
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
          <Table responsive>
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
              <input placeholder="search anything" />
            </div>

            <AiOutlineClose onClick={() => setSkuModal(!skuModal)} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className='consignee_table detail'>
          <Table responsive>
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

  const addConsigneeHandler = (e) => {
    e.preventDefault();

    setAddConsigneeModal(false)
    setShow(true)
  }

  const modal = <Modal show={addConsigneeModal} onHide={() => setAddConsigneeModal(false)} size='lg' className='add_warehouse_modal'>
    <Modal.Body>
      <div className='add_warehouse_head'>
        <h5> <BsArrowLeftShort onClick={() => setAddConsigneeModal(false)} />
          Add Consignee Form
        </h5>
        <p>Please fill out this form with the required information</p>
      </div>

      <div className='warehouse_form'>
        <Form onSubmit={addConsigneeHandler}>
          <Row>
            <Col md={6}>
              <Input label={'Industry Name'} placeholder={"Enter Industry Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'Consignee Name'} placeholder={"Enter Consignee Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={12}>
              <Input label={'Consignee Address'} placeholder={"Enter Consignee Address"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'Commence Date'} placeholder={"Select Date"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'POC Name'} placeholder={"Enter POC Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'Contact'} placeholder={"Enter Contact"} isRequired={true} type={'text'} />
            </Col>
            <Col md={12} className='mt-4'>
              <div><button type='submit'>Submit</button></div>
            </Col>
            <Col md={12}>
              <div><button type="button" className='cancel_btn' onClick={() => setAddConsigneeModal(false)}>Cancel</button></div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  return (
    <div>
      {consigneeDetailModal}
      {consigneeMoreModal}
      {skuDetailModal}
      {modal}

      <SuccessModal show={show} setShow={() => setShow(!show)} />

      <Breadcrumbs list={["Dashboard", "Consignee"]} />

      <div className='material_main consigee_main'>
        <div>
          <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />

            <div className="search_box consignee">
              <img src="/images/search_icon.png" alt="" />
              <input placeholder="search anything" />
            </div>
            Consignee
            <div className='create' onClick={() => setAddConsigneeModal(true)}><AiOutlineUserAdd style={{ fontSize: "17px" }} /> Add Consignee</div>
          </h5>
        </div>

        <div className='consignee_table'>
          <Table striped bordered responsive>
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
