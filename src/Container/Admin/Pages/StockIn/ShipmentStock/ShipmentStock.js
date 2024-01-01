import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { login, materialColorStyles, partColorStyles } from "../../../../../Util/Helper";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import {
    businessTypeWarehouse, bussinessTypeCustomer, generateSerialNo, getAvailLocationStockIn,
    getAvailPalletStockIn, getAvailStagesStockIn, getSerialNoExist
} from '../../../../../Redux/Action/Admin';
import { errorNotify } from '../../../../../Util/Toast';
import Loader from '../../../../../Util/Loader';

const ShipmentStock = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false)
    const [serialNo, setSerialNo] = useState(0)
    const [businessTypeId, setBusinessTypeId] = useState('')
    const [customerId, setGetCustomerId] = useState('')
    const [warehouseId, setGetWarehouseId] = useState(null)
    const [getExistSerialNo, setGetExistSerialNo] = useState([])
    const [showSterilizeData, setShowSterilizeData] = useState([])
    const [assignPallet, setAssignPallet] = useState([])
    const [selectedAvailLocations, setSelectedAvailLocations] = useState([]);
    const [noOfLoc, setNoOfLoc] = useState(1)
    const [showRack, setShowRack] = useState([])

    const handleChange = (file) => {
        setFile(file);
    };

    const { getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType)
    const { loading, getSerialization } = useSelector((state) => state.getSerialzationNumber)
    const { getBusinessCustomers } = useSelector((state) => state.getBusinessCustomerType)
    const { loading: serialLoading, getExistingSerial } = useSelector((state) => state.getExistingSerialNumber)

    const { getAvailPallet } = useSelector((state) => state.getPalletStockIn)
    const { getLoctionPallet } = useSelector((state) => state.getLocationStockIn)
    const { getStagesPallet } = useSelector((state) => state.getStagesStockIn)

    // console.log(getLoctionPallet)

    // console.log(getExistingSerial)

    useEffect(() => {
        if (getExistingSerial) {
            // const combineSerial = getExistingSerial?.partNos.concat(getExistingSerial?.serialNos);
            setGetExistSerialNo(getExistingSerial?.serialNos)
        }
    }, [getExistingSerial])

    useEffect(() => {
        if (getSerialization?.response) {
            setShow(false)
            const fileUrl = getSerialization.response;
            const fileName = "serialization.zip";

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            link.target = "_blank";

            link.click();

            dispatch({ type: "GENERATE_SERIAL_NO_RESET" })
        }
    }, [getSerialization])

    useEffect(() => {
        const formData = new FormData()
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(businessTypeWarehouse(formData))
    }, [])

    useEffect(() => {
        if (businessTypeId.length > 0 && customerId.length > 0) {

            const postData = {
                email: login.email,
                token: login.token,
                businessType: businessTypeId,
                customer: customerId
            }

            const data = JSON.stringify(postData)

            dispatch(getSerialNoExist(data))
        }
    }, [businessTypeId, customerId])

    useEffect(() => {
        if (warehouseId) {
            const formData = new FormData()
            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(getAvailPalletStockIn(formData, warehouseId))
            dispatch(getAvailLocationStockIn(formData, warehouseId))
            dispatch(getAvailStagesStockIn(formData, warehouseId))
        }
    }, [warehouseId])

    const options = [
        { value: 'invoice', label: 'Invoice' },
        { value: 'lot', label: 'Lot' },
        { value: 'po', label: 'PO' },
        { value: 'shipment', label: 'Shipment' }
    ]

    const partNoOtion = getBusinessCustomers?.response?.map((p) => {
        return {
            value: p?.partNo,
            label: `${p?.partNo} | ${p?.nomenclature} | ${p.nsn} | ${p.supplier}`
        }
    })

    const businessTypeOption = getBusinessWarehouses?.businessType?.map((b) => {
        return {
            value: b,
            label: b
        }
    })

    const warehouseOption = getBusinessWarehouses?.warehouses?.map((w) => {
        return {
            value: w.id,
            label: `${w.sgi} | ${w.name}`
        }
    })

    const getCustomerHandler = (d) => {
        const formData = new FormData()
        formData.append("email", login.email)
        formData.append("token", login.token)

        setBusinessTypeId(d.value)
        dispatch(bussinessTypeCustomer(formData, d.value))
    }

    const uniqueCustomers = Array.from(new Set(getBusinessCustomers?.response?.map(b => b?.customer)));
    const customersOptions = uniqueCustomers.map(customer => ({
        value: customer,
        label: customer
    }));

    const customerHandler = (d) => {
        setGetCustomerId(d.value)
    }

    const warehouseHandler = (w) => {
        setGetWarehouseId(w.value)
    }

    const serialModal = () => {
        setShow(true)
    }

    const serialHandler = () => {
        const formData = new FormData()
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(generateSerialNo(formData, serialNo))
    }

    const modal = <Modal centered show={show} onHide={() => setShow(false)}
        size='md' className='add_warehouse_modal'>
        <Modal.Body>
            <div className='add_warehouse_head'>
                <h5> <BsArrowLeftShort onClick={() => setShow(false)} />
                    Generate Serialization
                </h5>
            </div>

            <Row className='justify-content-end'>
                <Col md={12} className='mb-2 input_field'>
                    <label style={{ fontSize: "14px" }}>Serial Number <span>*</span> </label>
                    <input placeholder={"Enter No of Serial Number"}
                        onChange={(e) => setSerialNo(e.target.value)}
                        name='name'
                        type={'Number'}
                    />
                </Col>
                <Col md={4} className='mt-2'>
                    <button type='button' className='submit_btn' onClick={serialHandler}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Submit"}</button>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>

    const fileHandler = (e, i) => {
        if (e.target.files[0]) {
            readXlsxFile(e.target.files[0]).then((rows) => {
                const getExistingSerialNo = getExistSerialNo
                const palletData = {};
                let findError = false;
                let arrOfSameBoxId = []

                rows.slice(1).forEach(row => {

                    const palletNo = row[0];
                    const boxId = row[1].toString();

                    if (getExistingSerialNo.includes(boxId)) {
                        arrOfSameBoxId.push(boxId)
                        findError = true
                        return
                    }

                    if (!palletData[palletNo]) {
                        palletData[palletNo] = [];
                    }

                    if (!palletData[palletNo].includes(boxId)) {
                        palletData[palletNo].push(boxId);
                    }
                });

                if (findError) {
                    errorNotify("Following are the same boxId found -- " + arrOfSameBoxId.join(', '))
                    return
                }

                const currentObject = showSterilizeData[i];
                currentObject.qty = Object.keys(palletData).length;
                currentObject.palletData = palletData;

                setAssignPallet((prevData) => [...prevData, showSterilizeData[i]])
            })
        }
    }

    const searchPartHandler = (p) => {
        const findData = getBusinessCustomers?.response?.find((c) => c.partNo === p.value)
        setShowSterilizeData((prevData) => [...prevData, findData]);
    }

    const availLocHandler = (e, data) => {
        setSelectedAvailLocations((prevData) => {
            const currentObject = { ...data };
            const locationKey = e.target.value;

            const newLocation = {
                [locationKey]: [
                    {
                        store: "",  // Add actual store value
                        rack: "",   // Add actual rack value
                        location: "",  // Add actual location value
                    }
                ]
            };

            if (!currentObject.location) {
                currentObject.location = [newLocation];
            } else {
                const existingLocationIndex = currentObject.location.findIndex(loc => loc.hasOwnProperty(locationKey));

                if (existingLocationIndex !== -1) {
                    currentObject.location[existingLocationIndex][locationKey][0] = newLocation[locationKey][0];
                } else {
                    currentObject.location.push(newLocation);
                }
            }

            return [...prevData, currentObject];
        });
    };

    // console.log(businessTypeId, "business type id")
    // console.log(customerId, "customer id")
    // console.log(getExistingSerial, "existing serial No")
    // console.log(getAvailPallet)
    // console.log(getLoctionPallet, "LOC")
    // console.log(getStagesPallet, "STAGE")

    // console.log(getExistSerialNo, "GET SERIAL NO")

    // console.log(showSterilizeData)
    // console.log(selectedAvailLocations)

    const StoreArr = getLoctionPallet && Object.keys(getLoctionPallet?.response).concat(getStagesPallet?.response);

    const storeSelectHandler = (e) => {

        const data = getLoctionPallet?.response[e.target.value];

        if (data) {
            const keysArray = Object.keys(data);
            const filteredKeys = keysArray.filter(key => key.startsWith(e.target.value));
            setShowRack(filteredKeys)
            // console.log(filteredKeys)
        }

        // let finalArr = getLoctionPallet?.response?.map(obj =>
        //     Object.keys(obj[e.target.value]).map(key => key)
        // );

        // console.log(finalArr)

    }

    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Stock In (ASN)
                    <div className='create serial_generate' onClick={serialModal}>
                        <img src='/images/serial_icon.png' alt='' /> Generate Serial No</div>
                </h5>

                <Row style={{ padding: "0 20px" }} className='mt-2 align-items-center'>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Order <span>*</span></label>
                        <Select options={options} placeholder="Select" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Transactional Number <span>*</span> </label>
                        <input placeholder={"Enter PO/Invoice/Lot/Shipment No"}
                            type={'text'}
                        />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Vehicle Number <span>*</span> </label>
                        <input placeholder={"Enter Vehicle Number"}
                            type={'text'}
                        />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Receiving Date <span>*</span> </label>
                        <input placeholder={"Enter Vehicle Number"}
                            type={'Date'}
                        />
                    </Col>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Business Type <span>*</span></label>
                        <Select options={businessTypeOption} onChange={getCustomerHandler} placeholder="Select Business Type" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Warehouse <span>*</span></label>
                        <Select options={warehouseOption} onChange={warehouseHandler} placeholder="Select Warehouse" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Customer <span>*</span></label>
                        <Select options={customersOptions} onChange={customerHandler} placeholder="Select" styles={materialColorStyles} />
                    </Col>
                </Row>

                <div className='shipment_stock_main'>
                    <h6>Select Item & Upload Serialization</h6>
                </div>

                {
                    (warehouseId && customerId?.length > 0) && <>
                        <div className='shipment_stock_main'>

                            <Row className='my-2 mx-2 align-items-center'>
                                <Col md={8}>
                                    <Select options={partNoOtion} onChange={searchPartHandler} placeholder="Search Part No/Noms/NSN" styles={partColorStyles} className='react_select_inhouse stock' />
                                </Col>
                                <Col md={4}>
                                    <p className='serialization_para'>
                                        <a href='https://crms.ajcl.net/wms/document/uimSerializationTemplate.xlsx' target='_blank'>
                                            UIM Serialization Template</a> <br />
                                        <a href="https://crms.ajcl.net/wms/document/equipmentSerializationTemplate.xlsx" target='_blank'>Equipment Serialization Template</a>
                                    </p>
                                </Col>
                            </Row>

                            <Row>
                                <div className='report_summary_table stock_in_shipment'>
                                    <Table striped bordered responsive>
                                        <thead>
                                            <tr className='super_head'>
                                                <th>S.No</th>
                                                <th>Part Number</th>
                                                <th>Nomenclature</th>
                                                <th>NSN</th>
                                                <th>Sterilization</th>
                                                <th>Quantity</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                showSterilizeData?.map((s, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{s.partNo}</td>
                                                            <td>{s.nomenclature}</td>
                                                            <td>{s.nsn}</td>
                                                            <td> {serialLoading ? <Loader /> : <input type='file' types={["xlsx"]} className='sterilize' onChange={(e) => fileHandler(e, i)} />} </td>
                                                            <td>{s?.qty ? s.qty : 0}</td>
                                                            <td> <MdClose className='remove_icon' /> </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Row>

                            <h6>Assign Pallet at Warehouse</h6>

                            <Row>
                                <div className='report_summary_table stock_in_shipment'>
                                    <Table striped bordered responsive>
                                        <thead>
                                            <tr className='super_head'>
                                                <th>S.No</th>
                                                <th>Part Number</th>
                                                <th>Nomenclature</th>
                                                <th>Pallet ID</th>
                                                <th>Quantity</th>
                                                <th>Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                assignPallet?.map((data, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {Object.keys(data.palletData || {}).map((palletNo, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{data.partNo}</td>
                                                                        <td>{data.nomenclature}</td>
                                                                        <td>{palletNo}</td>
                                                                        <td>{data.palletData[palletNo].length}</td>
                                                                        <td>
                                                                            <select className='location_select' onChange={(e) => availLocHandler(e, data)}>
                                                                                <option value="">Select</option>
                                                                                {
                                                                                    getAvailPallet?.response?.map((a) => {
                                                                                        return (
                                                                                            <option value={a}>{a}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Row>

                            <h6>Assign Location at Warehouse</h6>

                            <Row>
                                <div className='report_summary_table stock_in_shipment'>
                                    <Table striped bordered responsive>
                                        <thead>
                                            <tr className='super_head'>
                                                <th>S.No</th>
                                                <th>Pallet No</th>
                                                <th>No Of Locations</th>
                                                <th>Store/Storage</th>
                                                <th>Rack</th>
                                                <th>Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedAvailLocations?.map((l, i) => {
                                                    return (
                                                        <React.Fragment>
                                                            {
                                                                l?.location.map((loc) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{Object.keys(loc)[0]}</td>
                                                                            <td style={{ width: "160px" }}>
                                                                                <div className='input_field'>
                                                                                    <input type='Number' value={noOfLoc} onChange={(e) => setNoOfLoc(e.target.value)} />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <select className='location_select' onChange={storeSelectHandler}>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        StoreArr?.map((s) => {
                                                                                            return <option value={s}>{s}</option>
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select className='location_select'>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        showRack?.map((r) => {
                                                                                            return(
                                                                                                <option value={r}>{r}</option>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select className='location_select'>
                                                                                    <option value="10001212">W01AB</option>
                                                                                    <option value="10001213">W01AC</option>
                                                                                    <option value="10001214">W01AD</option>
                                                                                    <option value="10001215">W01AE</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Row>
                        </div>

                        <Row className='file_upload_handler'>
                            <Col md={12}>
                                <FileUploader handleChange={handleChange} name="file"
                                    types={["JPG", "PNG", "GIF"]} label="Attached Stock Document" />
                                <img src='/images/stock_doc_icon.png' />
                            </Col>
                        </Row>

                        <div className='mx-3'>
                            <button className='submit_btn' type='button'>Submit</button>
                            <button className='back_btn' type='button' onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ShipmentStock
