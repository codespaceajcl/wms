import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsArrowLeftShort } from "react-icons/bs";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Col, Modal, Row } from 'react-bootstrap';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Profile = () => {
    const navigate = useNavigate();
    const [passwordModal, setPasswordModal] = useState(false)
    const [passView, setPassView] = useState(false)
    const [passView1, setPassView1] = useState(false)
    const [passView2, setPassView2] = useState(false)

    const userFound = JSON.parse(localStorage.getItem("currentUser"))

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the image preview
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        // Trigger file input click event
        document.getElementById('fileInput').click();
    };

    const modal = (
        <Modal centered show={passwordModal} onHide={() => setPasswordModal(false)} size='md' className="change_password_modal">
            <Modal.Body>
                <div className="change_password_head">
                    <h6>Change Password</h6>
                    <MdClose onClick={() => setPasswordModal(false)} />
                </div>
                <p>Please change your password here</p>

                <Row>
                    <Col md={12}>
                        <div className='input_field'>
                            <label>Old Password <span>*</span> </label>
                            <div style={{ position: "relative" }}>
                                <input placeholder='Enter Old Password' type={passView ? 'text' : 'password'} />
                                {
                                    passView ?
                                        <BsEyeSlash className='eye_view' onClick={() => setPassView(false)} /> :
                                        <BsEye className='eye_view' onClick={() => setPassView(true)} />
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className='mt-3'>
                        <div className='input_field'>
                            <label>New Password <span>*</span> </label>
                            <div style={{ position: "relative" }}>
                                <input placeholder='Enter New Password' type={passView1 ? 'text' : 'password'} />
                                {
                                    passView1 ?
                                        <BsEyeSlash className='eye_view' onClick={() => setPassView1(false)} /> :
                                        <BsEye className='eye_view' onClick={() => setPassView1(true)} />
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className='mt-3'>
                        <div className='input_field'>
                            <label>Confirm Password <span>*</span> </label>
                            <div style={{ position: "relative" }}>
                                <input placeholder='Enter Old Password' type={passView2 ? 'text' : 'password'} />
                                {
                                    passView2 ?
                                        <BsEyeSlash className='eye_view' onClick={() => setPassView2(false)} /> :
                                        <BsEye className='eye_view' onClick={() => setPassView2(true)} />
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className='mt-3'>
                        <button className='submit_btn'>Save Changes</button>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    )
    return (
        <div>
            {modal}
            <Breadcrumbs list={["Dashboard", "Profile"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> </h5>

                <div className='mt-3'>
                    <div className='profile_img'>
                        <img src={userFound?.profile} alt='' />
                        <div>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <img src='/images/camera_img.png' alt='' onClick={handleClick} />
                        </div>
                    </div>
                    <div className='profile_info'>
                        <p onClick={() => navigate('/profile/edit-profile')}>Edit Profile</p>
                        <h6>{userFound.name}</h6>
                        <span>{userFound.email} | {userFound.contact}</span>
                    </div>
                </div>

                <div className='profile_details'>
                    <div className='view_links' onClick={() => navigate('/profile/settings')}> <div> <img src='/images/settings_icon.png' alt='' /> Settings </div> </div>
                    <div className='view_links' onClick={() => navigate('/all-notifications')}> <div> <img src='/images/notification_icon.png' alt='' /> Notifications </div>
                        <div>
                            <span>ON</span>
                        </div>
                    </div>
                </div>

                <div className='profile_details'>
                    <div className='view_links' onClick={() => setPasswordModal(!passwordModal)}> <div> <img src='/images/password_icon.png' alt='' /> Change Password </div> </div>
                    <div className='view_links'> <div> <img src='/images/language_icon.png' alt='' /> Language </div></div>
                </div>

                <div className='profile_details'>
                    <div className='view_links'> <div> <img src='/images/help_icon.png' alt='' /> Help & Support </div> </div>
                    <div className='view_links' onClick={() => navigate('/profile/privacy-policy')}> <div> <img src='/images/privacy_icon.png' alt='' /> Privacy policy </div></div>
                </div>

                <div className='mt-3'>
                    <button className='back_btn'>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
