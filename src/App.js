import { adminRoutes, warehouseRoutes } from "./Container/Admin/Routes/Routes";
// import ChangePassword from "Container/Auth/ChangePassword/ChangePassword";
// import ForgotPassword from "Container/Auth/ForgotPassword/ForgotPassword";
// import Login from "Container/Auth/Login/Login";
// import Home from "Container/Pages/Home/Home";
import NotFound from "./Container/Pages/NotFound/NotFound";
import AdminLayout from "./Layouts/AdminLayout";
// import MainLayout from "Layouts/MainLayout";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MainLayout from "./Layouts/MainLayout";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  const handle = useFullScreenHandle();

  const adminLayout = (
    <Route path={"/"} element={<AdminLayout fullClickBtn={handle.enter} fullClickClose={handle.exit} handle={handle} />}>
      {adminRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  const warehouseLayout = <Route path={"/warehouse"} element={<MainLayout fullClickBtn={handle.enter} fullClickClose={handle.exit} handle={handle} />}>
    {warehouseRoutes.map((item) => (
      <Route key={item.path} path={item.path} element={item.component} />
    ))}
  </Route>


  return (
    <div className="fullscreen">
      <FullScreen handle={handle}>
        <BrowserRouter>
          <ScrollToTop />

          <Routes>

            {adminLayout}
            {warehouseLayout}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FullScreen>

    </div>
  );
};
export default App;
