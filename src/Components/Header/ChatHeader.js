import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MobileSidebar from "./MobileSideBar";
import { Col, Modal, Row } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFullscreen } from 'react-icons/bs'
import Notification from "../Notification/Notification";
import { MdClose } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";


function ChatHeader({ sideBarItems, fullScreen, closeScreen, handle, children }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navbarRef = useRef();
    const rightNavRef = useRef();
    const leftNavRef = useRef();

    const [showNotificationBar, setShowNotificationBar] = useState(false)

    const classes = (path) => {
        let splitPath = path.split("/");
        let splitPathname = pathname.split("/");

        if (splitPath[1] === splitPathname[1]) {
            return "nav_active";
        }

        return "";
    };

    useEffect(() => {
        if (pathname === "/") { navbarRef.current.style.width = "0%"; }
        setShowNotificationBar(false)
        rightNavRef.current.scrollTo(0, 0);
        leftNavRef.current.scrollTo(0, 0);
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

            <div className="user_layout p-0">
                <div className="layout_content_section">

                    <div ref={leftNavRef} className="left_layout_overlay chat_main_div">

                        <div className={"layout_content_sidebar_section close chat_main_div"} style={{ marginBottom: 0, paddingBottom: 0, borderRadius: "0" }}>
                            <div className="user_sidebar">
                                <div className="sidebar_top_logo" style={{ justifyContent: "center", padding: '20px 8px 20px' }}>
                                    <img src="/images/ajcl_logo.png" alt="" className="main_logo" />

                                </div>

                                <ul className="nav_list">
                                    <h6 className={'toggler'}>Menu</h6>
                                    {sideBarItems?.map((item, index) => {
                                        if (item.path) {
                                            return (
                                                <li key={index} className={`${classes(item.path)}`}>
                                                    <Link to={item.path} style={{ padding: '12px 0px 12px 0px', display: "flex", justifyContent: "center" }}>
                                                        <img src={item.icon} alt="" />
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>

                                <div className="support_sidebar" style={{ marginBottom: 0 }}>
                                    <ul className="nav_list">
                                        <h6 className={'toggler'}>Support</h6>
                                        <li>
                                            <Link to='' style={{ padding: '12px 0px 12px 15px' }}>
                                                <img src={'/images/inbox_icon.png'} alt="" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/faqs' style={{ padding: '12px 0px 12px 15px' }}>
                                                <img src={'/images/faq_icon.png'} alt="" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="exit_sidebar">
                                    <ul className="nav_list">
                                        <li>
                                            <Link to='' style={{ padding: '12px 0px 12px 15px', display: "block" }}>
                                                <FiLogOut />
                                                <br />
                                                <span>Exit</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="messages_div">
                            <h4>Message</h4>
                        </div>
                    </div>

                    <div className="layout_content">
                        <div className="user_header">

                            <Row className="align-items-center make_col_reverse">
                                <Col md={6}>
                                    <div className="search_box">
                                        <img src="/images/search_icon.png" alt="" />
                                        <input placeholder="search anything" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Navbar collapseOnSelect expand="lg">
                                        <Navbar.Brand onClick={() => navigate("/")}>
                                            <img src="/images/ajcl_logo.png" alt="" className="mob_responsive_logo" />
                                        </Navbar.Brand>
                                        <Navbar.Toggle
                                            aria-controls="responsive-navbar-nav"
                                            onClick={NavHandler}
                                        />
                                        <Navbar.Collapse id="responsive-navbar-nav">
                                            <Nav className="ms-auto">
                                                <div className="nav_header_right">
                                                    <div>
                                                        {
                                                            !handle.active ?
                                                                <BsFullscreen style={{ fontSize: "19px", cursor: "pointer" }} onClick={fullScreen} /> :
                                                                <img src="/images/full_screen_icon.png" alt="" className="full_screen" onClick={closeScreen} />
                                                        }
                                                    </div>
                                                    <div className="user_nav">
                                                        <img src="/images/user_img.png" alt="" />

                                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                                            <NavDropdown.Item>
                                                                <Link to='/profile'>Profile</Link>
                                                            </NavDropdown.Item>
                                                            <NavDropdown.Item href="/">
                                                                <Link>Logout</Link>
                                                            </NavDropdown.Item>
                                                        </NavDropdown>
                                                    </div>

                                                    <div className="notification_box">
                                                        <img src="/images/notification_icon.png" alt="" width={'15px'}
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => setShowNotificationBar(!showNotificationBar)} />

                                                        {
                                                            showNotificationBar && <Notification />
                                                        }
                                                    </div>

                                                </div>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Navbar>
                                </Col>
                            </Row>
                        </div>

                        <div className="right_layout_overlay mb-5" ref={rightNavRef}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ChatHeader;
