import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import Header from "../Components/Header/Header";
import { useEffect } from "react";
import { login } from "../Util/Helper";
import { errorNotify } from "../Util/Toast";

const AdminLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   const getEmail = localStorage.getItem("email")
  //   const getToken = localStorage.getItem("token")

  //   if (!getEmail && !getToken) {
  //     errorNotify("Access Denied")
  //     window.location.href = "https://crms.ajcl.net/mainMenu.html"
  //   }
  // }, [])

  const shouldApplyOverflowHidden = pathname !== `/wms/warehouse/details/${id}` && pathname !== `/wms/warehouse/details/location/${id}` ? true : false;
  useOverflowHidden(shouldApplyOverflowHidden);

  return (
    <div>
      <Header sideBarItems={adminSideBarItems} fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle}>
        <Outlet />
      </Header>
    </div>
  );
};

export default AdminLayout;
