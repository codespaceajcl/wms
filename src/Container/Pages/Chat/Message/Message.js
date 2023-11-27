import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import lottie_msg from "../../../../Util/Lottie/lottie_msg.json";
import Lottie from 'react-lottie';
import './Message.css';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';

const Message = () => {
  const { isOpenChat } = useSelector((state) => state.ChatOpen)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_msg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      {
        isOpenChat ? <Chat /> : <div style={{ margin: "0 10px" }}>

          <Breadcrumbs list={["Dashboard", "Messages"]} />

          <div className='material_main'>
            <div className='no_msg_received'>
              <Lottie options={defaultOptions}
                height={65}
                width={100}
                style={{ margin: "0" }}
              />
              <h2 style={{ fontSize: "25px" }}>No Message Received</h2>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Message
