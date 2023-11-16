import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import WarehouseHeader from "../Components/WarehouseHeader/WarehouseHeader";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import Footer from "../Components/Footer/Footer";

const MainLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const { pathname } = useLocation();

  const shouldApplyOverflowHidden = pathname !== '/warehouse/details' && pathname !== '/warehouse/details/location' ? true : false;
  useOverflowHidden(shouldApplyOverflowHidden);

  return (
    <div className={pathname === '/warehouse/details' ? "warehouse_detail_layout" : "location_bg_layout"}>
      <WarehouseHeader fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle} />

      <div style={{ marginTop: "100px" }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default MainLayout;
