import React, { useState } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import lottie_msg from "../../../../Util/Lottie/lottie_msg.json";
import Lottie from 'react-lottie';
import './Message.css';
import { AiOutlinePlus } from "react-icons/ai";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import { chatOpenStatus } from '../../../../Redux/Action/Chat';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdClose } from "react-icons/md";
import { Modal } from 'react-bootstrap';

const Message = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpenChat } = useSelector((state) => state.ChatOpen)
  const [newChatModal, setNewChatModal] = useState(false)

  const openChatHandler = () => {
    dispatch(chatOpenStatus(true))
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_msg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const onMessageHandler = () => {
    setNewChatModal(!newChatModal)
  }

  const modal = (
    <Modal centered show={newChatModal} onHide={() => setNewChatModal(false)} size='sm' className="new_chat">
      <Modal.Body>
        <div className="new_chat_head">
          <h6>New Message</h6>
          <MdClose onClick={() => setNewChatModal(false)} />
        </div>

        <div className="search_name">
          <MdSearch />
          <input placeholder="Type a name" />
        </div>

        <div className="suggestion_chat">
          <h6>SUGGESTED</h6>

          <div className="users" onClick={onMessageHandler}>
            <img src="/images/chat_img2.png" />

            <div>
              <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
            </div>
          </div>
          <div className="users" onClick={onMessageHandler}>
            <img src="/images/chat_img.png" />

            <div>
              <p><span>Ayesha Malik</span> <br /> Logistics Manager </p>
            </div>
          </div>
          <div className="users" onClick={onMessageHandler}>
            <img src="/images/chat_img2.png" />

            <div>
              <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )

  return (
    <div>
      {modal}
      {
        isOpenChat ? <Chat /> : <div style={{ margin: "0 10px" }}>

          <Breadcrumbs list={["Dashboard", "Messages"]} />

          <div className='material_main show_web_msg mb-2'>
            <div className='no_msg_received'>
              <Lottie options={defaultOptions}
                height={65}
                width={100}
                style={{ margin: "0" }}
              />
              <h2 style={{ fontSize: "25px" }}>No Message Received</h2>
            </div>
          </div>

          <div className="messages_div show_mob_msg">
            <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
              Messages
            </h5>

            <div className="chat_search">
              <img src="/images/search_icon.png" alt="" />
              <input placeholder="Search for chats..." />
            </div>

            <div className="new_chat_btn">
              <button onClick={() => setNewChatModal(!newChatModal)}>
                <AiOutlinePlus />
                Create New Chat
              </button>
            </div>

            <div className="inboxes">
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/chat_img2.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Yaqoob Jamil</h6>
                    <span>5s</span>
                  </div>
                  <div className="align-items-end">
                    <p>Not too bad, just trying to catch up on some work.
                      How about...</p>
                    <IoCheckmarkDone style={{ color: "#758A89" }} />
                  </div>
                </div>
              </div>
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/chat_img.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Ayesha Malik</h6>
                    <span>18h</span>
                  </div>
                  <div className="align-items-end">
                    <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                    <span className="msg_count"> 1 </span>
                  </div>
                </div>
              </div>
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/user_chat_img2.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Owais Ilyas</h6>
                    <span>5s</span>
                  </div>
                  <div className="align-items-end">
                    <p>when will it be ready?</p>
                    <IoCheckmarkDone style={{ color: "#758A89" }} />
                  </div>
                </div>
              </div>
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/chat_img.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Ayesha Malik</h6>
                    <span>18h</span>
                  </div>
                  <div className="align-items-end">
                    <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                    <span className="msg_count"> 1 </span>
                  </div>
                </div>
              </div>
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/chat_img2.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Yaqoob Jamil</h6>
                    <span>5s</span>
                  </div>
                  <div className="align-items-end">
                    <p>Not too bad, just trying to catch up on some work.
                      How about...</p>
                    <IoCheckmarkDone style={{ color: "#758A89" }} />
                  </div>
                </div>
              </div>
              <div className="chat_box" onClick={openChatHandler}>
                <div>
                  <img src="/images/chat_img.png" alt="" className="user_img" />
                </div>
                <div className="chat_msg">
                  <div>
                    <h6>Ayesha Malik</h6>
                    <span>18h</span>
                  </div>
                  <div className="align-items-end">
                    <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                    <span className="msg_count"> 1 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Message
