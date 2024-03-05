import React, { useEffect, useState } from 'react';
import { FaWindowClose, FaRegPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { businessTypeWarehouse, powerBiGet, powerBiLinkCreate } from '../../../../Redux/Action/Admin';
import { login, materialColorStyles } from '../../../../Util/Helper';
import Loader from '../../../../Util/Loader';
import { BsArrowLeftShort } from "react-icons/bs";
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Select from "react-select";
import { errorNotify, successNotify } from '../../../../Util/Toast';

const PowerBiDashboard = ({ setShowPowerBi }) => {
    const [showTab, setShowTab] = useState("")
    const [showAdd, setShowAdd] = useState(false)
    const [addData, setAddData] = useState({
        name: "",
        link: "",
        warehouse: ""
    })
    const dispatch = useDispatch();

    const { loading, powerPiData } = useSelector((state) => state.powerBiApi)
    const { loading: businessLoading, getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType);
    const { loading: createLoading, powerPiCreateData } = useSelector((state) => state.powerBiCreateApi);

    useEffect(() => {
        if (powerPiCreateData?.response === "success") {
            successNotify(powerPiCreateData.message);
            dispatch({ type: "POWER_PI_LINK_CREATE_RESET" })
            setShowAdd(false)

            const formData = new FormData();
            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(powerBiGet(formData))
        }
        else if (powerPiCreateData?.response === "exist") {
            errorNotify(powerPiCreateData?.message)
            dispatch({ type: "POWER_PI_LINK_CREATE_RESET" })
        }
    }, [powerPiCreateData])

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(powerBiGet(formData))
        dispatch(businessTypeWarehouse(formData));
    }, [])

    const handleLinkSubmit = () => {
        if (addData.name.length === 0 || addData.link.length === 0 || addData.warehouse.length === 0) {
            errorNotify("please filled up all fields")
            return;
        }
        if (addData.link.split("/")[2] !== "app.powerbi.com") {
            errorNotify("link must be power Bi Link")
            return;
        }

        const formData = new FormData();
        formData.append("name", addData.name)
        formData.append("link", addData.link)
        formData.append("department", addData.warehouse)
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(powerBiLinkCreate(formData))
    }

    const warehouseOption = getBusinessWarehouses?.businessType.map((b) => {
        return { value: b, label: b }
    })

    const modal = <Modal show={showAdd} onHide={() => setShowAdd(false)} size='md' className='add_warehouse_modal'>
        <Modal.Body>
            <div className='add_warehouse_head'>
                <h5> <BsArrowLeftShort onClick={() => setShowAdd(false)} />
                    Add Power Bi Link
                </h5>
            </div>

            <div className='warehouse_form'>
                <Form className='input_field'>
                    <Row>
                        <Col md={12} className='mb-2'>
                            <label>Link Name <span>*</span> </label>
                            <input placeholder={"Enter Link Name"}
                                name='name'
                                type={'text'}
                                onChange={(e) => setAddData({
                                    ...addData,
                                    name: e.target.value
                                })}
                            />
                        </Col>
                        <Col md={12} className='mb-2'>
                            <label>Link URL <span>*</span> </label>
                            <input placeholder={"Enter Url"}
                                name='name'
                                type={'text'}
                                onChange={(e) => setAddData({
                                    ...addData,
                                    link: e.target.value
                                })}
                            />
                        </Col>
                        <Col md={12}>
                            <label className="react_select_label">
                                Warehouse <span>*</span>
                            </label>
                            <Select
                                options={warehouseOption}
                                isLoading={businessLoading}
                                placeholder="Select Warehouse"
                                styles={materialColorStyles}
                                onChange={(e) => setAddData({
                                    ...addData,
                                    warehouse: e.value
                                })}
                            />
                        </Col>
                        <Col md={12} className='mt-4'>
                            <div><button type='button' onClick={handleLinkSubmit} disabled={createLoading}>
                                {createLoading ? <Spinner animation='border' size='sm' /> : "Add"} </button></div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    return (
        <div className='powerbi_main_dashboard'>
            {modal}
            <div className='powerbi_close_btn'>
                <button onClick={() => setShowAdd(true)}>
                    <FaRegPlusSquare /> Add Link
                </button>
                <button onClick={() => setShowPowerBi(false)}>
                    <FaWindowClose /> Close
                </button>
            </div>
            {
                loading ? <div style={{ minHeight: "60vh" }}> <Loader /> </div> :
                    <>
                        {
                            powerPiData?.response?.length === 0 ?
                                <div className='no_powerbi_tab'>
                                    <h2>No Data Found</h2>
                                </div> :
                                <>
                                    <div className='mt-4'>
                                        <div className='report_tabs power_bi_tab'>
                                            {
                                                powerPiData?.response?.map((p, i) => {
                                                    return (
                                                        <button className={showTab === i ? 'active' : ''} onClick={() => setShowTab(i)}>{p.name}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        showTab?.length === 0 &&
                                        <div className='no_powerbi_tab'>
                                            <h2>Select Any Tab</h2>
                                        </div>
                                    }
                                    {
                                        showTab?.length !== 0 &&
                                        <div className='show_iframe'>
                                            <iframe className='demo_iframe' src={powerPiData?.response[showTab]?.link} />
                                        </div>
                                    }
                                </>
                        }
                    </>
            }
        </div>
    )
}
export default PowerBiDashboard