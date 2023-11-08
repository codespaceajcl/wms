import React from "react";
import { Outlet } from "react-router-dom";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import Header from "../Components/Header/Header";

const AdminLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  return (
    <div>
      <Header sideBarItems={adminSideBarItems} fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle}>
        <Outlet />
      </Header>
    </div>
  );
};

export default AdminLayout;
