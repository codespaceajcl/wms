import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const StockOut = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Stock Out"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Stock Out</h5>
                <p>Please fill out this form with the required information</p>
            </div>

        </div>
    )
}

export default StockOut
