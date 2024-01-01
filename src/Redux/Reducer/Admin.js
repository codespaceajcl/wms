export const ListMaterialPostReducer = (state = {}, action) => {
    switch (action.type) {
        case "LIST_MATERIAL_POST_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "LIST_MATERIAL_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                postMaterialData: action.payload,
                error: false
            }
        case "LIST_MATERIAL_POST_FAILED":
            return {
                ...state,
                loading: false,
                postMaterialData: null,
                error: action.payload
            }
        case "LIST_MATERIAL_POST_RESET":
            return {
                ...state,
                loading: false,
                postMaterialData: null,
                error: null
            }
        default:
            return state
    }
}

export const ConsigneePostReducer = (state = {}, action) => {
    switch (action.type) {
        case "LIST_CONSIGNEE_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "LIST_CONSIGNEE_SUCCESS":
            return {
                ...state,
                loading: false,
                getConsigneeData: action.payload,
                error: false
            }
        case "LIST_CONSIGNEE_FAILED":
            return {
                ...state,
                loading: false,
                getConsigneeData: null,
                error: action.payload
            }
        case "LIST_CONSIGNEE_RESET":
            return {
                ...state,
                loading: false,
                getConsigneeData: null,
                error: null
            }
        default:
            return state
    }
}

export const DeliveryChallanGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "LIST_DELIVERY_CHALLAN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "LIST_DELIVERY_CHALLAN_SUCCESS":
            return {
                ...state,
                loading: false,
                getDcData: action.payload,
                error: false
            }
        case "LIST_DELIVERY_CHALLAN_FAILED":
            return {
                ...state,
                loading: false,
                getDcData: null,
                error: action.payload
            }
        case "LIST_DELIVERY_CHALLAN_RESET":
            return {
                ...state,
                loading: false,
                getDcData: null,
                error: null
            }
        default:
            return state
    }
}

export const RevertDocumentReducer = (state = {}, action) => {
    switch (action.type) {
        case "REVERT_DOCUMENT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "REVERT_DOCUMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                revertData: action.payload,
                error: false
            }
        case "REVERT_DOCUMENT_FAILED":
            return {
                ...state,
                loading: false,
                revertData: null,
                error: action.payload
            }
        case "REVERT_DOCUMENT_RESET":
            return {
                ...state,
                loading: false,
                revertData: null,
                error: null
            }
        default:
            return state
    }
}

export const PostDcDocumentReducer = (state = {}, action) => {
    switch (action.type) {
        case "POST_DC_DOCUMENT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "POST_DC_DOCUMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                dcDocumentData: action.payload,
                error: false
            }
        case "POST_DC_DOCUMENT_FAILED":
            return {
                ...state,
                loading: false,
                dcDocumentData: null,
                error: action.payload
            }
        case "POST_DC_DOCUMENT_RESET":
            return {
                ...state,
                loading: false,
                dcDocumentData: null,
                error: null
            }
        default:
            return state
    }
}

export const postRmaFormReducer = (state = {}, action) => {
    switch (action.type) {
        case "POST_RMA_FORM_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "POST_RMA_FORM_SUCCESS":
            return {
                ...state,
                loading: false,
                rmaData: action.payload,
                error: false
            }
        case "POST_RMA_FORM_FAILED":
            return {
                ...state,
                loading: false,
                rmaData: null,
                error: action.payload
            }
        case "POST_RMA_FORM_RESET":
            return {
                ...state,
                loading: false,
                rmaData: null,
                error: null
            }
        default:
            return state
    }
}

export const getWarehouseReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_WAREHOUSE_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_WAREHOUSE_SUCCESS":
            return {
                ...state,
                loading: false,
                getWarehouseData: action.payload,
                error: false
            }
        case "GET_WAREHOUSE_FAILED":
            return {
                ...state,
                loading: false,
                getWarehouseData: null,
                error: action.payload
            }
        case "GET_WAREHOUSE_RESET":
            return {
                ...state,
                loading: false,
                getWarehouseData: null,
                error: null
            }
        default:
            return state
    }
}

export const createWarehouseReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_WAREHOUSE_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "CREATE_WAREHOUSE_SUCCESS":
            return {
                ...state,
                loading: false,
                createWarehouseData: action.payload,
                error: false
            }
        case "CREATE_WAREHOUSE_FAILED":
            return {
                ...state,
                loading: false,
                createWarehouseData: null,
                error: action.payload
            }
        case "CREATE_WAREHOUSE_RESET":
            return {
                ...state,
                loading: false,
                createWarehouseData: null,
                error: null
            }
        default:
            return state
    }
}

export const getWarehouseDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_WAREHOUSE_DETAILS_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_WAREHOUSE_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                getWarehouseDetailsData: action.payload,
                error: false
            }
        case "GET_WAREHOUSE_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                getWarehouseDetailsData: null,
                error: action.payload
            }
        case "GET_WAREHOUSE_DETAILS_RESET":
            return {
                ...state,
                loading: false,
                getWarehouseDetailsData: null,
                error: null
            }
        default:
            return state
    }
}

export const createWarehousePalletsReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_WAREHOUSE_PALLETS_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "CREATE_WAREHOUSE_PALLETS_SUCCESS":
            return {
                ...state,
                loading: false,
                createWarehousePalletsData: action.payload,
                error: false
            }
        case "CREATE_WAREHOUSE_PALLETS_FAILED":
            return {
                ...state,
                loading: false,
                createWarehousePalletsData: null,
                error: action.payload
            }
        case "CREATE_WAREHOUSE_PALLETS_RESET":
            return {
                ...state,
                loading: false,
                createWarehousePalletsData: null,
                error: null
            }
        default:
            return state
    }
}

export const createWarehouseStageReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_WAREHOUSE_STAGES_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "CREATE_WAREHOUSE_STAGES_SUCCESS":
            return {
                ...state,
                loading: false,
                createWarehouseStagesData: action.payload,
                error: false
            }
        case "CREATE_WAREHOUSE_STAGES_FAILED":
            return {
                ...state,
                loading: false,
                createWarehouseStagesData: null,
                error: action.payload
            }
        case "CREATE_WAREHOUSE_STAGES_RESET":
            return {
                ...state,
                loading: false,
                createWarehouseStagesData: null,
                error: null
            }
        default:
            return state
    }
}

export const createWarehouseCustomStoreReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_WAREHOUSE_CUSTOM_STORE_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "CREATE_WAREHOUSE_CUSTOM_STORE_SUCCESS":
            return {
                ...state,
                loading: false,
                createWarehouseCustomStoreData: action.payload,
                error: false
            }
        case "CREATE_WAREHOUSE_CUSTOM_STORE_FAILED":
            return {
                ...state,
                loading: false,
                createWarehouseCustomStoreData: null,
                error: action.payload
            }
        case "CREATE_WAREHOUSE_CUSTOM_STORE_RESET":
            return {
                ...state,
                loading: false,
                createWarehouseCustomStoreData: null,
                error: null
            }
        default:
            return state
    }
}

export const getAllWarehousesInhouseMovementReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                getWarehouseMovementData: action.payload,
                error: false
            }
        case "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_FAILED":
            return {
                ...state,
                loading: false,
                getWarehouseMovementData: null,
                error: action.payload
            }
        case "GET_ALL_WAREHOUSE_INHOUSE_MOVEMENT_RESET":
            return {
                ...state,
                loading: false,
                getWarehouseMovementData: null,
                error: null
            }
        default:
            return state
    }
}

export const getAllPalletInhouseMovementReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_PALLET_INHOUSE_MOVEMENT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_ALL_PALLET_INHOUSE_MOVEMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                getPalletsMovementData: action.payload,
                error: false
            }
        case "GET_ALL_PALLET_INHOUSE_MOVEMENT_FAILED":
            return {
                ...state,
                loading: false,
                getPalletsMovementData: null,
                error: action.payload
            }
        case "GET_ALL_PALLET_INHOUSE_MOVEMENT_RESET":
            return {
                ...state,
                loading: false,
                getPalletsMovementData: null,
                error: null
            }
        default:
            return state
    }
}

export const changePalletMovementReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_PALLET_MOVEMENT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "CHANGE_PALLET_MOVEMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                palletSaveData: action.payload,
                error: false
            }
        case "CHANGE_PALLET_MOVEMENT_FAILED":
            return {
                ...state,
                loading: false,
                palletSaveData: null,
                error: action.payload
            }
        case "CHANGE_PALLET_MOVEMENT_RESET":
            return {
                ...state,
                loading: false,
                palletSaveData: null,
                error: null
            }
        default:
            return state
    }
}

export const getInventoryFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_INVENTORY_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_INVENTORY_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                inventoryFilterData: action.payload,
                error: false
            }
        case "GET_INVENTORY_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                inventoryFilterData: null,
                error: action.payload
            }
        case "GET_INVENTORY_FILTER_RESET":
            return {
                ...state,
                loading: false,
                inventoryFilterData: null,
                error: null
            }
        default:
            return state
    }
}

export const getInventoryReportReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_INVENTORY_REPORTS_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_INVENTORY_REPORTS_SUCCESS":
            return {
                ...state,
                loading: false,
                inventoryReportsData: action.payload,
                error: false
            }
        case "GET_INVENTORY_REPORTS_FAILED":
            return {
                ...state,
                loading: false,
                inventoryReportsData: null,
                error: action.payload
            }
        case "GET_INVENTORY_REPORTS_RESET":
            return {
                ...state,
                loading: false,
                inventoryReportsData: null,
                error: null
            }
        default:
            return state
    }
}

export const getInventoryReportFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_INVENTORY_REPORTS_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_INVENTORY_REPORTS_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                inventoryReportsFilterAllData: action.payload,
                error: false
            }
        case "GET_INVENTORY_REPORTS_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                inventoryReportsFilterAllData: null,
                error: action.payload
            }
        case "GET_INVENTORY_REPORTS_FILTER_RESET":
            return {
                ...state,
                loading: false,
                inventoryReportsFilterAllData: null,
                error: null
            }
        default:
            return state
    }
}

export const getInventoryAvailableStockReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_INVENTORY_AVAILABLE_STOCK_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_INVENTORY_AVAILABLE_STOCK_SUCCESS":
            return {
                ...state,
                loading: false,
                inventoryAvailableStockData: action.payload,
                error: false
            }
        case "GET_INVENTORY_AVAILABLE_STOCK_FAILED":
            return {
                ...state,
                loading: false,
                inventoryAvailableStockData: null,
                error: action.payload
            }
        case "GET_INVENTORY_AVAILABLE_STOCK_RESET":
            return {
                ...state,
                loading: false,
                inventoryAvailableStockData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockInReportReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_IN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockInData: action.payload,
                error: false
            }
        case "GET_STOCK_IN_FAILED":
            return {
                ...state,
                loading: false,
                getStockInData: null,
                error: action.payload
            }
        case "GET_STOCK_IN_RESET":
            return {
                ...state,
                loading: false,
                getStockInData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockInReportFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_IN_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_IN_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockInFilterData: action.payload,
                error: false
            }
        case "GET_STOCK_IN_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                getStockInFilterData: null,
                error: action.payload
            }
        case "GET_STOCK_IN_FILTER_RESET":
            return {
                ...state,
                loading: false,
                getStockInFilterData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockOutReportReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_OUT_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_OUT_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockOutData: action.payload,
                error: false
            }
        case "GET_STOCK_OUT_FAILED":
            return {
                ...state,
                loading: false,
                getStockOutData: null,
                error: action.payload
            }
        case "GET_STOCK_OUT_RESET":
            return {
                ...state,
                loading: false,
                getStockOutData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockOutReportFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_OUT_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_OUT_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockOutFilterData: action.payload,
                error: false
            }
        case "GET_STOCK_OUT_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                getStockOutFilterData: null,
                error: action.payload
            }
        case "GET_STOCK_OUT_FILTER_RESET":
            return {
                ...state,
                loading: false,
                getStockOutFilterData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockReturnReportReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_RETURN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_RETURN_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockReturnData: action.payload,
                error: false
            }
        case "GET_STOCK_RETURN_FAILED":
            return {
                ...state,
                loading: false,
                getStockReturnData: null,
                error: action.payload
            }
        case "GET_STOCK_RETURN_RESET":
            return {
                ...state,
                loading: false,
                getStockReturnData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockReturnReportFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_RETURN_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_RETURN_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockReturnFilterData: action.payload,
                error: false
            }
        case "GET_STOCK_RETURN_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                getStockReturnFilterData: null,
                error: action.payload
            }
        case "GET_STOCK_RETURN_FILTER_RESET":
            return {
                ...state,
                loading: false,
                getStockReturnFilterData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockTransferReportReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_TRANSFER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_TRANSFER_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockTransferData: action.payload,
                error: false
            }
        case "GET_STOCK_TRANSFER_FAILED":
            return {
                ...state,
                loading: false,
                getStockTransferData: null,
                error: action.payload
            }
        case "GET_STOCK_TRANSFER_RESET":
            return {
                ...state,
                loading: false,
                getStockTransferData: null,
                error: null
            }
        default:
            return state
    }
}

export const getStockTransferReportFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_STOCK_TRANSFER_FILTER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_STOCK_TRANSFER_FILTER_SUCCESS":
            return {
                ...state,
                loading: false,
                getStockTransferFilterData: action.payload,
                error: false
            }
        case "GET_STOCK_TRANSFER_FILTER_FAILED":
            return {
                ...state,
                loading: false,
                getStockTransferFilterData: null,
                error: action.payload
            }
        case "GET_STOCK_TRANSFER_FILTER_RESET":
            return {
                ...state,
                loading: false,
                getStockTransferFilterData: null,
                error: null
            }
        default:
            return state
    }
}

export const getGeneralEnquiryReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_GENERAL_ENQUIRY_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_GENERAL_ENQUIRY_SUCCESS":
            return {
                ...state,
                loading: false,
                getGeneralEnquiryData: action.payload,
                error: false
            }
        case "GET_GENERAL_ENQUIRY_FAILED":
            return {
                ...state,
                loading: false,
                getGeneralEnquiryData: null,
                error: action.payload
            }
        case "GET_GENERAL_ENQUIRY_RESET":
            return {
                ...state,
                loading: false,
                getGeneralEnquiryData: null,
                error: null
            }
        default:
            return state
    }
}

export const getGeneralEnquiryDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_GENERAL_ENQUIRY_DETAILS_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_GENERAL_ENQUIRY_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                getEnquiryDetailData: action.payload,
                error: false
            }
        case "GET_GENERAL_ENQUIRY_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                getEnquiryDetailData: null,
                error: action.payload
            }
        case "GET_GENERAL_ENQUIRY_DETAILS_RESET":
            return {
                ...state,
                loading: false,
                getEnquiryDetailData: null,
                error: null
            }
        default:
            return state
    }
}

// STOCK IN ======= 

export const businessTypeWarehouseReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_BUSINESS_WAREHOUSE_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_BUSINESS_WAREHOUSE_SUCCESS":
            return {
                ...state,
                loading: false,
                getBusinessWarehouses: action.payload,
                error: false
            }
        case "GET_BUSINESS_WAREHOUSE_FAILED":
            return {
                ...state,
                loading: false,
                getBusinessWarehouses: null,
                error: action.payload
            }
        case "GET_BUSINESS_WAREHOUSE_RESET":
            return {
                ...state,
                loading: false,
                getBusinessWarehouses: null,
                error: null
            }
        default:
            return state
    }
}

export const businessTypeCustomerReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_BUSINESS_CUSTOMER_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_BUSINESS_CUSTOMER_SUCCESS":
            return {
                ...state,
                loading: false,
                getBusinessCustomers: action.payload,
                error: false
            }
        case "GET_BUSINESS_CUSTOMER_FAILED":
            return {
                ...state,
                loading: false,
                getBusinessCustomers: null,
                error: action.payload
            }
        case "GET_BUSINESS_CUSTOMER_RESET":
            return {
                ...state,
                loading: false,
                getBusinessCustomers: null,
                error: null
            }
        default:
            return state
    }
}

export const generateSerialNoReducer = (state = {}, action) => {
    switch (action.type) {
        case "GENERATE_SERIAL_NO_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GENERATE_SERIAL_NO_SUCCESS":
            return {
                ...state,
                loading: false,
                getSerialization: action.payload,
                error: false
            }
        case "GENERATE_SERIAL_NO_FAILED":
            return {
                ...state,
                loading: false,
                getSerialization: null,
                error: action.payload
            }
        case "GENERATE_SERIAL_NO_RESET":
            return {
                ...state,
                loading: false,
                getSerialization: null,
                error: null
            }
        default:
            return state
    }
}

export const getExistingSerialNoReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_EXIST_SERIAL_NO_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_EXIST_SERIAL_NO_SUCCESS":
            return {
                ...state,
                loading: false,
                getExistingSerial: action.payload,
                error: false
            }
        case "GET_EXIST_SERIAL_NO_FAILED":
            return {
                ...state,
                loading: false,
                getExistingSerial: null,
                error: action.payload
            }
        case "GET_EXIST_SERIAL_NO_RESET":
            return {
                ...state,
                loading: false,
                getExistingSerial: null,
                error: null
            }
        default:
            return state
    }
}

export const getAvailPalletStockInReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_AVAIL_PALLET_STOCK_IN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_AVAIL_PALLET_STOCK_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                getAvailPallet: action.payload,
                error: false
            }
        case "GET_AVAIL_PALLET_STOCK_IN_FAILED":
            return {
                ...state,
                loading: false,
                getAvailPallet: null,
                error: action.payload
            }
        case "GET_AVAIL_PALLET_STOCK_IN_RESET":
            return {
                ...state,
                loading: false,
                getAvailPallet: null,
                error: null
            }
        default:
            return state
    }
}

export const getAvailLocationStockInReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_AVAIL_LOCATION_STOCK_IN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_AVAIL_LOCATION_STOCK_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                getLoctionPallet: action.payload,
                error: false
            }
        case "GET_AVAIL_LOCATION_STOCK_IN_FAILED":
            return {
                ...state,
                loading: false,
                getLoctionPallet: null,
                error: action.payload
            }
        case "GET_AVAIL_LOCATION_STOCK_IN_RESET":
            return {
                ...state,
                loading: false,
                getLoctionPallet: null,
                error: null
            }
        default:
            return state
    }
}

export const getAvailStagesStockInReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_AVAIL_STAGES_STOCK_IN_REQUEST":
            return {
                loading: true,
                error: false
            }
        case "GET_AVAIL_STAGES_STOCK_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                getStagesPallet: action.payload,
                error: false
            }
        case "GET_AVAIL_STAGES_STOCK_IN_FAILED":
            return {
                ...state,
                loading: false,
                getStagesPallet: null,
                error: action.payload
            }
        case "GET_AVAIL_STAGES_STOCK_IN_RESET":
            return {
                ...state,
                loading: false,
                getStagesPallet: null,
                error: null
            }
        default:
            return state
    }
}