import React from 'react';
import './Notification.css';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const navigate = useNavigate();

    return (
        <div className='notification_main'>
            <div className='notifcation_head'>
                <h6>Notification</h6>
                <p>Mark All as Read</p>
            </div>

            <div className='notification_details'>
                <div>
                    <h6>Today</h6>

                    <div className='notify'>
                        <div> <img src='/images/notification_img1.png' alt='' /> </div>
                        <div> <p>Your request to revert <span>119054 </span>
                            transaction have been approved by <b>Admin Owais</b> <br /> <b>2023-11-19 11:34 PM</b> </p> </div>
                    </div>

                    <div className='notify'>
                        <div> <img src='/images/notification_img1.png' alt='' /> </div>
                        <div> <p>Your request to revert <span>119054 </span>
                            transaction have been approved by <b>Admin Owais</b> <br /> <b>2023-11-19 11:34 PM</b> </p> </div>
                    </div>
                </div>

                <div>
                    <h6 className='mt-3'>Yesterday</h6>

                    <div className='notify'>
                        <div> <img src='/images/notification_img3.png' alt='' /> </div>
                        <div> <p>Your request to revert <span>119054 </span>
                            transaction have been approved by <b>Admin Owais</b> <br /> <b>2023-11-19 11:34 PM</b> </p> </div>
                    </div>

                    <div className='notify'>
                        <div> <img src='/images/notification_img3.png' alt='' /> </div>
                        <div> <p>Your request to revert <span>119054 </span>
                            transaction have been approved by <b>Admin Owais</b> <br /> <b>2023-11-19 11:34 PM</b> </p> </div>
                    </div>
                </div>
            </div>

            <h5 onClick={() => navigate('/all-notifications')}>See All Notification</h5>
        </div>
    )
}

export default Notification
