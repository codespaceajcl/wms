import React, { useEffect } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import './Reports.css';
import Select from 'react-select'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import StockInTab from './StockInTab/StockInTab';
import StockOutTab from './StockOutTab/StockOutTab';
import StockReturn from './StockReturn/StockReturn';
import StockTranfer from './StockTransfer/StockTransfer';
import { useNavigate } from 'react-router-dom';
import { login, materialColorStyles } from "../../../../Util/Helper";
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryFilter, getInventoryReport, getInventoryReportWithAllFilter, getStockInReportFilter, getStockOutReportFilter, getStockReturnReportFilter, getStockTransferReportFilter } from '../../../../Redux/Action/Admin';
import Loader from '../../../../Util/Loader';
import AvailableStock from './AvailableStockTab/AvailableStockTab';

const Reports = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTab, setShowTab] = useState('all');

    const { loading, inventoryReportsData } = useSelector((state) => state.getReports)
    const { loading: filterLoading, inventoryFilterData } = useSelector((state) => state.getInventory)
    const { loading: allTabLoading, inventoryReportsFilterAllData } = useSelector((state) => state.getInventoryAllFilter)

    const [filterData, setFilterData] = useState({
        warehouses: "no",
        businessTypes: "no",
        consignees: "no",
        date: "no",
        from: "no",
        to: "no",
        industries: "no",
        skus: "no",
        types: "no"
    })

    useEffect(() => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)

        dispatch(getInventoryFilter(formData))

        if (showTab === "all") dispatch(getInventoryReport(formData))

        return () => {
            dispatch({ type: "GET_INVENTORY_REPORTS_FILTER_RESET" })
            dispatch({ type: "GET_INVENTORY_FILTER_RESET" })
        }
    }, [])

    useEffect(() => {
        if (inventoryFilterData?.response?.length > 0) {
            dispatch({ type: "GET_INVENTORY_REPORTS_RESET" })
        }
    }, [inventoryFilterData])

    const warehouseOption = inventoryFilterData?.warehouses?.map((w) => {
        return {
            value: `${w.id}`,
            label: `${w.name}`
        }
    })

    const businessTypeOption = inventoryFilterData?.businessTypes?.map((b) => {
        return {
            value: b,
            label: b
        }
    })

    const typeOption = inventoryFilterData?.types?.map((t) => {
        return {
            value: t,
            label: t
        }
    })

    const industryOption = inventoryFilterData?.industries?.map((i) => {
        return {
            value: i,
            label: i
        }
    })

    const skuOption = inventoryFilterData?.skus?.map((s) => {
        return {
            value: s.partNo,
            label: `${s.partNo} | ${s.nomenclature} | ${s.nsn}`
        }
    })

    const consigneeOption = inventoryFilterData?.consignees?.map((c) => {
        return {
            value: c.name,
            label: `${c.name} | ${c.suger}`
        }
    })

    const handleFilterSubmit = () => {
        const finalData = { ...filterData }
        finalData["email"] = login.email
        finalData["token"] = login.token

        const d = JSON.stringify(finalData)

        if (showTab === "all") {
            dispatch(getInventoryReportWithAllFilter(d))
        }

        else if (showTab === "stockInReport") {
            dispatch(getStockInReportFilter(d))
        }

        else if (showTab === "stockOutReport") {
            dispatch(getStockOutReportFilter(d))
        }

        else if (showTab === "stockReturnReport") {
            dispatch(getStockReturnReportFilter(d))
        }

        else if (showTab === "stockTransferReport") {
            dispatch(getStockTransferReportFilter(d))
        }

    }

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Reports"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Warehouse Inventory Report</h5>

                <Row className='mt-4 align-items-center' style={{ padding: "0 25px" }}>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>Warehouse</label>
                        <Select isLoading={filterLoading} options={warehouseOption} placeholder="Select Warehouse"
                            onChange={(d) => setFilterData({ ...filterData, warehouses: d.value })} styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>Company</label>
                        <Select isLoading={filterLoading} options={businessTypeOption}
                            onChange={(d) => setFilterData({ ...filterData, businessTypes: d.value })} placeholder="Select Company" styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>Type</label>
                        <Select isLoading={filterLoading} options={typeOption}
                            onChange={(d) => setFilterData({ ...filterData, types: d.value })} placeholder="Select Type" styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>Category</label>
                        <Select isLoading={filterLoading} options={industryOption}
                            onChange={(d) => setFilterData({ ...filterData, industries: d.value })} placeholder="Select Category" styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>SKU</label>
                        <Select isLoading={filterLoading} options={skuOption}
                            onChange={(d) => setFilterData({ ...filterData, skus: d.value })} placeholder="Select SKU" styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='mb-2'>
                        <label className='react_select_label'>Consignee</label>
                        <Select isLoading={filterLoading} options={consigneeOption}
                            onChange={(d) => setFilterData({ ...filterData, consignees: d.value })} placeholder="Select Consignee" styles={materialColorStyles} />
                    </Col>
                    <Col md={4} className='input_field mb-2'>
                        <label>From</label>
                        <input
                            onChange={(e) => setFilterData({ ...filterData, from: e.target.value })}
                            type={'Date'}
                        />
                    </Col>
                    <Col md={4} className='input_field mb-2'>
                        <label>To</label>
                        <input
                            onChange={(e) => setFilterData({ ...filterData, to: e.target.value })}
                            type={'Date'}
                        />
                    </Col>
                    <Col md={4} className='mt-2'>
                        <button className='submit_btn' type="button"
                            onClick={handleFilterSubmit}>
                            Generate Report
                        </button>
                    </Col>
                </Row>

                <div className='mt-5'>
                    <div className='report_tabs'>
                        <button className={showTab === 'all' ? 'active' : ''} onClick={() => setShowTab('all')}>Summary</button>
                        <button className={showTab === 'availableStockInventory' ? 'active' : ''} onClick={() => setShowTab('availableStockInventory')}>Available Stock (AS)</button>
                        <button className={showTab === 'stockInReport' ? 'active' : ''} onClick={() => setShowTab('stockInReport')}>Stock In (SN)</button>
                        <button className={showTab === 'stockOutReport' ? 'active' : ''} onClick={() => setShowTab('stockOutReport')}>Stock Out (SO)</button>
                        <button className={showTab === 'stockReturnReport' ? 'active' : ''} onClick={() => setShowTab('stockReturnReport')}>Stock Return (SRN)</button>
                        <button className={showTab === 'stockTransferReport' ? 'active' : ''} onClick={() => setShowTab('stockTransferReport')}>Stock Transfer (ST)</button>
                    </div>
                </div>

                {
                    showTab === 'all' && <div className='report_summary_table'>
                        {
                            (loading || allTabLoading) ? <Loader /> :
                                <>
                                    {/* <Table striped bordered responsive>
                                        <thead>
                                            <tr className='super_head'>
                                                <th colSpan={2}>SKU Details</th>
                                                <th colSpan={3}>Stock In (SN)</th>
                                                <th colSpan={3}>Stock Out (SO)</th>
                                                <th colSpan={3}>Stock Return (SRN)</th>
                                                <th colSpan={3}>Stock Transfer (ST)</th>
                                                <th colSpan={2}>Stock Details</th>
                                            </tr>
                                            <tr className='main_head'>
                                                <th>SKU</th>
                                                <th>Nomenclature</th>
                                                <th>OK</th>
                                                <th>Faulty</th>
                                                <th>Total</th>
                                                <th>OK</th>
                                                <th>Faulty</th>
                                                <th>Total</th>
                                                <th>OK</th>
                                                <th>Faulty</th>
                                                <th>Total</th>
                                                <th>OK</th>
                                                <th>Faulty</th>
                                                <th>Total</th>
                                                <th>Net Dispatch</th>
                                                <th>Total Available Stock</th>
                                            </tr>
                                        </thead>
                                        {
                                            inventoryReportsFilterAllData?.response ?
                                                <tbody>
                                                    {
                                                        inventoryReportsFilterAllData?.response && Object.values(inventoryReportsFilterAllData?.response).map((r, i) => {

                                                            const stockInOkValue = inventoryReportsFilterAllData.stockInOk && inventoryReportsFilterAllData.stockInOk[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockInFaultyValue = inventoryReportsFilterAllData.stockInFaulty && inventoryReportsFilterAllData.stockInFaulty[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockInTotalValue = inventoryReportsFilterAllData.stockInTotal && inventoryReportsFilterAllData.stockInTotal[Object.keys(inventoryReportsFilterAllData?.response)[i]];

                                                            const stockOutOkValue = inventoryReportsFilterAllData.stockOutOk && inventoryReportsFilterAllData.stockOutOk[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockOutFaultyValue = inventoryReportsFilterAllData.stockOutFaulty && inventoryReportsFilterAllData.stockOutFaulty[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockOutTotalValue = inventoryReportsFilterAllData.stockOutTotal && inventoryReportsFilterAllData.stockOutTotal[Object.keys(inventoryReportsFilterAllData?.response)[i]];

                                                            const stockReturnOkValue = inventoryReportsFilterAllData.stockReturnOk && inventoryReportsFilterAllData.stockReturnOk[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockReturnFaultyValue = inventoryReportsFilterAllData.stockReturnFaulty && inventoryReportsFilterAllData.stockReturnFaulty[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockReturnTotalValue = inventoryReportsFilterAllData.stockReturnTotal && inventoryReportsFilterAllData.stockReturnTotal[Object.keys(inventoryReportsFilterAllData?.response)[i]];

                                                            const stockTransferOkValue = inventoryReportsFilterAllData.stockTransferOk && inventoryReportsFilterAllData.stockTransferOk[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockTransferFaultyValue = inventoryReportsFilterAllData.stockTransferFaulty && inventoryReportsFilterAllData.stockTransferFaulty[Object.keys(inventoryReportsFilterAllData?.response)[i]];
                                                            const stockTransferTotalValue = inventoryReportsFilterAllData.stockTransferTotal && inventoryReportsFilterAllData.stockTransferTotal[Object.keys(inventoryReportsFilterAllData?.response)[i]];

                                                            const availableStock = stockInTotalValue || 0 - stockOutTotalValue || 0 + stockReturnTotalValue || 0 + stockTransferTotalValue || 0

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{r.partNo}</td>
                                                                    <td>{r.nomenclature}</td>
                                                                    <td className='ok'>{stockInOkValue || 0}</td>
                                                                    <td className='fault'>{stockInFaultyValue || 0}</td>
                                                                    <td className='total'>{stockInTotalValue || 0}</td>
                                                                    <td className='ok'>{stockOutOkValue || 0}</td>
                                                                    <td className='fault'>{stockOutFaultyValue || 0}</td>
                                                                    <td className='total'>{stockOutTotalValue || 0}</td>
                                                                    <td className='ok'>{stockReturnOkValue || 0}</td>
                                                                    <td className='fault'>{stockReturnFaultyValue || 0}</td>
                                                                    <td className='total'>{stockReturnTotalValue || 0}</td>
                                                                    <td className='ok'>{stockTransferOkValue || 0}</td>
                                                                    <td className='fault'>{stockTransferFaultyValue || 0}</td>
                                                                    <td className='total'>{stockTransferTotalValue || 0}</td>
                                                                    <td className='total'>{0}</td>
                                                                    <td className='total'>{availableStock}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody> :
                                                <tbody>
                                                    {
                                                        inventoryReportsData?.response && Object.values(inventoryReportsData?.response).map((r, i) => {

                                                            const stockInOkValue = inventoryReportsData.stockInOk && inventoryReportsData.stockInOk[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockInFaultyValue = inventoryReportsData.stockInFaulty && inventoryReportsData.stockInFaulty[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockInTotalValue = inventoryReportsData.stockInTotal && inventoryReportsData.stockInTotal[Object.keys(inventoryReportsData?.response)[i]];

                                                            const stockOutOkValue = inventoryReportsData.stockOutOk && inventoryReportsData.stockOutOk[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockOutFaultyValue = inventoryReportsData.stockOutFaulty && inventoryReportsData.stockOutFaulty[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockOutTotalValue = inventoryReportsData.stockOutTotal && inventoryReportsData.stockOutTotal[Object.keys(inventoryReportsData?.response)[i]];

                                                            const stockReturnOkValue = inventoryReportsData.stockReturnOk && inventoryReportsData.stockReturnOk[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockReturnFaultyValue = inventoryReportsData.stockReturnFaulty && inventoryReportsData.stockReturnFaulty[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockReturnTotalValue = inventoryReportsData.stockReturnTotal && inventoryReportsData.stockReturnTotal[Object.keys(inventoryReportsData?.response)[i]];

                                                            const stockTransferOkValue = inventoryReportsData.stockTransferOk && inventoryReportsData.stockTransferOk[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockTransferFaultyValue = inventoryReportsData.stockTransferFaulty && inventoryReportsData.stockTransferFaulty[Object.keys(inventoryReportsData?.response)[i]];
                                                            const stockTransferTotalValue = inventoryReportsData.stockTransferTotal && inventoryReportsData.stockTransferTotal[Object.keys(inventoryReportsData?.response)[i]];

                                                            const availableStock = stockInTotalValue || 0 - stockOutTotalValue || 0 + stockReturnTotalValue || 0 + stockTransferTotalValue || 0

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{r.partNo}</td>
                                                                    <td>{r.nomenclature}</td>
                                                                    <td className='ok'>{stockInOkValue || 0}</td>
                                                                    <td className='fault'>{stockInFaultyValue || 0}</td>
                                                                    <td className='total'>{stockInTotalValue || 0}</td>
                                                                    <td className='ok'>{stockOutOkValue || 0}</td>
                                                                    <td className='fault'>{stockOutFaultyValue || 0}</td>
                                                                    <td className='total'>{stockOutTotalValue || 0}</td>
                                                                    <td className='ok'>{stockReturnOkValue || 0}</td>
                                                                    <td className='fault'>{stockReturnFaultyValue || 0}</td>
                                                                    <td className='total'>{stockReturnTotalValue || 0}</td>
                                                                    <td className='ok'>{stockTransferOkValue || 0}</td>
                                                                    <td className='fault'>{stockTransferFaultyValue || 0}</td>
                                                                    <td className='total'>{stockTransferTotalValue || 0}</td>
                                                                    <td className='total'>{0}</td>
                                                                    <td className='total'>{availableStock}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                        }
                                    </Table> */}

                                    <div className='downloading_report'>
                                        <a href={inventoryReportsData?.reportLink}> Download Report </a>
                                    </div>

                                    {/* {
                                        (!inventoryReportsFilterAllData &&
                                            !inventoryReportsData) &&
                                        <p style={{ textAlign: "center" }}>No Data Found</p>
                                    } */}
                                </>
                        }
                    </div>
                }
                {
                    showTab === 'availableStockInventory' && <AvailableStock />
                }
                {
                    showTab === 'stockInReport' && <StockInTab />
                }
                {
                    showTab === 'stockOutReport' && <StockOutTab />
                }
                {
                    showTab === 'stockReturnReport' && <StockReturn />
                }
                {
                    showTab === 'stockTransferReport' && <StockTranfer />
                }
            </div>
        </div>
    )
}

export default Reports
