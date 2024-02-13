import React, { useEffect, useRef, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs'
import { Col, Container, Modal, Row, Spinner, Table } from 'react-bootstrap';
import Select from 'react-select'
import { AiOutlinePlus, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { Pie, Bar } from 'react-chartjs-2';
import { MdFilterList } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { rackColorStyles, floorColorStyles, login } from "../../../../Util/Helper";
import './LocationDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { createFloor, createLocation, createRack, editLocationTag, getAllWarehouses, getLocation, palletLocationDetail, palletStatusChange } from '../../../../Redux/Action/Admin';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../../../Util/Loader';
import { successNotify } from '../../../../Util/Toast';
import { allImages } from '../../../../Util/Images';

const LocationDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { state } = useLocation();

    const [showGraph, setShowGraph] = useState('inventory')
    const [addRack, setAddRack] = useState(false)
    const [addFloor, setAddFloor] = useState(false)
    const [addLocation, setAddLocation] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [showChange, setShowChange] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFilterBox, setShowFilterBox] = useState(false)
    const [editInput, setEditInput] = useState(false)
    const [editInputValue, setEditInputValue] = useState({
        value: '',
        location: ''
    });
    const [currentWarehouse, setCurrentWarehouse] = useState({})

    const [addRackModal, setAddRackModal] = useState({
        noOfLocations: null,
        noOfFloors: null
    })

    const [addFloorModal, setAddFloorModal] = useState({
        rack: null,
        noOfFloor: null
    })

    const [addLocationModal, setAddLocationModal] = useState({
        rack: null,
        noOfLocation: null
    })

    const [statusChange, setStatusChange] = useState({
        item: "",
        status: ""
    })

    const { loading, getWarehouseData } = useSelector((state) => state.getWarehouses)
    const { loading: locationLoading, getLocationData } = useSelector((state) => state.getWarehouseLocation)
    const { loading: rackLoading, getCustomRackData } = useSelector((state) => state.createCustomRack)
    const { loading: floorLoading, getCustomFloorData } = useSelector((state) => state.createCustomFloor)
    const { loading: locLoading, getCustomLocData } = useSelector((state) => state.createCustomLocation)
    const { loading: palletLoading, palletDetailData } = useSelector((state) => state.getPalletDetail)
    const { loading: statusLoading, statusData } = useSelector((state) => state.getStatusChange)
    const { loading: tagLoading, editLocData } = useSelector((state) => state.getEditTag)

    let getWarehouseId = localStorage.getItem('warehouseId');

    useEffect(() => {
        const formData = new FormData()
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(getAllWarehouses(formData))
        dispatch(getLocation(id, formData))

        if (getCustomRackData?.response === 'success') {
            successNotify("Rack Created Successfully!");
            dispatch({ type: 'CREATE_RACK_RESET' })
            setAddRack(false)
        }

        if (getCustomFloorData?.response === 'success') {
            successNotify("Floor Created Successfully!");
            dispatch({ type: 'CREATE_FLOOR_RESET' })
            setAddFloor(false)
        }

        if (getCustomLocData?.response === 'success') {
            successNotify("Location Created Successfully!");
            dispatch({ type: 'CREATE_LOCATION_RESET' })
            setAddLocation(false)
        }
        if (statusData?.response === "success") {
            setShowChange(!showChange)
            setShowDetail(false)
            setShowSuccess(true)
            dispatch({ type: "PALLET_LOC_RESET" })
        }
        if (editLocData?.response === "success") {
            setEditInput(!editInput)
            setShowDetail(!showDetail)
            successNotify("Tag Edit Successfully!")
        }
    }, [getCustomRackData, getCustomFloorData, getCustomLocData, statusData, editLocData])

    useEffect(() => {
        if (getWarehouseData) {
            const getCurrentWarehouse = getWarehouseData?.respnse?.find((w) => w.id == getWarehouseId)
            setCurrentWarehouse(getCurrentWarehouse)
        }
    }, [getWarehouseData])

    const rackContainerRefs = useRef([]);

    const handleScroll = (scrollValue, index) => {
        if (rackContainerRefs.current[index]) {
            rackContainerRefs.current[index].scrollBy({ left: scrollValue, behavior: 'smooth' });
        }
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (editInput) { inputRef.current.focus() }
    }, [editInput]);

    const tableHead = ["#", "Serial No", "SKU", "Pallet No", "Status", "Change Status"]
    const warehouseLabels = ['OK', 'Faulty/Damaged'];

    const pieData = {
        labels: ['Ambient 79%', 'Air Conditioned 14%', 'Refrigerator 5%'],
        datasets: [
            {
                label: '',
                data: [79, 14, 5],
                backgroundColor: [
                    'rgba(165, 207, 79, 1)',
                    'rgba(119, 206, 255, 1)',
                    '#fff'
                ],
            },
        ],
    };

    const overviewOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    const warehouseData = {
        labels: warehouseLabels,
        datasets: [
            {
                label: '',
                data: [50, 40],
                backgroundColor: [
                    'rgba(169, 194, 63, 1)',
                    'rgba(255, 110, 110, 1)',
                ],
            },
        ],
    };

    const warehouseOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                },
            },
            y: {
                max: 100,
                min: 0,
                stepSize: 25, // Set the step size to 25
                grid: {
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                    beginAtZero: true,
                    precision: 0,
                },
            },
        },
    };

    const options = getLocationData?.response && Object.entries(getLocationData?.response)?.map((loc) => {
        return {
            label: loc[0],
            value: loc[0]
        }
    })

    const addRackHandler = () => {

        const data = {
            noOfFloors: addRackModal.noOfFloors,
            noOfLocations: addRackModal.noOfLocations,
            warehouse: getWarehouseId,
            store: id
        }

        const d = JSON.stringify(data)
        dispatch(createRack(d))

    }

    const rackModal = (
        <Modal show={addRack}
            centered onHide={() => setAddRack(!addRack)} size='lg' className='warehouse_add rack_add'>
            <Modal.Body>
                <div className='add_rack_head'>
                    <div>
                        Add Rack
                    </div>
                    <AiOutlineClose onClick={() => setAddRack(!addRack)} style={{ cursor: "pointer" }} />
                </div>

                <div className='warehouse_store_add_detail'>
                    <div className='input_field'>
                        <label>No of Floors <span>*</span></label>
                        <input placeholder='Enter no of Floors' type='number' value={addRackModal.noOfFloors}
                            onChange={(e) => setAddRackModal({
                                ...addRackModal,
                                noOfFloors: e.target.value
                            })} />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Locations <span>*</span></label>
                        <input placeholder='Enter no of Locations' type='number' value={addRackModal.noOfLocations}
                            onChange={(e) => setAddRackModal({
                                ...addRackModal,
                                noOfLocations: e.target.value
                            })} />
                    </div>

                    <hr />
                    <button className='submit_btn' type='submit' onClick={addRackHandler}>
                        {
                            rackLoading ? <Spinner animation='border' size='sm' /> : 'Add'
                        }
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )

    const addFloorHandler = () => {

        const data = {
            noOfFloor: addFloorModal.noOfFloor,
            rack: addFloorModal.rack,
            store: id
        }

        const d = JSON.stringify(data)
        dispatch(createFloor(d))
    }

    const floorModal = (
        <Modal show={addFloor}
            centered onHide={() => setAddFloor(!addFloor)} size='lg' className='warehouse_add rack_add'>
            <Modal.Body>
                <div className='add_rack_head'>
                    <div>
                        Add Floors
                    </div>
                    <AiOutlineClose onClick={() => setAddFloor(!addFloor)} style={{ cursor: "pointer" }} />
                </div>

                <div className='warehouse_store_add_detail'>
                    <div>
                        <label className='react_select_label'>Rack <span>*</span></label>
                        <Select options={options} placeholder="Select" className='react_select' styles={floorColorStyles}
                            onChange={(r) => setAddFloorModal({
                                ...addFloorModal,
                                rack: r.value
                            })} />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Floors <span>*</span></label>
                        <input placeholder='Enter no of Floors' type='number' value={addFloorModal.noOfFloor}
                            onChange={(e) => setAddFloorModal({
                                ...addFloorModal,
                                noOfFloor: e.target.value
                            })} />
                    </div>

                    <hr />
                    <button className='submit_btn' onClick={addFloorHandler}>
                        {floorLoading ? <Spinner animation='border' size='sm' /> : 'Add'}</button>
                </div>
            </Modal.Body>
        </Modal>
    )

    const addLocationHandler = () => {
        const data = {
            noOfLocation: addLocationModal.noOfLocation,
            rack: addLocationModal.rack,
            store: id
        }

        const d = JSON.stringify(data)
        dispatch(createLocation(d))
    }

    const locationModal = (
        <Modal show={addLocation}
            centered onHide={() => setAddLocation(!addLocation)} size='lg' className='warehouse_add rack_add'>
            <Modal.Body>
                <div className='add_rack_head'>
                    <div>
                        Add Location
                    </div>
                    <AiOutlineClose onClick={() => setAddLocation(!addLocation)} style={{ cursor: "pointer" }} />
                </div>

                <div className='warehouse_store_add_detail'>
                    <div>
                        <label className='react_select_label'>Rack <span>*</span></label>
                        <Select options={options} placeholder="Select" className='react_select' styles={floorColorStyles}
                            onChange={(r) => setAddLocationModal({
                                ...addLocationModal,
                                rack: r.value
                            })} />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Locations <span>*</span></label>
                        <input placeholder='Enter no of locations' type='number'
                            onChange={(r) => setAddLocationModal({
                                ...addLocationModal,
                                noOfLocation: r.target.value
                            })} />
                    </div>

                    <hr />
                    <button className='submit_btn' onClick={addLocationHandler}>
                        {locLoading ? <Spinner animation='border' size='sm' /> : "Add"}</button>
                </div>
            </Modal.Body>
        </Modal>
    )

    const statusChangeHandler = (data, value) => {
        setShowChange(true)
        setStatusChange({
            item: data.id,
            status: value.value
        })
    }

    const editTagHandler = () => {
        let data = {
            tag: editInputValue.value,
            location: editInputValue.location
        }

        let d = JSON.stringify(data)

        dispatch(editLocationTag(d))
    }

    const locDetailModal = (
        <Modal show={showDetail}
            centered onHide={() => setShowDetail(!showDetail)} size='lg' className='location_detail'>
            <Modal.Body>
                <div className='location_detail_head'>
                    <div>
                        <input disabled={!editInput}
                            autoFocus={true}
                            value={editInputValue.value}
                            type='text'
                            className='show_input_value'
                            onChange={(e) => setEditInputValue({
                                ...editInputValue,
                                value: e.target.value
                            })}
                            ref={inputRef} />
                    </div>
                    <div>
                        <p> {editInput ? <span onClick={editTagHandler} style={tagLoading ? { cursor: "wait" } : null}>Save</span> : <span onClick={() => setEditInput(true)}>Edit</span>} | <span onClick={() => setShowDetail(!showDetail)}>Close</span> </p>
                    </div>
                </div>

                <div className='searching_div'>
                    <Row className='align-items-center' style={{ gap: "10px 0" }}>
                        <Col md={7}>
                            <div className='search_bar'>
                                <FiSearch />
                                <input type='text' placeholder='Search by ID, Pallet No, or SKU' />
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className='search_by'>
                                <input type='date' />
                                <button> <img src={allImages.file_download} alt='' /> Download</button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Table responsive className='loc_detail_table'>
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
                                palletDetailData?.response?.map((p, i) => {
                                    return (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{p.serialNo}</td>
                                            <td>{p.sku}</td>
                                            <td>{p.pallotNo}</td>
                                            <td className={p.status === 'ok' ? 'ok' : 'fault'}>{p.status}</td>
                                            <td style={{ minWidth: "150px" }}><Select options={[{
                                                value: "ok", label: "ok",
                                            }, {
                                                value: "faulty", label: "Faulty",
                                            },
                                            {
                                                value: "damage", label: "Damage"
                                            }]} placeholder="Select" onChange={(value) => statusChangeHandler(p, value)} className='react_select status' /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    {
                        palletLoading && <Loader />
                    }
                </div>
            </Modal.Body>
        </Modal>
    )

    const showSuccessModal = (
        <Modal centered show={showSuccess} onHide={setShowSuccess} className='status_changed_success' style={{ backgroundColor: '#00000040' }}>
            <Modal.Body>
                <div className='close_div'>
                    <AiOutlineClose onClick={() => setShowSuccess(!showSuccess)} style={{ cursor: "pointer" }} />
                </div>

                <div className='success_detail'>
                    <img src={allImages.correct_icon2} alt='' />
                    <h2>Success!</h2>
                    <p>Location Status has been changed <br />
                        succesfully!</p>
                </div>
            </Modal.Body>
        </Modal>
    )

    const statusHandler = () => {
        const data = {
            ...statusChange,
            user: login.email,
            email: login.email,
            token: login.token
        }

        const d = JSON.stringify(data)
        dispatch(palletStatusChange(d))

    }

    const changeStatusModal = (
        <Modal show={showChange}
            centered onHide={() => setShowChange(!showChange)} size='sm' className='change_status_modal'>
            <Modal.Body>
                <div className='add_rack_head' style={{ backgroundColor: "#000" }}>
                    <div>
                        Change Status
                    </div>
                    <AiOutlineClose onClick={() => setShowChange(!showChange)} style={{ cursor: "pointer" }} />
                </div>

                <div className='serial_no'>
                    <p>Do you really want to change <br /> status?</p>

                    <div>
                        <button onClick={statusHandler}>
                            {statusLoading ? <Spinner animation='border' size='sm' /> : "Yes"}</button>
                        <button onClick={() => setShowChange(!showChange)}>No</button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )

    const openPalletModal = (slot) => {
        setEditInputValue({
            value: slot.sgi,
            location: slot.id
        })
        setShowDetail(true)

        const formData = new FormData()
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(palletLocationDetail(slot.id, formData))
    }

    return (
        <div className='location_detail_inner'>
            {rackModal}
            {floorModal}
            {locationModal}
            {locDetailModal}
            {changeStatusModal}
            {showSuccessModal}

            <Container>
                {
                    (loading && locationLoading) ? <Loader color={'#fff'} /> : <>
                        <div className='location_breakcrumb mb-4'>
                            <Breadcrumbs list={["Warehouse", `${currentWarehouse.name}`, `${currentWarehouse.sgi}`, `${getLocationData?.type}`]} />
                        </div>

                        <Row className='mb-4' style={{ gap: "15px 0" }}>
                            <Col md={4}>
                                <div className='location_detail_box'>
                                    <h6>Warehouse Info.</h6>

                                    <div className='warehouse_info_detail'>
                                        <img src={allImages.agilePortImg} alt='' />

                                        <div>
                                            <h6>{currentWarehouse?.name}</h6>
                                            <p>Address: {currentWarehouse?.address}</p>
                                        </div>
                                    </div>

                                    <div className='location_list_detail'>
                                        <ul>
                                            <li> <img src={allImages.location_store_icon} alt='' /> No of Stores </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.store}</strong></li>
                                        </ul>
                                        <ul>
                                            <li> <img src={allImages.location_stage_icon} alt='' /> No of Stages </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.stage}</strong></li>
                                        </ul>
                                        <ul>
                                            <li> <img src={allImages.location_no_icon} alt='' /> Total Location </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.location}</strong></li>
                                        </ul>
                                        <ul>
                                            <li> <img src={allImages.utilized_location_icon} alt='' /> Utlized Location </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.utilizeLocation}</strong></li>
                                        </ul>
                                        <ul>
                                            <li> <img src={allImages.location_pallet_icon} alt='' /> Total Pallets </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.location}</strong></li>
                                        </ul>
                                        <ul>
                                            <li> <img src={allImages.utilized_pallet_loc} alt='' /> Utilized Pallets </li>
                                            <li><strong>{getWarehouseData?.stat[getWarehouseId]?.utilizeLocation}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='location_detail_box'>
                                    <h6>{currentWarehouse?.sgi}</h6>

                                    <div className='mt-3'>
                                        <Row>
                                            <Col md={6} xs={6}>
                                                <div className='location_center_boxes'>
                                                    <h4>{getWarehouseData?.stat[getWarehouseId]?.pallot}</h4>
                                                    <p>No Of <br /> Utilized Pallets</p>
                                                </div>
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <div className='location_center_boxes'>
                                                    <h4>{getWarehouseData?.stat[getWarehouseId]?.pallot - getWarehouseData?.stat[getWarehouseId]?.utilizePallots}</h4>
                                                    <p>No Of <br /> Empty Pallets</p>
                                                </div>
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <div className='location_center_boxes'>
                                                    <h4>{getWarehouseData?.stat[getWarehouseId]?.location}</h4>
                                                    <p>No Of Utilized <br /> Location</p>
                                                </div>
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <div className='location_center_boxes'>
                                                    <h4>{getWarehouseData?.stat[getWarehouseId]?.location - getWarehouseData?.stat[getWarehouseId]?.utilizeLocation}</h4>
                                                    <p>No Of Empty <br /> Location</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='location_detail_graph'>
                                    <div className='tabs'>
                                        <p onClick={() => setShowGraph('inventory')} className={showGraph === 'inventory' ? 'active' : ''}>Inventory Status</p>
                                        <p onClick={() => setShowGraph('Utilization')} className={showGraph === 'Utilization' ? 'active' : ''}>Location Utilization</p>
                                    </div>
                                    <div>
                                        {
                                            showGraph === 'Utilization' ? <div className='pie_chart_location'>
                                                <Pie data={pieData} options={overviewOptions} />
                                                <ul>
                                                    <li><span></span> Ambient</li>
                                                    <li><span></span> Air Conditioned</li>
                                                    <li><span></span> Refrigerator</li>
                                                </ul>
                                            </div> : <div className='bar_location'>
                                                <Bar options={warehouseOptions} data={warehouseData} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div>
                                    <div className='rack_filter'>
                                        <div className='flex-wrap'>
                                            <h6>Select Rack</h6>

                                            <div style={{ display: "flex", gap: "5px", flexWrap: 'wrap' }}>
                                                <button onClick={() => setAddRack(true)}><AiOutlinePlus /> Add Rack</button>
                                                <button onClick={() => setAddFloor(true)}><AiOutlinePlus /> Add Floor</button>
                                                <button onClick={() => setAddLocation(true)}><AiOutlinePlus /> Add Location</button>
                                            </div>
                                        </div>

                                        {/* <div className='mt-4'>
                                            <Select options={options} placeholder="All Racks" styles={rackColorStyles} className='react_select_inhouse dc_doc' />
                                            <div>
                                                <MdFilterList onClick={() => setShowFilterBox(!showFilterBox)} />
                                            </div>
                                        </div> */}

                                        <div className='rack_box_info'>
                                            <p> <span></span> Empty </p>
                                            <p> <span></span> Filled </p>
                                            <p> <span></span> Faulty/Damage</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Row className='mt-4 make_reverse_loc_div' style={{ transition: "all 0.3s ease", gap: "10px 0" }}>
                                    <Col md={showFilterBox ? 8 : 12} style={{ transition: "all 0.3s ease" }}>
                                        {
                                            getLocationData?.response && Object.entries(getLocationData?.response)?.map((loc, index) => {
                                                return (
                                                    <div className='rack_placing'>
                                                        <div style={{ position: "relative" }}>
                                                            <h4>{loc[0]}</h4>

                                                            <div className='scroll_chevrons'>
                                                                <FaChevronLeft onClick={() => handleScroll(-300, index)} />
                                                                <FaChevronRight onClick={() => handleScroll(300, index)} />
                                                            </div>
                                                        </div>
                                                        <div
                                                            // ref={rackContainerRef1}
                                                            ref={el => rackContainerRefs.current[index] = el}
                                                            className={showFilterBox ? 'rack_box_container make_shrink' : 'rack_box_container'}
                                                            style={{
                                                                overflowX: 'auto',
                                                                whiteSpace: 'nowrap',
                                                                transition: 'all 0.3s ease'
                                                            }}>
                                                            {
                                                                Object.entries(loc[1])?.map((w) => {
                                                                    return (
                                                                        <table style={showFilterBox ? { width: `${w[1].length * 20}%` } : { width: `${w[1].length * 15}%` }}>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><p>{w[0]}</p></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    {
                                                                                        w[1]?.map((slot) => {

                                                                                            const lastCharacter = slot.sgi.slice(-1);
                                                                                            const secondToLastCharacter = slot.sgi.slice(-2, -1);
                                                                                            const result = secondToLastCharacter + lastCharacter;

                                                                                            return (
                                                                                                <td className='rack_box'>
                                                                                                    <div className='rack_head'>{result}</div>
                                                                                                    <div className='rack_place' onClick={() => openPalletModal(slot)}>
                                                                                                        {
                                                                                                            slot.status === 'filled' ?
                                                                                                                <img src={allImages.filled_rack} alt='' /> : slot.status === 'empty' ?
                                                                                                                    <img src={allImages.empty_rack} alt='' /> :
                                                                                                                    <img src={allImages.faulty_rack} alt='' />
                                                                                                        }
                                                                                                        <span style={{ color: "#fff" }}>{slot.sgi}</span>
                                                                                                    </div>
                                                                                                </td>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Col>

                                    <Col md={4} style={showFilterBox === false ? { display: "none", transition: "all 0.3s ease" } : { display: "block", transition: "all 0.3s ease" }}>
                                        <div className='rack_filter_right'>
                                            <div className='show_recent'>
                                                <div className='search_bar'>
                                                    <input placeholder='Search' />
                                                    <select name="rack">
                                                        <option value="W01AA">W01AA</option>
                                                        <option value="W01AB">W01AB</option>
                                                        <option value="W02AB">W02AB</option>
                                                        <option value="W01AC">W01AC</option>
                                                        <option value="W01ABB">W01ABB</option>
                                                    </select>
                                                    <div className='search_icon'>
                                                        <AiOutlineSearch />
                                                    </div>
                                                </div>

                                                <h6>Recent Searches</h6>
                                                <ul>
                                                    <li>+ W01AA01A1</li>
                                                    <li>+ W01AA01A2</li>
                                                    <li>+ W01AA01A3</li>
                                                    <li>+ W01AA01A4</li>
                                                </ul>
                                            </div>

                                            <div className='show_recent'>
                                                <h6>Rack</h6>

                                                <ul>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W01AA</span>
                                                                <span>103</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W02AB</span>
                                                                <span>23</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W03AC</span>
                                                                <span>12</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W04AD</span>
                                                                <span>22</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W015AE</span>
                                                                <span>11</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>W06AF</span>
                                                                <span>22</span>
                                                            </div>
                                                        </label></li>
                                                </ul>
                                            </div>

                                            <div className='show_recent floors'>
                                                <h6>Floors</h6>

                                                <ul>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>01</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>02</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>03</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>04</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>05</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>06</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>07</span>
                                                            </div>
                                                        </label></li>
                                                    <li><input type="radio" id="html" name="floor" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>08</span>
                                                            </div>
                                                        </label></li>
                                                </ul>
                                            </div>

                                            <div className='show_recent'>
                                                <h6>Filter By Type</h6>

                                                <ul>
                                                    <li><input type="checkbox" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>Filled</span>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li><input type="checkbox" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>OK</span>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li><input type="checkbox" id="html" name="fav_language" value="HTML" />
                                                        <label for="html">
                                                            <div>
                                                                <span>Damage/Faulty</span>
                                                            </div>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        </div>
    )
}
export default LocationDetail