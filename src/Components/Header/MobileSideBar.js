import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { allImages } from "../../Util/Images";

function MobileSidebar({ navbarRef, NavHandler, sideBarItems }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navbarRef.current.style.width = "0%";
  }, [pathname]);

  const logoutHandler = () => {
    window.location.href = "https://crms.ajcl.net/mainMenu.html"
  }

  const userFound = JSON.parse(localStorage.getItem("currentUser"))

  return (
    <div className="overlay" ref={navbarRef}>
      <span className="closebtn" onClick={NavHandler}>
        <MdClose />
      </span>
      <div className={"overlay-content"}>
        <div className="d-flex align-items-center text-white gap-2 mb-3">
          <div className="mobile_sidebar_avatar">
            <img src={userFound?.profile} alt="" />
          </div>
          <div>
            <NavDropdown title={userFound?.name} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to='/wms/profile'>Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
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
        <Link to='/wms/faqs' className={pathname === '/wms/faqs' ? "nav-active" : "nav-link"}>
          <span>13 - FAQS</span>
        </Link>

        <Link to='/wms/profile' className={pathname === '/wms/profile' ? "nav-active" : "nav-link"}>
          <span>14 - Profile</span>
        </Link>

        <Link onClick={logoutHandler}>
          <span>15 - Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileSidebar;
