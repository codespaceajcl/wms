import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { businessTypeWarehouse, powerBiGet, powerBiLinkCreate } from '../../../../Redux/Action/Admin';
import { login, materialColorStyles } from '../../../../Util/Helper';
import Loader from '../../../../Util/Loader';
import { BsArrowLeftShort } from "react-icons/bs";
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Select from "react-select";
import { errorNotify, successNotify } from '../../../../Util/Toast';
import { FaCirclePlus } from "react-icons/fa6";
import powerBiLogo from "../../../../assets/images/power_bi_logo.png";
import systematicLogo from "../../../../assets/images/dashboard_icon_pi.png"

const PowerBiDashboard = ({ setShowPowerBi }) => {
    const columnRef = useRef(null)
    const [showTab, setShowTab] = useState("0")
    const [showAdd, setShowAdd] = useState(false)
    const [show, setShow] = useState(false)
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    useEffect(() => {
        setShow(false)
    }, [showTab])

    const handleClickOutside = (event) => {
        if (columnRef.current && !columnRef.current.contains(event.target)) {
            setShow(false);
        }
    };

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
                    Add Power Bi Dashboard
                </h5>
            </div>

            <div className='warehouse_form'>
                <Form className='input_field'>
                    <Row>
                        <Col md={12} className='mb-2'>
                            <label>Name <span>*</span> </label>
                            <input placeholder={"Enter Name"}
                                name='name'
                                type={'text'}
                                onChange={(e) => setAddData({
                                    ...addData,
                                    name: e.target.value
                                })}
                            />
                        </Col>
                        <Col md={12} className='mb-2'>
                            <label>URL <span>*</span> </label>
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
                                Department <span>*</span>
                            </label>
                            <Select
                                options={warehouseOption}
                                isLoading={businessLoading}
                                placeholder="Select Department"
                                styles={materialColorStyles}
                                onChange={(e) => setAddData({
                                    ...addData,
                                    warehouse: e.value
                                })}
                            />
                        </Col>
                        <Col md={12} className='mt-4'>
                            <div><button type='button' onClick={handleLinkSubmit} disabled={createLoading} style={{ padding: "7px 0" }}>
                                {createLoading ? <Spinner animation='border' size='sm' /> : "Add"} </button></div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal.Body>
    </Modal>

    const systemHandler = () => {
        setShowPowerBi(false)
        dispatch({ type: "POWER_PI_HIDE" })
    }

    const showPowerBiDrawer = () => {
        setShow(!show)
    }

    return (
        <div className='powerbi_main_dashboard'>
            {modal}

            <div className='powerbi_dashboard' ref={columnRef}>
                <img src={powerBiLogo} alt="" style={{ width: "20px", cursor: "pointer" }} onClick={showPowerBiDrawer} />

                {
                    show &&
                    <div className='right_side_dashboard_overlay'>
                        <div className='top_btns'>
                            <button onClick={systemHandler}>
                                <img src={systematicLogo} alt='' style={{ width: "17px" }} />
                                Systematical Dashboard</button>
                            <button onClick={() => setShowAdd(true)}>
                                <FaCirclePlus style={{ fontSize: "14px" }} /> Add
                            </button>
                        </div>
                        <div className='powerbi_left_ul'>
                            <h6>Recent Dashboard</h6>
                            <ul>
                                {
                                    powerPiData?.response?.map((p, i) => {
                                        return (<li className={showTab == i ? 'active' : ''} onClick={() => setShowTab(i)}>{i + 1}- {p.name}</li>
                                        )
                                    })
                                }
                                {/* <li onClick={() => setShowTab(i)}>2- DMS</li>
                                <li onClick={() => setShowTab(i)}>3- TMS</li>
                                <li onClick={() => setShowTab(i)}>3- TMS</li>
                                <li onClick={() => setShowTab(i)}>3- TMS</li> */}
                            </ul>
                        </div>
                    </div>
                }
            </div>
            <div>
                {
                    loading ? <div style={{ minHeight: "80vh" }}> <Loader /> </div> :
                        <div className='dashboard_wrapper'>
                            <div className='left_side_dashboard'>
                                {
                                    loading ? <div style={{ minHeight: "60vh" }}> <Loader /> </div> :
                                        <>
                                            {
                                                powerPiData?.response?.length === 0 ?
                                                    <div className='no_powerbi_tab'>
                                                        <h2>No Data Found</h2>
                                                    </div> :
                                                    <>
                                                        <div className='show_iframe'>
                                                            <iframe className='demo_iframe' src={powerPiData?.response[showTab]?.link} />
                                                        </div>
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default PowerBiDashboard