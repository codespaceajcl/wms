import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import useOverflowHidden from "../Components/UseOverflowHidden/UseOverflowHidden";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import ChatHeader from "../Components/Header/ChatHeader";

const ChatLayout = ({ fullClickBtn, fullClickClose, handle }) => {
    const { pathname } = useLocation();

    const shouldApplyOverflowHidden = pathname !== '/warehouse/details' && pathname !== '/warehouse/details/location' ? true : false;
    useOverflowHidden(shouldApplyOverflowHidden);

    return (
        <div>
            <ChatHeader sideBarItems={adminSideBarItems} fullScreen={fullClickBtn} closeScreen={fullClickClose} handle={handle}>
                <Outlet />
            </ChatHeader>
        </div>
    );
};

export default ChatLayout;
