import React from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { IoCloseCircleOutline } from "react-icons/io5";
import './Chat.css';
import { chatOpenStatus } from '../../../../Redux/Action/Chat';
import { useDispatch } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { BsThreeDots } from "react-icons/bs";
import { useState } from 'react';
import { MdBlockFlipped } from "react-icons/md";

const Chat = () => {
  const dispatch = useDispatch();
  const [showMoreFile, setShowMoreFile] = useState(false)
  const [showRightProfile, setShowRightProfile] = useState(false)

  const closeChatHandler = () => {
    dispatch(chatOpenStatus(false))
  }

  return (
    <div className='show_chat'>
      <Row>
        <Col md={showRightProfile ? 8 : 12} className='pe-0' style={{ transition: "all 0.3s ease" }}>
          <div className='chating_box'>
            <div className='chat_user_detail_show'>
              <div className='d-flex align-items-center' style={{ gap: "10px" }}>
                <img src='/images/chat_img2.png' alt='' style={{ cursor: "pointer" }}
                  onClick={() => setShowRightProfile(!showRightProfile)} />
                <div>
                  <h6>Summit Roy</h6>
                  <p> <span className='dot'></span> Active Now </p>
                </div>
              </div>
              <div>
                <IoCloseCircleOutline onClick={closeChatHandler} />
              </div>
            </div>

            <div className='msgs_show'>
              <Row className='sender_msg_shown'>
                <Col md={2}>
                  <img src='/images/chat_img2.png' />
                </Col>
                <Col md={7}>
                  <div>
                    Got it. And what's your take on incorporating animations? I've seen them on
                    many sites lately.
                  </div>
                  <span>
                    11:20 AM
                  </span>
                </Col>
              </Row>
              <Row className='receiver_msg_shown'>
                <Col md={7}>
                  <div>
                    Animations can enhance user engagement, but use them judiciously. Subtle animations
                    for transitions or highlighting elements can make the site feel dynamic without
                    overwhelming users.
                  </div>
                  <span>
                    11:20 AM
                  </span>
                </Col>
                <Col md={2}>
                  <img src='/images/user_img.png' />
                </Col>
              </Row>
              <Row className='sender_msg_shown'>
                <Col md={2}>
                  <img src='/images/chat_img2.png' />
                </Col>
                <Col md={7}>
                  <div>
                    Have a good day!
                  </div>
                  <span>
                    11:20 AM
                  </span>
                </Col>
              </Row>
              <Row className='receiver_msg_shown'>
                <Col md={7}>
                  <div>
                    ok
                  </div>
                  <span>
                    11:20 AM
                  </span>
                </Col>
                <Col md={2}>
                  <img src='/images/user_img.png' />
                </Col>
              </Row>
            </div>
            <div className={showRightProfile ? 'send_msg_box show' : 'send_msg_box'}>
              <Row className='justify-content-center'>
                <Col md={9}>
                  <textarea rows={3}></textarea>

                  <div>
                    <div>
                      <img src='/images/emoji_icon.png' alt='' />
                      <img src='/images/upload_img_icon.png' alt='' />
                      <img src='/images/upload_stuff_icon.png' alt='' />
                    </div>
                    <img src='/images/send_msg.png' alt='' />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col md={showRightProfile ? 4 : 0} style={showRightProfile ? { display: "block" } : { display: "none" }} className='ps-0'>
          <div className='chating_user_box'>
            <div className='close_right_box'>
              <IoCloseCircleOutline onClick={() => setShowRightProfile(false)} />
            </div>

            <div className='sender_details'>
              <img src='/images/chat_img2.png' alt='' />
              <h6>Summit Roy</h6>
              <p>Supply Chain Executive</p>
            </div>

            <div className='profile_details settings user_notification'>
              <div className='view_links'> <div style={{ color: "#000", fontWeight: "600" }}> Notifications </div>
                <div>
                  <span>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      defaultChecked
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className='user_files_given'>
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Recent Files <span>(25 files)</span></Accordion.Header>
                  <Accordion.Body>
                    <div className='user_pdfs'>
                      <div>
                        <img src='/images/pdf_icon.png' alt='' />
                        <h6>Content.pdf</h6>
                      </div>
                      <div>
                        <BsThreeDots />
                      </div>
                    </div>
                    <div className='user_pdfs'>
                      <div>
                        <img src='/images/pdf_icon.png' alt='' />
                        <h6>Branding.pdf</h6>
                      </div>
                      <div>
                        <BsThreeDots />
                      </div>
                    </div>
                    <div className='user_pdfs'>
                      <div>
                        <img src='/images/pdf_icon.png' alt='' />
                        <h6>Design changes.pdf</h6>
                      </div>
                      <div>
                        <BsThreeDots />
                      </div>
                    </div>
                    {
                      showMoreFile && <>
                        <div className='user_pdfs'>
                          <div>
                            <img src='/images/pdf_icon.png' alt='' />
                            <h6>Content.pdf</h6>
                          </div>
                          <div>
                            <BsThreeDots />
                          </div>
                        </div>
                        <div className='user_pdfs'>
                          <div>
                            <img src='/images/pdf_icon.png' alt='' />
                            <h6>Branding.pdf</h6>
                          </div>
                          <div>
                            <BsThreeDots />
                          </div>
                        </div>
                      </>
                    }
                    <span onClick={() => setShowMoreFile(!showMoreFile)}>
                      {showMoreFile ? 'Show less' : 'Show more'}
                    </span>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Images <span>(12 files)</span></Accordion.Header>
                  <Accordion.Body>
                    <div className='user_files'>
                      <img src='/images/user_file_img.png' />
                      <img src='/images/user_file_img2.png' />
                      <img src='/images/user_file_img.png' />
                      <img src='/images/user_file_img2.png' />
                      <img src='/images/user_file_img.png' />
                      <img src='/images/user_file_img2.png' />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className='user_blocked'>
              <button> <MdBlockFlipped /> Block Summit </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Chat
