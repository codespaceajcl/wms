import React from 'react'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs'
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Settings = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Profile"]} />

            <div className='material_main' style={{minHeight: "75vh"}}>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Settings </h5>


                <div className='mt-5'>
                    <div className='profile_details settings'>
                        <div className='view_links'> <div> General Notification </div>
                            <div>
                                <span>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        checked
                                    />
                                </span>
                            </div>
                        </div>
                        <div className='view_links'> <div> Sound </div>
                            <div>
                                <span>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className='view_links'> <div> Clear Cache </div> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
