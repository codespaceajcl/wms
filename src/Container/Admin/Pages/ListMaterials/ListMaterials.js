import React, { useState } from "react";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import "./ListMaterial.css";
import { Col, Row } from "react-bootstrap";
import Input from "../../../../Components/Input/Input";
import SelectField from "../../../../Components/SelectField/SelectField.js";
import { BsArrowLeftShort } from "react-icons/bs";
import { materialColorStyles } from "../../../../Util/Helper.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../../Components/Modals/SuccessModal";
import { currencies } from "../../../../Util/Helper.js";
import { Field, Formik } from "formik";
import { listOfMaterialSchema } from "../../../../Util/Validations.js";

const ListMaterials = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <Breadcrumbs list={["Dashboard", "List Of Materials"]} />
      <SuccessModal show={show} setShow={() => setShow(!show)} />

      <div className="material_main">
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> List Of Materials </h5>

        <Formik
          validationSchema={listOfMaterialSchema}
          initialValues={{
            skuNumber: "",
            nomenclatureDescription: "",
            nsn: "",
            uom: "",
            supplier: "",
            medium: "",
            side: "",
            type: "",
            unitPrice: "",
            customer: "",
            businessTypeSelected: null,
            currencySelected: null,
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            setShow(true);
          }}
        >
          {({ handleSubmit }) => (
            <Row className="justify-content-around align-items-end">
              <Col md={6}>
                <label className="react_select_label">Business Type</label>
                <Field name={'businessTypeSelected'}
                  component={SelectField}
                  options={options}
                  styleCss={materialColorStyles}
                  placeholder="Select Business Type"
                />
              </Col>
              <Col md={6}>
                <Field
                  component={Input}
                  name="skuNumber"
                  label="SKU/Part Number"
                />
              </Col>
              <Col md={6}>
                <Field
                  component={Input}
                  name="nomenclatureDescription"
                  label="Nomenclature/Description"
                />
              </Col>
              <Col md={6}>
                <Field component={Input} name="nsn" label="NSN" />
              </Col>
              <Col md={6}>
                <label className="react_select_label">Currency</label>
                <Field name={'currencySelected'}
                  component={SelectField}
                  options={currencies}
                  styleCss={materialColorStyles}
                  placeholder="Select Currency"
                />
              </Col>
              <Col md={6}>
                <Field component={Input} name="uom" label="UOM" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="supplier" label="Supplier" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="medium" label="Medium" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="side" label="Side" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="type" label="Type" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="unitPrice" label="Unit Price" />
              </Col>
              <Col md={6}>
                <Field component={Input} name="customer" label="Customer" />
              </Col>
              <Col md={12}>
                <button
                  className="submit_btn"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Col>
            </Row>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ListMaterials;
