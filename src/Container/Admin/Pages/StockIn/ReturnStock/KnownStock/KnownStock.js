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
    businessTypeWarehouse, bussinessTypeCustomer, createStockIn, createStockReturn, generateSerialNo, getAvailLocationStockIn,
    getAvailPalletStockIn, getAvailStagesStockIn, getSerialNoExist
} from '../../../../../../Redux/Action/Admin';
import { errorNotify } from '../../../../../../Util/Toast';
import Loader from '../../../../../../Util/Loader';
import { allImages } from '../../../../../../Util/Images';

const KnownStock = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState(null)
    const [show, setShow] = useState(false)
    const [stockInShow, setStockInShow] = useState(false)
    const [stockInSgi, setStockInSgi] = useState('')
    const [serialNo, setSerialNo] = useState(0)
    const [businessTypeId, setBusinessTypeId] = useState('')
    const [customerId, setGetCustomerId] = useState('')
    const [warehouseId, setGetWarehouseId] = useState(null)
    const [getExistSerialNo, setGetExistSerialNo] = useState([])
    const [showSterilizeData, setShowSterilizeData] = useState([])
    const [assignPallet, setAssignPallet] = useState([])
    const [selectedAvailLocations, setSelectedAvailLocations] = useState([]);
    const [showRack, setShowRack] = useState([])
    const [showRacks, setShowRacks] = useState([])
    const [selectedBusiness, setSelectedBusiness] = useState(null)
    const [stockInDetail, setStockInDetail] = useState({
        orderNo: '',
        transactionalNo: '',
        vehicleNo: '',
        recievingDate: new Date().toISOString().split('T')[0],
    })

    const { loading: businessLoading, getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType)
    const { loading, getSerialization } = useSelector((state) => state.getSerialzationNumber)
    const { loading: customerLoading, getBusinessCustomers } = useSelector((state) => state.getBusinessCustomerType)
    const { loading: serialLoading, getExistingSerial } = useSelector((state) => state.getExistingSerialNumber)
    const { loading: createLoading, postStockReturn } = useSelector((state) => state.postStockReturnApi)

    const { getAvailPallet } = useSelector((state) => state.getPalletStockIn)
    const { getLoctionPallet } = useSelector((state) => state.getLocationStockIn)
    const { getStagesPallet } = useSelector((state) => state.getStagesStockIn)

    useEffect(() => {
        if (postStockReturn?.response === "success") {
            setStockInShow(true)
            setStockInSgi(postStockReturn?.sgi)
            dispatch({ type: "CREATE_STOCK_IN_RESET" })
        }

        else if (postStockReturn?.response === "noAccess") {
            errorNotify(postStockReturn?.response)
            dispatch({ type: "CREATE_STOCK_IN_RESET" })
        }
    }, [postStockReturn])

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
            label: `${w.name}`
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
                const palletData = {};
                let findError = false;
                let arrOfSameBoxId = [];
                let emptyError = false

                if (s?.type === 'UIM') {
                    if (rows[0]?.length === 3) {

                        let fieldError = false
                        rows[0]?.map((r) => {
                            let mustFields = ["palletNo", "boxId", "status"]
                            if (!mustFields.includes(r)) {
                                fieldError = true
                            }
                        })

                        if (fieldError) {
                            errorNotify("Invalid File")
                            e.target.value = '';
                            return
                        }

                        rows.slice(1).forEach((row, rowIndex) => {
                            const palletNo = row[0];
                            const boxId = row[1].toString();
                            const status = row[2];

                            if (!palletNo || !boxId || !status) {
                                e.target.value = ''
                                emptyError = true;
                                return;
                            }
                            else {
                                if (!getExistSerialNo.includes(boxId)) {
                                    arrOfSameBoxId.push(boxId);
                                    findError = true;
                                    return;
                                }

                                if (!palletData[palletNo]) {
                                    palletData[palletNo] = [];
                                }

                                if (!palletData[palletNo].includes(boxId)) {
                                    palletData[palletNo].push({
                                        boxId,
                                        status
                                    });
                                }
                            }
                        });

                    } else {
                        e.target.value = '';
                        errorNotify("Invalid File Type");
                        return;
                    }
                }
                else {

                    let fieldError = false
                    rows[0]?.map((r) => {
                        let mustFields = ["serialNo", "status"]
                        if (!mustFields.includes(r)) {
                            fieldError = true
                        }
                    })

                    if (fieldError) {
                        errorNotify("Invalid File")
                        e.target.value = '';
                        return
                    }

                    if (rows[0]?.length === 2) {
                        rows.slice(1).forEach((row, rowIndex) => {
                            const palletNo = row[0];
                            const boxId = row[0] && row[0]?.toString();
                            const status = row[1];

                            if (!palletNo || !boxId || !status) {
                                e.target.value = ''
                                emptyError = true;
                                return;
                            }
                            else {
                                if (!getExistSerialNo.includes(boxId)) {
                                    arrOfSameBoxId.push(boxId);
                                    findError = true;
                                    return;
                                }

                                if (!palletData[palletNo]) {
                                    palletData[palletNo] = [];
                                }

                                if (!palletData[palletNo].includes(boxId)) {
                                    palletData[palletNo].push({
                                        boxId,
                                        status
                                    });
                                }
                            }
                        });
                    } else {
                        e.target.value = '';
                        errorNotify("Invalid File Type");
                        return;
                    }
                }

                if (emptyError) {
                    errorNotify("Invalid File!")
                    return;
                }

                if (!findError) {
                    const uniqueBoxIds = Array.from(new Set(Object.values(palletData).flatMap(items => items.map(item => item.boxId))));
                    setGetExistSerialNo((prevData) => [...prevData, ...uniqueBoxIds]);

                    const updatedShowSterilizeData = [...showSterilizeData];
                    updatedShowSterilizeData[i] = {
                        ...currentObject,
                        fileName: fileName,
                        qty: Object.keys(palletData).length,
                        palletData: palletData
                    };
                    setShowSterilizeData(updatedShowSterilizeData);

                } else {
                    errorNotify("Following are the different boxId found -- " + arrOfSameBoxId.join(', '));
                    e.target.value = '';
                    return;
                }

                currentObject.qty = Object.keys(palletData).length;
                currentObject.palletData = palletData;

                setAssignPallet((prevData) => [...prevData, { ...showSterilizeData[i], ...currentObject }]);
            });
        }
    }

    const searchPartHandler = (p) => {
        const findData = getBusinessCustomers?.response?.find((c) => c.partNo === p.value)
        setShowSterilizeData((prevData) => [...prevData, findData]);

        setSelectedBusiness(null)
    }

    const availLocHandler = (e, data, assignPalletIndex, locationIndex, palletNo) => {

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
                        ],
                        pallet: palletNo
                    });
                } else {
                    e.target.value = ''
                    // existingLocation[existingLocationIndex][e.target.value][0] = {
                    //     store: "",
                    //     rack: "",
                    //     location: "",
                    // };
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
                        ],
                        pallet: palletNo
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
            if (key !== 'pallet' && Object.hasOwnProperty.call(currentObject, key)) {
                uniquePallet = key;
                currentObject[key][0].store = e.target.value;
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
        else {
            updatedRowOptions[uniquePallet] = {
                ...updatedRowOptions[uniquePallet],
                store: StoreArr,
                rack: [],
                location: []
            }
        }

        setShowRacks(updatedRowOptions)
    };

    const rackSelectHandler = (e, currentIndex, locationData, loctionIndex) => {

        let uniquePallet;

        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            if (key !== 'pallet' && Object.hasOwnProperty.call(currentObject, key)) {
                uniquePallet = key
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

            setShowRacks(updatedRowOptions)
        }
    }

    const locSelectHandler = (e, currentIndex, locationData, loctionIndex, name, noOfLoc) => {
        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            if (key !== 'pallet' && Object.hasOwnProperty.call(currentObject, key)) {
                currentObject[key][0][name] = e.target.value,
                    !noOfLoc && (currentObject[key][0].noOfLoc = 1)
            }
        }
    }

    const handleInputChange = (e, currentIndex, locationData, loctionIndex) => {
        const value = parseInt(e.target.value, 10);

        const updatedRowOptions = [...showRacks];

        let uniquePallet;
        const currentObject = locationData.location[currentIndex];

        for (const key in currentObject) {
            if (key !== 'pallet' && Object.hasOwnProperty.call(currentObject, key)) {
                uniquePallet = key
                currentObject[key][0].noOfLoc = value > 0 ? Math.min(value, 10) : 1
            }
        }

        updatedRowOptions[uniquePallet] = {
            ...updatedRowOptions[uniquePallet],
            noOfLoc: value > 0 ? Math.min(value, 10) : 1,
        };

        setShowRacks(updatedRowOptions)
    };

    const imageFileHandler = (e) => {
        if (e.size > 31457280) {
            errorNotify("File size must be less than 30MB");
            return;
        }
        const file = e;
        if (file) {
            const fileType = file.name.split('.')
            setFormat(fileType[fileType.length - 1])
            setFile(file)
        }
    }

    const submitStockInHandler = () => {
        const transformedFinalData = transformFinalData(selectedAvailLocations);

        const finalData = {
            ...transformedFinalData,
            receivingDate: stockInDetail.recievingDate,
            order: stockInDetail.orderNo.value,
            shipmentNumber: stockInDetail.transactionalNo,
            truckNumber: stockInDetail.vehicleNo,
            businessTypes: businessTypeId,
            warehouse: warehouseId,
            customer: customerId,
            user: login.email,
            email: login.email,
            token: login.token
        }

        if (!finalData.order || finalData.truckNumber.length === 0 || finalData.shipmentNumber.length === 0 ||
            finalData.selectedItems?.length === 0 || Object.keys(finalData.stockInItemStatus).length === 0 ||
            Object.keys(finalData.selectedItemsType).length === 0 || Object.keys(finalData.selectedPallotsStockIn).length === 0
            || Object.keys(finalData.selectedSerialNos).length === 0 || Object.keys(finalData.stockInItemStatus).length === 0
            || Object.keys(finalData.storage).length === 0) {
            errorNotify("Please filled up all fields")
            return;
        }

        if (!file) {
            errorNotify("upload file")
            return;
        }

        const formData = new FormData();

        formData.append("selectedItems", JSON.stringify(transformedFinalData.selectedItems))
        formData.append("selectedItemsType", JSON.stringify(transformedFinalData.selectedItemsType))
        formData.append("selectedPallotsStockIn", JSON.stringify(transformedFinalData.selectedPallotsStockIn))
        formData.append("selectedSerialNos", JSON.stringify(transformedFinalData.selectedSerialNos))
        formData.append("stockInItemStatus", JSON.stringify(transformedFinalData.stockInItemStatus))
        formData.append("storage", JSON.stringify(transformedFinalData.storage))

        formData.append("receivingDate", stockInDetail.recievingDate)
        formData.append("order", stockInDetail.orderNo.value)
        formData.append("shipmentNumber", stockInDetail.transactionalNo)
        formData.append("truckNumber", stockInDetail.vehicleNo)
        formData.append("businessTypes", businessTypeId)
        formData.append("warehouse", warehouseId)
        formData.append("customer", customerId)
        formData.append("user", login.email)
        formData.append("email", login.email)
        formData.append("token", login.token)
        formData.append("documentFormat", format)
        formData.append("document", file)

        // let d = JSON.stringify(finalData)
        dispatch(createStockReturn(formData))

    }

    const transformFinalData = (finalData) => {

        let selectedItems = [];
        let selectedItemsType = {};
        let selectedSerialNos = {};
        let stockInItemStatus = {};
        let selectedPallotsStockIn = {};
        let storage = {}

        finalData?.map((indData, indexNum) => {
            const { data, location } = indData;

            selectedItems.push(data.id.toString())
            selectedItemsType[data.id.toString()] = data.type;

            selectedSerialNos[data.id.toString()] = {};

            for (let key in data.palletData) {
                const palletId = key;
                selectedSerialNos[data.id.toString()][palletId] = data.palletData[key].map(item => item.boxId);
            }

            // selectedSerialNos[data.id.toString()] = [];

            // for (let key in data.palletData) {
            //     selectedSerialNos[data.id.toString()].push(...data.palletData[key].map(item => item.boxId));
            // }

            for (let key in data.palletData) {
                data.palletData[key].forEach(item => {
                    stockInItemStatus[item.boxId] = item.status;
                });
            }

            location.forEach((entry) => {
                const palletKey = entry.pallet;
                for (let key in entry) {
                    if (key !== 'pallet' && Object.hasOwnProperty.call(entry, key)) {
                        selectedPallotsStockIn[palletKey] = key;
                    }
                }
            });

            location.forEach((entry) => {
                for (let key in entry) {
                    if (key !== 'pallet') {
                        entry[key].forEach((item, index) => {
                            const locationQtyKey = `locationQty${key}`;
                            const rackKey = `rack${key}`;
                            const storeKey = `store${key}`;

                            if (item.noOfLoc) {
                                for (let i = 1; i <= item.noOfLoc; i++) {
                                    const locationKey = `${i}location${key}`;
                                    item[`${i}location`] && (storage[locationKey] = item[`${i}location`]);
                                }
                            }

                            item.noOfLoc && (storage[locationQtyKey] = item.noOfLoc.toString())
                            item.rack.length > 0 && (storage[rackKey] = item.rack)
                            storage[storeKey] = item.store;
                        });
                    }
                }
            });
        })

        selectedItemsType.length = 0;

        return {
            selectedItems,
            selectedItemsType,
            selectedPallotsStockIn,
            selectedSerialNos,
            stockInItemStatus,
            storage
        };
    };

    const removePalletHandler = (data, index) => {
        const afterDeleteData = showSterilizeData.filter((s) => s.id !== data.id)
        const afterPalletData = assignPallet.filter((s) => s.id !== data.id)
        const afterLocData = selectedAvailLocations.filter((s) => s.data.id !== data.id)
        setShowSterilizeData(afterDeleteData)
        setAssignPallet(afterPalletData)
        setSelectedAvailLocations(afterLocData)

    }

    const modal2 = <Modal centered show={stockInShow} onHide={() => navigate('/wms/dashboard')} className='success' style={{ backgroundColor: '#00000040' }}>
        <Modal.Body>
            <MdClose className='close_btn' onClick={() => navigate('/wms/dashboard')} />

            <div>
                <img src={allImages.correct_icon} alt='' />
                <h2 style={{ textAlign: "center" }}>Returned Stock Stored Successfully!</h2>
                <p>Transtional ID is <span>{stockInSgi}</span></p>
            </div>
        </Modal.Body>
    </Modal>

    let count = 0
    let count2 = 0
    return (
        <div>
            {modal}
            {modal2}
            <Breadcrumbs list={["Dashboard", "Stock In"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Known Stock
                    <div className='create serial_generate' onClick={serialModal}>
                        <img src={allImages.serial_icon} alt='' /> Generate Serial No</div>
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
                        <label className='react_select_label'>Company <span>*</span></label>
                        <Select isLoading={businessLoading} options={businessTypeOption} onChange={getCustomerHandler} placeholder="Select Company" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Warehouse <span>*</span></label>
                        <Select isLoading={businessLoading} options={warehouseOption} onChange={warehouseHandler} placeholder="Select Warehouse" styles={materialColorStyles} />
                    </Col>
                    <Col md={5} className='mt-2'>
                        <label className='react_select_label'>Customer <span>*</span></label>
                        <Select isLoading={customerLoading} options={customersOptions} onChange={customerHandler} placeholder="Select" styles={materialColorStyles} />
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
                                    <Select isLoading={customerLoading} options={partNoOtion} onChange={searchPartHandler} value={selectedBusiness} placeholder="Search Part No/Noms/NSN" styles={partColorStyles} className='react_select_inhouse stock' />
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
                                                            <td key={`fileInput-${i}`}> {serialLoading ? <Loader /> : s.fileName ? <span style={{ color: "#0d6efd", fontWeight: "500" }}>{s.fileName}</span> : <input type='file' types={["xlsx"]} className='sterilize' onChange={(e) => fileHandler(e, s, i)} />} </td>
                                                            <td>{s?.qty ? s.qty : 0}</td>
                                                            <td> <MdClose className='remove_icon' onClick={() => removePalletHandler(s, i)} /> </td>
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
                                                                        <td>{count += 1}</td>
                                                                        <td>{data.partNo}</td>
                                                                        <td>{data.nomenclature}</td>
                                                                        <td>{palletNo}</td>
                                                                        <td>{data.palletData[palletNo].length}</td>
                                                                        <td key={`locationSelect-${i}`}>
                                                                            <select className='location_select' onChange={(e) => availLocHandler(e, data, index, i, palletNo)}>
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

                                                                    return (
                                                                        <tr key={`locationRow-${j}`}>
                                                                            <td>{count2 += 1}</td>
                                                                            <td>{Object.keys(loc)[0]}</td>
                                                                            <td style={{ width: "160px" }}>
                                                                                <div className='input_field'>
                                                                                    <input type='Number' defaultValue={1} onChange={(e) => handleInputChange(e, j, l, i)} />
                                                                                </div>
                                                                            </td>
                                                                            <td style={{ width: "230px" }}>
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
                                                                            <td style={{ width: "230px" }}>
                                                                                <select disabled={rowOption?.rack?.length > 0 ? false : true} className='location_select' onChange={(e) => rackSelectHandler(e, j, l, i)}>
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
                                                                            <td style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px 0", width: "230px" }}>
                                                                                {Array.from({ length: rowOption?.noOfLoc ? rowOption.noOfLoc : 1 }).map((_, index) => (
                                                                                    <select disabled={rowOption?.rack?.length > 0 ? false : true} key={index} className='location_select' onChange={(e) => locSelectHandler(e, j, l, i, `${index + 1}location`, rowOption.noOfLoc)}>
                                                                                        <option value="">Select</option>
                                                                                        {
                                                                                            rowOption?.location?.map((l) => {
                                                                                                return (
                                                                                                    <option value={l.loc} key={l.loc}
                                                                                                        style={l.status === "faulty" ? { backgroundColor: "#ffabab" } :
                                                                                                            l.status === "filled" ? { backgroundColor: "aqua" } :
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
                                <FileUploader handleChange={imageFileHandler} name="file"
                                    label="Attached Stock Document" />
                                <img src={allImages.stock_doc_icon} />
                            </Col>
                        </Row>

                        <div className='mx-3'>
                            <button className='submit_btn' type='button' onClick={submitStockInHandler} disabled={createLoading}> {createLoading ? <Spinner animation='border' size='sm' /> : 'Submit'} </button>
                            <button className='back_btn' type='button' onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default KnownStock