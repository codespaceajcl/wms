import WarehouseDetail from "../../Pages/Warehouses/Detail/WarehouseDetail";
import LocationDetail from "../../Pages/Warehouses/LocationDetail/LocationDetail";
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
import TransferredStock from "../Pages/StockIn/TransferredStock/TransferredStock";
import StockIn from "../Pages/StockIn/StockIn";
import Warehouses from "../Pages/Warehouses/Warehouses";
import KnownStock from "../Pages/StockIn/ReturnStock/KnownStock/KnownStock";
import UnknownStock from "../Pages/StockIn/ReturnStock/UnknownStock/UnknownStock";
import StockOut from "../Pages/StockOut/StockOut";
import FAQs from "../Pages/FAQs/FAQs";
import Profile from "../Pages/Profile/Profile";
import EditProfile from "../Pages/Profile/EditProfile/EditProfile";
import PrivacyPolicy from "../Pages/Profile/PrivacyPolicy/PrivacyPolicy";
import Settings from "../Pages/Profile/Settings/Settings";
import Chat from "../../Pages/Chat/Chat/Chat";
import Message from "../../Pages/Chat/Message/Message";

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
    path: "/stock-in/return-stock/known",
    component: <KnownStock />,
  },
  {
    path: "/stock-in/return-stock/unknown",
    component: <UnknownStock />,
  },
  {
    path: "/stock-in/shipment-stock",
    component: <ShipmentStock />,
  },
  {
    path: "/stock-in/transfer-stock",
    component: <TransferredStock />,
  },
  {
    path: "/stock-out",
    component: <StockOut />,
  },
  {
    path: "/faqs",
    component: <FAQs />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/profile/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/profile/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    path: "/profile/settings",
    component: <Settings />,
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

export const messageRoutes = [
  {
    path: "/messages/message",
    component: <Message />,
  },
  {
    path: "/messages/chat",
    component: <Chat />,
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