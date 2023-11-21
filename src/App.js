import { adminRoutes, warehouseRoutes } from "./Container/Admin/Routes/Routes";
import NotFound from "./Container/Pages/NotFound/NotFound";
import AdminLayout from "./Layouts/AdminLayout";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MainLayout from "./Layouts/MainLayout";

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
    <FullScreen handle={handle}>
      <BrowserRouter>
        <Routes>
          {adminLayout}
          {warehouseLayout}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FullScreen>
  );
};
export default App;