import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSideBar";
import { Col, Modal, Row, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Notification from "../Notification/Notification";
import { BsArrowLeftShort, BsFullscreen } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdSearch, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { chatOpenStatus } from "../../Redux/Action/Chat";
import "./Header.css";

function ChatHeader({ sideBarItems, fullScreen, closeScreen, handle, children }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navbarRef = useRef();
    const rightNavRef = useRef();
    const leftNavRef = useRef();

    const [showNotificationBar, setShowNotificationBar] = useState(false)
    const [newChatModal, setNewChatModal] = useState(false)

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

    const onMessageHandler = () => {
        setNewChatModal(!newChatModal)
    }

    const modal = (
        <Modal centered show={newChatModal} onHide={() => setNewChatModal(false)} size='sm' className="new_chat">
            <Modal.Body>
                <div className="new_chat_head">
                    <h6>New Message</h6>
                    <MdClose onClick={() => setNewChatModal(false)} />
                </div>

                <div className="search_name">
                    <MdSearch />
                    <input placeholder="Type a name" />
                </div>

                <div className="suggestion_chat">
                    <h6>SUGGESTED</h6>

                    <div className="users" onClick={onMessageHandler}>
                        <img src="/images/chat_img2.png" />

                        <div>
                            <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
                        </div>
                    </div>
                    <div className="users" onClick={onMessageHandler}>
                        <img src="/images/chat_img.png" />

                        <div>
                            <p><span>Ayesha Malik</span> <br /> Logistics Manager </p>
                        </div>
                    </div>
                    <div className="users" onClick={onMessageHandler}>
                        <img src="/images/chat_img2.png" />

                        <div>
                            <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

    const openChatHandler = () => {
        dispatch(chatOpenStatus(true))
    }

    return (
        <>
            {modal}
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
                                            <Link to='/messages/message' style={{ padding: '12px 0px 12px 0px', display: "flex", justifyContent: "center" }}>
                                                <img src={'/images/inbox_icon.png'} alt="" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/faqs' style={{ padding: '12px 0px 12px 0px', display: "flex", justifyContent: "center" }}>
                                                <img src={'/images/faq_icon.png'} alt="" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="exit_sidebar">
                                    <ul className="nav_list">
                                        <li>
                                            <Link to='/' style={{ padding: '12px 0px 12px 0px', display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                <FiLogOut />
                                                <span>Exit</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="messages_div">
                            <h5> <BsArrowLeftShort onClick={() => navigate(-1)} />
                                Messages
                            </h5>

                            <div className="chat_search">
                                <img src="/images/search_icon.png" alt="" />
                                <input placeholder="Search for chats..." />
                            </div>

                            <div className="new_chat_btn">
                                <button onClick={() => setNewChatModal(!newChatModal)}>
                                    <AiOutlinePlus />
                                    Create New Chat
                                </button>
                            </div>

                            <div className="inboxes">
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/chat_img2.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Yaqoob Jamil</h6>
                                            <span>5s</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>Not too bad, just trying to catch up on some work.
                                                How about...</p>
                                            <IoCheckmarkDone style={{ color: "#758A89" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/chat_img.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Ayesha Malik</h6>
                                            <span>18h</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                                            <span className="msg_count"> 1 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/user_chat_img2.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Owais Ilyas</h6>
                                            <span>5s</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>when will it be ready?</p>
                                            <IoCheckmarkDone style={{ color: "#758A89" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/chat_img.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Ayesha Malik</h6>
                                            <span>18h</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                                            <span className="msg_count"> 1 </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/chat_img2.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Yaqoob Jamil</h6>
                                            <span>5s</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>Not too bad, just trying to catch up on some work.
                                                How about...</p>
                                            <IoCheckmarkDone style={{ color: "#758A89" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="chat_box" onClick={openChatHandler}>
                                    <div>
                                        <img src="/images/chat_img.png" alt="" className="user_img" />
                                    </div>
                                    <div className="chat_msg">
                                        <div>
                                            <h6>Ayesha Malik</h6>
                                            <span>18h</span>
                                        </div>
                                        <div className="align-items-end">
                                            <p>Sure, that sounds good. I need to take a break from staring at my computer screen all day.</p>

                                            <span className="msg_count"> 1 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="layout_content chat_main_div" style={{ padding: 0 }}>
                        <div className="user_header">

                            <Row className="align-items-center make_col_reverse" style={{ margin: "10px" }}>
                                <Col md={6}>

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

                        <div className="chat_layout_right" ref={rightNavRef}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ChatHeader;
