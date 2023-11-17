import React from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import './Reports.css';
import Select from 'react-select'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row, Table } from 'react-bootstrap';
import Input from '../../../../Components/Input/Input';
import reportSumApi from "../../../../Apis/ReportSum.json";
import { useState } from 'react';
import StockInTab from './StockInTab/StockInTab';

const Reports = () => {
    const [showTab, setShowTab] = useState('Summary');

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Reports"]} />

            <div className='material_main' style={{ padding: "25px 0" }}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} style={{ left: "10px" }} /> Warehouse Inventory Report</h5>

                <Form style={{ padding: "0 20px" }}>
                    <Row className='mt-5'>
                        <Col md={4}>
                            <label className='react_select_label'>Warehouse</label>
                            <Select options={options} placeholder="Select Warehouse" className='react_select' />
                        </Col>
                        <Col md={4}>
                            <label className='react_select_label'>Business Type</label>
                            <Select options={options} placeholder="Select Business" className='react_select' />
                        </Col>
                        <Col md={4}>
                            <label className='react_select_label'>Type</label>
                            <Select options={options} placeholder="Select Type" className='react_select' />
                        </Col>
                        <Col md={4} className='mt-3'>
                            <label className='react_select_label'>Industry</label>
                            <Select options={options} placeholder="Select Industry" className='react_select' />
                        </Col>
                        <Col md={4} className='mt-3'>
                            <Input label={'SKU'} placeholder="Enter SKU" />
                        </Col>
                        <Col md={4} className='mt-3'>
                            <Input label={'Consignee'} placeholder="Enter Consignee" />
                        </Col>
                        <Col md={4} className='mt-3'>
                            <Input label={'From'} type="Date" />
                        </Col>
                        <Col md={4} className='mt-3'>
                            <Input label={'To'} type="Date" />
                        </Col>
                        <Col md={9} className='mt-4'>
                            <button className='submit_btn' type='submit'>Generate Report</button>
                        </Col>
                    </Row>
                </Form>

                <div className='mt-5'>
                    <div className='report_tabs'>
                        <button className={showTab === 'Summary' ? 'active' : ''} onClick={() => setShowTab('Summary')}>Summary</button>
                        <button className={showTab === 'SN' ? 'active' : ''} onClick={() => setShowTab('SN')}>Stock In (SN)</button>
                        <button className={showTab === 'SO' ? 'active' : ''} onClick={() => setShowTab('SO')}>Stock Out (SO)</button>
                        <button className={showTab === 'SRN' ? 'active' : ''} onClick={() => setShowTab('SRN')}>Stock Return (SRN)</button>
                        <button className={showTab === 'ST' ? 'active' : ''} onClick={() => setShowTab('ST')}>Stock Transfer (ST)</button>
                    </div>
                </div>

                {
                    showTab === 'Summary' && <div className='report_summary_table'>
                        <Table striped bordered responsive>
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
                            <tbody>
                                {
                                    reportSumApi.map((r) => {
                                        return (
                                            <tr>
                                                <td>{r.sku}</td>
                                                <td>{r.Nomenclature}</td>
                                                <td className='ok'>{r.sn_ok}</td>
                                                <td className='fault'>{r.sn_fault}</td>
                                                <td className='total'>{r.sn_total}</td>
                                                <td className='ok'>{r.so_ok}</td>
                                                <td className='fault'>{r.so_fault}</td>
                                                <td className='total'>{r.so_total}</td>
                                                <td className='ok'>{r.srn_ok}</td>
                                                <td className='fault'>{r.srn_fault}</td>
                                                <td className='total'>{r.srn_total}</td>
                                                <td className='ok'>{r.st_ok}</td>
                                                <td className='fault'>{r.st_fault}</td>
                                                <td className='total'>{r.st_total}</td>
                                                <td className='total'>{r.net_dispatch}</td>
                                                <td className='total'>{r.avail_stock}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                }
                {
                    showTab === 'SN' && <StockInTab />
                }
                {
                    showTab === 'SO' && <StockInTab />
                }
                {
                    showTab === 'SRN' && <StockInTab />
                }
                {
                    showTab === 'ST' && <StockInTab />
                }
            </div>
        </div>
    )
}

export default Reports
