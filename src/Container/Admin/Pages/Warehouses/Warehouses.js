import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import './Warehouse.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import warehouseApi from "../../../../Apis/Warehouse.json";
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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

const Warehouses = () => {
  const navigate = useNavigate();

  const locationData = {
    labels: ['Total', 'Utilized'],
    datasets: [
      {
        label: ' ',
        data: [514, 207],
        backgroundColor: [
          '#F0F0F0',
          '#F7B500',
        ],
        borderWidth: 1,
      },
    ],
  };

  const palletData = {
    labels: ['Total', 'Utilized'],
    datasets: [
      {
        label: ' ',
        data: [602, 487],
        backgroundColor: [
          '#F0F0F0',
          '#57B894',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Breadcrumbs list={["Dashboard", "Warehouses"]} />

      <div className='material_main'>
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
          Warehouses

          <div className='create'><AiOutlinePlus style={{ fontSize: "20px" }} /> Create Warehouse</div>
        </h5>

        <Container>
          <Row>
            {
              warehouseApi.map((w) => {
                return (
                  <Col md={4} key={w.id}>
                    <div className='warehouse_div'>
                      <div className='warehouse_img_div'>
                        <img src={w.img} alt='' />
                        <h6>{w.warehouse_name}</h6>
                      </div>
                      <div className='no_stores'>
                        <div>
                          <img src='/images/store_icon.png' alt='' />
                          <p>No Of Stores</p>
                        </div>
                        <div>{w.stores}</div>
                      </div>
                      <div className='no_stores'>
                        <div>
                          <img src='/images/stages_icon.png' alt='' />
                          <p>No Of Stages</p>
                        </div>
                        <div>{w.stages}</div>
                      </div>

                      <Row>
                        <Col md={6}>
                          <div className='w_location'>
                            <div className='loc'>
                              <img src='/images/location_icon.png' alt='' />
                              <p>Locations</p>
                            </div>

                            <div className='warehouse_chart'>
                              <Doughnut data={locationData} options={options} />
                            </div>

                            <div className='w_location_detail mt-2'>
                              <div>
                                <div className='dot'></div>
                                <p>Total <br /> <span>{w.location.total}</span></p>
                              </div>
                              <div>
                                <div className='dot' style={{ backgroundColor: "#F7B500" }}></div>
                                <p>Utilized <br /> <span>{w.location.utilized}</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className='w_location'>
                            <div className='loc'>
                              <img src='/images/pallet_icon.png' alt='' />
                              <p>Pallets</p>
                            </div>

                            <div className='warehouse_chart'>
                              <Doughnut data={palletData} options={options} />
                            </div>

                            <div className='w_location_detail mt-2'>
                              <div>
                                <div className='dot'></div>
                                <p>Total <br /> <span>{w.pallet.total}</span></p>
                              </div>
                              <div>
                                <div className='dot' style={{ backgroundColor: "#57B894" }}></div>
                                <p>Utilized <br /> <span>{w.pallet.utilized}</span></p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <button className='go_warehouse_btn'>Go To Warehouse</button>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Warehouses
