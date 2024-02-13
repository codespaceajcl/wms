import React from 'react'
import { BiChevronRight } from 'react-icons/bi';
import './Breadcrumbs.css';
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ list }) => {
    const navigate = useNavigate();

    return (
        <div className='d-flex align-items-center flex-wrap'>
            {
                list.map((l, i) => {
                    return (
                        <div className='breadcrumbs_main'>
                            {
                                l === 'Dashboard' ?
                                    <p onClick={() => navigate('/wms/dashboard')}>{l}</p> :
                                    l === 'Warehouse' ?
                                        <p onClick={() => navigate('/wms/warehouses')}>{l}</p> :
                                        ( list[0] === "Warehouse" && list[1] ) ?
                                            <p onClick={() => navigate(-1)}>{l}</p> : <p>{l}</p>
                            }
                            <BiChevronRight style={list.length - 1 === i ? { display: "none" } : null} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumbs
