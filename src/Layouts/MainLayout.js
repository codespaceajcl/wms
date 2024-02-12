import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import WarehouseHeader from "../Components/WarehouseHeader/WarehouseHeader";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import Footer from "../Components/Footer/Footer";
import { useRef } from "react";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import { useEffect } from "react";
import { login } from "../Util/Helper";
import { errorNotify } from "../Util/Toast";

const MainLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const { pathname } = useLocation();
  const { id } = useParams()

  // useEffect(() => {
  //   const getEmail = localStorage.getItem("email")
  //   const getToken = localStorage.getItem("token")

  //   if (!getEmail && !getToken) {
  //     errorNotify("Access Denied")
  //     window.location.href = "https://crms.ajcl.net/mainMenu.html"
  //   }
  // }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const shouldApplyOverflowHidden = pathname !== `/wms/warehouse/details/${id}` && pathname !== `/wms/warehouse/details/location/${id}` ? true : false;
  useOverflowHidden(shouldApplyOverflowHidden);


  return (
    <div className={pathname === `/wms/warehouse/details/${id}` ? "warehouse_detail_layout" : "location_bg_layout"}>
      <WarehouseHeader sideBarItems={adminSideBarItems} fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle} />

      <div className="margin-top-100">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default MainLayout;
