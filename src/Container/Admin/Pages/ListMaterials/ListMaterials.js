import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import "./ListMaterial.css";
import { Col, Row, Spinner } from "react-bootstrap";
import Input from "../../../../Components/Input/Input";
import SelectField from "../../../../Components/SelectField/SelectField.js";
import { BsArrowLeftShort } from "react-icons/bs";
import { materialColorStyles, currencies, login } from "../../../../Util/Helper.js";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../../../Components/Modals/SuccessModal";
import { Field, Formik } from "formik";
import { listOfMaterialSchema } from "../../../../Util/Validations.js";
import { useDispatch, useSelector } from "react-redux";
import { ListMaterialPost, businessTypeWarehouse } from "../../../../Redux/Action/Admin.js";
import { errorNotify, successNotify } from "../../../../Util/Toast.js";

const ListMaterials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { loading, postMaterialData, error } = useSelector((state) => state.postMaterial)
  const { getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType)

  useEffect(() => {
    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)
    dispatch(businessTypeWarehouse(formData))
  }, [])

  useEffect(() => {
    if (postMaterialData?.response === 'success') {
      successNotify("Created Successfully!!")
      dispatch({ type: "LIST_MATERIAL_POST_RESET" })
    }
    if (error) {
      errorNotify(error)
      dispatch({ type: "LIST_MATERIAL_POST_RESET" })
    }
  }, [error, postMaterialData])

  const businessType = getBusinessWarehouses?.businessType.map((b) => {
    return { value: b, label: b }
  })

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

            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formData = new FormData()
            formData.append("partNo", values.skuNumber)
            formData.append("nomenclature", values.nomenclatureDescription)
            formData.append("nsn", values.nsn)
            formData.append("uom", values.uom)
            formData.append("currency", values.currencySelected)
            formData.append("supplier", values.supplier)
            formData.append("medium", values.medium)
            formData.append("side", values.side)
            formData.append("type", values.type)
            formData.append("unitPrice", values.unitPrice)
            formData.append("customer", values.customer)
            formData.append("businessType", values.businessTypeSelected)
            formData.append("date", `${year}-${month}-${day}`)
            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(ListMaterialPost(formData))
            resetForm()
            values.businessTypeSelected = null
            values.currencySelected = null

          }}
        >
          {({ handleSubmit }) => (
            <Row className="justify-content-around align-items-end mt-5">
              <Col md={6}>
                <label className="react_select_label">Company <span>*</span> </label>
                <Field name={'businessTypeSelected'}
                  component={SelectField}
                  options={businessType}
                  styleCss={materialColorStyles}
                  placeholder="Select Company"
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
                <label className="react_select_label">Currency  <span>*</span></label>
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
                  className="submit_btn mt-4"
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
