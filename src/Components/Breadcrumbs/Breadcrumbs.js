import React from 'react'
import { BiChevronRight } from 'react-icons/bi';
import './Breadcrumbs.css';

const Breadcrumbs = ({ list }) => {
    return (
        <div className='d-flex align-items-center'>
            {
                list.map((l, i) => {
                    return (
                        <div className='breadcrumbs_main'>
                            <p>{l}</p>
                            <BiChevronRight style={list.length - 1 === i ? { display: "none" } : null} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumbs
