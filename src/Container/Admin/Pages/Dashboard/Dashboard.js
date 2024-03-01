import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"
import './Dashboard.css';
import Select from 'react-select';
import { dashboardColorStyles, login, sortByStyles } from '../../../../Util/Helper.js';
import { Col, DropdownButton, Dropdown, Row, Table, Modal } from 'react-bootstrap';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Filler, Legend
} from 'chart.js';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardApi, getCurrentUserProfile } from '../../../../Redux/Action/Admin.js';
// import Loader from '../../../../Util/Loader.js';
import Loading from '../../../../Components/Loading/Loading.js';
import { allImages } from '../../../../Util/Images.js';

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
  const dispatch = useDispatch();
  const [recentModal, setRecentModal] = useState(false)
  const [showLocUtil, setShowLocUtil] = useState(null)
  const [selectLoc, setSelectLoc] = useState({})
  const [sortBy, setSortBy] = useState({ value: "Ascending", label: "Ascending" })
  const [sortApi, setSortApi] = useState(null)

  useEffect(() => {
    const formData = new FormData()
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(dashboardApi(formData))
    // dispatch(getCurrentUserProfile(formData))
  }, [])

  // useEffect(() => {
  //   const formData = new FormData()
  //   formData.append("email", login.email)

  //   dispatch(getCurrentUserProfile(formData))
  // }, [])

  const { loading, getDashboardData } = useSelector((state) => state.getDashboardApiData)

  useEffect(() => {
    if (getDashboardData) {
      setSelectLoc({ value: getDashboardData.locationUtilization[0].name, label: getDashboardData.locationUtilization[0].name })
      setShowLocUtil(getDashboardData?.locationUtilization[0])
      setSortApi(getDashboardData?.recentActivities)
    }
  }, [getDashboardData])

  const options = getDashboardData?.locationUtilization?.map((l) => {
    return { value: l.name, label: l.name }
  })

  const pieData = {
    labels: getDashboardData?.pallotsUtilization?.map((p) => {
      return `${p.name} ${p.percentage}%`
    }),
    datasets: [
      {
        label: '',
        data: getDashboardData?.pallotsUtilization?.map((p) => {
          return p.percentage
        }),
        backgroundColor: getDashboardData?.pallotsUtilization?.map((p) => {
          return p.color
        }),
      },
    ],
  };

  const capacityData = {
    labels: getDashboardData?.warehouseCapacity?.map((c) => {
      return c.name
    }),
    datasets: [
      {
        label: '',
        data: getDashboardData?.warehouseCapacity?.map((c) => {
          return c.percentage
        }),
        backgroundColor: getDashboardData?.warehouseCapacity?.map((c) => {
          return c.color
        }),
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
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Set the desired font size here
          },
        },
      },
    },
  };

  const warehouseLabels = getDashboardData?.warehouseUtilization?.map((w) => {
    return w.name
  })

  const warehouseData = {
    labels: warehouseLabels,
    datasets: [
      {
        label: '',
        data: getDashboardData?.warehouseUtilization?.map((w) => {
          return parseInt(w.count)
        }),
        backgroundColor: getDashboardData?.warehouseUtilization?.map((w) => {
          return w.color
        })
      },
    ],
  };

  const locationHandler = (e) => {
    setSelectLoc({ value: e.value, label: e.value })
    let filterData = getDashboardData?.locationUtilization.find((l) => l.name === e.value)
    setShowLocUtil(filterData)
  }

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
        data: [showLocUtil?.capacity, showLocUtil?.utilized, showLocUtil?.idel],
        backgroundColor: [
          '#E64646',
          '#77CEFF',
          '#329932',
        ],
      },
    ],
  };

  const tableHead = ["S.No", "Date", "Transaction By", "Truck Number", "Warehouse", "Action"]
  const detailHead = ["SKU", "Quantity", "Company"]

  const consigneeDetailModal = (
    <Modal show={recentModal}
      centered onHide={() => setRecentModal(!recentModal)} size='lg' className='consignee_detail_modal'>
      <Modal.Body>
        <div className='consignee_name_head'>
          <h6>Abdullah Shah Ghazi Sugar Mill</h6>
          <AiOutlineClose onClick={() => setRecentModal(!recentModal)} style={{ cursor: "pointer" }} />
        </div>
        <div className='consignee_table detail'>
          <Table responsive>
            <thead>
              <tr>
                {detailHead.map((d) => (<th>{d}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30019</td>
                <td>testUIM</td>
                <td>T&T</td>
              </tr>
              <tr>
                <td>30019</td>
                <td>testUIM</td>
                <td>T&T</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )

  const sortHandler = (e) => {
    const selectedSortBy = e.value;
    setSortBy({ value: selectedSortBy, label: selectedSortBy });
    // Clone the RecentApi array to avoid mutating state directly

    const sortedApi = [...sortApi];
    if (selectedSortBy === "Ascending") {
      sortedApi.sort((a, b) => (a.sno > b.sno ? 1 : -1));
    } else if (selectedSortBy === "Descending") {
      sortedApi.sort((a, b) => (a.sno < b.sno ? 1 : -1));
    }
    setSortApi(sortedApi);
  };

  return (
    <div>
      {consigneeDetailModal}
      <Breadcrumbs list={["Dashboard", " "]} />

      <div className='dashboard_head'>
        <h5>Dashboard</h5>

        <div className='calender_date'>
          <img src={allImages.CalenderIcon} alt='' />
          {/* <p>{currentDate} Fri 17 Jul  <BiChevronLeft /> Sat 24 Jul </p> */}
          <p>Date: {new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>

      {
        loading ? <div className='my-5'> <Loading /> </div> :

          <>
            <div className='dashboard_boxes'>
              <Row>
                <Col md={3} xs={6}>
                  <div className='box warehouse_box'>
                    <img src={allImages.dashboard_box_img} alt='' />
                    <h5>Total No of Warehouses</h5>
                    <strong>{getDashboardData?.totalWarehouses}</strong>
                  </div>
                </Col>
                <Col md={3} xs={6}>
                  <div className='box consignee_box'>
                    <img src={allImages.consignee_box_img} alt='' />
                    <h5>Total Consignees</h5>
                    <strong>{getDashboardData?.totalConsigees}</strong>
                  </div>
                </Col>
                <Col md={3} xs={6}>
                  <div className='box item_box'>
                    <img src={allImages.item_box_img} alt='' />
                    <h5>Total Locations</h5>
                    <strong>{getDashboardData?.totalLocations}</strong>
                  </div>
                </Col>
                <Col md={3} xs={6}>
                  <div className='box pallet_box'>
                    <img src={allImages.pallet_box_img} alt='' />
                    <h5>Total Pallets</h5>
                    <strong>{getDashboardData?.totalPallets}</strong>
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
                      {/* <Select options={options} placeholder="Select WH" styles={dashboardColorStyles} /> */}
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
                      <Select isLoading={loading} options={options} placeholder="Select Location" styles={dashboardColorStyles} value={selectLoc} onChange={locationHandler} />
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
                      {/* <Select options={options} placeholder="Select PH" styles={dashboardColorStyles} /> */}
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
                      {/* <Select options={options} placeholder="Select Rack" styles={dashboardColorStyles} /> */}
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

                  <div>
                    <Select options={[{ value: "Ascending", label: "Ascending" }, { value: "Descending", label: "Descending" }]}
                      placeholder="Sort By" styles={sortByStyles} value={sortBy} onChange={sortHandler} />
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
                      sortApi?.map((c, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{c.date}</td>
                            <td>{c.transactionBy}</td>
                            <td>{c.transactionalNumber}</td>
                            <td>{c.warehouse}</td>
                            <td><a className='download_btn' href={c.documentPath} target='_blank'>Download</a></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          </>
      }
    </div>
  )
}
export default Dashboard