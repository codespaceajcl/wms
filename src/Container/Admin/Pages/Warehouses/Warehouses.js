import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import './Warehouse.css';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import warehouseApi from "../../../../Apis/Warehouse.json";
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import Input from '../../../../Components/Input/Input';
import { FileUploader } from "react-drag-drop-files";
import ErrorModal from '../../../../Components/Modals/ErrorModal';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Warehouses = () => {
  const navigate = useNavigate();
  const [addWarehouseModal, setAddWarehouseModal] = useState(false)
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false)
  const handleChange = (file) => {
    setFile(file);
  };

  const locationData = {
    labels: ['Total', 'Utilized'],
    datasets: [
      {
        label: ' ',
        data: [514, 207],
        backgroundColor: [
          '#F0F0F0',
          '#F7B500',
        ],
        borderWidth: 1,
      },
    ],
  };

  const palletData = {
    labels: ['Total', 'Utilized'],
    datasets: [
      {
        label: ' ',
        data: [602, 487],
        backgroundColor: [
          '#F0F0F0',
          '#57B894',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const addWarehouseHandler = (e) => {
    e.preventDefault();

    setAddWarehouseModal(false)
    setShow(true)
  }

  const modal = <Modal show={addWarehouseModal} onHide={() => setAddWarehouseModal(false)} size='lg' className='add_warehouse_modal'>
    <Modal.Body>
      <div className='add_warehouse_head'>
        <h5> <BsArrowLeftShort onClick={() => setAddWarehouseModal(false)} />
          Add Warehouse
        </h5>
        <p>Please fill out this form with the required information</p>
      </div>

      <div className='warehouse_form'>
        <Form onSubmit={addWarehouseHandler}>
          <Row>
            <Col md={6}>
              <Input label={'Warehouse Name'} placeholder={"Enter Warehouse Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'Commerce Date'} placeholder={"Enter Warehouse Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={12}>
              <Input label={'Warehouse Address'} placeholder={"Enter Warehouse Address"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'POC Name'} placeholder={"Enter POC Name"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'POC Contact'} placeholder={"Enter POC Contact"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'No of Stages'} placeholder={"Enter No. of Stages"} isRequired={true} type={'text'} />
            </Col>
            <Col md={6}>
              <Input label={'No of Stores'} placeholder={"Enter No. of Stores"} isRequired={true} type={'text'} />
            </Col>
            <Col md={12}>
              <div className='file_upload'>
                <FileUploader handleChange={handleChange} name="file" types={["JPG", "PNG", "GIF"]} />
              </div>
            </Col>
            <Col md={12} className='mt-4'>
              <div><button type='submit'>Add</button></div>
            </Col>
            <Col md={12}>
              <div><button type="button" className='cancel_btn' onClick={() => setAddWarehouseModal(false)}>Cancel</button></div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  return (
    <div>
      {modal}
      <ErrorModal show={show} setShow={() => setShow(!show)} />

      <Breadcrumbs list={["Dashboard", "Warehouses"]} />

      <div className='material_main warehouse_main'>
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
          Warehouses

          <div className='create' onClick={() => setAddWarehouseModal(true)}><AiOutlinePlus style={{ fontSize: "20px" }} /> Create Warehouse</div>
        </h5>

        <div className='mt-5'>
          <Row className='justify-content-center'>
            {
              warehouseApi.map((w) => {
                return (
                  <Col md={4} sm={6} xs={10} key={w.id}>
                    <div className='warehouse_div'>
                      <div className='warehouse_img_div'>
                        <img src={w.img} alt='' />
                        <h6>{w.warehouse_name}</h6>
                      </div>
                      <div className='no_stores'>
                        <div>
                          <img src='/images/store_icon.png' alt='' />
                          <p>No Of Stores</p>
                        </div>
                        <div>{w.stores}</div>
                      </div>
                      <div className='no_stores'>
                        <div>
                          <img src='/images/stages_icon.png' alt='' />
                          <p>No Of Stages</p>
                        </div>
                        <div>{w.stages}</div>
                      </div>

                      <Row>
                        <Col md={6} xs={6}>
                          <div className='w_location'>
                            <div className='loc'>
                              <img src='/images/location_icon.png' alt='' />
                              <p>Locations</p>
                            </div>

                            <div className='warehouse_chart'>
                              <Doughnut data={locationData} options={options} />
                            </div>

                            <div className='w_location_detail mt-2'>
                              <div>
                                <div className='dot'></div>
                                <p>Total <br /> <span>{w.location.total}</span></p>
                              </div>
                              <div>
                                <div className='dot' style={{ backgroundColor: "#F7B500" }}></div>
                                <p>Utilized <br /> <span>{w.location.utilized}</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6} xs={6}>
                          <div className='w_location'>
                            <div className='loc'>
                              <img src='/images/pallet_icon.png' alt='' />
                              <p>Pallets</p>
                            </div>

                            <div className='warehouse_chart'>
                              <Doughnut data={palletData} options={options} />
                            </div>

                            <div className='w_location_detail mt-2'>
                              <div>
                                <div className='dot'></div>
                                <p>Total <br /> <span>{w.pallet.total}</span></p>
                              </div>
                              <div>
                                <div className='dot' style={{ backgroundColor: "#57B894" }}></div>
                                <p>Utilized <br /> <span>{w.pallet.utilized}</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <button className='go_warehouse_btn' onClick={() => navigate('/warehouse/details')}>Go To Warehouse</button>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Warehouses
