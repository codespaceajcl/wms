import React, { useEffect, useRef, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs'
import { Col, Container, Modal, Row, Table } from 'react-bootstrap';
import Select from 'react-select'
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { Pie, Bar } from 'react-chartjs-2';
import { MdFilterList } from "react-icons/md";
import LocationApi from "../../../../Apis/Location.json";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { rackColorStyles, floorColorStyles } from "../../../../Util/Helper";
import './LocationDetail.css';

const LocationDetail = () => {
    const [showGraph, setShowGraph] = useState('inventory')
    const [addRack, setAddRack] = useState(false)
    const [addFloor, setAddFloor] = useState(false)
    const [addLocation, setAddLocation] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [showChange, setShowChange] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFilterBox, setShowFilterBox] = useState(false)
    const [editInputValue, setEditInputValue] = useState('W02AA01A1');
    const [editInput, setEditInput] = useState(false)
    const [scrollPosition1, setScrollPosition1] = useState(0);
    const [scrollPosition2, setScrollPosition2] = useState(0);

    const rackContainerRef1 = useRef(null);
    const rackContainerRef2 = useRef(null);

    const handleScroll = (scrollValue, containerRef, setScrollPosition) => {
        const newScrollPosition = setScrollPosition + scrollValue;
        setScrollPosition(newScrollPosition);

        if (containerRef.current) {
            containerRef.current.scrollBy({ left: scrollValue, behavior: 'smooth' });
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

    const options = [
        { value: 'PakistanStorage_None01/Agility Port Qasim', label: 'PakistanStorage_None01/Agility Port Qasim' }
    ]

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
                        <input placeholder='Enter no of Floors' type='number' />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Locations <span>*</span></label>
                        <input placeholder='Enter no of Locations' type='number' />
                    </div>

                    <hr />
                    <button className='submit_btn' type='submit'>Add</button>
                </div>
            </Modal.Body>
        </Modal>
    )

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
                        <Select options={options} placeholder="Select" className='react_select' styles={floorColorStyles} />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Floors <span>*</span></label>
                        <input placeholder='Enter no of Floors' type='number' />
                    </div>

                    <hr />
                    <button className='submit_btn' type='submit'>Add</button>
                </div>
            </Modal.Body>
        </Modal>
    )

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
                        <Select options={options} placeholder="Select" className='react_select' styles={floorColorStyles} />
                    </div>

                    <div className='input_field mt-3'>
                        <label>No of Locations <span>*</span></label>
                        <input placeholder='Enter no of locations' type='number' />
                    </div>

                    <hr />
                    <button className='submit_btn' type='submit'>Add</button>
                </div>
            </Modal.Body>
        </Modal>
    )

    const locDetailModal = (
        <Modal show={showDetail}
            centered onHide={() => setShowDetail(!showDetail)} size='lg' className='location_detail'>
            <Modal.Body>
                <div className='location_detail_head'>
                    <div>
                        <input disabled={!editInput}
                            autoFocus={true}
                            value={editInputValue}
                            type='text'
                            className='show_input_value'
                            onChange={(e) => setEditInputValue(e.target.value)}
                            ref={inputRef} />
                    </div>
                    <div>
                        <p> {editInput ? <span onClick={() => setEditInput(!editInput)}>Save</span> : <span onClick={() => setEditInput(true)}>Edit</span>} | <span onClick={() => setShowDetail(!showDetail)}>Close</span> </p>
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
                                <button> <img src='/images/file_download.png' alt='' /> Download</button>
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
                                LocationApi.map((c, i) => {
                                    return (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{c.sno}</td>
                                            <td>{c.sku}</td>
                                            <td>{c.pallet}</td>
                                            <td className={c.status === 'ok' ? 'ok' : 'fault'}><span>{c.status}</span></td>
                                            <td style={{ minWidth: "150px" }}><Select options={[{
                                                value: "ok", label: "ok",
                                            }, {
                                                value: "faulty", label: "Faulty",
                                            },
                                            {
                                                value: "damage", label: "Damage"
                                            }]} placeholder="Select" onChange={(value) => setShowChange(true)} className='react_select status' /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
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
                    <img src='/images/correct_icon2.png' alt='' />
                    <h2>Success!</h2>
                    <p>Location Status has been changed <br />
                        succesfully!</p>
                </div>
            </Modal.Body>
        </Modal >
    )

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
                    <p>Do you really want to change <br /> this serial no?</p>

                    <div>
                        <button onClick={() => {
                            setShowChange(!showChange)
                            setShowSuccess(true)
                        }}>Yes</button>
                        <button onClick={() => setShowChange(!showChange)}>No</button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )

    return (
        <div className='location_detail_inner'>
            {rackModal}
            {floorModal}
            {locationModal}
            {locDetailModal}
            {changeStatusModal}
            {showSuccessModal}

            <Container>
                <div className='location_breakcrumb mb-4'>
                    <Breadcrumbs list={["Warehouse", "Agility Port Qasim", "PakistanNone_01/Storage", "Air Condition"]} />
                </div>

                <Row className='mb-4' style={{ gap: "15px 0" }}>
                    <Col md={4}>
                        <div className='location_detail_box'>
                            <h6>Warehouse Info.</h6>

                            <div className='warehouse_info_detail'>
                                <img src='/images/agile_port_img.png' alt='' />

                                <div>
                                    <h6>Agility Port Qasim</h6>
                                    <p>Address: R7MX+8F4, North Western Industrial Zone Port Qasim Bin Qasim Town, Karachi.</p>
                                </div>
                            </div>

                            <div className='location_list_detail'>
                                <ul>
                                    <li> <img src='/images/location_store_icon.png' alt='' /> No of Stores </li>
                                    <li><strong>02</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_stage_icon.png' alt='' /> No of Stages </li>
                                    <li><strong>02</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_no_icon.png' alt='' /> Total Location </li>
                                    <li><strong>602</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/utilized_location_icon.png' alt='' /> Utlized Location </li>
                                    <li><strong>514</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_pallet_icon.png' alt='' /> Total Pallets </li>
                                    <li><strong>322</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/utilized_pallet_loc.png' alt='' /> Utilized Pallets </li>
                                    <li><strong>322</strong></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='location_detail_box'>
                            <h6>PakistanNone_01/Storage</h6>

                            <div className='mt-3'>
                                <Row>
                                    <Col md={6} xs={6}>
                                        <div className='location_center_boxes'>
                                            <h4>32</h4>
                                            <p>No Of <br /> Location</p>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={6}>
                                        <div className='location_center_boxes'>
                                            <h4>233</h4>
                                            <p>No Of <br /> Inventory</p>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={6}>
                                        <div className='location_center_boxes'>
                                            <h4>54</h4>
                                            <p>No Of Utilized <br /> Location</p>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={6}>
                                        <div className='location_center_boxes'>
                                            <h4>234</h4>
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

                                <div className='mt-4'>
                                    <Select options={options} placeholder="All Racks" styles={rackColorStyles} className='react_select_inhouse dc_doc' />
                                    <div>
                                        <MdFilterList onClick={() => setShowFilterBox(!showFilterBox)} />
                                    </div>
                                </div>

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
                                <div className='rack_placing'>
                                    <div style={{ position: "relative" }}>
                                        <h4>W01AA</h4>

                                        <div className='scroll_chevrons'>
                                            <FaChevronLeft onClick={() => handleScroll(-300, rackContainerRef1, setScrollPosition1)} />
                                            <FaChevronRight onClick={() => handleScroll(300, rackContainerRef1, setScrollPosition1)} />
                                        </div>
                                    </div>

                                    <div ref={rackContainerRef1} className={showFilterBox ? 'rack_box_container make_shrink' : 'rack_box_container'}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>01</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>A1</div>
                                                        <div className='rack_place' onClick={() => setShowDetail(true)}>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>02</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>B1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>03</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>C1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>04</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>D1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>05</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>E1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='rack_placing'>
                                    <div style={{ position: "relative" }}>
                                        <h4>W01AB</h4>

                                        <div className='scroll_chevrons'>
                                            <FaChevronLeft onClick={() => handleScroll(-300, rackContainerRef2, setScrollPosition2)} />
                                            <FaChevronRight onClick={() => handleScroll(300, rackContainerRef2, setScrollPosition2)} />
                                        </div>
                                    </div>

                                    <div ref={rackContainerRef2} className={showFilterBox ? 'rack_box_container make_shrink' : 'rack_box_container'}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>01</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>A1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>A9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>02</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>B1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>B9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>03</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>C1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>C9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>04</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>D1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>D9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><p>05</p></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='rack_head'>E1</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E2</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E3</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E4</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E5</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E6</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E7</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/filled_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A1</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E8</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/empty_rack.png' alt='' />
                                                            <span style={{ color: "#000" }}>W01AA01A2</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='rack_head'>E9</div>
                                                        <div className='rack_place'>
                                                            <img src='/images/faulty_rack.png' alt='' />
                                                            <span style={{ color: "#fff" }}>W01AA01A3</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
            </Container>
        </div>
    )
}
export default LocationDetail