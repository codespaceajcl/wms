import axios from "axios";

//create material
export const ListMaterialPost = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "LIST_MATERIAL_POST_REQUEST",
        });

        const { data } = await axios.post("wms/addSku", formData);

        dispatch({
            type: "LIST_MATERIAL_POST_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "LIST_MATERIAL_POST_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get all consignee
export const listConsignee = (page_no, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "LIST_CONSIGNEE_REQUEST",
        });

        const { data } = await axios.post(`wms/getConsignees/${page_no}`, formData);

        dispatch({
            type: "LIST_CONSIGNEE_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "LIST_CONSIGNEE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get all consignee
export const listDeliveryChallan = (page_no, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "LIST_DELIVERY_CHALLAN_REQUEST",
        });

        const { data } = await axios.post(`wms/getDevliveryChallans/${page_no}`, formData);

        dispatch({
            type: "LIST_DELIVERY_CHALLAN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "LIST_DELIVERY_CHALLAN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//revert document
export const revertDocument = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "REVERT_DOCUMENT_REQUEST",
        });

        const { data } = await axios.post(`wms/addStockOutRevertRequest`, formData);

        dispatch({
            type: "REVERT_DOCUMENT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "REVERT_DOCUMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//post dc document
export const postDcDocument = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "POST_DC_DOCUMENT_REQUEST",
        });

        const { data } = await axios.post(`wms/uploadSignedDC/${id}`, formData);

        dispatch({
            type: "POST_DC_DOCUMENT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "POST_DC_DOCUMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//post RMA Form
export const postRmaForm = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "POST_RMA_FORM_REQUEST",
        });

        const { data } = await axios.post(`wms/rmaFormSubmission`, formData);

        dispatch({
            type: "POST_RMA_FORM_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "POST_RMA_FORM_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get all warehouses
export const getAllWarehouses = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_WAREHOUSE_REQUEST",
        });

        const { data } = await axios.post(`wms/getWarehouses`, formData);

        dispatch({
            type: "GET_WAREHOUSE_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "GET_WAREHOUSE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//Create Warehouse
export const createWarehouses = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_WAREHOUSE_REQUEST",
        });

        const { data } = await axios.post(`wms/addWarehouse`, formData);

        dispatch({
            type: "CREATE_WAREHOUSE_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "CREATE_WAREHOUSE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get all warehouses
export const getWarehouseDetail = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_WAREHOUSE_DETAILS_REQUEST",
        });

        const getStore = await axios.post(`wms/getStores/${id}`, formData);
        const getStages = await axios.post(`wms/getStages/${id}`, formData);
        const getAvialablePallots = await axios.post(`wms/getAvialablePallots/${id}`, formData);

        dispatch({
            type: "GET_WAREHOUSE_DETAILS_SUCCESS",
            payload: {
                getStore: getStore?.data,
                getStages: getStages?.data,
                getAvialablePallots: getAvialablePallots?.data
            },
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "GET_WAREHOUSE_DETAILS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//Create Warehouse Pallet
export const createWarehousePallet = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_WAREHOUSE_PALLETS_REQUEST",
        });

        const { data } = await axios.post(`wms/addPallets/`, formData);

        dispatch({
            type: "CREATE_WAREHOUSE_PALLETS_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "CREATE_WAREHOUSE_PALLETS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//Create Warehouse Stages
export const createWarehouseStages = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_WAREHOUSE_STAGES_REQUEST",
        });

        const { data } = await axios.post(`wms/addStage/`, formData);

        dispatch({
            type: "CREATE_WAREHOUSE_STAGES_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "CREATE_WAREHOUSE_STAGES_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//Create Warehouse Custom Store
export const createWarehouseCustomStore = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_WAREHOUSE_CUSTOM_STORE_REQUEST",
        });

        const { data } = await axios.post(`wms/addCustomStore/`, formData);

        dispatch({
            type: "CREATE_WAREHOUSE_CUSTOM_STORE_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "CREATE_WAREHOUSE_CUSTOM_STORE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};


//INHOUSE MOVEMENT


//get all warehouses inhouse movement
export const getAllWarehousesInhouseMovement = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_REQUEST",
        });

        const { data } = await axios.post(`wms/getAllWarehousesInhouseMovement`, formData);

        dispatch({
            type: "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get all Pallet Inhouse movement
export const getAllPalletInhouseMovement = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_PALLET_INHOUSE_MOVEMENT_REQUEST",
        });

        const { data } = await axios.post(`wms/getAllPallotsInhouseMovement/${id}`, formData);

        dispatch({
            type: "GET_ALL_PALLET_INHOUSE_MOVEMENT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "GET_ALL_PALLET_INHOUSE_MOVEMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//change Pallet Inhouse movement
export const changePalletMovement = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "CHANGE_PALLET_MOVEMENT_REQUEST",
        });

        const { data } = await axios.post(`wms/movePallots`, formData);

        dispatch({
            type: "CHANGE_PALLET_MOVEMENT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        console.log(e)
        dispatch({
            type: "CHANGE_PALLET_MOVEMENT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GET INVENTORY 


//get Inventory Filter

export const getInventoryFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_INVENTORY_FILTER_REQUEST",
        });

        const { data } = await axios.post(`wms/getInventoryFilters`, formData);

        dispatch({
            type: "GET_INVENTORY_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_INVENTORY_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Inventory Reports
export const getInventoryReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_INVENTORY_REPORTS_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7708/api/wms/getInvertoryReport`, formData);

        dispatch({
            type: "GET_INVENTORY_REPORTS_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_INVENTORY_REPORTS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Inventory Reports with filters
export const getInventoryReportWithAllFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_INVENTORY_REPORTS_FILTER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7708/api/wms/getInvertoryReportWithFilters`, formData);

        dispatch({
            type: "GET_INVENTORY_REPORTS_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_INVENTORY_REPORTS_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Inventory Available Report
export const getInventoryAvailableStockReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_INVENTORY_AVAILABLE_STOCK_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7709/api/wms/getAvialableStock`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_INVENTORY_AVAILABLE_STOCK_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_INVENTORY_AVAILABLE_STOCK_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock In Reports 
export const getStockInReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_IN_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7710/api/wms/getStockInReport`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_IN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_IN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock In Reports Filter
export const getStockInReportFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_IN_FILTER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7710/api/wms/getStockInReportWithFilters`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_IN_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_IN_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Out Reports 
export const getStockOutReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_OUT_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7711/api/wms/getStockOutReport`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_OUT_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_OUT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Out Reports Filter
export const getStockOutReportFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_OUT_FILTER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7711/api/wms/getStockOutReportWithFilters`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_OUT_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_OUT_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Return Reports 
export const getStockReturnReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_RETURN_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7712/api/wms/getStockReturnReport`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_RETURN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_RETURN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Return Reports Filter
export const getStockReturnReportFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_RETURN_FILTER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7712/api/wms/getStockReturnReportWithFilter`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_RETURN_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_RETURN_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Return Reports 
export const getStockTransferReport = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_TRANSFER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7713/api/wms/getStockTransferReport`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_TRANSFER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_TRANSFER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

//get Stock Return Reports Filter
export const getStockTransferReportFilter = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_STOCK_TRANSFER_FILTER_REQUEST",
        });

        const { data } = await axios.post(`https://crms.ajcl.net:7713/api/wms/getStockTransferReportWithFilters`, formData, {
            timeout: 2000000,
        });

        dispatch({
            type: "GET_STOCK_TRANSFER_FILTER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_STOCK_TRANSFER_FILTER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// GENERAL ENQUIRY

export const generalEnquiry = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_GENERAL_ENQUIRY_REQUEST",
        });

        const { data } = await axios.post(`wms/searchEnquiryItem`, formData);

        dispatch({
            type: "GET_GENERAL_ENQUIRY_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_GENERAL_ENQUIRY_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const generalEnquiryDetails = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_GENERAL_ENQUIRY_DETAILS_REQUEST",
        });

        const { data } = await axios.post(`wms/itemDetails/`, formData);

        dispatch({
            type: "GET_GENERAL_ENQUIRY_DETAILS_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_GENERAL_ENQUIRY_DETAILS_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ================ STOCK IN ==================

export const businessTypeWarehouse = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_BUSINESS_WAREHOUSE_REQUEST",
        });

        const { data } = await axios.post(`wms/getBusinessTypes&Warehouse`, formData);

        dispatch({
            type: "GET_BUSINESS_WAREHOUSE_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_BUSINESS_WAREHOUSE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const bussinessTypeCustomer = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_BUSINESS_CUSTOMER_REQUEST",
        });

        const { data } = await axios.post(`wms/getBussinessTypeBom/${id}`, formData);

        dispatch({
            type: "GET_BUSINESS_CUSTOMER_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_BUSINESS_CUSTOMER_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const generateSerialNo = (formData, no) => async (dispatch) => {
    try {
        dispatch({
            type: "GENERATE_SERIAL_NO_REQUEST",
        });

        const { data } = await axios.post(`wms/generateSerialization/${no}`, formData);

        dispatch({
            type: "GENERATE_SERIAL_NO_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GENERATE_SERIAL_NO_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const getSerialNoExist = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_EXIST_SERIAL_NO_REQUEST",
        });

        const { data } = await axios.post(`wms/getExistingSerialNos`, formData);

        dispatch({
            type: "GET_EXIST_SERIAL_NO_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_EXIST_SERIAL_NO_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const getAvailPalletStockIn = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_AVAIL_PALLET_STOCK_IN_REQUEST",
        });

        const { data } = await axios.post(`wms/getAvialablePallotsInWarehouse/${id}`, formData);

        dispatch({
            type: "GET_AVAIL_PALLET_STOCK_IN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_AVAIL_PALLET_STOCK_IN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const getAvailLocationStockIn = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_AVAIL_LOCATION_STOCK_IN_REQUEST",
        });

        const { data } = await axios.post(`wms/getAvialableLocationsStockInWarehouse/${id}`, formData);

        dispatch({
            type: "GET_AVAIL_LOCATION_STOCK_IN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_AVAIL_LOCATION_STOCK_IN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const getAvailStagesStockIn = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_AVAIL_STAGES_STOCK_IN_REQUEST",
        });

        const { data } = await axios.post(`wms/getAvialableStagesInWarehouse/${id}`, formData);

        dispatch({
            type: "GET_AVAIL_STAGES_STOCK_IN_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "GET_AVAIL_STAGES_STOCK_IN_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};