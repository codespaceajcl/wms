import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import WarehouseHeader from "../Components/WarehouseHeader/WarehouseHeader";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import Footer from "../Components/Footer/Footer";
import { useRef } from "react";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import { useEffect } from "react";

const MainLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const shouldApplyOverflowHidden = pathname !== '/warehouse/details' && pathname !== '/warehouse/details/location' ? true : false;
  useOverflowHidden(shouldApplyOverflowHidden);

  return (
    <div className={pathname === '/warehouse/details' ? "warehouse_detail_layout" : "location_bg_layout"}>
      <WarehouseHeader sideBarItems={adminSideBarItems} fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle} />

      <div className="margin-top-100">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default MainLayout;
