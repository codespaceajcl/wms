import * as Yup from 'yup';

//  list of materials
export const listOfMaterialSchema = Yup.object().shape({
    skuNumber: Yup.string()
        .required('SKU Number Required')
        .min(2, ({ min }) => `SKU Number must be at least ${min} characters`)
        .max(30, ({ min }) => `SKU Number not be more than ${min} characters`),
    nomenclatureDescription: Yup.string()
        .required('Nomenclature/Description Required')
        .min(
            2,
            ({ min }) => `Nomenclature/Description must be at least ${min} characters`,
        )
        .max(
            30,
            ({ min }) => `Nomenclature/Description not be more than ${min} characters`,
        ),
    nsn: Yup.string()
        .required('NSN Required')
        .min(2, ({ min }) => `NSN must be at least ${min} characters`)
        .max(30, ({ min }) => `NSN not be more than ${min} characters`),
    uom: Yup.string()
        .required('UOM Required')
        .min(2, ({ min }) => `UOM must be at least ${min} characters`)
        .max(30, ({ min }) => `UOM not be more than ${min} characters`),
    supplier: Yup.string()
        .required('Supplier Required')
        .min(2, ({ min }) => `Supplier must be at least ${min} characters`)
        .max(30, ({ min }) => `Supplier not be more than ${min} characters`),
    medium: Yup.string()
        .required('Medium Required')
        .min(2, ({ min }) => `Medium must be at least ${min} characters`)
        .max(30, ({ min }) => `Medium not be more than ${min} characters`),
    side: Yup.string()
        .required('Side Required')
        .min(2, ({ min }) => `Side must be at least ${min} characters`)
        .max(30, ({ min }) => `Side not be more than ${min} characters`),
    type: Yup.string()
        .required('Type Required')
        .min(2, ({ min }) => `Type must be at least ${min} characters`)
        .max(30, ({ min }) => `Type not be more than ${min} characters`),
    unitPrice: Yup.string().required('Unit Price Required'),
    customer: Yup.string()
        .required('Customer Required')
        .min(2, ({ min }) => `Customer must be at least ${min} characters`)
        .max(30, ({ min }) => `Customer not be more than ${min} characters`),

    businessTypeSelected: Yup.string()
        .required('Company is required'),

    currencySelected: Yup.string()
        .required('Currency selection is required'),
    // .oneOf([true], 'You must select a Currency')
});

// Reports 
export const reportListSchema = Yup.object().shape({
    warehouseSelected: Yup.boolean()
        .oneOf([true], 'You must select a Warehouse')
        .required('Warehouse selection is required'),

    businessTypeSelected: Yup.boolean()
        .oneOf([true], 'You must select a Company')
        .required('Company selection is required'),

    typeSelected: Yup.boolean()
        .oneOf([true], 'You must select a Type')
        .required('Type selection is required'),

    inudstrySelected: Yup.boolean()
        .oneOf([true], 'You must select a Category')
        .required('Category selection is required'),

    skuNumber: Yup.string()
        .required('SKU Number Required')
        .min(2, ({ min }) => `SKU Number must be at least ${min} characters`)
        .max(30, ({ min }) => `SKU Number not be more than ${min} characters`),

    consignee: Yup.string()
        .required('Consignee is Required'),

    fromDate: Yup.date()
        .required('From Date is Required'),

    toDate: Yup.date()
        .required('To Date is Required')
        .when(
            "fromDate",
            (fromDate, schema) => fromDate && schema.min(fromDate))
});

// RMA 
export const rmaListSchema = Yup.object().shape({
    companyName: Yup.string()
        .required('Company Name is Required'),

    contactName: Yup.string()
        .required('Contact Name is Required'),

    address: Yup.string()
        .required('Address is Required'),

    country: Yup.string()
        .required('Country is Required'),

    city: Yup.string()
        .required('Country is Required'),

    phone: Yup.string()
        .required('Phone is Required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    // noOfProducts: Yup.number()
    //     .required('No of Products is Required'),

    // countrySelected: Yup.boolean()
    //     .required('Country selection is required'),

    // citySelected: Yup.boolean()
    //     .required('City selection is required'),
});

//Warehouse
export const warehouseCreateSchema = Yup.object().shape({
    warehouseName: Yup.string()
        .required('Warehouse Name is Required'),

    commerceDate: Yup.date()
        .required('Date is Required'),

    warehouseAddress: Yup.string()
        .required('Warehouse Address is Required'),

    poc: Yup.string()
        .required('POC Name is Required'),

    pocContact: Yup.string()
        .required('POC Contact is Required'),

    noOfStages: Yup.number()
        .required('No of Stages is required'),

    noOfStores: Yup.number()
        .required('No of Stores is Required'),
});

//Consignee
export const consigneeCreateSchema = Yup.object().shape({
    industryName: Yup.string()
        .required('Category Name is Required'),

    consigneeName: Yup.string()
        .required('Consignee Name is Required'),

    consigneeAddress: Yup.string()
        .required('Consignee Address is Required'),

    commerceDate: Yup.date()
        .required('Date is Required'),

    pocName: Yup.string()
        .required('POC Name is Required'),

    contact: Yup.string()
        .required('Contact is Required'),
});

// Stock In Shipment 
export const stockInShipmentSchema = Yup.object().shape({
    orderSelected: Yup.boolean()
        .oneOf([true], 'You must select a Order')
        .required('Order selection is required'),

    transactionalNumber: Yup.string()
        .required('Transactional Number is Required'),

    vehicleNumber: Yup.string()
        .required('Vehicle Number is Required'),

    receivingDate: Yup.date()
        .required('Receiving Date is Required'),

    businessTypeSelected: Yup.boolean()
        .oneOf([true], 'You must select a Company')
        .required('Company selection is required'),

    warehouseSelected: Yup.boolean()
        .oneOf([true], 'You must select a Warehouse')
        .required('Warehouse is required'),

    customerSelected: Yup.boolean()
        .oneOf([true], 'You must select a Customer')
        .required('Customer is required')
});

// Stock Out 
export const stockOutSchema = Yup.object().shape({
    sourceWarehouseSelected: Yup.boolean()
        .oneOf([true], 'You must select a Warehouse')
        .required('Warehouse is required'),

    businessTypeSelected: Yup.boolean()
        .oneOf([true], 'You must select a Company')
        .required('Company selection is required'),

    destinationSelected: Yup.boolean()
        .oneOf([true], 'You must select a Destination')
        .required('Destination selection is required'),

    destinationWarehouseSelected: Yup.boolean()
        .oneOf([true], 'You must select a Warehouse')
        .required('Warehouse is required'),

    customerSelected: Yup.boolean()
        .oneOf([true], 'You must select a Customer')
        .required('Customer is required'),

    dispatchDate: Yup.date()
        .required('Dispatch Date is Required'),

    builtyNumberSelected: Yup.boolean()
        .oneOf([true], 'You must select a Builty Number')
        .required('Builty Number is required'),

    sealNumberSelected: Yup.boolean()
        .oneOf([true], 'You must select a Seal Number')
        .required('Seal Number is required'),

    orderNumberSelected: Yup.boolean()
        .oneOf([true], 'You must select a Order Number')
        .required('Order Number is required'),

    vehicleNumber: Yup.boolean()
        .oneOf([true], 'You must select a Vehicle Number')
        .required('Vehicle Number is required'),

});