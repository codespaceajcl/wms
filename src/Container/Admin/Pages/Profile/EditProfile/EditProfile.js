import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { BsArrowLeftShort } from "react-icons/bs";
import Select from 'react-select'
import Input from '../../../../../Components/Input/Input';
import { login, materialColorStyles } from '../../../../../Util/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileApi } from '../../../../../Redux/Action/Admin';
import { successNotify } from '../../../../../Util/Toast';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userFound = JSON.parse(localStorage.getItem("currentUser"))

    const [profileData, setProfileData] = useState({
        name: userFound.name,
        email: userFound.email,
        contact: userFound.contact,
        cnic: userFound.cnic,
        address: userFound.address,
        profile: userFound.profile
    })

    const { loading, getUpdateUserProfile } = useSelector((state) => state.updateUserProfile)


    useEffect(() => {
        if (getUpdateUserProfile?.response === "success") {
            successNotify("Profile Updated Successfully!");
            dispatch({ type: "UPDATE_USER_PROFILE_RESET" })

            localStorage.setItem("currentUser", JSON.stringify(profileData));
        }
    }, [getUpdateUserProfile])

    const formHandler = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", profileData.name)
        formData.append("email", profileData.email)
        formData.append("contact", profileData.contact)
        formData.append("cnic", profileData.cnic)
        formData.append("address", profileData.address)
        formData.append("token", profileData.token)

        dispatch(updateUserProfileApi(formData))
    }

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Edit Profile"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Edit Profile</h5>

                <Form className='mt-5' onSubmit={formSubmitHandler}>
                    <Row className='justify-content-around'>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Full Name <span>*</span> </label>
                                <input value={profileData.name} name='name' placeholder="Enter Full Name" type='text' onChange={formHandler} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Email <span>*</span> </label>
                                <input value={profileData.email} name='email' placeholder="Enter Email" type='email' onChange={formHandler} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Phone <span>*</span> </label>
                                <input value={profileData.phone} name='phone' placeholder="0300 123456" type='tel' onChange={formHandler} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='input_field'>
                                <label>Cnic <span>*</span> </label>
                                <input value={profileData.cnic} name='cnic' placeholder="42424-4242424-3" type='text' onChange={formHandler} />
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='input_field'>
                                <label>Address <span>*</span> </label>
                                <input value={profileData.address} name='address' placeholder="Enter Address" type='text' onChange={formHandler} />
                            </div>
                        </Col>
                        <Col md={12} className='mt-3 d-flex align-items-center gap-3'>
                            <button className='submit_btn' type='submit' disabled={loading}>{loading ? <Spinner animation='border' size='sm' /> : "Save Changes"}</button>
                            <button className='back_btn mt-0' type='button' onClick={() => navigate(-1)}>Back</button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default EditProfile
