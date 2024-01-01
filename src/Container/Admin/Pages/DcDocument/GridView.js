import React, { useRef } from 'react';
import Lottie from 'react-lottie';
import lottie_truck from "../../../../Util/Lottie/Lottie_truck.json";
import lottie_ok from "../../../../Util/Lottie/Lottie_ok.json";
import { Col, Row } from 'react-bootstrap';
import Loader from '../../../../Util/Loader';

const GridView = ({ setGetDc, setShowConfirm, setUploadFile, setGetRevert, loading, pageNum, setPageNum, showNext, getDcData, revertModal, setRevertModal }) => {

  const fileInputRef = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_truck,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const successOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_ok,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const uploadRef = (c) => {
    fileInputRef.current.click();
    setGetDc(c)
  }

  const uploadDcHandler = (e) => {
    const file = e.target.files[0]
    setUploadFile(file)
    setShowConfirm(true)
  }

  const revertHandler = (c) => {
    setGetRevert(c)
    setRevertModal(true)
  }

  return (
    <div>
      {
        loading ? <div className='my-5'> <Loader /> </div> :
          <Row>
            {
              getDcData?.response?.map((d, i) => {
                if (d.status === 'In-transit') {
                  return (
                    <Col md={4}>
                      <div className='in_transit'>
                        <div className='status'>
                          <h6>Status <br /> <span>{d.status}</span></h6>
                          <Lottie options={defaultOptions}
                            height={30}
                            width={50}
                            style={{ margin: "0" }}
                          />
                        </div>

                        <div className='data'>
                          <Row>
                            <Col md={4}>
                              <h6>S.No</h6>
                            </Col>
                            <Col md={8}>
                              <p>{i + 1}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Origin</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.origin}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Destination</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.destination}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>DC No.</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.dc}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Transactional No.</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.transactionalNumber}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Vehicle No</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.vehicleNumber}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Date</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.date}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Requested By</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.transactionBy}</p>
                            </Col>
                          </Row>

                          <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                            <button className='upload_dc' onClick={() => uploadRef(d)}>
                              <input ref={fileInputRef} onChange={uploadDcHandler} type='file' style={{ display: "none" }} />
                              Upload DC
                            </button>
                            <button className='revert' onClick={() => revertHandler(d)}>Revert</button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                }
                else {
                  return (
                    <Col md={4}>
                      <div className='in_transit download'>
                        <div className='status'>
                          <h6>Status <br /> <span>{d.status}</span></h6>
                          <Lottie options={successOptions}
                            height={30}
                            width={60}
                            style={{ margin: "0" }}
                          />
                        </div>

                        <div className='data'>
                          <Row>
                            <Col md={4}>
                              <h6>S.No</h6>
                            </Col>
                            <Col md={8}>
                              <p>{i + 1}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Origin</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.origin}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Destination</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.destination}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>DC No.</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.dc}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Transactional No.</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.transactionalNumber}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Vehicle No</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.vehicleNumber}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Date</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.date}</p>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <h6>Requested By</h6>
                            </Col>
                            <Col md={8}>
                              <p>{d.transactionBy}</p>
                            </Col>
                          </Row>

                          <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                            <a href={d.signedDoc} target="_blank" className='download'> <img src='/images/download.png' alt='' /> Download </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                }
              })
            }
          </Row>
      }

      <div className='pagination_div'>
        {
          pageNum > 1 &&
          <h6 onClick={() => setPageNum(pageNum - 1)}>Previous</h6>
        }
        <p>Pg No: {pageNum}</p>

        {
          showNext &&
          <h6 onClick={() => setPageNum(pageNum + 1)}>Next</h6>
        }
      </div>
    </div>
  )
}

export default GridView
