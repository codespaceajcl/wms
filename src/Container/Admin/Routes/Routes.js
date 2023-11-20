import WarehouseDetail from "../../Warehouses/Detail/WarehouseDetail";
import LocationDetail from "../../Warehouses/LocationDetail/LocationDetail";
import Consignee from "../Pages/Consignee/Consignee";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DcDocument from "../Pages/DcDocument/DcDocument";
import Nomenclature from "../Pages/Enquiry/Details/Nomenclature/Nomenclature";
import Enquiry from "../Pages/Enquiry/Enquiry";
import InhouseMovement from "../Pages/InhouseMovement/InhouseMovement";
import ListMaterials from "../Pages/ListMaterials/ListMaterials";
import RMA from "../Pages/RMA/RMA";
import Reports from "../Pages/Reports/Reports";
import ReturnStock from "../Pages/StockIn/ReturnStock/ReturnStock";
import ShipmentStock from "../Pages/StockIn/ShipmentStock/ShipmentStock";
import StockIn from "../Pages/StockIn/StockIn";
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
  {
    path: "/rma",
    component: <RMA />,
  },
  {
    path: "/enquiry",
    component: <Enquiry />,
  },
  {
    path: "/enquiry/nomenclature",
    component: <Nomenclature />,
  },
  {
    path: "/inhouse-movement",
    component: <InhouseMovement />,
  },
  {
    path: "/dc-document",
    component: <DcDocument />,
  },
  {
    path: "/reports",
    component: <Reports />,
  },
  {
    path: "/stock-in",
    component: <StockIn />,
  },
  {
    path: "/stock-in/return-stock",
    component: <ReturnStock />,
  },
  {
    path: "/stock-in/shipment-stock",
    component: <ShipmentStock />,
  },
  {
    path: "/stock-in/transfer-stock",
    component: <ShipmentStock />,
  },
];

export const warehouseRoutes = [
  {
    path: "/warehouse/details",
    component: <WarehouseDetail />,
  },
  {
    path: "/warehouse/details/location",
    component: <LocationDetail />,
  },
]


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
    path: "/reports",
    icon: "/images/report_icon.png",
    title: "Report",
  },
];