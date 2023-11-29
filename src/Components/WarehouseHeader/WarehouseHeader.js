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

function WarehouseHeader({ sideBarItems, fullScreen, closeScreen, handle }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navbarRef = useRef();

    const [showNotificationBar, setShowNotificationBar] = useState(false)

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
                                    <img src="/images/ajcl_logo_white.png" alt="" className="main_logo" onClick={() => navigate('/')} />
                                </div>
                                <div className="search_box web_view">
                                    <img src="/images/search_icon.png" alt="" />
                                    <input placeholder="search anything" />
                                </div>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle onClick={NavHandler} />
                        {/* <Navbar.Collapse> */}
                            <Nav className="ms-auto warehouse_nav">
                                <div className="nav_header_right">
                                    <div className="nav_header_right">
                                        <div>
                                            {
                                                !handle.active ?
                                                    <BsFullscreen style={{ fontSize: "19px", cursor: "pointer", color: "#fff" }} onClick={fullScreen} />
                                                    :
                                                    <img src="/images/full_screen_icon_white.png" alt="" className="full_screen" onClick={closeScreen} />
                                            }
                                        </div>
                                        <div className="user_nav">
                                            <img src="/images/user_img.png" alt="" />

                                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="/">
                                                    Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </div>

                                        <div className="notification_box">
                                            <img src="/images/notification_icon_white.png" alt="" width={'15px'}
                                                style={{ cursor: "pointer", width: "15px" }}
                                                onClick={() => setShowNotificationBar(!showNotificationBar)} />

                                            {
                                                showNotificationBar && <Notification />
                                            }
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
