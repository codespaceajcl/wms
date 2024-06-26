import { combineReducers } from "redux";
import { ChatOpenStatusReducer } from "./Chat";
import {
    ConsigneCreateReducer,
    ConsigneePostReducer, DeliveryChallanGetReducer, IndustryCreateReducer, ListMaterialPostReducer, PostDcDocumentReducer, RevertDocumentReducer,
    approveRevertReducer,
    availableStockOutReducer, businessTypeCustomerReducer, businessTypeWarehouseReducer, callDebugReducer, changePalletMovementReducer, createFloorReducer,
    createLocationReducer, createRackReducer, createStockInReducer,
    createStockReturnReducer,
    createStockTransferReducer,
    createWarehouseCustomStoreReducer, createWarehousePalletsReducer,
    createWarehouseReducer, createWarehouseStageReducer, dashboardApiReducer, destinationStockoutReducer, editLocationTagReducer, generateSerialNoReducer, getAllPalletInhouseMovementReducer,
    getAllWarehousesInhouseMovementReducer, getAvailLocationStockInReducer, getAvailPalletStockInReducer, getAvailStagesStockInReducer, getCurrentUserProfileReducer, getExistingSerialNoReducer, getGeneralEnquiryDetailReducer, getGeneralEnquiryReducer,
    getInventoryAvailableStockReducer, getInventoryFilterReducer, getInventoryReportFilterReducer,
    getInventoryReportReducer, getLocationReducer, getPalletSerialNoReducer, getStockInReportFilterReducer, getStockInReportReducer, getStockOutPalletsReducer,
    getStockOutReportFilterReducer, getStockOutReportReducer, getStockReturnReportFilterReducer,
    getStockReturnReportReducer, getStockTransferReportFilterReducer, getStockTransferReportReducer,
    getUserNotificationsReducer,
    getWarehouseDetailReducer, getWarehouseReducer, getWarehouseStageItemReducer, palletLocationReducer, palletStatusChangeReducer, postRmaFormReducer, powerBiGetReducer, powerBiLinkCreateReducer, rejectRevertReducer, searchDeliveryChallanReducer, showPowerBiSidebar, stockInRequestDetailsReducer, stockInRequestsReducer, stockOutApiReducer, stockoutbusinessTypeCustomerReducer, updateUserProfileImgReducer, uupdateUserProfileApiReducer
} from "./Admin";

const rootReducer = combineReducers({
    ChatOpen: ChatOpenStatusReducer,

    //ADMIN
    postMaterial: ListMaterialPostReducer,
    getConsignee: ConsigneePostReducer,
    getDc: DeliveryChallanGetReducer,
    getSearchDc: searchDeliveryChallanReducer,
    postRevert: RevertDocumentReducer,
    postDc: PostDcDocumentReducer,
    postRma: postRmaFormReducer,
    addingConsignee: ConsigneCreateReducer,
    addingIndustry: IndustryCreateReducer,

    getWarehouses: getWarehouseReducer,
    postWarehouse: createWarehouseReducer,
    postWarehouseDetail: getWarehouseDetailReducer,
    postWarehousePalletsData: createWarehousePalletsReducer,
    postWarehouseStagesData: createWarehouseStageReducer,
    postWarehouseCustomStoreData: createWarehouseCustomStoreReducer,
    getWarehousesInhouse: getAllWarehousesInhouseMovementReducer,
    getWarehouseStageItem: getWarehouseStageItemReducer,
    getWarehouseLocation: getLocationReducer,
    createCustomRack: createRackReducer,
    createCustomFloor: createFloorReducer,
    createCustomLocation: createLocationReducer,
    getPalletDetail: palletLocationReducer,
    getStatusChange: palletStatusChangeReducer,
    getEditTag: editLocationTagReducer,

    getPalletsInhouse: getAllPalletInhouseMovementReducer,
    palletChange: changePalletMovementReducer,
    getReports: getInventoryReportReducer,
    getInventory: getInventoryFilterReducer,
    getInventoryAllFilter: getInventoryReportFilterReducer,
    getInventoryAvailableStock: getInventoryAvailableStockReducer,

    //STOCK IN
    inventoryStockInData: getStockInReportReducer,
    inventoryStockInFilterData: getStockInReportFilterReducer,

    inventoryStockOutData: getStockOutReportReducer,
    inventoryStockOutFilterData: getStockOutReportFilterReducer,

    inventoryStockReturnData: getStockReturnReportReducer,
    inventoryStockReturnFilterData: getStockReturnReportFilterReducer,

    inventoryStockTransferData: getStockTransferReportReducer,
    inventoryStockTransferFilterData: getStockTransferReportFilterReducer,

    // GENERAL ENQUIRY
    generalEnquiryGet: getGeneralEnquiryReducer,
    enquiryDetailGet: getGeneralEnquiryDetailReducer,

    // STOCK IN
    getBusinessWarehouseType: businessTypeWarehouseReducer,
    getBusinessCustomerType: businessTypeCustomerReducer,

    getSerialzationNumber: generateSerialNoReducer,
    getExistingSerialNumber: getExistingSerialNoReducer,

    getPalletStockIn: getAvailPalletStockInReducer,
    getLocationStockIn: getAvailLocationStockInReducer,
    getStagesStockIn: getAvailStagesStockInReducer,

    postStockInApi: createStockInReducer,
    postStockReturnApi: createStockReturnReducer,
    postStockTransferApi: createStockTransferReducer,

    // STOCK OUT
    getDebug: callDebugReducer,
    getCustomersStockout: stockoutbusinessTypeCustomerReducer,
    getStockoutDestination: destinationStockoutReducer,
    getStockOutAvailable: availableStockOutReducer,
    stockOutItem: getStockOutPalletsReducer,

    saveStockOut: stockOutApiReducer,

    palletSerialNo: getPalletSerialNoReducer,

    // Dashboard
    getDashboardApiData: dashboardApiReducer,

    // GET USER
    currentUser: getCurrentUserProfileReducer,
    updateProfile: updateUserProfileImgReducer,
    updateUserProfile: uupdateUserProfileApiReducer,

    // NOTIFICATION
    notificationData: getUserNotificationsReducer,

    // REVERT

    approvedRevert: approveRevertReducer,
    rejectedRevert: rejectRevertReducer,

    powerBiApi: powerBiGetReducer,
    powerBiCreateApi: powerBiLinkCreateReducer,

    // STOCK IN REQUEST
    stockInRequestsData: stockInRequestsReducer,
    stockInRequestDetailsData: stockInRequestDetailsReducer,


    sidebarShowPowerBi: showPowerBiSidebar
})

export default rootReducer;