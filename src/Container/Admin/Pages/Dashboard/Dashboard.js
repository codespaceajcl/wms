import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BiChevronLeft } from "react-icons/bi";
import './Dashboard.css';
import Select from 'react-select';
import { dashboardColorStyles } from '../../../../Util/Helper.js';
import { Col, DropdownButton, Dropdown, Row, Table } from 'react-bootstrap';
import RecentApi from "../../../../Apis/recent.json";
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';

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

const Dashboard = () => {
  const tableHead = ["S.No", "Pallet Number", "Current Location", "Warehouse", "Action", "Status"]

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const pieData = {
    labels: ['Idle 56%', 'Utilized 44%'],
    datasets: [
      {
        label: '',
        data: [56, 44],
        backgroundColor: [
          '#57B894',
          '#F2F2F2',
        ],
      },
    ],
  };

  const capacityData = {
    labels: ['55% Used Capacity', '45% Total Capacity'],
    datasets: [
      {
        label: '',
        data: [55, 45],
        backgroundColor: [
          '#E64646',
          '#00A3FF',
        ],
        borderWidth: 1,
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

  const labels = ['Sep1', 'Sep2', 'Sep3', 'Sep4', 'Sep5', 'Sep6', 'Sep7', 'Sep8'];

  const overviewData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Overview',
        data: [4, 6, 9, 5, 3, 5, 1, 8],
        borderColor: '#A9C23F',
        backgroundColor: '#a9c23f4a',
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

  const warehouseLabels = ['Sadiqabad', 'Agility', 'Port Qasim', 'Rawalpindi', 'Qasimabad', 'Murree'];

  const warehouseData = {
    labels: warehouseLabels,
    datasets: [
      {
        label: '',
        data: [50, 75, 30, 60, 75, 60],
        backgroundColor: [
          '#57B894',
          '#F97850',
          '#7B8DBF',
          '#DF72B6',
          '#97D343',
          '#DCAC36',
        ],
      },
    ],
  };

  const locOptions = {
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
      scales: {
        y: {
          ticks: {
            values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            stepSize: 10,
            callback: function (value) {
              return value;
            },
          },
        },
      },
    },
  };

  const locLabels = ['Total Capacity', 'Utilized', 'Idle'];

  const locData = {
    labels: locLabels,
    datasets: [
      {
        label: '',
        data: [75, 50, 25],
        backgroundColor: [
          '#E64646',
          '#77CEFF',
          '#329932',
        ],
      },
    ],
  };

  return (
    <div>
      <Breadcrumbs list={["Dashboard", " "]} />

      <div className='dashboard_head'>
        <h5>Dashboard</h5>

        <div className='calender_date'>
          <img src='/images/calender_icon.png' alt='' />
          <p>Fri 17 Jul  <BiChevronLeft /> Sat 24 Jul </p>
        </div>
      </div>

      <div className='dashboard_boxes'>
        <Row>
          <Col md={3} xs={6}>
            <div className='box warehouse_box'>
              <img src='/images/dashboard_box_img.png' alt='' />
              <h5>Total No of Warehouses</h5>
              <strong>8</strong>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className='box consignee_box'>
              <img src='/images/consignee_box_img.png' alt='' />
              <h5>Total Consignees</h5>
              <strong>432</strong>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className='box item_box'>
              <img src='/images/item_box_img.png' alt='' />
              <h5>Total Items</h5>
              <strong>1349</strong>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className='box pallet_box'>
              <img src='/images/pallet_box_img.png' alt='' />
              <h5>Total Pallets</h5>
              <strong>3500</strong>
            </div>
          </Col>
        </Row>
      </div>

      <div className='graph_view'>
        <Row style={{ height: "100%", gap: "20px 0", marginBottom: "20px" }}>
          <Col md={5}>
            <div className='graph_box'>
              <div>
                <h6>Overview</h6>
                <Select options={options} placeholder="Select WH" styles={dashboardColorStyles} />
              </div>

              <div className='line_chart'>
                <Line options={overviewOptions} data={overviewData} />
              </div>
            </div>
          </Col>
          <Col md={7}>
            <div className='graph_box'>
              <h6 style={{ width: "fit-content", margin: "10px 0" }}>Warehouse Utilization</h6>

              <Bar options={warehouseOptions} data={warehouseData} />
            </div>
          </Col>
          <Col md={4}>
            <div className='graph_box'>
              <div>
                <h6>Location Utilization</h6>
                <Select options={options} placeholder="Select LH" styles={dashboardColorStyles} />
              </div>

              <div className='bar_chart'>
                <Bar options={locOptions} data={locData} />
              </div>
            </div>
          </Col>
          <Col md={4} sm={6}>
            <div className='graph_box'>
              <div>
                <h6>Pallets Utilization</h6>
                <Select options={options} placeholder="Select PH" styles={dashboardColorStyles} />
              </div>

              <div className='pie_chart'>
                <Pie data={pieData} />
              </div>
            </div>
          </Col>
          <Col md={4} sm={6}>
            <div className='graph_box'>
              <div>
                <h6>Capacity</h6>
                <Select options={options} placeholder="Select Rack" styles={dashboardColorStyles} />
              </div>

              <div className='donut_chart'>
                <Doughnut data={capacityData} />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className='recent_activity'>
        <div className='consignee_table recent_activity'>
          <div className='recent_head'>
            <h6>Recent Activity</h6>

            <div className='sort_by'>
              {/* <img src='/images/filter_icon.png' alt='' /> */}
              <DropdownButton title="Sort By" className='recent_sort'>
                <Dropdown.Item>Ascending</Dropdown.Item>
                <Dropdown.Item>Desending</Dropdown.Item>
              </DropdownButton>
            </div>
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
                RecentApi.map((c) => {
                  return (
                    <tr>
                      <td>{c.sno}</td>
                      <td>{c.pallet}</td>
                      <td>{c.location}</td>
                      <td>{c.warehouse}</td>
                      <td className={c.stock === 'Stock In' ? 'make_green' : "make_red"}>{c.stock}</td>
                      <td><button>View</button></td>
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
export default Dashboard