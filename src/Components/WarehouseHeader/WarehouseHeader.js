import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFullscreen } from 'react-icons/bs'
import Notification from "../Notification/Notification";
import MobileSidebar from "../Header/MobileSideBar";
import { allImages } from "../../Util/Images";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "../../Redux/Action/Admin";

function WarehouseHeader({ sideBarItems, fullScreen, closeScreen, handle }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navbarRef = useRef();

    const userFound = JSON.parse(localStorage.getItem("currentUser"))

    const [showNotificationBar, setShowNotificationBar] = useState(false)

    const { loading, getNotifyData } = useSelector((state) => state.notificationData)

    useEffect(() => {
        const data = {
            email: userFound?.email,
            token: userFound?.token
        }

        const formData = JSON.stringify(data)
        dispatch(getUserNotifications(formData))
    }, [])

    useEffect(() => {
        setShowNotificationBar(false)
    }, [pathname])

    useEffect(() => {
        if (pathname === "/") navbarRef.current.style.width = "0%";
    }, [pathname]);

    const NavHandler = () => {
        if (navbarRef.current.style.width === "100%")
            navbarRef.current.style.width = "0%";
        else navbarRef.current.style.width = "100%";
    };

    const logoutHandler = () => {
        window.location.href = "https://crms.ajcl.net/mainMenu.html"
    }

    const mergeNotificationData = getNotifyData?.approvals?.concat(getNotifyData?.messages)

    return (
        <>
            <MobileSidebar
                navbarRef={navbarRef}
                NavHandler={NavHandler}
                sideBarItems={sideBarItems}
            />
            <div className="user_layout warehouse_header">
                <Container>
                    <Navbar collapseOnSelect expand="lg">
                        <Navbar.Brand>
                            <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                                <div>
                                    <img src={allImages.ajcleLogoImg} alt="" className="main_logo" onClick={() => navigate('/wms/dashboard')} />
                                </div>
                                <div className="search_box web_view">
                                    <img src={allImages.search_icon} alt="" />
                                    <input placeholder="search anything" />
                                </div>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle onClick={NavHandler} />
                        {/* <Navbar.Collapse> */}
                        <Nav className="ms-auto warehouse_nav">
                            <div className="nav_header_right">
                                <div className="nav_header_right">
                                    {/* <div>
                                        {
                                            !handle.active ?
                                                <BsFullscreen style={{ fontSize: "19px", cursor: "pointer", color: "#fff" }} onClick={fullScreen} />
                                                :
                                                <img src={allImages.full_screen_icon_white} alt="" className="full_screen" onClick={closeScreen} />
                                        }
                                    </div> */}
                                    <div className="user_nav warehouse_nav">
                                        <img src={userFound?.profile} alt="" />

                                        <NavDropdown title={userFound?.name} id="basic-nav-dropdown">
                                            <NavDropdown.Item>
                                                <Link to='/wms/profile' className="warehouse_nav_link">Profile</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                <Link className="warehouse_nav_link">Logout</Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </div>

                                    {/* <div className="notification_box">
                                        <img src={allImages.notification_icon_white} alt="" width={'15px'}
                                            style={{ cursor: "pointer", width: "15px" }}
                                            onClick={() => setShowNotificationBar(!showNotificationBar)} />

                                        {
                                            showNotificationBar && <Notification />
                                        }
                                    </div> */}

                                    <div className="notification_box">
                                        <img src={allImages.notification_icon_white} alt="" width={'15px'}
                                            style={{ cursor: "pointer", width: "15px" }}
                                            onClick={() => setShowNotificationBar(!showNotificationBar)} />
                                        <span className="noti_num">{mergeNotificationData ? mergeNotificationData?.length : 0}</span>

                                        {showNotificationBar && <Notification loading={loading} notificationData={getNotifyData} />}
                                    </div>
                                </div>

                            </div>
                        </Nav>
                        {/* </Navbar.Collapse> */}
                    </Navbar>
                </Container>

            </div>
        </>
    );
}
export default WarehouseHeader;
