import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row, Table } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import Select from 'react-select';
import InhouseApi from "../../../../Apis/Inhouse.json";
import './InhouseMovement.css';

const InhouseMovement = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [selectedValues, setSelectedValues] = useState([]);

    const tableHead = ["S.No", "Pallet No", "Current Location", "Store", "Rack", "Location"]

    const options = [
        { value: 'PakistanStorage_None01/Agility Port Qasim', label: 'PakistanStorage_None01/Agility Port Qasim' }
    ]

    const storeOption = [
        { value: "W01", label: "W01" },
        { value: "W02", label: "W02" },
        { value: "W03", label: "W03" },
        { value: "W04", label: "W04" },
    ]

    const rackOption = [
        { value: "W01AA", label: "W01AA" },
        { value: "W01AB", label: "W01AB" },
        { value: "W01AC", label: "W01AC" },
        { value: "W01AD", label: "W01AD" },
    ]

    const customStyles = {
        option: (provided, state) => {
            return ({
                ...provided,
                background: state.value === 'W01AA01A1 | W02AA01A1' ? '#95D6A4' : state.value === 'W01AA01A2 | W02AA01A3' ? '#95D6A4' : state.value === 'W01AA01A3 | W02AA02A1' ? '#FF8F8F' : '#00FFFF',
                color: '#484C52',
            })
        }
    };

    const locOption = [
        { value: "W01AA01A1 | W02AA01A1", label: "W01AA01A1 | W02AA01A1" },
        { value: "W01AA01A2 | W02AA01A3", label: "W01AA01A2 | W02AA01A3" },
        { value: "W01AA01A3 | W02AA02A1", label: "W01AA01A3 | W02AA02A1" },
        { value: "W01AA01A4 | W02AA02A2", label: "W01AA01A4 | W02AA02A2" },
    ]

    const handleSelectChange = (index, field, value) => {
        const updatedValues = [...selectedValues];
        updatedValues[index] = {
            ...updatedValues[index],
            [field]: value,
        };
        setSelectedValues(updatedValues);

        const { select1, select2, select3 } = updatedValues[index];

        if (select1?.value && select2?.value && select3?.value) {
            setShowSave(true)
        }
    };

    const showModal = () => {
        setShow(true)
        setSelectedValues([])
        setShowSave(false)
    }

    return (
        <div>
            <SuccessModal show={show} setShow={() => setShow(!show)} />

            <Breadcrumbs list={["Dashboard", "Inhouse Movement"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
                    Inhouse Movement

                    <div className='create'><AiOutlinePlus style={{ fontSize: "20px" }} /> Download Report</div>
                </h5>

                <Row className='mt-5'>
                    <Col md={12}>
                        <Select options={options} placeholder="Select Inhouse Movement" className='react_select_inhouse' />
                    </Col>
                </Row>

                <div className='consignee_table inhouse'>
                    <div className='select_inhouse_table'>
                        <h6>PakistanStorage_None01/Agility Port Qasim</h6>

                        {
                            showSave && <div>
                                <button onClick={() => setShow(false)}>No</button>
                                <button className='make_green' onClick={showModal}>Save</button>
                            </div>
                        }
                    </div>
                    <Table striped bordered responsive="sm">
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
                                InhouseApi.map((c, i) => {
                                    return (
                                        <tr>
                                            <td>{c.sno}</td>
                                            <td>{c.pallet}</td>
                                            <td>{c.Curr_location}</td>
                                            <td><Select options={storeOption} placeholder="Select" onChange={(value) => handleSelectChange(i, 'select1', value)} className='react_select' /></td>
                                            <td><Select options={rackOption} placeholder="Select" onChange={(value) => handleSelectChange(i, 'select2', value)} className='react_select' /></td>
                                            <td style={{ width: "250px" }}><Select options={locOption} onChange={(value) => handleSelectChange(i, 'select3', value)} styles={customStyles} placeholder="Select" className='react_select' /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default InhouseMovement
