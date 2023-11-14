import React, { useState } from 'react'
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs'
import { Col, Container, Row } from 'react-bootstrap';
import './LocationDetail.css';
import {
    Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

const LocationDetail = () => {
    const [showGraph, setShowGraph] = useState('inventory')

    const pieData = {
        labels: ['Ambient 79%', 'Air Conditioned 14%', 'Refrigerator 5%'],
        datasets: [
            {
                label: '',
                data: [79, 14, 5],
                backgroundColor: [
                    'rgba(165, 207, 79, 1)',
                    'rgba(119, 206, 255, 1)',
                    '#fff'
                ],
            },
        ],
    };

    const overviewOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    const warehouseLabels = ['OK', 'Faulty/Damaged'];

    const warehouseData = {
        labels: warehouseLabels,
        datasets: [
            {
                label: '',
                data: [50, 45],
                backgroundColor: [
                    'rgba(169, 194, 63, 1)',
                    'rgba(255, 110, 110, 1)',
                ],
            },
        ],
    };

    const warehouseOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: false,
            text: '',
          },
        },
      };

    return (
        <div>
            <Container>
                <div className='location_breakcrumb mb-4'>
                    <Breadcrumbs list={["Warehouse", "Agility Port Qasim", "PakistanNone_01/Storage", "Air Condition"]} />
                </div>

                <Row>
                    <Col md={4}>
                        <div className='location_detail_box'>
                            <h6>Warehouse Info.</h6>

                            <div className='warehouse_info_detail'>
                                <img src='/images/agile_port_img.png' alt='' />

                                <div>
                                    <h6>Agility Port Qasim</h6>
                                    <p>Address: R7MX+8F4, North Western Industrial Zone Port Qasim Bin Qasim Town, Karachi.</p>
                                </div>
                            </div>

                            <div className='location_list_detail'>
                                <ul>
                                    <li> <img src='/images/location_store_icon.png' alt='' /> No of Stores </li>
                                    <li><strong>02</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_stage_icon.png' alt='' /> No of Stages </li>
                                    <li><strong>02</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_no_icon.png' alt='' /> Total Location </li>
                                    <li><strong>602</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/utilized_location_icon.png' alt='' /> Utlized Location </li>
                                    <li><strong>514</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/location_pallet_icon.png' alt='' /> Total Pallets </li>
                                    <li><strong>322</strong></li>
                                </ul>
                                <ul>
                                    <li> <img src='/images/utilized_pallet_loc.png' alt='' /> Utilized Pallets </li>
                                    <li><strong>322</strong></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='location_detail_box'>
                            <h6>PakistanNone_01/Storage</h6>

                            <div className='mt-3'>
                                <Row>
                                    <Col md={6}>
                                        <div className='location_center_boxes'>
                                            <h4>32</h4>
                                            <p>No Of <br /> Location</p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='location_center_boxes'>
                                            <h4>233</h4>
                                            <p>No Of <br /> Inventory</p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='location_center_boxes'>
                                            <h4>54</h4>
                                            <p>No Of Utilized <br /> Location</p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='location_center_boxes'>
                                            <h4>234</h4>
                                            <p>No Of Empty <br /> Location</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='location_detail_graph'>
                            <div className='tabs'>
                                <p onClick={() => setShowGraph('inventory')} className={showGraph === 'inventory' ? 'active' : ''}>Inventory Status</p>
                                <p onClick={() => setShowGraph('Utilization')} className={showGraph === 'Utilization' ? 'active' : ''}>Location Utilization</p>
                            </div>


                            <div>
                                {
                                    showGraph === 'Utilization' ? <div className='pie_chart_location'>
                                        <Pie data={pieData} options={overviewOptions} />
                                    </div> : <div className='bar_location'>
                                        <Bar options={warehouseOptions} data={warehouseData} />
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LocationDetail

