import React from 'react';
import './WarehouseDetail.css';
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select'

const WarehouseDetail = () => {
  const navigate = useNavigate();
  const [AddStore, setAddStore] = useState(false)
  const [AddStages, setAddStages] = useState(false)
  const [AddPallet, setAddPallet] = useState(false)

  const [storeNum, setStoreNum] = useState(null)
  const [rackNum, setRackNum] = useState(null)

  const options = [
    { value: 'ambient', label: 'Ambient - Natural Temperature' },
    { value: 'air-condition', label: 'Air-Condition 56-75℉' },
    { value: 'refrigerated', label: 'Refrigerated 32-55℉' }
  ]

  const storeModal = (
    <Modal show={AddStore}
      centered onHide={() => setAddStore(!AddStore)} size='lg' className='warehouse_add'>
      <Modal.Body>
        <div className='warehouse_add_head'>
          <div>
            Add Store
          </div>

          <AiOutlineClose onClick={() => setAddStore(!AddStore)} style={{ cursor: "pointer" }} />
        </div>

        <div className='warehouse_store_add_detail'>

          <div className='input_field'>
            <label>No of Stores <span>*</span></label>
            <input placeholder='Enter no of stores' type='number' value={storeNum} onChange={(e) => setStoreNum(e.target.value)} />
          </div>

          <hr />

          {
            storeNum > 0 &&
            <div className='no_of_store_type'>

              <div>
                <label className='react_select_label'>Storage Type of Store 1 <span>*</span></label>
                <Select options={options} placeholder="Select Store Type" className='react_select' />
              </div>

              <div className='input_field mt-3'>
                <label>No of Racks in Store 1 <span>*</span></label>
                <input placeholder='Enter no of Rack' type='number' value={rackNum} onChange={(e) => setRackNum(e.target.value)} />
              </div>

              <hr />

              {
                rackNum &&
                <div>
                  <div className='floor_loc'>
                    <div className='input_field'>
                      <label>No of Floor in Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Floor' type='number' />
                    </div>
                    <div className='input_field'>
                      <label>No of Location in Each Floor of Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Locations' type='number' />
                    </div>
                  </div>
                  <div className='floor_loc'>
                    <div className='input_field'>
                      <label>No of Floor in Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Floor' type='number' />
                    </div>
                    <div className='input_field'>
                      <label>No of Location in Each Floor of Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Locations' type='number' />
                    </div>
                  </div>
                  <div className='floor_loc'>
                    <div className='input_field'>
                      <label>No of Floor in Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Floor' type='number' />
                    </div>
                    <div className='input_field'>
                      <label>No of Location in Each Floor of Rack 1 of Store 1 <span>*</span></label>
                      <input placeholder='Enter no of Locations' type='number' />
                    </div>
                  </div>

                  <hr />
                </div>
              }
            </div>
          }

          <button className='submit_btn' type='submit'>Add</button>
        </div>
      </Modal.Body>
    </Modal >
  )

  const stageModal = (
    <Modal show={AddStages}
      centered onHide={() => setAddStages(!AddStages)} size='lg' className='warehouse_add'>
      <Modal.Body>
        <div className='warehouse_add_head'>
          <div>
            Add Stage
          </div>
          <AiOutlineClose onClick={() => setAddStages(!AddStages)} style={{ cursor: "pointer" }} />
        </div>

        <div className='warehouse_store_add_detail'>
          <div className='input_field'>
            <label>No of Stages <span>*</span></label>
            <input placeholder='Enter no of stages' type='number' />
          </div>
          <hr />
          <button className='submit_btn' type='submit'>Add</button>
        </div>
      </Modal.Body>
    </Modal>
  )

  const palletModal = (
    <Modal show={AddPallet}
      centered onHide={() => setAddPallet(!AddPallet)} size='lg' className='warehouse_add'>
      <Modal.Body>
        <div className='warehouse_add_head'>
          <div>
            Add Pallet
          </div>
          <AiOutlineClose onClick={() => setAddPallet(!AddPallet)} style={{ cursor: "pointer" }} />
        </div>

        <div className='warehouse_store_add_detail'>
          <div className='input_field'>
            <label>No of Pallets <span>*</span></label>
            <input placeholder='Enter no of pallets' type='number' />
          </div>
          <hr />
          <button className='submit_btn' type='submit'>Add</button>
        </div>
      </Modal.Body>
    </Modal>
  )

  return (
    <div className='warehouse_detail_main'>
      {storeModal}
      {stageModal}
      {palletModal}

      <Container>
        <div className='warehouse_head'>
          <h6> <BsArrowLeft onClick={() => navigate(-1)} /> PAKISTANNone_01/Storage</h6>

          <div className='d-flex' style={{ gap: "10px" }}>
            <button onClick={() => setAddStore(true)}><AiOutlinePlus /> Add Store</button>
            <button onClick={() => setAddStages(true)}><AiOutlinePlus /> Add Stage</button>
            <button onClick={() => setAddPallet(true)}><AiOutlinePlus /> Add Pallet</button>
          </div>
        </div>

        <Row className='mb-4'>
          <Col md={8}>
            <Row style={{ gap: "15px 0" }}>
              <Col md={6}>
                <div className='warehouse_detail_boxes' onClick={() => navigate('/warehouse/details/location')}>
                  <img src='/images/condition_icon.png' alt='' />
                  <h6>Air Condition</h6>
                  <div>
                    W01
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className='warehouse_detail_boxes' onClick={() => navigate('/warehouse/details/location')}>
                  <img src='/images/ambient_icon.png' alt='' />
                  <h6>Ambient</h6>
                  <div>
                    W02
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className='warehouse_detail_boxes' onClick={() => navigate('/warehouse/details/location')}>
                  <img src='/images/stage_icon.png' alt='' />
                  <h6>Stage</h6>
                  <div>
                    01
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className='warehouse_detail_boxes' onClick={() => navigate('/warehouse/details/location')}>
                  <img src='/images/stage_icon.png' alt='' />
                  <h6>Stage</h6>
                  <div>
                    02
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <div className='warehouse_detail_boxes_right'>
              <img src='/images/pallet_img.png' alt='' />
              <div>
                <p>Total Available Pallets</p>
                <h4>119</h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default WarehouseDetail
