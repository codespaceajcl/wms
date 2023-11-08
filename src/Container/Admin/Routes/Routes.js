import Consignee from "../Pages/Consignee/Consignee";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ListMaterials from "../Pages/ListMaterials/ListMaterials";
import Warehouses from "../Pages/Warehouses/Warehouses";

export const adminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/list-materials",
    component: <ListMaterials />,
  },
  {
    path: "/warehouses",
    component: <Warehouses />,
  },
  {
    path: "/consignee",
    component: <Consignee />,
  },
];


export const adminSideBarItems = [
  {
    path: "/",
    icon: "/images/dashboard_icon.png",
    title: "Dashboard",
  },
  {
    path: "/list-materials",
    icon: "/images/material_icon.png",
    title: "List Of Materials",
  },
  {
    path: "/warehouses",
    icon: "/images/warehouse_icon.png",
    title: "Warehouses",
  },
  {
    path: "/consignee",
    icon: "/images/consignee_icon.png",
    title: "Consignee",
  },
  {
    path: "/stock-in",
    icon: "/images/stock_icon.png",
    title: "Stock In",
  },
  {
    path: "/stock-out",
    icon: "/images/stock_out.png",
    title: "Stock Out",
  },
  {
    path: "/rma",
    icon: "/images/rma_icon.png",
    title: "RMA",
  },
  {
    path: "/enquiry",
    icon: "/images/enquiry_icon.png",
    title: "General Enquiry",
  },
  {
    path: "/inhouse-movement",
    icon: "/images/move_icon.png",
    title: "Inhouse Movement",
  },
  {
    path: "/dc-document",
    icon: "/images/dc_icon.png",
    title: "DC Document",
  },
  {
    path: "/report",
    icon: "/images/report_icon.png",
    title: "Report",
  },
];