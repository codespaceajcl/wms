import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Breadcrumbs from '../../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { login, materialColorStyles, partColorStyles } from "../../../../../../Util/Helper";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';
import {
    businessTypeWarehouse, bussinessTypeCustomer, generateSerialNo, getAvailLocationStockIn,
    getAvailPalletStockIn, getAvailStagesStockIn, getSerialNoExist
} from '../../../../../../Redux/Action/Admin';
import { errorNotify } from '../../../../../../Util/Toast';
import Loader from '../../../../../../Util/Loader';

const UnknownStock = () => {
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
    const [showRacks, setShowRacks] = useState([])
    // const [showLoc, setShowLoc] = useState([])
    const [selectedBusiness, setSelectedBusiness] = useState(null)
    const [stockInDetail, setStockInDetail] = useState({
        orderNo: '',
        transactionalNo: '',
        vehicleNo: '',
        recievingDate: new Date().toISOString().split('T')[0],
    })

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const { getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType)
    const { loading, getSerialization } = useSelector((state) => state.getSerialzationNumber)
    const { getBusinessCustomers } = useSelector((state) => state.getBusinessCustomerType)
    const { loading: serialLoading, getExistingSerial } = useSelector((state) => state.getExistingSerialNumber)

    const { getAvailPallet } = useSelector((state) => state.getPalletStockIn)
    const { getLoctionPallet } = useSelector((state) => state.getLocationStockIn)
    const { getStagesPallet } = useSelector((state) => state.getStagesStockIn)


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

    const fileHandler = (e, s, i) => {
        if (e.target.files[0]) {
            const filePath = e.target.value;
            const fileName = filePath.match(/[^\\]*$/)[0];
            const currentObject = showSterilizeData[i];

            readXlsxFile(e.target.files[0]).then((rows, indexs) => {
                const getExistingSerialNo = getExistSerialNo
                const palletData = {};
                s["fileName"] = fileName
                let findError = false;
                let arrOfSameBoxId = [];

                if (s?.type === 'UIM') {
                    if (rows[0]?.length === 3) {
                        rows.slice(1).forEach((row, rowIndex) => {

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
                                setGetExistSerialNo((prevData) => [...prevData, boxId])
                                palletData[palletNo].push(boxId);
                                arrOfSameBoxId = []
                            }
                        });
                    }
                    else {
                        e.target.value = ''
                        errorNotify("Invalid File Type")
                        return
                    }
                }
                else {
                    if (rows[0]?.length === 2) {
                        rows.slice(1).forEach((row, rowIndex) => {

                            const palletNo = row[0];
                            const boxId = row[0].toString();

                            if (getExistingSerialNo.includes(boxId)) {
                                arrOfSameBoxId.push(boxId)
                                findError = true
                                return
                            }

                            if (!palletData[palletNo]) {
                                palletData[palletNo] = [];
                            }

                            if (!palletData[palletNo].includes(boxId)) {
                                setGetExistSerialNo((prevData) => [...prevData, boxId])
                                palletData[palletNo].push(boxId);
                                arrOfSameBoxId = []
                            }
                        });
                    }
                    else {
                        e.target.value = ''
                        errorNotify("Invalid File Type")
                        return
                    }
                }

                if (findError) {
                    errorNotify("Following are the same boxId found -- " + arrOfSameBoxId.join(', '))
                    e.target.value = ''
                    return
                }

                currentObject.qty = Object.keys(palletData).length;
                currentObject.palletData = palletData;

                setAssignPallet((prevData) => [...prevData, { ...showSterilizeData[i], ...currentObject }]);
                // setAssignPallet((prevData) => [...prevData, showSterilizeData[i]])
            })
        }
    }

    const searchPartHandler = (p) => {
        const findData = getBusinessCustomers?.response?.find((c) => c.partNo === p.value)
        setShowSterilizeData((prevData) => [...prevData, findData]);

        setSelectedBusiness(null)
    }

    const availLocHandler = (e, data, assignPalletIndex, locationIndex) => {
        setSelectedAvailLocations((prevData) => {

            const newData = [...prevData];
            const existingLocation = newData[assignPalletIndex]?.location;

            if (existingLocation) {
                const existingLocationIndex = existingLocation.findIndex(loc => loc.hasOwnProperty(e.target.value));

                if (existingLocationIndex === -1) {
                    existingLocation.push({
                        [e.target.value]: [
                            {
                                store: "",
                                rack: "",
                                location: "",
                            }
                        ]
                    });
                } else {
                    existingLocation[existingLocationIndex][e.target.value][0] = {
                        store: "",
                        rack: "",
                        location: "",
                    };
                }
            }
            else {
                newData[assignPalletIndex] = {
                    ...newData[assignPalletIndex],
                    location: [{
                        [e.target.value]: [
                            {
                                store: "",
                                rack: "",
                                location: "",
                            }
                        ]
                    }],
                    data: data
                };
            }

            return newData;
        });
    };

    const StoreArr = getLoctionPallet && Object.keys(getLoctionPallet?.response).concat(getStagesPallet?.response);

    const storeSelectHandler = (e, currentIndex, locationData, loctionIndex) => {

        const updatedRowOptions = [...showRacks];

        let uniquePallet;

        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            uniquePallet = key
            if (Object.hasOwnProperty.call(currentObject, key)) {
                currentObject[key][0].store = e.target.value
            }
        }

        const data = getLoctionPallet?.response[e.target.value];

        if (data) {
            const keysArray = Object.keys(data);
            const filteredKeys = keysArray.filter(key => key.startsWith(e.target.value));

            updatedRowOptions[uniquePallet] = {
                ...updatedRowOptions[uniquePallet],
                store: StoreArr,
                rack: filteredKeys
            }

            setShowRack(filteredKeys);
        }

        setShowRacks(updatedRowOptions)
    };

    const rackSelectHandler = (e, currentIndex, locationData, loctionIndex) => {

        let uniquePallet;

        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            uniquePallet = key
            if (Object.hasOwnProperty.call(currentObject, key)) {
                currentObject[key][0].rack = e.target.value
            }
        }

        const selectedPrefix = e.target.value;
        const locationDetails = getLoctionPallet?.locationDetails;

        if (locationDetails) {
            const finalData = Object.keys(locationDetails)
                .filter(key => key.startsWith(selectedPrefix))
                .map(key => ({
                    loc: key,
                    status: locationDetails[key].status
                }));

            const updatedRowOptions = [...showRacks];

            updatedRowOptions[uniquePallet] = {
                ...updatedRowOptions[uniquePallet],
                rack: showRack,
                location: finalData
            }

            // setShowLoc(finalData);
            setShowRacks(updatedRowOptions)
        }
    }

    const locSelectHandler = (e, currentIndex, locationData, loctionIndex, name) => {
        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            if (Object.hasOwnProperty.call(currentObject, key)) {
                currentObject[key][0][name] = e.target.value
            }
        }
    }

    const handleInputChange = (e, currentIndex, locationData, loctionIndex) => {
        const value = parseInt(e.target.value, 10);

        const updatedRowOptions = [...showRacks];

        let uniquePallet;
        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            uniquePallet = key
            if (Object.hasOwnProperty.call(currentObject, key)) {
                currentObject[key][0].noOfLoc = value > 0 ? Math.min(value, 10) : 1
            }
        }


        updatedRowOptions[uniquePallet] = {
            ...updatedRowOptions[uniquePallet],
            noOfLoc: value > 0 ? Math.min(value, 10) : 1,
        };

        setNoOfLoc(value > 0 ? Math.min(value, 10) : 1);
        setShowRacks(updatedRowOptions)
    };

    const submitStockInHandler = () => {
        console.log(selectedAvailLocations)
        console.log(businessTypeId)
        console.log(customerId)
        console.log(warehouseId)
    }

    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> UnKnown Stock
                    <div className='create serial_generate' onClick={serialModal}>
                        <img src='/images/serial_icon.png' alt='' /> Generate Serial No</div>
                </h5>

                <Row style={{ padding: "0 20px" }} className='mt-2 align-items-center'>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Order <span>*</span></label>
                        <Select options={options} value={stockInDetail.orderNo} onChange={(d) => setStockInDetail({
                            ...stockInDetail,
                            orderNo: d
                        })} placeholder="Select" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Transactional Number <span>*</span> </label>
                        <input placeholder={"Enter PO/Invoice/Lot/Shipment No"}
                            type={'text'}
                            value={stockInDetail.transactionalNo} onChange={(e) => setStockInDetail({
                                ...stockInDetail,
                                transactionalNo: e.target.value
                            })}
                        />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Vehicle Number <span>*</span> </label>
                        <input placeholder={"Enter Vehicle Number"}
                            type={'text'}
                            value={stockInDetail.vehicleNo} onChange={(e) => setStockInDetail({
                                ...stockInDetail,
                                vehicleNo: e.target.value
                            })}
                        />
                    </Col>
                    <Col md={5} className='mt-2 input_field'>
                        <label> Receiving Date <span>*</span> </label>
                        <input placeholder={"Enter Vehicle Number"}
                            type={'Date'}
                            value={stockInDetail.recievingDate} onChange={(e) => setStockInDetail({
                                ...stockInDetail,
                                recievingDate: e.target.value
                            })}
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
                                    <Select options={partNoOtion} onChange={searchPartHandler} value={selectedBusiness} placeholder="Search Part No/Noms/NSN" styles={partColorStyles} className='react_select_inhouse stock' />
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
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{s.partNo}</td>
                                                            <td>{s.nomenclature}</td>
                                                            <td>{s.nsn}</td>
                                                            <td key={`fileInput-${i}`}> {serialLoading ? <Loader /> : s.partName ? <span>{s.partName}</span> : <input type='file' types={["xlsx"]} className='sterilize' onChange={(e) => fileHandler(e, s, i)} />} </td>
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
                                                        <React.Fragment key={`assignPallet-${index}`}>
                                                            {Object.keys(data.palletData || {}).map((palletNo, i) => {
                                                                return (
                                                                    <tr key={`assignPalletRow-${i}`}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{data.partNo}</td>
                                                                        <td>{data.nomenclature}</td>
                                                                        <td>{palletNo}</td>
                                                                        <td>{data.palletData[palletNo].length}</td>
                                                                        <td key={`locationSelect-${i}`}>
                                                                            <select className='location_select' onChange={(e) => availLocHandler(e, data, index, i)}>
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
                                                selectedAvailLocations && selectedAvailLocations?.map((l, i) => {

                                                    return (
                                                        <React.Fragment key={`selectedAvailLocations-${i}`}>
                                                            {
                                                                l?.location.map((loc, j) => {
                                                                    const rowOption = showRacks[Object.keys(loc)[0]] || {};
                                                                    console.log(rowOption)

                                                                    return (
                                                                        <tr key={`locationRow-${j}`}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{Object.keys(loc)[0]}</td>
                                                                            <td style={{ width: "160px" }}>
                                                                                <div className='input_field'>
                                                                                    <input type='Number' defaultValue={1} onChange={(e) => handleInputChange(e, j, l, i)} />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <select className='location_select' onChange={(e) => storeSelectHandler(e, j, l, i)}>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        rowOption?.store ? rowOption?.store?.map((s) => {
                                                                                            return <option value={s} key={s}>{s}</option>
                                                                                        }) :
                                                                                            StoreArr?.map((s) => {
                                                                                                return <option value={s} key={s}>{s}</option>
                                                                                            })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select className='location_select' onChange={(e) => rackSelectHandler(e, j, l, i)}>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        rowOption?.rack?.map((r) => {
                                                                                            return (
                                                                                                <option value={r} key={r}>{r}</option>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </td>
                                                                            <td style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px 0" }}>
                                                                                {Array.from({ length: rowOption?.noOfLoc ? rowOption.noOfLoc : 1 }).map((_, index) => (
                                                                                    <select key={index} className='location_select' onChange={(e) => locSelectHandler(e, j, l, i, `location${index}`)}>
                                                                                        <option value="">Select</option>
                                                                                        {
                                                                                            rowOption?.location?.map((l) => {
                                                                                                return (
                                                                                                    <option value={l.loc} key={l.loc}
                                                                                                        style={l.status === "faulty" ? { backgroundColor: "#ffabab" } :
                                                                                                            { backgroundColor: "#95D6A4" }}>{l.loc}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select>
                                                                                ))}
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
                            <button className='submit_btn' type='button' onClick={submitStockInHandler}>Submit</button>
                            <button className='back_btn' type='button' onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default UnknownStock
