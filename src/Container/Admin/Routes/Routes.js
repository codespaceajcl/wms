import WarehouseDetail from "../../Pages/Warehouses/Detail/WarehouseDetail";
import LocationDetail from "../../Pages/Warehouses/LocationDetail/LocationDetail";
import Consignee from "../Pages/Consignee/Consignee";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DcDocument from "../Pages/DcDocument/DcDocument";
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
import Notifications from "../Pages/Notifications/Notifications";
import EnquiryDetail from "../Pages/Enquiry/Details/Details";
import { allImages } from "../../../Util/Images";

export const adminRoutes = [
  {
    path: "/wms/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/wms/list-materials",
    component: <ListMaterials />,
  },
  {
    path: "/wms/warehouses",
    component: <Warehouses />,
  },
  {
    path: "/wms/consignee",
    component: <Consignee />,
  },
  {
    path: "/wms/rma",
    component: <RMA />,
  },
  {
    path: "/wms/enquiry",
    component: <Enquiry />,
  },
  {
    path: "/wms/enquiry/detail",
    component: <EnquiryDetail />,
  },
  {
    path: "/wms/inhouse-movement",
    component: <InhouseMovement />,
  },
  {
    path: "/wms/dc-document",
    component: <DcDocument />,
  },
  {
    path: "/wms/reports",
    component: <Reports />,
  },
  {
    path: "/wms/stock-in",
    component: <StockIn />,
  },
  {
    path: "/wms/stock-in/return-stock",
    component: <ReturnStock />,
  },
  {
    path: "/wms/stock-in/return-stock/known",
    component: <KnownStock />,
  },
  {
    path: "/wms/stock-in/return-stock/unknown",
    component: <UnknownStock />,
  },
  {
    path: "/wms/stock-in/shipment-stock",
    component: <ShipmentStock />,
  },
  {
    path: "/wms/stock-in/transfer-stock",
    component: <TransferredStock />,
  },
  {
    path: "/wms/stock-out",
    component: <StockOut />,
  },
  {
    path: "/wms/faqs",
    component: <FAQs />,
  },
  {
    path: "/wms/profile",
    component: <Profile />,
  },
  {
    path: "/wms/profile/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/wms/profile/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    path: "/wms/profile/settings",
    component: <Settings />,
  },
  {
    path: "/wms/all-notifications",
    component: <Notifications />,
  },
];

export const warehouseRoutes = [
  {
    path: "/wms/warehouse/details/:id",
    component: <WarehouseDetail />,
  },
  {
    path: "/wms/warehouse/details/location/:id",
    component: <LocationDetail />,
  },
]

export const messageRoutes = [
  {
    path: "/wms/messages/message",
    component: <Message />,
  },
  {
    path: "/wms/messages/chat",
    component: <Chat />,
  },
]


export const adminSideBarItems = [
  {
    path: "/wms/dashboard",
    icon: allImages.dashboard_icon,
    title: "Dashboard",
  },
  {
    path: "/wms/list-materials",
    icon: allImages.material_icon,
    title: "List Of Materials",
  },
  {
    path: "/wms/warehouses",
    icon: allImages.warehouse_icon,
    title: "Warehouses",
  },
  {
    path: "/wms/consignee",
    icon: allImages.consignee_icon,
    title: "Consignee",
  },
  {
    path: "/wms/stock-in",
    icon: allImages.stock_icon,
    title: "Stock In",
  },
  {
    path: "/wms/stock-out",
    icon: allImages.stock_out,
    title: "Stock Out",
  },
  {
    path: "/wms/rma",
    icon: allImages.rma_icon,
    title: "RMA",
  },
  {
    path: "/wms/enquiry",
    icon: allImages.enquiry_icon,
    title: "General Enquiry",
  },
  {
    path: "/wms/inhouse-movement",
    icon: allImages.move_icon,
    title: "Inhouse Movement",
  },
  {
    path: "/wms/dc-document",
    icon: allImages.dc_icon,
    title: "DC Document",
  },
  {
    path: "/wms/reports",
    icon: allImages.report_icon,
    title: "Report",
  },
];