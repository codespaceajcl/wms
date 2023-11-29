import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

function MobileSidebar({ navbarRef, NavHandler, sideBarItems }) {
  const { pathname } = useLocation();

  useEffect(() => {
    navbarRef.current.style.width = "0%";
  }, [pathname]);

  return (
    <div className="overlay" ref={navbarRef}>
      <span className="closebtn" onClick={NavHandler}>
        <MdClose />
      </span>
      <div className={"overlay-content"}>
        <div className="d-flex align-items-center text-white gap-2 mb-3">
          <div className="mobile_sidebar_avatar">
            <img src="/images/user_img.png" alt="" />
          </div>
          <div>
            <NavDropdown title="Admin">
              <NavDropdown.Item>
                <Link to='/profile'>Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="/">
                <Link>Logout</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        {sideBarItems?.map((item, index) => {
          return (
            <Link
              to={item.path}
              className={pathname === item.path ? "nav-active" : "nav-link"}
            >
              <span className="overlay-content-number"> {index < 9 ? `0${index + 1}` : `${index + 1}`} - </span>
              {item.title}
            </Link>
          );
        })}
        <Link to='messages/message' className={pathname === 'messages/message' ? "nav-active" : "nav-link"}>
          <span>12 - Inbox</span>
        </Link>
        <Link to='/faqs' className={pathname === '/faqs' ? "nav-active" : "nav-link"}>
          <span>12 - FAQS</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileSidebar;
