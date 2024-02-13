import React, { useEffect } from 'react';
import './MainPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { errorNotify } from '../../../Util/Toast';
import { getCurrentUserProfile } from '../../../Redux/Action/Admin';

const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search)
    const email = searchParams.get("email")
    const access = searchParams.get("access")

    useEffect(() => {
        if (email && access) {
            localStorage.setItem("email", email)
            localStorage.setItem("token", access)
        }
    }, [email & access])

    useEffect(() => {

        const formData = new FormData()
        formData.append("email", email)
        formData.append("token", access)

        dispatch(getCurrentUserProfile(formData))
    }, [])

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            // let getEmail = localStorage.getItem("email")
            // let getAccess = localStorage.getItem("token")

            if (email && access) {
                navigate('/wms/dashboard');
            }
            else {
                errorNotify("Access Denied")
            }
        }, 3000);

        return () => clearTimeout(redirectTimer);
    }, [history]);

    return (
        <div className='loading_main home_page'>
            <div class="spinner"></div>
            <h6>WMS Loading...</h6>
        </div>
    )
}

export default MainPage