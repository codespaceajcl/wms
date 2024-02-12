import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSideBar";
import { Col, Modal, Row, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFullscreen } from 'react-icons/bs'
import Notification from "../Notification/Notification";
import { MdClose, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { chatOpenStatus } from "../../Redux/Action/Chat";
import "./Header.css";
import { getUserNotifications } from "../../Redux/Action/Admin";
import { allImages } from "../../Util/Images";
import { IoMdLogOut } from "react-icons/io";


function Header({ sideBarItems, fullScreen, closeScreen, handle, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef();
  const rightNavRef = useRef();
  const leftNavRef = useRef();
  const dispatch = useDispatch();

  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [showNotificationBar, setShowNotificationBar] = useState(false)
  const [newChatModal, setNewChatModal] = useState(false)

  const { loading, getNotifyData } = useSelector((state) => state.notificationData)

  const userFound = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    const data = {
      email: userFound?.email,
      token: userFound?.token
    }

    const formData = JSON.stringify(data)
    dispatch(getUserNotifications(formData))
  }, [])

  const classes = (path) => {
    let splitPath = path.split("/");
    let splitPathname = pathname.split("/");

    if (splitPath[2] === splitPathname[2]) {
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
    dispatch(chatOpenStatus(true))
    navigate('/wms/messages/message')
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
            <img src={allImages.ChatImg2} />

            <div>
              <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
            </div>
          </div>
          <div className="users" onClick={onMessageHandler}>
            <img src={allImages.ChatImg} />

            <div>
              <p><span>Ayesha Malik</span> <br /> Logistics Manager </p>
            </div>
          </div>
          <div className="users" onClick={onMessageHandler}>
            <img src={allImages.ChatImg2} />

            <div>
              <p><span>Summit Roy</span> <br /> Supply Chain Executive </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )

  const mergeNotificationData = getNotifyData?.approvals?.concat(getNotifyData?.messages)

  const logoutHandler = () => {
    window.location.href = "https://crms.ajcl.net/mainMenu.html"
  }

  return (
    <>
      {modal}
      <MobileSidebar
        navbarRef={navbarRef}
        NavHandler={NavHandler}
        sideBarItems={sideBarItems}
      />

      <div className="user_layout">
        <div className="layout_content_section">

          <div ref={leftNavRef} className={sidebarToggle ? "left_layout_overlay shrink" : "left_layout_overlay"}>

            <div className={sidebarToggle ? "layout_content_sidebar_section close" : "layout_content_sidebar_section"}>
              <div className="user_sidebar">
                <div className="sidebar_top_logo" style={sidebarToggle ? { justifyContent: "center" } : null}>
                  <img src={allImages.ajclLogo} alt="" className="main_logo" style={sidebarToggle ? { display: 'none' } : null} />
                  <img
                    src={allImages.toggle_icon}
                    alt=""
                    className="toggle_icon"
                    onClick={() => setSidebarToggle(!sidebarToggle)}
                  />
                </div>

                <ul className="nav_list">
                  <h6 className={sidebarToggle ? 'toggler' : null}>{sidebarToggle ? 'Menu' : "Main Menu"}</h6>
                  {sideBarItems?.map((item, index) => {
                    if (item.path) {
                      return (
                        <li key={index} className={`${classes(item.path)}`}>
                          <Link to={item.path} style={sidebarToggle ? { padding: '12px 0px 12px 4px' } : null}>
                            <img src={item.icon} alt="" />
                            <span style={sidebarToggle ? { display: "none" } : null}>{item.title}</span>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>

                <div className="support_sidebar">
                  <ul className="nav_list">
                    <h6 className={sidebarToggle ? 'toggler' : null}>Support</h6>
                    {/* <li>
                      <Link to='messages/message' style={sidebarToggle ? { padding: '12px 0px 12px 4px' } : null}>
                        <img src={allImages.inbox_icon} alt="" />
                        <span style={sidebarToggle ? { display: "none" } : null}>Inbox</span>
                      </Link>
                      <p className="chat_num">2</p>
                    </li> */}
                    <li className={pathname.split("/")[2] === 'faqs' && "nav_active"}>
                      <Link to='/wms/faqs' style={sidebarToggle ? { padding: '12px 0px 12px 4px' } : null}>
                        <img src={allImages.faq_icon} alt="" />
                        <span style={sidebarToggle ? { display: "none" } : null}>FAQ</span>
                      </Link>
                    </li>
                  </ul>

                  <ul className="nav_list" style={{ borderTop: "1px solid #E7E7E7" }}>
                    <h6 className={sidebarToggle ? 'toggler' : null}>Settings</h6>
                    <li className={pathname.split("/")[2] === 'profile' && "nav_active"}>
                      <Link to='/wms/profile' style={sidebarToggle ? { padding: '12px 0px 12px 4px' } : null}>
                        <img src={allImages.inbox_icon} alt="" />
                        <span style={sidebarToggle ? { display: "none" } : null}>Profile</span>
                      </Link>
                    </li>
                    <li className={pathname.split("/")[2] === 'faqs' && "nav_active"} onClick={logoutHandler}>
                      <Link style={sidebarToggle ? { padding: '12px 0px 12px 4px' } : null}>
                        <IoMdLogOut className="logout_icon" />
                        <span style={sidebarToggle ? { display: "none" } : null}>Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className={sidebarToggle ? "layout_content_sidebar_section close mb-2" : "layout_content_sidebar_section mb-2"}>
              <div className="user_chat">

                <div className="chat_head">
                  <h6> <span className="online_dot"></span> {sidebarToggle ? "Chat" : "Online Chat"} </h6>
                  {
                    sidebarToggle ? null :
                      <img src="/images/chat_img.png" alt="" />
                  }
                </div>

                <div>

                  <div className="chat" onClick={onMessageHandler}>
                    <span>12</span>
                    <div> <img src="/images/user_chat_img1.png" alt="" /> </div>

                    {
                      sidebarToggle ? null : <>
                        <div>
                          <h6>Sohaib Akram</h6>
                          <p>Lorem Ipsum is simply dummy text of the skajns dskjas........</p>
                        </div>
                        <div> <BiChevronRight /> </div>
                      </>
                    }
                  </div>

                  <div className="chat" onClick={onMessageHandler}>
                    <span>29</span>
                    <div> <img src="/images/user_chat_img2.png" alt="" /> </div>

                    {
                      sidebarToggle ? null : <>
                        <div>
                          <h6>Amjad Ali</h6>
                          <p>Lorem Ipsum is simply dummy text of the skajns dskjas........</p>
                        </div>
                        <div> <BiChevronRight /> </div>
                      </>
                    }
                  </div>

                  <div className="chat" onClick={onMessageHandler}>
                    <span>12</span>
                    <div> <img src="/images/user_chat_img1.png" alt="" /> </div>

                    {
                      sidebarToggle ? null : <>
                        <div>
                          <h6>Sohaib Akram</h6>
                          <p>Lorem Ipsum is simply dummy text of the skajns dskjas........</p>
                        </div>
                        <div> <BiChevronRight /> </div>
                      </>
                    }
                  </div>

                  <div className="chat" onClick={onMessageHandler}>
                    <span>29</span>
                    <div> <img src="/images/user_chat_img2.png" alt="" /> </div>

                    {
                      sidebarToggle ? null : <>
                        <div>
                          <h6>Amjad Ali</h6>
                          <p>Lorem Ipsum is simply dummy text of the skajns dskjas........</p>
                        </div>
                        <div> <BiChevronRight /> </div>
                      </>
                    }
                  </div>

                </div>

                <div style={{ margin: "20px 10px" }}>
                  <button onClick={() => setNewChatModal(true)}><AiOutlinePlus /> {sidebarToggle ? null : 'Create New Chat'}</button>
                </div>

              </div>
            </div> */}

          </div>

          <div className={sidebarToggle ? "layout_content shrink" : "layout_content"}>
            <div className="user_header">

              <Row className="align-items-center make_col_reverse">
                <Col md={6}>
                  <div className="search_box">
                    <img src={allImages.search_icon} alt="" />
                    <input placeholder="search anything" />
                  </div>
                </Col>
                <Col md={6}>
                  <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand onClick={() => navigate("/")}>
                      <img src={allImages.ajclLogo} alt="" className="mob_responsive_logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                      aria-controls="responsive-navbar-nav"
                      onClick={NavHandler}
                    />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="ms-auto">
                        {/* <p>Version 2.0</p> */}
                        <div className="nav_header_right">
                          {/* <div>
                            {
                              !handle.active ?
                                <BsFullscreen style={{ fontSize: "19px", cursor: "pointer" }} onClick={fullScreen} /> :
                                <img src="/images/full_screen_icon.png" alt="" className="full_screen" onClick={closeScreen} />
                            }
                          </div> */}
                          <div className="user_nav">
                            <img src={userFound?.profile} alt="" />

                            <NavDropdown title={userFound?.name} id="basic-nav-dropdown">
                              <NavDropdown.Item>
                                <Link to='/wms/profile'>Profile</Link>
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={logoutHandler}>
                                <Link>Logout</Link>
                              </NavDropdown.Item>
                            </NavDropdown>
                          </div>

                          <div className="notification_box">
                            <img src={allImages.notification_icon} alt="" width={'15px'}
                              style={{ cursor: "pointer" }}
                              onClick={() => setShowNotificationBar(!showNotificationBar)} />
                            <span className="noti_num">{mergeNotificationData ? mergeNotificationData?.length : 0}</span>

                            {showNotificationBar && <Notification loading={loading} notificationData={getNotifyData} />}
                          </div>
                        </div>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                </Col>
              </Row>
            </div>

            <div className="right_layout_overlay" ref={rightNavRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
