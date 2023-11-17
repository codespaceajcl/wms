import React from 'react';
import Lottie from 'react-lottie';
import lottie_truck from "../../../../Apis/lottie_truck.json";
import lottie_ok from "../../../../Util/Lottie/Lottie_ok.json";
import { Col, Row } from 'react-bootstrap';

const GridView = ({ revertModal, setRevertModal }) => {

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

  return (
    <div>
      <Row>
        <Col md={4}>
          <div className='in_transit'>
            <div className='status'>
              <h6>Status <br /> <span>In-Transit</span></h6>
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
                  <p>001</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='upload_dc'> <img src='/images/upload.png' alt='' /> Upload DC</button>
                <button onClick={setRevertModal} className='revert'> <img src='/images/revert.png' alt='' /> Revert</button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className='in_transit download'>
            <div className='status'>
              <h6>Status <br /> <span>Completed</span></h6>
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
                  <p>002</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='download'> <img src='/images/download.png' alt='' /> Download</button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className='in_transit'>
            <div className='status'>
              <h6>Status <br /> <span>In-Transit</span></h6>
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
                  <p>001</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='upload_dc'> <img src='/images/upload.png' alt='' /> Upload DC</button>
                <button onClick={setRevertModal} className='revert'> <img src='/images/revert.png' alt='' /> Revert</button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className='in_transit download'>
            <div className='status'>
              <h6>Status <br /> <span>Completed</span></h6>
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
                  <p>002</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='download'> <img src='/images/download.png' alt='' /> Download</button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className='in_transit'>
            <div className='status'>
              <h6>Status <br /> <span>In-Transit</span></h6>
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
                  <p>001</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='upload_dc'> <img src='/images/upload.png' alt='' /> Upload DC</button>
                <button onClick={setRevertModal} className='revert'> <img src='/images/revert.png' alt='' /> Revert</button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className='in_transit download'>
            <div className='status'>
              <h6>Status <br /> <span>Completed</span></h6>
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
                  <p>002</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Origin</h6>
                </Col>
                <Col md={8}>
                  <p>PAKISTANSADEGH ABAD64350_02 | SSC Sadiqabad</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Destination</h6>
                </Col>
                <Col md={8}>
                  <p>Engro Fertilizer</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>DC No.</h6>
                </Col>
                <Col md={8}>
                  <p>212092023162642</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Order No.</h6>
                </Col>
                <Col md={8}>
                  <p><a href=''>
                    20230912-PTTS-1293</a></p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Vehicle No</h6>
                </Col>
                <Col md={8}>
                  <p>-----</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Date</h6>
                </Col>
                <Col md={8}>
                  <p>23-05-03</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <h6>Requested By</h6>
                </Col>
                <Col md={8}>
                  <p>Fahad.baig@ajcl.net</p>
                </Col>
              </Row>

              <div className='d-flex justify-content-between' style={{ gap: "5px" }}>
                <button className='download'> <img src='/images/download.png' alt='' /> Download</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default GridView
