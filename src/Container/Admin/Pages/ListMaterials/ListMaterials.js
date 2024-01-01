import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import "./ListMaterial.css";
import { Col, Row, Spinner } from "react-bootstrap";
import Input from "../../../../Components/Input/Input";
import SelectField from "../../../../Components/SelectField/SelectField.js";
import { BsArrowLeftShort } from "react-icons/bs";
import { businessTypes, materialColorStyles, currencies, login } from "../../../../Util/Helper.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../../Components/Modals/SuccessModal";
import { Field, Formik } from "formik";
import { listOfMaterialSchema } from "../../../../Util/Validations.js";
import { useDispatch, useSelector } from "react-redux";
import { ListMaterialPost } from "../../../../Redux/Action/Admin.js";
import { errorNotify, successNotify } from "../../../../Util/Toast.js";

const ListMaterials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { loading, postMaterialData, error } = useSelector((state) => state.postMaterial)

  useEffect(() => {
    if (postMaterialData?.response === 'success') {
      successNotify(postMaterialData?.message)
      dispatch({ type: "LIST_MATERIAL_POST_RESET" })
    }
    if (error) {
      errorNotify(error)
      dispatch({ type: "LIST_MATERIAL_POST_RESET" })
    }
  }, [error, postMaterialData])

  return (
    <>
      <Breadcrumbs list={["Dashboard", "List Of Materials"]} />
      <SuccessModal show={show} setShow={() => setShow(!show)} />

      <div className="material_main">
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> List Of Materials </h5>

        <Formik
          validationSchema={listOfMaterialSchema}
          initialValues={{ skuNumber: "", nomenclatureDescription: "", nsn: "", uom: "", supplier: "", medium: "", side: "", type: "", unitPrice: "", customer: "", businessTypeSelected: null, currencySelected: null }}
          onSubmit={(values, { resetForm }) => {

            const formData = new FormData()
            formData.append("email", login.email)
            formData.append("token", login.token)
            formData.append("partNo", values.skuNumber)
            formData.append("nomenclature", values.nomenclatureDescription)
            formData.append("uom", values.uom)
            formData.append("unitPrice", values.unitPrice)
            formData.append("customer", values.customer)
            formData.append("businessType", values.businessTypeSelected)
            formData.append("nsn", values.nsn)
            formData.append("supplier", values.supplier)
            formData.append("medium", values.medium)
            formData.append("side", values.side)
            formData.append("type", values.type)
            formData.append("currency", values.currencySelected)

            // for(let v of formData){
            //   console.log(v)
            // }

            dispatch(ListMaterialPost(formData))
            resetForm()
            values.businessTypeSelected = null
            values.currencySelected = null

            // setShow(true);
          }}
        >
          {({ handleSubmit }) => (
            <Row className="justify-content-around align-items-end">
              <Col md={6}>
                <label className="react_select_label">Business Type</label>
                <Field name={'businessTypeSelected'}
                  component={SelectField}
                  options={businessTypes}
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
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {
                    loading ? <Spinner animation="border" size="sm" /> :
                      'Submit'
                  }
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
