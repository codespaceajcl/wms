import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import { Col, Row, Modal, Container, Spinner } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FiChevronRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import "./StockOut.css";
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronRight, FaChevronLeft, FaEye } from "react-icons/fa";
import { login, materialColorStyles, nomenStyles } from "../../../../Util/Helper";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { availableStockOut, businessTypeWarehouse, callDebug, destinationStockout, getPalletSerialNo, getStockOutPallets, stockOutApi, stockoutbusinessTypeCustomer } from "../../../../Redux/Action/Admin";
import { errorNotify, successNotify } from "../../../../Util/Toast";
import Loader from "../../../../Util/Loader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { allImages } from "../../../../Util/Images";
import { FileUploader } from "react-drag-drop-files";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const StockOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("fifo");
  const [palletTab, setPalletTab] = useState("fifo");
  const [tab2, setTab2] = useState("AUTO");
  const [showCart, setShowCart] = useState(false);
  const [isAllocateDisabled, setIsAllocateDisabled] = useState(true);
  const [issueToFMS, setIssueToFMS] = useState({ value: "no", label: "No" });
  const [getNomenClature, setGetNomenClature] = useState({
    businessTypes: null,
    customer: null,
    warehouse: null,
  });
  const [stockOutForm, setStockoutForm] = useState({
    bilti: '',
    date: '',
    destination: '',
    sendTo: '',
    transactionNumber: '',
    truckNumber: ''
  })
  const [fmsDepartment, setFmsDepartment] = useState({ value: "none", label: "None" })
  const [stockInItemsList, setStockInItemsList] = useState([]);
  const [stockInFaultyItemsList, setStockInFaultyList] = useState([]);
  const [getNomen, setGetNomen] = useState(null);
  const [saveNomenVal, setSaveNomenVal] = useState({});
  const [getIndPallet, setGetIndPallet] = useState({});
  const [addRemoveData, setAddRemoveData] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [previewPdf, setPreviewPdf] = useState('')
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [warehousePallets, setWarehousePallets] = useState([])
  const [showCartDetail, setShowCartDetail] = useState({})
  const [show, setShow] = useState(false)
  const [getPalletManualData, setGetPalletManualData] = useState([])
  const [serialNoText, setSerialNoText] = useState('')
  const [showSerialNos, setShowSerialNos] = useState(null)
  const [file, setFile] = useState(null)
  const [format, setFormat] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { loading: debugLoading, postCallDebug } = useSelector((state) => state.getDebug);
  const { loading: businessLoading, getBusinessWarehouses } = useSelector((state) => state.getBusinessWarehouseType);
  const { loading: stockoutLoading, getstockoutCustomers } = useSelector((state) => state.getCustomersStockout);
  const { loading: desLoading, getDestinationStockout } = useSelector((state) => state.getStockoutDestination);
  const { loading: optionLoading, getAvailableStockOut } = useSelector((state) => state.getStockOutAvailable);
  const { loading, getPalletStockOut } = useSelector((state) => state.stockOutItem);
  const { loading: saveLoading, postStockOut } = useSelector((state) => state.saveStockOut);
  const { loading: serialLoading, postPalletSerial } = useSelector((state) => state.palletSerialNo);

  useEffect(() => {
    setShowSerialNos(postPalletSerial?.serialNos)
  }, [postPalletSerial])

  useEffect(() => {
    return () => {
      dispatch({ type: "STOCK_OUT_PALLET_RESET" })
      setStockoutForm({
        bilti: '',
        date: '',
        destination: '',
        sendTo: '',
        transactionNumber: '',
        truckNumber: ''
      })

      setGetNomenClature({
        businessTypes: null,
        customer: null,
        warehouse: null,
      })

      setStockInItemsList([])
      setStockInFaultyList([])
      setAddRemoveData([])
      setGetIndPallet({})
      setSaveNomenVal({})
      setGetNomen(null)
      setPreviewPdf('')
      setShowPdfModal(false)
      setShowCart(false)
      setTab("fifo")
      setTab2("AUTO")

    }
  }, [])

  useEffect(() => {
    if (postStockOut?.docUrl) {
      setPreviewPdf(postStockOut?.docUrl)
      setShowPdfModal(true)
      dispatch({ type: "STOCK_OUT_RESET" })
    }

    else if (postStockOut?.response) {
      errorNotify(postStockOut?.response)
      dispatch({ type: "STOCK_OUT_RESET" })
    }
  }, [postStockOut])

  useEffect(() => {
    if (getAvailableStockOut) {
      setStockInItemsList(getAvailableStockOut?.response);
      setStockInFaultyList(getAvailableStockOut?.faulty);

      const mergeStock = getAvailableStockOut?.response.concat(
        getAvailableStockOut?.faulty
      );
      setGetNomen(mergeStock);
    }
  }, [getAvailableStockOut]);

  useEffect(() => {
    if (getNomenClature.businessTypes && getNomenClature.customer && getNomenClature.warehouse) {
      const formData = new FormData();
      formData.append("email", login.email);
      formData.append("token", login.token);

      dispatch(availableStockOut(getNomenClature.businessTypes, getNomenClature.warehouse, getNomenClature.customer, formData));
    }
  }, [getNomenClature.businessTypes, getNomenClature.customer, getNomenClature.warehouse]);

  useEffect(() => {
    dispatch(businessTypeWarehouse());
  }, []);

  useEffect(() => {
    if (postCallDebug) {
      successNotify("Issue Resolved Successfully!");
      dispatch({ type: "CALL_DEBUG_RESET" });
    }
  }, [postCallDebug]);

  useEffect(() => {
    if (getPalletStockOut) {
      const pallets = getPalletStockOut?.response?.map((item) => ({
        pallot: item.pallot,
        quantity: item.quantity,
        pallotLocations: getPalletStockOut?.pallotLocations[item.pallot],
      }))
      setWarehousePallets(pallets)
    }
  }, [getPalletStockOut])

  useEffect(() => {
    if (tab === 'fifo') {
      const pallets = warehousePallets?.map((item) => ({
        pallot: item.pallot,
        quantity: item.quantity,
        pallotLocations: getPalletStockOut?.pallotLocations[item.pallot],
      }))

      setWarehousePallets(pallets)
    }
    else if (tab === 'lifo') {
      const pallets = warehousePallets?.map((item) => ({
        pallot: item.pallot,
        quantity: item.quantity,
        pallotLocations: getPalletStockOut?.pallotLocations[item.pallot],
      }))
        .reverse();

      setWarehousePallets(pallets)
    }
  }, [tab])

  useEffect(() => {
    if (addRemoveData?.length === 0) {
      setShowCart(false)
    }
  }, [addRemoveData])

  const warehouseOption = getBusinessWarehouses?.warehouses?.map((w) => {
    return {
      value: w.id,
      label: `${w.name}`,
    };
  });

  const businessTypeOption = getBusinessWarehouses?.businessType?.map((b) => {
    return {
      value: b,
      label: b,
    };
  });

  const businessTypeHandler = (v) => {
    const formData = new FormData();
    formData.append("email", login.email);
    formData.append("token", login.token);

    setGetNomenClature({ ...getNomenClature, businessTypes: v.value });
    dispatch(stockoutbusinessTypeCustomer(formData, v.value));
  };

  const customerOption = getstockoutCustomers?.customers?.map((c) => {
    return {
      value: c.customer,
      label: c.customer,
    };
  });

  const destinationHandler = (v) => {
    setStockoutForm({
      ...stockOutForm,
      destination: v.value
    })

    const data = {
      email: login.email,
      token: login.token,
      destination: v.value,
    };

    const d = JSON.stringify(data);
    dispatch(destinationStockout(d));
  };

  const destinationOption = getDestinationStockout?.response?.map((d) => {
    return {
      value: d.id,
      label: d.sgi ? `${d.name}` : `${d.name}`,
    };
  });

  const issueFleetHandler = (selectedOption) => {
    setIssueToFMS(selectedOption);
    setIsAllocateDisabled(selectedOption.value === "no");
  };

  const partOption = getNomen ? getNomen?.map((n) => {
    return {
      value: n.id,
      label: `${n.partNo} | ${n.nomenclature} | ${n.nsn}`,
    };
  }) : [];

  const nomenClatureHandler = (v) => {
    let skuValue = v.label.split("|");

    setSaveNomenVal({
      ["value"]: skuValue[0],
      ["id"]: v.value,
      ["label"]: v.label,
    });

    const formData = new FormData();
    formData.append("email", login.email);
    formData.append("token", login.token);

    dispatch(getStockOutPallets(v.value, getNomenClature.warehouse, formData));
  };

  const addQuantityHandler = (p) => {
    setGetIndPallet(p);

    const formData = new FormData();
    formData.append("email", login.email)
    formData.append("token", login.token)

    const data = {
      partNo: saveNomenVal.id,
      warehouse: getNomenClature.warehouse,
      pallot: p.pallot
    }

    dispatch(getPalletSerialNo(data, formData))
    setShowModal(true);
  };

  const removeQuantityHandler = (e) => {
    setGetIndPallet({
      ...getIndPallet,
      removeQuantity: e.target.value,
    });
  };

  const addOnRemoveHandler = () => {

    let existPallotIndex = addRemoveData.findIndex((item) => item.getIndPallet.pallot === getIndPallet.pallot)
    let existWarehouseIndex = warehousePallets.findIndex((item) => item.pallot === getIndPallet.pallot)

    if (tab2 === "AUTO") {

      if (getIndPallet.quantity >= parseInt(getIndPallet.removeQuantity)) {

        if (existPallotIndex !== -1) {
          setAddRemoveData((prev) => {
            const updatedData = [...prev];
            updatedData[existPallotIndex].getIndPallet.removeQuantity = parseInt(updatedData[existPallotIndex].getIndPallet.removeQuantity) + parseInt(getIndPallet.removeQuantity)
            return updatedData;
          });

          setWarehousePallets((prev) => {
            const updatedData = [...prev];
            updatedData[existWarehouseIndex].quantity = parseInt(updatedData[existWarehouseIndex].quantity) - parseInt(getIndPallet.removeQuantity)
            return updatedData;
          })
        }
        else {
          setWarehousePallets((prev) => {
            const updatedData = [...prev];
            updatedData[existWarehouseIndex].quantity = parseInt(updatedData[existWarehouseIndex].quantity) - parseInt(getIndPallet.removeQuantity)
            return updatedData;
          })
          setAddRemoveData((prev) => [...prev, { saveNomenVal, getIndPallet }]);
        }
        setShowModal(false)
      }
      else {
        errorNotify("Remove Quantity must be smaller than actual")
      }

    }

    else if (tab2 === "MANUAL") {
      if (getPalletManualData.length > 0) {

        if (existPallotIndex !== -1) {
          setAddRemoveData((prev) => {
            const updatedData = [...prev];
            updatedData[existPallotIndex].getIndPallet.removeQuantity = parseInt(updatedData[existPallotIndex].getIndPallet.removeQuantity) + parseInt(getPalletManualData.length)
            updatedData[existPallotIndex].getIndPallet.serialNos = getPalletManualData
            updatedData[existPallotIndex].getIndPallet.status = "manual"
            return updatedData;
          });

          setWarehousePallets((prev) => {
            const updatedData = [...prev];
            updatedData[existWarehouseIndex].quantity = parseInt(updatedData[existWarehouseIndex].quantity) - parseInt(getPalletManualData.length)
            updatedData[existWarehouseIndex].serialNos = getPalletManualData
            updatedData[existWarehouseIndex].status = "manual"
            return updatedData;
          })
        }
        else {
          setWarehousePallets((prev) => {
            const updatedData = [...prev];
            updatedData[existWarehouseIndex].quantity = parseInt(updatedData[existWarehouseIndex].quantity) - parseInt(getPalletManualData.length)
            updatedData[existWarehouseIndex].serialNos = getPalletManualData
            updatedData[existWarehouseIndex].status = "manual"
            return updatedData;
          })
          setAddRemoveData((prev) => [...prev, { saveNomenVal, getIndPallet }]);
        }
        setShowModal(false)
      }
      else {
        errorNotify("Please Add atleast 1 serialNo")
      }
    }

    setGetPalletManualData([])
    setTab2("AUTO")

  };

  const saveSerialNoHandler = (e) => {
    if (e.target.checked) {
      setGetPalletManualData((prevData) => [...prevData, e.target.value]);
    } else {
      setGetPalletManualData((prevData) => prevData.filter(item => item !== e.target.value));
    }
  }

  const searchSerialHandler = (e) => {
    const getArr = postPalletSerial?.serialNos?.filter((s) => {
      const searchString = e.target.value.toLowerCase();
      return (
        s.serialNo.toLowerCase().includes(searchString)
      );
    });

    setShowSerialNos(getArr)
  }

  const stockOutModel = (
    <Modal
      show={showModal}
      centered
      onHide={() => setShowModal(false)}
      size="lg"
      className="stock_out_modal"
    >
      <Modal.Body>
        <div
          className="stock_out_model_head"
          style={{ backgroundColor: "#003A70" }}
        >
          <div>
            Pallet No: <span>{getIndPallet?.pallot}</span> | Address:
            <span>{getIndPallet?.pallotLocations?.location}</span>
          </div>
          <AiOutlineClose
            onClick={() => setShowModal(!showModal)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="stock_out_search">
          <Row>
            <Col md={8}>
              <div>
                <img src={allImages.search_icon} alt="" />
                <input placeholder="Search by Serial No" onChange={searchSerialHandler} />
              </div>
            </Col>
            <Col md={4}>
              <div>
                <button
                  className={palletTab === "fifo" ? "active" : ""}
                  onClick={() => setPalletTab("fifo")}
                >
                  FIFO
                </button>
                <button
                  className={palletTab === "lifo" ? "active" : ""}
                  onClick={() => setPalletTab("lifo")}
                >
                  LIFO
                </button>
              </div>
            </Col>
          </Row>
        </div>

        <div className="stock_out_quantity">
          <Row className="align-items-end">
            <Col md={6}>
              <label>Quantity</label>
              <div>
                <input
                  placeholder="Enter Quantity"
                  onChange={removeQuantityHandler}
                  disabled={tab2 === "MANUAL" ? true : false}
                />
                <FiChevronRight />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <button
                  className={tab2 === "AUTO" ? "active" : ""}
                  onClick={() => setTab2("AUTO")}
                >
                  <img src={allImages.AutoIcon} /> Auto
                </button>
                <button
                  className={tab2 === "MANUAL" ? "active" : ""}
                  onClick={() => setTab2("MANUAL")}
                >
                  <img src={allImages.manual_icon} /> Manual
                </button>
              </div>
            </Col>
          </Row>
        </div>
        {tab2 === "MANUAL" && (
          <div>
            {serialLoading ? (
              <div className="show_loader">
                <img src={allImages.BrandLoader} alt="" width={100} />
                <p>Manual Serial No Selection Mode</p>
              </div>
            ) : (
              <div className="serial_wrapper">
                <TableContainer>
                  <Table className="stock_out_pallet_table">
                    <TableHead>
                      <TableRow className="">
                        <TableCell></TableCell>
                        <TableCell colSpan={4}>S No.</TableCell>
                        <TableCell colSpan={4}>Serial No</TableCell>
                        <TableCell colSpan={4}>Part No</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        showSerialNos?.map((s, i) => {
                          return (
                            <TableRow>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  onChange={saveSerialNoHandler}
                                  style={{ color: "green" }}
                                  value={s.serialNo}
                                />
                              </TableCell>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell colSpan={2}>{s.serialNo}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell>{saveNomenVal.id}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell>
                                {saveNomenVal.label}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        )}

        {
          tab2 === "AUTO" &&
          <>
            {getIndPallet?.removeQuantity > 0 ? (
              <Container>
                <Row
                  className="justify-content-center my-3"
                  style={{ gap: "10px 0" }}
                >
                  <Col md={5}>
                    <button className="add_btn" onClick={addOnRemoveHandler}>Add</button>
                  </Col>
                  <Col md={5}>
                    <button className="discard_btn" onClick={() => setShowModal(false)}>Discard</button>
                  </Col>
                </Row>
              </Container>
            ) : (
              <div style={{ margin: "60px 0", textAlign: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "600" }}>
                  No Quantity Added
                </p>
              </div>
            )}
          </>
        }

        {
          tab2 === "MANUAL" &&
          <>
            {getPalletManualData?.length > 0 && (
              <Container>
                <Row
                  className="justify-content-center my-3"
                  style={{ gap: "10px 0" }}
                >
                  <Col md={5}>
                    <button className="add_btn" onClick={addOnRemoveHandler}>
                      Add
                    </button>
                  </Col>
                  <Col md={5}>
                    <button className="discard_btn" onClick={() => setShowModal(false)}>Discard</button>
                  </Col>
                </Row>
              </Container>
            )}
          </>
        }
      </Modal.Body>
    </Modal>
  );

  const debugHandler = () => {
    const formData = new FormData();
    formData.append("email", login.email);
    formData.append("token", login.token);

    dispatch(callDebug(formData));
  };

  const removeCartHandler = (r) => {
    let existWarehouseIndex = warehousePallets.findIndex((item) => item.pallot === r?.getIndPallet?.pallot)

    const filterData = addRemoveData?.filter((item) => item?.getIndPallet?.pallot !== r?.getIndPallet?.pallot)
    setAddRemoveData(filterData)

    let removeQuantity = r.getIndPallet.removeQuantity ? r.getIndPallet.removeQuantity : r?.getIndPallet.serialNos?.length

    setWarehousePallets((prev) => {
      const updatedData = [...prev];
      updatedData[existWarehouseIndex].quantity = parseInt(updatedData[existWarehouseIndex].quantity) + parseInt(removeQuantity)
      return updatedData;
    })
  }

  const dispatchHandler = () => {
    const selectedStockOutQuantity = {};

    addRemoveData.forEach((item) => {
      const itemId = item.saveNomenVal.id;
      const palletId = item.getIndPallet.pallot;
      const quantity = item.getIndPallet.removeQuantity;
      const status = item.getIndPallet.status;
      const serialNos = item.getIndPallet.serialNos;

      if (!selectedStockOutQuantity[itemId]) {
        selectedStockOutQuantity[itemId] = {};
      }

      selectedStockOutQuantity[itemId][palletId] = {
        quantity: quantity ? quantity : serialNos.length,
        status: status ? status : "auto",
        serialNos: serialNos ? serialNos : []
      };
    });

    const validateData = (data) => {
      for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === '') {
          throw new Error(`Please filled up all fields`);
        }

        // If the property is an object, recursively validate its properties
        if (typeof data[key] === 'object') {
          validateData(data[key]);
        }
      }
    };

    const data = {
      ...stockOutForm,
      ...getNomenClature,
      fms: issueToFMS.value,
      fmsDepartment: fmsDepartment.value,
      stockOutOrderStatus: tab,
      selectedStockOutQuantity: selectedStockOutQuantity,
      // documentFormat: format,
      username: login.email,
      email: login.email,
      token: login.token,
      // document: file,
    }

    try {
      validateData(data);

      const formData = new FormData();

      formData.append("businessTypes", getNomenClature.businessTypes)
      formData.append("customer", getNomenClature.customer)
      formData.append("warehouse", getNomenClature.warehouse)

      formData.append("bilti", stockOutForm.bilti)
      formData.append("date", stockOutForm.date)
      formData.append("destination", stockOutForm.destination)
      formData.append("sendTo", stockOutForm.sendTo)
      formData.append("transactionNumber", stockOutForm.transactionNumber)
      formData.append("truckNumber", stockOutForm.truckNumber)
      formData.append("seal", stockOutForm.seal)

      formData.append("fms", issueToFMS.value)
      formData.append("fmsDepartment", fmsDepartment.value)
      formData.append("stockOutOrderStatus", tab)
      formData.append("selectedStockOutQuantity", JSON.stringify(selectedStockOutQuantity))
      formData.append("documentFormat", format)
      formData.append("username", login.email)
      formData.append("email", login.email)
      formData.append("token", login.token)
      formData.append("document", file)

      // const d = JSON.stringify(data)
      dispatch(stockOutApi(formData))

    } catch (error) {
      errorNotify(error.message);
    }
  }

  const pageDecrease = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const pageIncrease = () => {
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const CartDetailHandler = (c) => {
    setShowCartDetail(c)
    setShow(true)
  }

  const closeCartHandler = () => {
    setShowCartDetail({})
    setShow(false)
  }

  const modal = <Modal centered className='preview_doc_modal' show={showPdfModal}>
    <Modal.Body>
      <div className='preview_show' style={{ transition: "all 0.3s ease" }}>
        <div className=''>
          <MdClose className='close_icon_pdf' onClick={() => { setShowPdfModal(false), navigate('/wms/dashboard') }} />

          <Document file={previewPdf} onLoadSuccess={onDocumentLoadSuccess} loading={<div style={{ height: "200px" }}> <Loader color={"#fff"} /> </div>}>
            <Page pageNumber={pageNumber} />
          </Document>

          <div className='pdf_chevron'>
            <FaChevronLeft onClick={pageDecrease} />
            <FaChevronRight onClick={pageIncrease} />
          </div>
        </div>

        <div className="download_preview">
          <a href={previewPdf} target="_blank">Print</a>
        </div>
      </div>
    </Modal.Body>
  </Modal>

  const stockOutHandler = (e) => {
    const file = e;

    if (file) {
      const fileType = file.name.split('.')

      setFormat(fileType[fileType.length - 1])
      setFile(file)

      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   const base64Image = reader.result.split(',')[1];
      //   setFile(base64Image);
      // };
      // reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {stockOutModel}
      {modal}
      <Breadcrumbs list={["Dashboard", "Stock Out"]} />

      <div className="material_main">
        <h5>
          <BsArrowLeftShort onClick={() => navigate(-1)} /> Stock Out (SO)
          <div
            className="debug"
            onClick={debugHandler}
            style={debugLoading ? { cursor: "wait" } : null}
          >
            <img src={allImages.debug_icon} alt="" /> Debug
          </div>
        </h5>
        <p>Please fill out this form with the required information</p>

        <Row className="mt-5 justify-content-center">
          <Col md={4}>
            <label className="react_select_label">
              Source Warehouse <span>*</span>
            </label>
            <Select
              options={warehouseOption}
              isLoading={businessLoading}
              placeholder="Select Warehouse"
              styles={materialColorStyles}
              onChange={(w) => {
                let idString = w.value.toString();
                setGetNomenClature({ ...getNomenClature, warehouse: idString })
              }

              }
            />
          </Col>
          <Col md={4}>
            <label className="react_select_label">
              Company <span>*</span>
            </label>
            <Select
              options={businessTypeOption}
              isLoading={businessLoading}
              placeholder="Select Business"
              styles={materialColorStyles}
              onChange={businessTypeHandler}
            />
          </Col>
          <Col md={4}>
            <label className="react_select_label">
              Select Destination <span>*</span>
            </label>
            <Select
              options={[
                { value: "warehouse", label: "Warehouse" },
                { value: "consignee", label: "consignee" },
              ]}
              placeholder="Select Destination"
              styles={materialColorStyles}
              onChange={destinationHandler}
            />
          </Col>
          <Col md={4} className="mt-2">
            <label className="react_select_label">
              Destination Warehouse<span>*</span>
            </label>
            <Select
              options={destinationOption}
              isLoading={desLoading}
              placeholder="Select"
              styles={materialColorStyles}
              onChange={(v) => setStockoutForm({
                ...stockOutForm,
                sendTo: v.value
              })}
            />
          </Col>
          <Col md={4} className="mt-2">
            <label className="react_select_label">
              Customer<span>*</span>
            </label>
            <Select
              options={customerOption}
              isLoading={stockoutLoading}
              placeholder="Select"
              styles={materialColorStyles}
              onChange={(w) =>
                setGetNomenClature({ ...getNomenClature, customer: w.value })
              }
            />
          </Col>
          <Col md={4} className="mt-2 input_field">
            <label>
              Dispatch Date <span>*</span>
            </label>
            <input type={"Date"} value={stockOutForm.date} onChange={(e) => setStockoutForm({
              ...stockOutForm,
              date: e.target.value
            })} />
          </Col>
          <Col md={4} className="mt-2 input_field">
            <label>
              Builty Number <span>*</span>
            </label>
            <input type={"text"} placeholder="Enter Builty Number" value={stockOutForm.bilti} onChange={(e) => setStockoutForm({
              ...stockOutForm,
              bilti: e.target.value
            })} />
          </Col>
          <Col md={4} className="mt-2 input_field">
            <label>
              Seal Number <span>*</span>
            </label>
            <input type={"text"} placeholder="Enter Seal Number" value={stockOutForm.seal} onChange={(e) => setStockoutForm({
              ...stockOutForm,
              seal: e.target.value
            })} />
          </Col>
          <Col md={4} className="mt-2 input_field">
            <label>
              PO/Order Number <span>*</span>
            </label>
            <input type={"text"} placeholder="Enter PO/Order Number" value={stockOutForm.transactionNumber} onChange={(e) => setStockoutForm({
              ...stockOutForm,
              transactionNumber: e.target.value
            })} />
          </Col>
          <Col md={4} className="mt-2 input_field">
            <label>
              Vehicle Number <span>*</span>
            </label>
            <input type={"text"} placeholder="Enter Vehicle Number" value={stockOutForm.truckNumber} onChange={(e) => setStockoutForm({
              ...stockOutForm,
              truckNumber: e.target.value
            })} />
          </Col>
          <Col md={4} className="mt-2">
            <label className="react_select_label">
              Issue to Fleet Management (FMS) Module <span>*</span>
            </label>
            <Select
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              placeholder="Select"
              styles={materialColorStyles}
              onChange={issueFleetHandler}
            />
          </Col>
          <Col md={4} className="mt-2">
            <label className="react_select_label">
              Allocate To Department (FMS) <span>*</span>
            </label>
            <Select
              options={businessTypeOption}
              isLoading={businessLoading}
              placeholder="Select"
              styles={materialColorStyles}
              isDisabled={isAllocateDisabled}
              className={isAllocateDisabled ? "disabled-select" : ""}
              onChange={(v) => setFmsDepartment(v)}
            />
          </Col>
        </Row>

        <hr />

        <Row className="mb-5">
          <Col md={12}>
            <label className="react_select_label">
              Part No/ SKU/ NSN/ Nomenclature <span>*</span>
            </label>
            <Select
              styles={nomenStyles}
              options={partOption}
              isLoading={optionLoading}
              onChange={nomenClatureHandler}
              placeholder="Search Part No/Noms/NSN"
              className="react_select_inhouse stock_out"
            />
          </Col>
        </Row>

        <div className="stock_out_search mb-3">
          <Row>
            <Col md={4}>
              <div>
                <button
                  className={tab === "fifo" ? "active" : ""}
                  onClick={() => setTab("fifo")}
                >
                  FIFO
                </button>
                <button
                  className={tab === "lifo" ? "active" : ""}
                  onClick={() => setTab("lifo")}
                >
                  LIFO
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="show_stockout_result">
          <div className="stockout_result_head">
            <div>
              <p>Search Result</p>
              <h6>{saveNomenVal.value}</h6>
            </div>
          </div>

          <div className="stockout_show_result">
            {addRemoveData?.length === 0 ? (
              <div className="ware_pallet">
                <p>Warehouse Pallets</p>

                <img src={allImages.empty_cart} alt="" />

              </div>
            ) : (
              <div className="ware_pallet_fill_cart">
                <p>Warehouse Pallets</p>

                <div
                  style={{ position: "relative" }}
                  onClick={() => setShowCart(!showCart)}
                >
                  <img src={allImages.file_cart} alt="" />
                  <span>{addRemoveData?.length}</span>
                </div>
              </div>
            )}

            <div className="mt-4 mx-2 px-2">
              <Row style={{ transition: "all 0.3s ease", gap: "10px 0" }}>
                <Col md={showCart ? 7 : 12}>
                  {
                    loading ? <Loader color={"#fff"} /> :
                      <Row className={showCart ? "adjust_height" : ""}>
                        {warehousePallets?.map((p) => {
                          return (
                            <Col md={showCart ? 4 : 2} sm={3} xs={6} onClick={() => addQuantityHandler(p)}>
                              <div className="stockout_pallet_box">
                                <div>
                                  <img
                                    src={allImages.filled_rack}
                                    alt=""
                                    className="rack"
                                  />
                                  <span>{p?.pallotLocations?.location}</span>
                                </div>

                                <h6>
                                  <span>{p.quantity}</span> <br />
                                  {p.pallot}
                                </h6>

                                <div className="location">
                                  <Row>
                                    <Col md={3} xs={3}>
                                      <img
                                        src={allImages.from_loc}
                                        className="f_loc"
                                      />
                                    </Col>
                                    <Col md={9} xs={9}>
                                      <p> {p?.pallotLocations?.location} </p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={3} xs={3}>
                                      <img src={allImages.to_loc} />
                                    </Col>
                                    <Col md={9} xs={9}>
                                      <p> {p?.pallotLocations?.tag} </p>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                  }
                </Col>
                {showCart && (
                  <Col md={5}>
                    <div className="main_cart">
                      <h4>Cart</h4>

                      {
                        show ? <div className="cart_body">
                          <div className="cart_dsc">
                            <IoIosCloseCircleOutline className="close_cart_detail" onClick={closeCartHandler} />
                            <div className="show_rack">
                              <img src={allImages.filled_rack} alt="" />
                              <span>{showCartDetail?.getIndPallet?.pallot}</span>
                            </div>
                            <div className="added_cart">
                              <img
                                src={allImages.correct_icon}
                                alt=""
                              />
                              <p>Added To Cart</p>
                            </div>
                            <div className="cart_detail">
                              <h6>Pallet No</h6>
                              <p>{showCartDetail?.getIndPallet?.pallot}</p>
                            </div>
                            <div className="cart_detail">
                              <h6>Description</h6>
                              <p>{showCartDetail?.saveNomenVal?.value}</p>
                            </div>
                            <div className="cart_detail">
                              <h6>Total Qty.</h6>
                              <p>{showCartDetail?.getIndPallet?.quantity}</p>
                            </div>
                            <div className="cart_detail">
                              <h6>Remove Qty.</h6>
                              <p>{showCartDetail?.getIndPallet?.removeQuantity ? showCartDetail?.getIndPallet?.removeQuantity :
                                showCartDetail?.getIndPallet.serialNos?.length}</p>
                            </div>
                            <div className="cart_detail">
                              <h6>Location</h6>
                              <p>{showCartDetail?.getIndPallet?.pallotLocations?.location}</p>
                            </div>
                          </div>
                        </div> :
                          <div className="cart_body">
                            {
                              addRemoveData?.map((r) => {
                                return (
                                  <div className="cart_dsc">
                                    <h6 className="nomen_value">{r.saveNomenVal.value}</h6>
                                    <FaEye className="show_cart_detail" onClick={() => CartDetailHandler(r)} />
                                    <div className="cart_detail">
                                      <h6>Part No</h6>
                                      <p>{r.getIndPallet.pallot}</p>
                                    </div>
                                    <div className="cart_detail">
                                      <h6>Quantity</h6>
                                      <p>{r.getIndPallet.removeQuantity ? r.getIndPallet.removeQuantity : r?.getIndPallet.serialNos?.length}</p>
                                    </div>
                                    <div>
                                      <button className="remove_btn" onClick={() => removeCartHandler(r)}>
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                      }
                    </div>
                  </Col>
                )}
              </Row>

              {/* { */}
              {/* addRemoveData?.length > 0 && */}
              <Row className='file_upload_handler' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                <Col md={12}>
                  <FileUploader handleChange={stockOutHandler} name="file"
                    // types={["pdf", "doc", "docx", "png", "jpg", "jpeg"]} 
                    label="Attached StockOut Document" />
                  <img src={allImages.stock_doc_icon} />
                </Col>
              </Row>
              {/* } */}

              {addRemoveData?.length > 0 && (
                <Row
                  className="mt-3 btn_actions"
                  style={{ gap: "10px 0" }}
                >
                  <Col md={6}>
                    <button onClick={dispatchHandler}>
                      {saveLoading ? <Spinner animation="border" size="sm" /> : "Dispatch"}
                    </button>
                  </Col>
                  <Col md={6}>
                    <button onClick={() => navigate('/wms/dashboard')}>Discard</button>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StockOut;