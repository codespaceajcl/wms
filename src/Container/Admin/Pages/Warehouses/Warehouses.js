import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import './Warehouse.css';
import { Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { login, materialColorStyles } from '../../../../Util/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { createWarehouses, getAllWarehouses } from '../../../../Redux/Action/Admin';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Select from "react-select";
import Loader from '../../../../Util/Loader';
import SuccessModal from '../../../../Components/Modals/SuccessModal';
import { errorNotify } from '../../../../Util/Toast';

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

const Warehouses = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googlePlace, setGooglePlace] = useState(null);
  const [address, setAddress] = useState('')
  const [selectedLocation, setSelectedLocation] = useState({
    lat: "33.6844202",
    lng: "73.04788479999999"
  })
  const [addWarehouseModal, setAddWarehouseModal] = useState(false)
  const [show, setShow] = useState(false)
  const [noOfStores, setNoOfStores] = useState(null)

  const [fields, setFields] = useState({
    name: "",
    date: "",
    poc: "",
    pocContact: "",
    noOfStages: ""
  })

  const { loading, getWarehouseData } = useSelector((state) => state.getWarehouses)
  const { loading: createLoading, createWarehouseData } = useSelector((state) => state.postWarehouse)

  useEffect(() => {
    if (createWarehouseData?.response === 'success') {
      setShow(true)
      setAddWarehouseModal(false)
      dispatch({ type: "CREATE_WAREHOUSE_RESET" })

      const formData = new FormData()
      formData.append("email", login.email)
      formData.append("token", login.token)

      dispatch(getAllWarehouses(formData))
    }
  }, [createWarehouseData])

  useEffect(() => {
    const formData = new FormData()
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(getAllWarehouses(formData))
  }, [])

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const onPlaceSearch = (val) => {
    setAddress(val.label)
    setGooglePlace(val)
    geocodeByAddress(val.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setSelectedLocation({
          lat,
          lng
        })
      }
      );
  }

  const fieldChangeHandler = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const [storageType] = useState([
    { value: 'ambient', label: 'Ambient - Natural Temperature' },
    { value: 'air-condition', label: 'Air-Condition 56-75℉' },
    { value: 'refrigerated', label: 'Refrigerated 32-55℉' }
  ])

  const [storageTypeRack, setStorageTypeRack] = useState(null)
  const [noOfTypeRack, setNoOfTypeRack] = useState([])

  const handleNoOfStores = (e) => {
    let value = parseInt(e.target.value);
    value = Math.min(Math.max(value, 1), 100);

    setNoOfStores(value)

    setNoOfTypeRack(Array.from({ length: value }, (_, index) => index));

    const newStoreData = Array.from({ length: value }, (_, index) => ({
      [`storageType${index + 1}`]: '',
      [`noOfRack${index + 1}`]: '',
    }));

    setStorageTypeRack(newStoreData);
  }

  const [noOfFloorLocation, setNoOfFloorLocation] = useState([])

  const handleNoOfRackChange = (i, name, value) => {
    let v = parseInt(value);
    v = Math.min(Math.max(value, 1), 100);

    setStorageTypeRack((prevData) => {
      const updatedData = [...prevData];
      updatedData[i][name] = v;
      return updatedData;
    });

    setNoOfFloorLocation((prevData) => {
      const updatedData = [...prevData];
      updatedData[i] = Array.from({ length: v }, (_, index) => ({
        [`noOfFloor${i + 1}Rack${index + 1}`]: '',
        [`noOfLocation${i + 1}Rack${index + 1}`]: '',
      }));
      return updatedData;
    });
  };

  const handleStorageTypeChange = (i, name, value) => {
    setStorageTypeRack((prevData) => {
      const updatedData = [...prevData];
      updatedData[i][name] = value;
      return updatedData;
    });
  }

  const handleFloorLocationChange = (rackIndex, i, name, value) => {
    setNoOfFloorLocation((prevData) => {
      const updatedData = [...prevData];

      if (updatedData[rackIndex]) {
        updatedData[rackIndex][i] = {
          ...updatedData[rackIndex][i],
          [name]: value,
        };
      }

      return updatedData;
    });
  };

  const handleWarehouseSubmit = () => {
    const finalData = {};

    storageTypeRack && storageTypeRack?.forEach((rackData, index) => {
      finalData[`storageType${index + 1}`] = rackData[`storageType${index + 1}`];
      finalData[`noOfRack${index + 1}`] = rackData[`noOfRack${index + 1}`];

      if (noOfFloorLocation[index]) {
        noOfFloorLocation[index].forEach((floorData, floorIndex) => {
          finalData[`noOfFloor${index + 1}Rack${floorIndex + 1}`] = floorData[`noOfFloor${index + 1}Rack${floorIndex + 1}`];
          finalData[`noOfLocation${index + 1}Rack${floorIndex + 1}`] = floorData[`noOfLocation${index + 1}Rack${floorIndex + 1}`];
        });
      }
    });

    finalData['address'] = address;
    finalData['noOfStores'] = noOfStores;
    finalData["name"] = fields.name
    finalData["date"] = fields.date
    finalData["poc"] = fields.poc
    finalData["pocContact"] = fields.pocContact
    finalData["noOfStages"] = fields.noOfStages
    finalData["lat"] = selectedLocation.lat
    finalData["lng"] = selectedLocation.lng
    finalData["email"] = login.email
    finalData["token"] = login.token

    const isValid = Object.values(finalData).every(value => {
      return value !== '' && value !== undefined && value !== null;
    });

    if (!isValid) {
      errorNotify('Please fill in all the required fields.')
      return;
    }

    const d = JSON.stringify(finalData)

    dispatch(createWarehouses(d))

  }

  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const modal = <Modal show={addWarehouseModal} onHide={() => setAddWarehouseModal(false)} size='lg' className='add_warehouse_modal'>
    <Modal.Body>
      <div className='add_warehouse_head'>
        <h5> <BsArrowLeftShort onClick={() => setAddWarehouseModal(false)} />
          Add Warehouse
        </h5>
        <p>Please fill out this form with the required information</p>
      </div>

      <div className='warehouse_form'>
        <Form className='input_field'>
          <Row>
            <Col md={6} className='mb-2'>
              <label>Warehouse Name <span>*</span> </label>
              <input placeholder={"Enter Warehouse Name"}
                onChange={fieldChangeHandler}
                name='name'
                value={fields.name}
                type={'text'}
              />
            </Col>
            <Col md={6} className='mb-2'>
              <label>Commerce Date <span>*</span> </label>
              <input
                onChange={fieldChangeHandler}
                name='date'
                value={fields.date}
                type={'Date'}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Col md={12} className='mb-2'>
                <label style={{ fontSize: "14px", fontWeight: "400" }}>Warehouse Address <span>*</span></label>
                <GooglePlacesAutocomplete
                  autocompletionRequest={[]}
                  apiKey={'AIzaSyDPEA-Ig4-_6Kf_oa_PHAc6CTZrkEj-ZLU'}
                  selectProps={{
                    placeholder: 'Enter Warehouse Address',
                    value: googlePlace,
                    onChange: (val) => onPlaceSearch(val),
                    style: {
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: '12px',
                      }),
                    }
                  }}
                />
              </Col>
              <Col md={12} className='mb-2'>
                <label>POC Name <span>*</span> </label>
                <input placeholder={"Enter POC Name"}
                  onChange={fieldChangeHandler}
                  name='poc'
                  value={fields.poc}
                  type={'text'}
                />
              </Col>
              <Col md={12} className='mb-2'>
                <label>POC Contact <span>*</span> </label>
                <input placeholder={"Enter POC Contact"}
                  onChange={fieldChangeHandler}
                  name='pocContact'
                  value={fields.pocContact}
                  type={'text'}
                />
              </Col>
            </Col>
            <Col md={6}>
              {
                selectedLocation &&
                <Col md={12} style={{ width: "100%", height: "90%" }}>
                  <div className='map_wrapper'>
                    <Map google={props.google}
                      center={{
                        lat: `${selectedLocation.lat}`,
                        lng: `${selectedLocation.lng}`
                      }}
                      initialCenter={{
                        lat: `${selectedLocation.lat}`,
                        lng: `${selectedLocation.lng}`
                      }}
                      zoom={12}
                      onReady={handleMapLoad}
                      loadingElement={mapLoaded ? null : <div style={{ height: "100%" }} />}
                    >
                      <Marker
                        position={{
                          lat: `${selectedLocation.lat}`,
                          lng: `${selectedLocation.lng}`
                        }}
                      />
                    </Map>
                  </div>
                </Col>
              }
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <label>No of Stages <span>*</span> </label>
              <input placeholder={"Enter No. of Stages"}
                onChange={fieldChangeHandler}
                name='noOfStages'
                value={fields.noOfStages}
                type={'text'}
              />
            </Col>

            <Col md={6} className='mb-2'>
              <div className='input_field'>
                <label>No of Stores <span>*</span> </label>
                <input placeholder="Enter No. of Stores"
                  type={'number'}
                  onChange={handleNoOfStores}
                  value={noOfStores}
                />
              </div>
            </Col>
            {
              (noOfTypeRack?.length > 0) &&
              <Col md={12}>
                <div className='store_details'> <h6>Location</h6> </div>

                {
                  noOfTypeRack?.map((r, index) => {
                    const isEven = index % 2 === 0;
                    const rowClass = isEven ? 'location_even' : 'location_odd';

                    return (
                      <Row className={rowClass}>
                        <Col md={6}>
                          <div className='input_field'>
                            <label>Storage Type {index + 1} <span>*</span> </label>
                            <Select
                              options={storageType}
                              placeholder={"Storage Type"}
                              styles={materialColorStyles}
                              onChange={(type) => handleStorageTypeChange(index, `storageType${index + 1}`, type.value)}
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className='input_field'>
                            <label>No of Rack {index + 1} <span>*</span> </label>
                            <input placeholder="Enter No. of Rack"
                              type={'number'}
                              onChange={(e) => handleNoOfRackChange(index, `noOfRack${index + 1}`, e.target.value)}
                            />
                          </div>
                        </Col>

                        {
                          noOfFloorLocation[index]?.length > 0 &&
                          <Col md={12} className="locFloor">
                            {
                              noOfFloorLocation[index]?.map((l, locIndex) => {
                                return (
                                  <Row>
                                    <Col md={6} className='mb-2'>
                                      <div className='input_field'>
                                        <label>No of Floor {index + 1} Rack {locIndex + 1} <span>*</span> </label>
                                        <input placeholder="Enter No. of Floor"
                                          type={'number'}
                                          onChange={(e) => handleFloorLocationChange(index, locIndex, `noOfFloor${index + 1}Rack${locIndex + 1}`, e.target.value)}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={6} className='mb-2'>
                                      <div className='input_field'>
                                        <label>No of Location {index + 1} Rack {locIndex + 1} <span>*</span> </label>
                                        <input placeholder="Enter No. of Location"
                                          type={'number'}
                                          onChange={(e) => handleFloorLocationChange(index, locIndex, `noOfLocation${index + 1}Rack${locIndex + 1}`, e.target.value)}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                )
                              })
                            }
                          </Col>
                        }
                      </Row>
                    )
                  })
                }
              </Col>
            }
            <Col md={12} className='mt-4'>
              <div><button type='button' onClick={handleWarehouseSubmit}> {createLoading ? <Spinner size='sm' /> : "Add"}</button></div>
            </Col>
            <Col md={12}>
              <div><button type="button" className='cancel_btn' onClick={() => setAddWarehouseModal(false)}>Cancel</button></div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>

  return (
    <div>
      {modal}
      {/* <ErrorModal show={show} setShow={() => setShow(!show)} /> */}
      <SuccessModal show={show} setShow={() => setShow(!show)} para="Warehouse has been created Successfully!!" />

      <Breadcrumbs list={["Dashboard", "Warehouses"]} />

      <div className='material_main warehouse_main'>
        <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
          Warehouses

          <div className='create' onClick={() => setAddWarehouseModal(true)}><AiOutlinePlus style={{ fontSize: "20px" }} /> Create Warehouse</div>
        </h5>

        <div className='mt-5'>
          {
            loading ? <Loader /> :
              <Row>
                {
                  getWarehouseData?.respnse?.map((w) => {
                    return (
                      <Col md={4} sm={6} xs={10} key={w.id}>
                        <div className='warehouse_div'>
                          <div className='warehouse_img_div'>
                            <img src={'/images/warehouse_img1.png'} alt='' />
                            <h6>{w.name}</h6>
                          </div>
                          <div className='no_stores'>
                            <div>
                              <img src='/images/store_icon.png' alt='' />
                              <p>No Of Stores</p>
                            </div>
                            <div>{getWarehouseData?.stat[w.id]?.store}</div>
                          </div>
                          <div className='no_stores'>
                            <div>
                              <img src='/images/stages_icon.png' alt='' />
                              <p>No Of Stages</p>
                            </div>
                            <div>{getWarehouseData?.stat[w.id]?.stage}</div>
                          </div>

                          <Row>
                            <Col md={6} xs={6}>
                              <div className='w_location'>
                                <div className='loc'>
                                  <img src='/images/location_icon.png' alt='' />
                                  <p>Locations</p>
                                </div>

                                <div className='warehouse_chart'>
                                  {
                                    (getWarehouseData?.stat[w.id]?.location == 0 && getWarehouseData?.stat[w.id]?.utilizeLocation == 0) ?
                                      <img src='/images/empty_loc_pallet.png' alt='' /> :
                                      <Doughnut data={{
                                        labels: ['Total', 'Utilized'],
                                        datasets: [
                                          {
                                            label: ' ',
                                            data: [getWarehouseData?.stat[w.id]?.location, getWarehouseData?.stat[w.id]?.utilizeLocation],
                                            backgroundColor: [
                                              '#F0F0F0',
                                              '#F7B500',
                                            ],
                                            borderWidth: 1,
                                          },
                                        ],
                                      }} options={options} />
                                  }
                                </div>

                                <div className='w_location_detail mt-2'>
                                  <div>
                                    <div className='dot'></div>
                                    <p>Total <br /> <span>{getWarehouseData?.stat[w.id]?.location}</span></p>
                                  </div>
                                  <div>
                                    <div className='dot' style={{ backgroundColor: "#F7B500" }}></div>
                                    <p>Utilized <br /> <span>{getWarehouseData?.stat[w.id]?.utilizeLocation}</span></p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={6} xs={6}>
                              <div className='w_location'>
                                <div className='loc'>
                                  <img src='/images/pallet_icon.png' alt='' />
                                  <p>Pallets</p>
                                </div>

                                <div className='warehouse_chart'>
                                  {
                                    (getWarehouseData?.stat[w.id]?.pallot == 0 && getWarehouseData?.stat[w.id]?.utilizePallots == 0) ?
                                      <img src='/images/empty_loc_pallet.png' alt='' /> :
                                      <Doughnut data={{
                                        labels: ['Total', 'Utilized'],
                                        datasets: [
                                          {
                                            label: ' ',
                                            data: [getWarehouseData?.stat[w.id]?.pallot, getWarehouseData?.stat[w.id]?.utilizePallots],
                                            backgroundColor: [
                                              '#F0F0F0',
                                              '#57B894',
                                            ],
                                            borderWidth: 1,
                                          },
                                        ],
                                      }} options={options} />
                                  }
                                </div>

                                <div className='w_location_detail mt-2'>
                                  <div>
                                    <div className='dot'></div>
                                    <p>Total <br /> <span>{getWarehouseData?.stat[w.id]?.pallot}</span></p>
                                  </div>
                                  <div>
                                    <div className='dot' style={{ backgroundColor: "#57B894" }}></div>
                                    <p>Utilized <br /> <span>{getWarehouseData?.stat[w.id]?.utilizePallots}</span></p>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <button className='go_warehouse_btn' onClick={() => navigate(`/warehouse/details/${w.id}`)}>Go To Warehouse</button>
                      </Col>
                    )
                  })
                }
              </Row>
          }
        </div>
      </div>
    </div>
  )
}

const LoadingContainer = (props) => (
  <div><Loader /></div>
)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDPEA-Ig4-_6Kf_oa_PHAc6CTZrkEj-ZLU'),
  LoadingContainer: LoadingContainer
})(Warehouses)
