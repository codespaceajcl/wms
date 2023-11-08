import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MobileSidebar from "./MobileSideBar";
import { Col, Row } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFullscreen } from 'react-icons/bs'

function Header({ sideBarItems, fullScreen, closeScreen, handle, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef();

  const [sidebarToggle, setSidebarToggle] = useState(false)

  const classes = (path) => {
    let splitPath = path.split("/");
    let splitPathname = pathname.split("/");

    if (splitPath[1] === splitPathname[1]) {
      return "nav_active";
    }

    return "";
  };

  useEffect(() => {
    if (pathname === "/") navbarRef.current.style.width = "0%";
  }, [pathname]);

  const NavHandler = () => {
    if (navbarRef.current.style.width === "100%")
      navbarRef.current.style.width = "0%";
    else navbarRef.current.style.width = "100%";
  };

  console.log(handle)

  return (
    <>
      <MobileSidebar
        navbarRef={navbarRef}
        NavHandler={NavHandler}
        sideBarItems={sideBarItems}
      />

      {/* <div className="container"> */}
      <div className="user_layout">
        <div className="layout_content_section">

          <div className={sidebarToggle ? "left_layout_overlay shrink" : "left_layout_overlay"}>

            <div className={sidebarToggle ? "layout_content_sidebar_section close" : "layout_content_sidebar_section"}>
              <div className="user_sidebar">
                <div className="sidebar_top_logo" style={sidebarToggle ? { justifyContent: "center" } : null}>
                  <img src="/images/ajcl_logo.png" alt="" className="main_logo" style={sidebarToggle ? { display: 'none' } : null} />
                  <img
                    src="/images/toggle_icon.png"
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
                          <Link to={item.path} style={sidebarToggle ? { padding: '12px 0px 12px 15px' } : null}>
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
                    <li>
                      <Link to='' style={sidebarToggle ? { padding: '12px 0px 12px 15px' } : null}>
                        <img src={'/images/inbox_icon.png'} alt="" />
                        <span style={sidebarToggle ? { display: "none" } : null}>Inbox</span>
                      </Link>
                      <p className="chat_num">2</p>
                    </li>
                    <li>
                      <Link to='' style={sidebarToggle ? { padding: '12px 0px 12px 15px' } : null}>
                        <img src={'/images/faq_icon.png'} alt="" />
                        <span style={sidebarToggle ? { display: "none" } : null}>FAQ</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={sidebarToggle ? "layout_content_sidebar_section close mb-5" : "layout_content_sidebar_section mb-5"}>
              <div className="user_chat">

                <div className="chat_head">
                  <h6> <span className="online_dot"></span> {sidebarToggle ? "Chat" : "Online Chat"} </h6>
                  {
                    sidebarToggle ? null :
                      <img src="/images/chat_img.png" alt="" />
                  }
                </div>

                <div>

                  <div className="chat">
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

                  <div className="chat">
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

                  <div className="chat">
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

                  <div className="chat">
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
                  <button><AiOutlinePlus /> {sidebarToggle ? null : 'Create New Chat'}</button>
                </div>

              </div>
            </div>

          </div>

          <div className="layout_content">
            <div className="user_header">

              <Row>
                <Col md={6}>
                  <div className="search_box">
                    <img src="/images/search_icon.png" alt="" />
                    <input placeholder="search anything" />
                  </div>
                </Col>
                <Col md={6}>
                  <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand onClick={() => navigate("/")}>
                      <img src="/images/logo.png" alt="" />
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
                              <NavDropdown.Item href="/">
                                Logout
                              </NavDropdown.Item>
                            </NavDropdown>
                          </div>
                          <div>
                            <img src="/images/notification_icon.png" alt="" width={'15px'} />
                          </div>
                        </div>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                </Col>
              </Row>

            </div>

            <div className="right_layout_overlay mb-5">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
export default Header;
