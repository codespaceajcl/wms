import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import Header from "../Components/Header/Header";
import { useEffect } from "react";

const AdminLayout = ({ fullClickBtn, fullClickClose, handle }) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const shouldApplyOverflowHidden = pathname !== `/warehouse/details/${id}` && pathname !== `/warehouse/details/location/${id}` ? true : false;
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
