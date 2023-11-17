import React, { useState } from 'react';
import stockInApi from "../../../../../Apis/StockIn.json";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Table } from 'react-bootstrap';

const StockInTab = () => {
    const tableHead = ['#', 'Transaction Code', 'Action By', 'Vehicle No', 'Suppllier', 'Date', 'Business Type', 'Warehouse']
    const [extend, setExtend] = useState(false)

    return (
        <div className='report_summary_table stock'>
            <Table responsive>
                <thead>
                    <tr className='super_head'>
                        {
                            tableHead.map((h) => (
                                <th>{h}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        stockInApi.map((sin) => {
                            return (
                                <>
                                    <tr>
                                        <td>{sin.sno}</td>
                                        <td>{sin.Code}</td>
                                        <td>{sin.Action}</td>
                                        <td>{sin.Vehicle_No}</td>
                                        <td>{sin.Suppllier}</td>
                                        <td>{sin.Date}</td>
                                        <td>{sin.Business_Type}</td>
                                        <td>
                                            <span className='show_warehouse_chevron'>{sin.Warehouse}
                                                {extend ? <FaChevronDown onClick={() => setExtend(!extend)} />
                                                    : <FaChevronRight onClick={() => setExtend(!extend)} />}
                                            </span>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default StockInTab
