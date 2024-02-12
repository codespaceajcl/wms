import React, { useEffect } from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsArrowLeftShort } from "react-icons/bs";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Col, Modal, Row, Spinner } from 'react-bootstrap';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileImage } from '../../../../Redux/Action/Admin';
import { login } from '../../../../Util/Helper';
import { successNotify } from '../../../../Util/Toast';
import { allImages } from '../../../../Util/Images';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordModal, setPasswordModal] = useState(false)
    const [passView, setPassView] = useState(false)
    const [passView1, setPassView1] = useState(false)
    const [passView2, setPassView2] = useState(false)

    const userFound = JSON.parse(localStorage.getItem("currentUser"))

    const [image, setImage] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false)

    const { loading, getUserProfileImg } = useSelector((state) => state.updateProfile)

    useEffect(() => {
        if (getUserProfileImg?.response === "success") {
            successNotify("Profile Image Updated Successfully!")
            dispatch({ type: "UPDATE_USER_PROFILE_IMAGE_RESET" })
            setShowConfirm(false)

            let data = {
                ...userFound,
                profile: getUserProfileImg.profile
            }

            localStorage.setItem("currentUser", JSON.stringify(data));
        }
    }, [getUserProfileImg])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                setImage(base64Image);
            };
            reader.readAsDataURL(file);
            setShowConfirm(true)
        }
    };

    const uploadFileHandler = () => {
        const formData = new FormData();
        formData.append("email", login.email)
        formData.append("token", login.token)
        formData.append("profile", image)

        dispatch(updateUserProfileImage(formData))
    }

    const uploadModal = <Modal show={showConfirm} centered className='logout_modal'>
        <Modal.Body>
            <h3>Are you sure you want to Upload the Image?</h3>
            <div className='d-flex justify-content-center' style={{ gap: "20px" }}>
                <button onClick={uploadFileHandler}> {loading ? <Spinner animation="border" size="sm" /> : 'Yes'}</button>
                <button className='no_btn' onClick={() => {
                    setImage(null)
                    setShowConfirm(false)
                }}>No</button>
            </div>
        </Modal.Body>
    </Modal>

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
            {uploadModal}
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
                            <img src={allImages.CameraImg} alt='' style={{ cursor: "pointer" }} onClick={handleClick} />
                        </div>
                    </div>
                    <div className='profile_info'>
                        <p onClick={() => navigate('/wms/profile/edit-profile')}>Edit Profile</p>
                        <h6>{userFound.name}</h6>
                        <span>{userFound.email} | {userFound.contact}</span>
                    </div>
                </div>

                <div className='profile_details'>
                    <div className='view_links' onClick={() => navigate('/wms/profile/settings')}> <div> <img src={allImages.settings_icon} alt='' /> Settings </div> </div>
                    <div className='view_links' onClick={() => navigate('/wms/all-notifications')}> <div> <img src={allImages.notification_icon} alt='' /> Notifications </div>
                        <div>
                            <span>ON</span>
                        </div>
                    </div>
                </div>

                <div className='profile_details'>
                    <div className='view_links' onClick={() => setPasswordModal(!passwordModal)}> <div> <img src={allImages.password_icon} alt='' /> Change Password </div> </div>
                    <div className='view_links'> <div> <img src='/images/language_icon.png' alt='' /> Language </div></div>
                </div>

                <div className='profile_details'>
                    <div className='view_links'> <div> <img src='/images/help_icon.png' alt='' /> Help & Support </div> </div>
                    <div className='view_links' onClick={() => navigate('/wms/profile/privacy-policy')}> <div> <img src={allImages.privacy_icon} alt='' /> Privacy policy </div></div>
                </div>

                <div className='mt-3'>
                    <button className='back_btn'>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
