import React, { useEffect, useState } from 'react';
import './WarehouseDetail.css';
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Col, Container, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { login, materialColorStyles } from "../../../../Util/Helper";
import Select from 'react-select'
import {
  createWarehouseCustomStore, createWarehousePallet,
  createWarehouseStages, getWarehouseDetail, getWarehouseStageItem
} from '../../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../Util/Loader';
import { errorNotify, successNotify } from '../../../../Util/Toast';
import { allImages } from '../../../../Util/Images';

const WarehouseDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [AddStore, setAddStore] = useState(false)
  const [AddStages, setAddStages] = useState(false)
  const [AddPallet, setAddPallet] = useState(false)
  const [pallets, setPallets] = useState(null)
  const [noOfStages, setNoOfStages] = useState(null)
  const [stageData, setStageData] = useState({})
  const [stageShow, setStageShow] = useState(false)

  const { loading, getWarehouseDetailsData } = useSelector((state) => state.postWarehouseDetail)
  const { loading: palletLoading, createWarehousePalletsData } = useSelector((state) => state.postWarehousePalletsData)
  const { loading: stagesLoading, createWarehouseStagesData } = useSelector((state) => state.postWarehouseStagesData)
  const { loading: storeLoading, createWarehouseCustomStoreData } = useSelector((state) => state.postWarehouseCustomStoreData)
  const { loading: stageItemLoading, stageItemData } = useSelector((state) => state.getWarehouseStageItem)

  useEffect(() => {
    if (createWarehousePalletsData?.response === 'success') {
      successNotify("Pallets Added Successfully!")
      dispatch({ type: "CREATE_WAREHOUSE_PALLETS_RESET" })

      setAddPallet(false)


      const formData = new FormData()
      formData.append("email", login.email)
      formData.append("token", login.token)

      dispatch(getWarehouseDetail(id, formData))
    }

    else if (createWarehouseStagesData?.response === 'success') {
      successNotify("Stages Added Successfully!")
      dispatch({ type: "CREATE_WAREHOUSE_STAGES_RESET" })

      setAddStages(false)

      const formData = new FormData()
      formData.append("email", login.email)
      formData.append("token", login.token)

      dispatch(getWarehouseDetail(id, formData))
    }

    else if (createWarehouseCustomStoreData?.response === 'success') {
      successNotify("Store Added Successfully!")
      dispatch({ type: "CREATE_WAREHOUSE_CUSTOM_STORE_RESET" })

      setAddStore(false)

      const formData = new FormData()
      formData.append("email", login.email)
      formData.append("token", login.token)

      dispatch(getWarehouseDetail(id, formData))
    }
  }, [createWarehousePalletsData, createWarehouseStagesData, createWarehouseCustomStoreData])

  useEffect(() => {
    const formData = new FormData()
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(getWarehouseDetail(id, formData))
  }, [])

  const addPalletHandler = () => {

    const data = {
      email: login.email,
      token: login.token,
      noOfPallets: pallets,
      warehouse: id
    }

    dispatch(createWarehousePallet(data))
  }

  const addStageHandler = () => {
    const data = {
      email: login.email,
      token: login.token,
      noOfStages: noOfStages,
      warehouse: id
    }

    dispatch(createWarehouseStages(data))
  }

  const [storageType] = useState([
    { value: 'ambient', label: 'Ambient - Natural Temperature' },
    { value: 'air-condition', label: 'Air-Condition 56-75℉' },
    { value: 'refrigerated', label: 'Refrigerated 32-55℉' }
  ])

  const [noOfStores, setNoOfStores] = useState(null)

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

  const addStoreHandler = () => {
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

    finalData['noOfStores'] = noOfStores;
    finalData['warehouse'] = id;
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

    dispatch(createWarehouseCustomStore(d))

  }

  const stageModalHandler = (s) => {
    setStageData(s)

    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)

    dispatch(getWarehouseStageItem(s.id, id, formData))
    setStageShow(true)
  }

  const storeModal = (
    <Modal show={AddStore}
      centered onHide={() => setAddStore(!AddStore)} size='lg' className='warehouse_add'>
      <Modal.Body>
        <div className='warehouse_add_head' style={{ backgroundColor: "#003A70" }}>
          <div>
            Add Store
          </div>

          <AiOutlineClose onClick={() => setAddStore(!AddStore)} style={{ cursor: "pointer" }} />
        </div>

        <div className='warehouse_store_add_detail'>

          <div className='input_field'>
            <label>No of Stores <span>*</span></label>
            <input placeholder='Enter no of stores' type='number'
              onChange={handleNoOfStores} value={noOfStores} />
          </div>

          <hr />

          {
            noOfTypeRack?.length > 0 && noOfTypeRack?.map((r, index) => {
              return (
                <div className='no_of_store_type'>

                  <div className='input_field'>
                    <label>Storage Type {index + 1} <span>*</span> </label>
                    <Select
                      options={storageType}
                      placeholder={"Storage Type"}
                      styles={materialColorStyles}
                      onChange={(type) => handleStorageTypeChange(index, `storageType${index + 1}`, type.value)}
                    />
                  </div>

                  <div className='input_field mt-3'>
                    <label>No of Rack {index + 1} <span>*</span> </label>
                    <input placeholder="Enter No. of Rack"
                      type={'number'}
                      onChange={(e) => handleNoOfRackChange(index, `noOfRack${index + 1}`, e.target.value)}
                    />
                  </div>

                  <hr />

                  <div>
                    {
                      noOfFloorLocation[index]?.length > 0 && noOfFloorLocation[index]?.map((l, locIndex) => {
                        return (
                          <div className='floor_loc'>
                            <div className='input_field'>
                              <label>No of Floor {index + 1} Rack {locIndex + 1} <span>*</span> </label>
                              <input placeholder='Enter no of Floor' type='number'
                                onChange={(e) => handleFloorLocationChange(index, locIndex, `noOfFloor${index + 1}Rack${locIndex + 1}`, e.target.value)} />
                            </div>
                            <div className='input_field'>
                              <label>No of Location {index + 1} Rack {locIndex + 1} <span>*</span> </label>
                              <input placeholder='Enter no of Locations' type='number'
                                onChange={(e) => handleFloorLocationChange(index, locIndex, `noOfLocation${index + 1}Rack${locIndex + 1}`, e.target.value)} />
                            </div>
                          </div>
                        )
                      })
                    }
                    <hr />
                  </div>
                </div>
              )
            })
          }

          <button className='submit_btn' type='submit' style={{ padding: "6px 0" }} onClick={addStoreHandler}>
            {storeLoading ? <Spinner animation='border' size='sm' /> : "Add"}</button>
        </div>
      </Modal.Body>
    </Modal >
  )

  const stageModal = (
    <Modal show={AddStages}
      centered onHide={() => setAddStages(!AddStages)} size='md' className='warehouse_add'>
      <Modal.Body>
        <div className='warehouse_add_head' style={{ backgroundColor: "#003A70" }}>
          <div>
            Add Stage
          </div>
          <AiOutlineClose onClick={() => setAddStages(!AddStages)} style={{ cursor: "pointer" }} />
        </div>

        <div className='warehouse_store_add_detail'>
          <div className='input_field'>
            <label>No of Stages <span>*</span></label>
            <input placeholder='Enter no of stages' type='number'
              onChange={(e) => setNoOfStages(e.target.value)} />
          </div>
          <hr />
          <button className='submit_btn' type='submit' style={{ padding: "6px 0" }} onClick={addStageHandler}>
            {stagesLoading ? <Spinner animation='border' size='sm' /> : "Add"} </button>
        </div>
      </Modal.Body>
    </Modal>
  )

  const palletModal = (
    <Modal show={AddPallet}
      centered onHide={() => setAddPallet(!AddPallet)} size='md' className='pallet_modal_main'>
      <Modal.Body>
        <div className='store_head'>
          {getWarehouseDetailsData?.getStore?.warehouse}
        </div>
        <div className='text-end'>
          <AiOutlineClose onClick={() => setAddPallet(!AddPallet)} style={{ cursor: "pointer" }} />
        </div>

        <div className='pallet_img'>
          <img src={allImages.pallet_modal_img} alt='' />

          <div> <h4>Generate Pallets</h4>
            <p>Pallets Number will be generated
              automatically</p>
          </div>
        </div>

        <div className='pallet_input_field'>
          <div className='input_field'>
            <input placeholder='Enter no of pallets' type='number'
              onChange={(e) => setPallets(e.target.value)} />
          </div>
          <button className='submit_btn' type='submit' style={{ padding: "6px 0" }} onClick={() => addPalletHandler()}>
            {palletLoading ? <Spinner animation='border' size='sm' /> : "Add"}</button>
        </div>
      </Modal.Body>
    </Modal>
  )

  const stageTableModal = (
    <Modal show={stageShow}
      centered onHide={() => setStageShow(!stageShow)} size='lg' className='pallet_modal_main stage_table'>
      <Modal.Body>
        <div className='store_head'>
          {stageData?.warehouse} | {stageData?.sgi}
        </div>
        <div className='text-end'>
          <AiOutlineClose onClick={() => setStageShow(!stageShow)} style={{ cursor: "pointer" }} />
        </div>

        <div className='stage_item_table'>
          <Table responsive={stageItemData?.response?.length > 0 ? true : false}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Serial No</th>
                <th>Part No</th>
                <th>Pallet No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stageItemData?.response?.map((s, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{s.serialNo}</td>
                    <td>{s.partNo}</td>
                    <td>{s.businessType}</td>
                    <td>{s.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {
            stageItemLoading && <Loader />
          }
          {
            stageItemData?.response?.length === 0 && <p style={{ textAlign: "center" }}>No Data found</p>
          }
        </div>
      </Modal.Body>
    </Modal>
  )

  return (
    <div className='warehouse_detail_main'>
      {storeModal}
      {stageModal}
      {palletModal}
      {stageTableModal}

      {
        loading ? <Loader color="#fff" /> :
          <Container>
            <div className="search_box mob_view">
              <img src={allImages.search_icon} alt="" />
              <input placeholder="search anything" />
            </div>

            <div className='warehouse_head'>
              <h6> <BsArrowLeft onClick={() => navigate('/wms/warehouses')} /> {getWarehouseDetailsData?.getStore?.warehouse} </h6>

              <div className='d-flex flex-wrap justify-content-center' style={{ gap: "10px" }}>
                <button onClick={() => setAddStore(true)}><AiOutlinePlus /> Add Store</button>
                <button onClick={() => setAddStages(true)}><AiOutlinePlus /> Add Stage</button>
                <button onClick={() => setAddPallet(true)}><AiOutlinePlus /> Add Pallet</button>
              </div>
            </div>

            <Row className='mb-4 justify-content-center'>
              <Col md={8}>
                <Row style={{ gap: "15px 0" }}>
                  {
                    getWarehouseDetailsData?.getStore?.response?.map((store) => {
                      return (
                        <Col md={6} sm={6}>
                          <div className='warehouse_detail_boxes' onClick={() => navigate(`/wms/warehouse/details/location/${store.id}`, { state: { warehouseId: id } })}>
                            {
                              store?.storageType === "ambient" ?
                                <img src={allImages.AmbientIcon} alt='' /> :
                                <img src={allImages.ConditionIcon} alt='' />
                            }
                            <h6> {store?.storageType === "ambient" ? store.storageType : store.storageType}</h6>
                            <div>
                              {store?.sgi}
                            </div>
                          </div>
                        </Col>
                      )
                    })
                  }
                  {
                    getWarehouseDetailsData?.getStages?.response?.map((stage) => {
                      return (
                        <Col md={6} sm={6}>
                          <div className='warehouse_detail_boxes' onClick={() => stageModalHandler(stage)}>
                            <img src={allImages.stage_icon} alt='' />
                            <h6>Stage</h6>
                            <div>
                              {stage?.sgi}
                            </div>
                          </div>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Col>
              <Col md={4} sm={8}>
                <div className='warehouse_detail_boxes_right'>
                  <img src={allImages.pallet_img} alt='' />
                  <div>
                    <p>Total Available Pallets</p>
                    <h4>{getWarehouseDetailsData?.getAvialablePallots?.response[0]}</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      }
    </div>
  )
}
export default WarehouseDetail;