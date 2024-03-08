import React, { useEffect, useState } from "react";
import { adminRoutes, messageRoutes, warehouseRoutes } from "./Container/Admin/Routes/Routes";
import NotFound from "./Container/Pages/NotFound/NotFound";
import AdminLayout from "./Layouts/AdminLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MainLayout from "./Layouts/MainLayout";
// import ChatLayout from "./Layouts/ChatLayout";
import { ToastContainer } from "react-toastify";
import NoInternetModal from "./Components/Modals/NoInternetModal";
import MainPage from "./Container/Pages/MainPage/MainPage";
import PowerBiDashboard from "./Container/Admin/Pages/Dashboard/PowerBiDashboard";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const handle = useFullScreenHandle();

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  const adminLayout = (
    <Route path={"/wms"} element={<AdminLayout fullClickBtn={handle.enter} fullClickClose={handle.exit} handle={handle} />}>
      {adminRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  const warehouseLayout = <Route path={"/wms/warehouse"} element={<MainLayout fullClickBtn={handle.enter} fullClickClose={handle.exit} handle={handle} />}>
    {warehouseRoutes.map((item) => (
      <Route key={item.path} path={item.path} element={item.component} />
    ))}
  </Route>

  // const chatLayout = <Route path={"/wms/messages"} element={<ChatLayout fullClickBtn={handle.enter} fullClickClose={handle.exit} handle={handle} />}>
  //   {messageRoutes.map((item) => (
  //     <Route key={item.path} path={item.path} element={item.component} />
  //   ))}
  // </Route>

  return (
    // <FullScreen handle={handle}>
    <>
      {!isOnline && <NoInternetModal />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
        
      <BrowserRouter basename="/wms">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {adminLayout}
          {warehouseLayout}
          {/* {chatLayout} */}
          <Route path="/powerbi-dashboards" element={<PowerBiDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
    // </FullScreen>
  );
};
export default App;