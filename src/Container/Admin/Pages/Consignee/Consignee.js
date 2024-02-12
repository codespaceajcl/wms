import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft } from "react-icons/bi";
import { Col, Modal, Row, Table, Form } from "react-bootstrap"
import './Consignee.css';
import { Field, Formik } from "formik";
import Input from '../../../../Components/Input/Input';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { consigneeCreateSchema } from '../../../../Util/Validations';
import { useDispatch, useSelector } from 'react-redux';
import { listConsignee } from '../../../../Redux/Action/Admin';
import { login } from '../../../../Util/Helper';
import Loader from '../../../../Util/Loader';
import { allImages } from '../../../../Util/Images';

const Consignee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [consigneeModal, setConsigneeModal] = useState(false)
  const [moreModal, setMoreModal] = useState(false)
  const [skuModal, setSkuModal] = useState(false)
  const [pageNum, setPageNum] = useState(0)
  const [addConsigneeModal, setAddConsigneeModal] = useState(false)
  const [show, setShow] = useState(false)
  // "Assigned"
  const tableHead = ["S.No", "Name & Address", "Contact"]
  const detailHead = ["SKU", "Quantity", "Business Type", "More"]
  const moreHead = ["Serial No", "Business Type", "Status", "Track", "Date"]
  const skuHead = ["Transaction ID", "Order/Invoice No", "Vehicle No", "Warehouse", "Destination",
    "Business Type", "Date", "Document", "Action"]

  const { loading, getConsigneeData } = useSelector((state) => state.getConsignee)

  const [totalElements, setTotalElements] = useState(getConsigneeData?.totalConsignees);
  const [elementsPerPage] = useState(getConsigneeData?.response?.length);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const pages = Math.ceil(totalElements / elementsPerPage);
    setNumberOfPages(pages);
    setShowNext(pageNum >= numberOfPages)
  }, [totalElements, elementsPerPage]);


  useEffect(() => {
    const formData = new FormData();

    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(listConsignee(pageNum, formData))

  }, [pageNum])

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
            <img src={allImages.serial_icon} alt="" />
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
                  <img src={allImages.correct_icon} alt='' width={"16px"} />OK</b></td>
                <td><img src={allImages.track_icon} alt='' style={{ cursor: "pointer", width: "20px" }} onClick={() => setSkuModal(true)} /></td>
                <td>20/06/2018</td>
              </tr>
              <tr>
                <td>111</td>
                <td>T&T</td>
                <td><b style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", color: "#329932" }}>
                  <img src={allImages.correct_icon} alt='' width={"16px"} />OK</b></td>
                <td><img src={allImages.track_icon} alt='' style={{ cursor: "pointer", width: "20px" }} onClick={() => setSkuModal(true)} /></td>
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
              <img src={allImages.search_icon} alt="" />
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
          <Formik
            validationSchema={consigneeCreateSchema}
            initialValues={{
              industryName: "",
              consigneeName: "",
              consigneeAddress: "",
              commerceDate: new Date().toISOString().split('T')[0],
              pocName: "",
              contact: "",
            }}
            onSubmit={(values, { resetForm }) => {
              setAddConsigneeModal(false)
              setShow(true);
            }}
          >
            {({ handleSubmit }) => (
              <Row>
                <Col md={6}>
                  <Field
                    component={Input}
                    name="industryName"
                    label="Industry Name"
                    placeholder="Enter Industry Name"
                  />
                </Col>
                <Col md={6}>
                  <Field
                    component={Input}
                    name="consigneeName"
                    label="Consignee Name"
                    placeholder="Enter Consignee Name"
                  />
                </Col>
                <Col md={12}>
                  <Field
                    component={Input}
                    name="consigneeAddress"
                    label="Consignee Address"
                    placeholder="Enter Consignee Address"
                  />
                </Col>
                <Col md={6}>
                  <Field
                    component={Input}
                    type="Date"
                    name="commerceDate"
                    label="Commerce Date"
                  />
                </Col>
                <Col md={6}>
                  <Field
                    component={Input}
                    name="pocName"
                    label="Poc Name"
                    placeholder="Enter POC Name"
                  />
                </Col>
                <Col md={6}>
                  <Field
                    component={Input}
                    name="contact"
                    label="Contact"
                    placeholder="Enter Contact"
                  />
                </Col>
                <Col md={12} className='mt-4'>
                  <div><button type='button' onClick={handleSubmit}>Submit</button></div>
                </Col>
                <Col md={12}>
                  <div><button type="button" className='cancel_btn' onClick={() => setAddConsigneeModal(false)}>Cancel</button></div>
                </Col>
              </Row>
            )}
          </Formik>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  const searchConsigneeHandler = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  }

  const filteredConsigneeData = getConsigneeData?.response?.filter((c) => {
    const searchString = searchValue.toLowerCase();
    return (
      c.name.toLowerCase().includes(searchString) ||
      c.address.toLowerCase().includes(searchString) ||
      c.contact.toLowerCase().includes(searchString)
    );
  });

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

            <div className="search_box consignee web_view">
              <img src={allImages.search_icon} alt="" />
              <input placeholder="search anything" onChange={searchConsigneeHandler} />
            </div>
            Consignee
            <div className='create' onClick={() => setAddConsigneeModal(true)}><AiOutlineUserAdd style={{ fontSize: "17px" }} /> Add Consignee</div>
          </h5>
        </div>

        <div className="search_box consignee mob_view">
          <img src={allImages.search_icon} alt="" />
          <input placeholder="search anything" />
        </div>

        {
          loading ? <div className='py-5'>
            <Loader />
          </div> :
            <>
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
                      filteredConsigneeData?.map((c, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td><b>{c.name}</b> <br />
                              <span>{c.address}</span>
                            </td>
                            <td style={{ fontWeight: "600" }}>{c.contact}</td>
                            {/* <td><button onClick={() => setConsigneeModal(!consigneeModal)}>View</button></td> */}
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>

              <div className='pagination_div'>
                {
                  pageNum > 0 &&
                  <h6 onClick={() => setPageNum(pageNum - 1)}>Previous</h6>
                }
                <p>Pg No: {pageNum}</p>

                {
                  showNext &&
                  <h6 onClick={() => setPageNum(pageNum + 1)}>Next</h6>
                }
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Consignee
