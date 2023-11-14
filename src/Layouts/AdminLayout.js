import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import Header from "../Components/Header/Header";

const AdminLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const {pathname} = useLocation();

  const shouldApplyOverflowHidden =  pathname !== '/warehouse/details' && pathname !== '/warehouse/details/location' ? true : false;
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
