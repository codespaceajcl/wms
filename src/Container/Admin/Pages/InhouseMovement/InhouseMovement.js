import React, { useEffect, useState, useRef } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import Select from 'react-select';
import { partColorStyles, materialColorStyles, login } from "../../../../Util/Helper";
import './InhouseMovement.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePalletMovement, getAllPalletInhouseMovement, getAllWarehousesInhouseMovement } from '../../../../Redux/Action/Admin';
import Loader from '../../../../Util/Loader';
import { successNotify } from '../../../../Util/Toast';
import { usePDF } from 'react-to-pdf';

const InhouseMovement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const parentRef = useRef(null);
    const { toPDF, targetRef } = usePDF({ filename: 'inhouseMovement.pdf' });

    const [show, setShow] = useState(false)
    const [warehouseName, setWarehouseName] = useState('')
    const [rackOption, setRackOption] = useState([])
    const [locationOption, setLocationOption] = useState([])
    const [getPalletId, setGetPalletId] = useState('')
    const [warehouseId, setWarehouseId] = useState('')
    const [showDownload, setShowDownload] = useState(false)
    const [rowOptions, setRowOptions] = useState([]);
    const [inhouseChange, setInhouseChange] = useState({
        store: "",
        rack: "",
        location: ""
    })
    const [changeStage, setChangeStage] = useState({})

    const tableHead = ["S.No", "Pallet No", "Current Location", "Store", "Rack", "Location"]

    const { loading: warehouseLoading, getWarehouseMovementData } = useSelector((state) => state.getWarehousesInhouse)
    const { loading, getPalletsMovementData } = useSelector((state) => state.getPalletsInhouse)
    const { loading: saveLoading, palletSaveData } = useSelector((state) => state.palletChange)

    useEffect(() => {
        if (palletSaveData?.response === "success") {
            successNotify("Pallot change successfully!")
            dispatch({ type: "CHANGE_PALLET_MOVEMENT_RESET" })

            setInhouseChange({
                store: "",
                rack: "",
                location: ""
            })

            setChangeStage({})
            setRowOptions([])

            const formData = new FormData();
            formData.append("email", login.email)
            formData.append("token", login.token)

            dispatch(getAllPalletInhouseMovement(formData, warehouseId))
        }
    }, [palletSaveData])

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(getAllWarehousesInhouseMovement(formData))

        return () => {
            dispatch({ type: "GET_ALL_PALLET_INHOUSE_MOVEMENT_RESET" })
        }
    }, [])

    const handleClickOutside = (event) => {
        if (parentRef.current && !parentRef.current.contains(event.target)) {
            setShowDownload(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const options = getWarehouseMovementData?.response?.map((m) => {
        return {
            value: m.id,
            label: m.name
        }
    })

    const selectInhouseHandler = (data) => {
        setWarehouseName(data.label)
        setWarehouseId(data.value)

        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(getAllPalletInhouseMovement(formData, data.value))
    }

    const storeData = getPalletsMovementData?.stores?.map((p) => {
        return {
            value: p.sgi, label: p.sgi
        }
    })

    const stageData = getPalletsMovementData?.stages?.map((p) => {
        return {
            value: p.sgi, label: p.sgi
        }
    })

    const storeOption = storeData?.concat(stageData);

    const handleStoreChange = (data, c) => {
        const hasStage = data.value.includes("STAGE")

        const updatedRowOptions = [...rowOptions];

        if (hasStage) {
            setChangeStage({
                ...changeStage,
                [c.id]: hasStage
            })
            setGetPalletId(c.id)
            setInhouseChange({
                ...inhouseChange,
                store: data.value
            })
        }
        else {
            setChangeStage({
                ...changeStage,
                [c.id]: false
            })
            setInhouseChange({
                ...inhouseChange,
                store: data.value
            })

            const findRack = getPalletsMovementData?.racks?.filter((r) => r.store === data.value);
            const rackFilter = findRack?.map((r) => {
                return {
                    value: r.sgi,
                    label: r.sgi,
                };
            });

            updatedRowOptions[c.id] = {
                ...updatedRowOptions[c.id],
                storeOptions: storeOption,
                rackOptions: rackFilter,
            };

            setRackOption(rackFilter)
        }

        setRowOptions(updatedRowOptions);
    };

    const handleRackChange = (data, c) => {
        setInhouseChange({
            ...inhouseChange,
            rack: data.value
        })
        const findLoc = getPalletsMovementData?.locations?.filter((r) => r.rack === data.value)
        const locationDetails = getPalletsMovementData?.locationDetails

        const finalData = findLoc.map((item) => ({
            value: item.sgi,
            label: `${item.sgi} | ${locationDetails[item.sgi]?.tag}`,
        })) || [];

        const updatedRowOptions = [...rowOptions];
        updatedRowOptions[c.id] = {
            ...updatedRowOptions[c.id],
            rackOptions: rackOption,
            locationOptions: finalData,
        };

        setLocationOption(finalData)
        setRowOptions(updatedRowOptions);
    }

    const handleLocationChange = (data, c) => {
        setGetPalletId(c.id)
        setInhouseChange({
            ...inhouseChange,
            location: data.value
        })
    }

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'white', borderRadius: "8px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
            borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3',
            '&:hover': {
                borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#bec0c3',
            },
        }),
        option: (provided, state) => {
            const locationDetails = getPalletsMovementData?.locationDetails
            return ({
                ...provided,
                background: locationDetails[state.value]?.status === 'faulty' ? '#ffabab' : '#95D6A4',
                fontSize: "13px"

            })
        }
    };

    const saveChangeHandler = () => {

        if (!changeStage) {

            const data = {
                warehouse: warehouseId,
                pallot: getPalletId,
                store: inhouseChange.store,
                rack: inhouseChange.rack,
                location: inhouseChange.location,
                email: login.email,
                token: login.token
            }

            let findData = JSON.stringify(data)
            dispatch(changePalletMovement(findData))
        }
        else {
            const data = {
                warehouse: warehouseId,
                pallot: getPalletId,
                location: inhouseChange.store,
                email: login.email,
                token: login.token
            }

            let findData = JSON.stringify(data)
            dispatch(changePalletMovement(findData))
        }

    }

    const handleDownload = () => {
        const headers = ['No', 'Pallot No', 'Current Location', 'Store', 'Rack', 'Location']; // Adjust headers as needed
        const rows = getPalletsMovementData?.response?.map((c, i) => {
            const rowOption = rowOptions[c.id] || {};
            const isChangeStage = changeStage[c.id] || null;

            return [
                i + 1,
                c.pallotNo,
                c.location,
                rowOption.storeOptions || '',
                !isChangeStage ? rowOption.rackOptions || '' : '',
                !isChangeStage ? rowOption.locationOptions || '' : '',
            ];
        });

        const csvContent = `${headers.join(',')}\n${rows.map(row => row.join(',')).join('\n')}`;

        const blob = new Blob([csvContent], { type: 'text/csv' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'inhouseMovementReport.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <Breadcrumbs list={["Dashboard", "Inhouse Movement"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
                    Inhouse Movement

                    {
                        getPalletsMovementData?.response?.length > 0 ?
                            <div className='create' ref={parentRef}>
                                <span onClick={() => setShowDownload(!showDownload)}><AiOutlinePlus style={{ fontSize: "20px" }} /> Download Report
                                </span>
                                {
                                    showDownload && <div className='filter_div' style={{ minWidth: "180px" }}>
                                        <div className='checkbox_div' onClick={handleDownload} style={{ display: "block" }}>
                                            <label style={{ cursor: "pointer" }} s>Download as CSV</label>
                                        </div>
                                        <div className='checkbox_div' onClick={() => toPDF()} style={{ display: "block" }}>
                                            <label style={{ cursor: "pointer" }}>Download as PDF</label>
                                        </div>
                                    </div>
                                }
                            </div> :
                            <div className='create'>
                                <AiOutlinePlus style={{ fontSize: "20px" }} /> Download Report</div>
                    }
                </h5>

                <Row className='mt-5'>
                    <Col md={12}>
                        <Select isLoading={warehouseLoading} styles={partColorStyles} options={options} placeholder="Select Inhouse Movement" className='react_select_inhouse'
                            onChange={selectInhouseHandler} />
                    </Col>
                </Row>
                {
                    loading ? <Loader /> :
                        <div className='consignee_table inhouse'>
                            {
                                getPalletsMovementData?.response?.length > 0 ? <div ref={targetRef}>
                                    <div className='select_inhouse_table'>
                                        <h6>{warehouseName}</h6>

                                        {
                                            Object.values(changeStage)[0] === false ? <>
                                                {
                                                    (inhouseChange?.store.length > 0 && inhouseChange?.rack.length > 0 && inhouseChange?.location.length > 0) && <div>
                                                        <button onClick={() => setShow(false)}>No</button>
                                                        <button className='make_green' onClick={saveChangeHandler} disabled={saveLoading}>
                                                            {saveLoading ? <Spinner animation='border' size='sm' /> : "Save"}</button>
                                                    </div>
                                                }
                                            </> : <>
                                                {
                                                    (inhouseChange?.store.length > 0) && <div>
                                                        <button onClick={() => setShow(false)}>No</button>
                                                        <button className='make_green' onClick={saveChangeHandler} disabled={saveLoading}>
                                                            {saveLoading ? <Spinner animation='border' size='sm' /> : "Save"}</button>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                    <Table striped bordered responsive>
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
                                                getPalletsMovementData?.response?.map((c, i) => {
                                                    const rowOption = rowOptions[c.id] || {};
                                                    const isChangeStage = changeStage[c.id] || null;

                                                    return (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{c.pallotNo}</td>
                                                            <td>{c.location}</td>
                                                            <td style={{ minWidth: "140px" }}><Select styles={materialColorStyles}
                                                                options={rowOption.storeOptions || storeOption}
                                                                placeholder="Select" onChange={(data) => handleStoreChange(data, c)} /></td>

                                                            <td style={{ minWidth: "140px" }}>
                                                                {!isChangeStage && <Select styles={materialColorStyles}
                                                                    options={rowOption.rackOptions || []}
                                                                    placeholder="Select" onChange={(data) => handleRackChange(data, c)} />}</td>

                                                            <td style={{ minWidth: "250px" }}>
                                                                {!isChangeStage && <Select
                                                                    options={rowOption.locationOptions || []}
                                                                    styles={customStyles} placeholder="Select" onChange={(data) => handleLocationChange(data, c)} />}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div> :
                                    <h5 className='mt-3'>
                                        <span style={{ color: "#329932" }}> No Results Found </span>
                                    </h5>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default InhouseMovement
