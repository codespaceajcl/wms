import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import './ListMaterial.css';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Input from '../../../../Components/Input/Input';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { useState } from 'react';

const ListMaterials = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const materialSubmitHandler = (e) => {
    e.preventDefault();

    setShow(true)
  }

  return (
    <div>
      <Breadcrumbs list={["Dashboard", "List Of Materials"]} />

      <SuccessModal show={show} setShow={() => setShow(!show)} />

      <div className='material_main'>
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> List Of Materials</h5>

        <Form onSubmit={materialSubmitHandler} className='mt-5'>
          <Row className='justify-content-around'>
            <Col md={6}>
              <label className='react_select_label'>Project</label>
              <Select options={options} placeholder="Select Project" className='react_select' />
            </Col>
            <Col md={6}>
              <Input label={'SKU/Part Number'} />
            </Col>
            <Col md={6}>
              <Input label={'Nomenclature/Description'} />
            </Col>
            <Col md={6}>
              <Input label={'NSN'} />
            </Col>
            <Col md={6}>
              <label className='react_select_label'>Currency</label>
              <Select options={options} placeholder="Select Currency" className='react_select' />
            </Col>
            <Col md={6}>
              <Input label={'UOM'} />
            </Col>
            <Col md={6}>
              <Input label={'Supplier'} />
            </Col>
            <Col md={6}>
              <Input label={'Medium'} />
            </Col>
            <Col md={6}>
              <Input label={'Side'} />
            </Col>
            <Col md={6}>
              <Input label={'Type'} />
            </Col>
            <Col md={6}>
              <Input label={'Unit Price'} />
            </Col>
            <Col md={6}>
              <Input label={'Customer'} />
            </Col>
            <Col md={12}>
              <button className='submit_btn' type='submit'>Submit</button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default ListMaterials
