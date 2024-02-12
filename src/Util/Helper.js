const getEmail = localStorage.getItem("email")
const getToken = localStorage.getItem("token")

export const login = {
    email: getEmail,
    token: getToken
}

export const dashboardColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "100px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#bec0c3',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
};

export const sortByStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "100px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#bec0c3',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
            color: "#000"
        };
    },
};

export const materialColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "8px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#bec0c3',
        },
    }),
    menu: (provided, state) => ({
        ...provided,
        marginTop: 0, // or adjust as needed
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
    menuPortal: base => ({ ...base, zIndex: 9999 }),
};

export const rackColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "100px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        width: "100%",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#fff' : '#fff',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#fff' : '#fff',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#000",
        padding: "10px",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        color: state.isFocused ? '#000' : '#000', // Change the color as needed
        '&:hover': {
            color: state.isFocused ? '#000' : '#000', // Change the color as needed
        },
    }),
    // indicatorContainer: (baseStyles) => ({
    //     ...baseStyles,
    //     backgroundColor: '#000',
    //     color: "red"
    //   }),
};

export const partColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: '#f9f9f9', borderRadius: "100px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        width: "100%",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#bec0c3' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#bec0c3' : '#bec0c3',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
    seperatorIndicator: (baseStyles) => ({
        ...baseStyles,
        display: "none"
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#A9C23F",
        padding: "10px",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        color: state.isFocused ? '#fff' : '#fff', // Change the color as needed
        '&:hover': {
            color: state.isFocused ? '#fff' : '#fff', // Change the color as needed
        },
    }),
};

export const nomenStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: '#f9f9f9', borderRadius: "8px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        width: "100%",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#bec0c3' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#bec0c3' : '#bec0c3',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#A9C23F",
        padding: "10px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        color: state.isFocused ? '#fff' : '#fff', // Change the color as needed
        '&:hover': {
            color: state.isFocused ? '#fff' : '#fff', // Change the color as needed
        },
    }),
};

export const floorColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'rgba(231, 231, 231, 1)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        boxShadow: 'none',
        border: '1.5px solid #000',
        color: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#000' : '#000',
        width: '100%',
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#000' : '#000',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#000' : '#000',
        },
        '::placeholder': {
            color: '#000 !important',
        },
    }),
    singleValue: (styles, state) => ({
        ...styles,
        backgroundColor: state.isFocused ? '#007bff' : 'transparent',
        color: '#000',
    }),
    option: (styles, state) => ({
        ...styles,
        fontSize: '13px',
        backgroundColor: state.isSelected ? '#007bff' : '#e7e7e7',
        color: state.isSelected ? '#fff' : '#000',
    }),
};

// currencies

export const currencies = [
    { label: "Afghan Afghani", value: "AFA" },
    { label: "Albanian Lek", value: "ALL" },
    { label: "Algerian Dinar", value: "DZD" },
    { label: "Angolan Kwanza", value: "AOA" },
    { label: "Argentine Peso", value: "ARS" },
    { label: "Armenian Dram", value: "AMD" },
    { label: "Aruban Florin", value: "AWG" },
    { label: "Australian Dollar", value: "AUD" },
    { label: "Azerbaijani Manat", value: "AZN" },
    { label: "Bahamian Dollar", value: "BSD" },
    { label: "Bahraini Dinar", value: "BHD" },
    { label: "Bangladeshi Taka", value: "BDT" },
    { label: "Barbadian Dollar", value: "BBD" },
    { label: "Belarusian Ruble", value: "BYR" },
    { label: "Belgian Franc", value: "BEF" },
    { label: "Belize Dollar", value: "BZD" },
    { label: "Bermudan Dollar", value: "BMD" },
    { label: "Bhutanese Ngultrum", value: "BTN" },
    { label: "Bitcoin", value: "BTC" },
    { label: "Bolivian Boliviano", value: "BOB" },
    { label: "Bosnia-Herzegovina Convertible Mark", value: "BAM" },
    { label: "Botswanan Pula", value: "BWP" },
    { label: "Brazilian Real", value: "BRL" },
    { label: "British Pound Sterling", value: "GBP" },
    { label: "Brunei Dollar", value: "BND" },
    { label: "Bulgarian Lev", value: "BGN" },
    { label: "Burundian Franc", value: "BIF" },
    { label: "Cambodian Riel", value: "KHR" },
    { label: "Canadian Dollar", value: "CAD" },
    { label: "Cape Verdean Escudo", value: "CVE" },
    { label: "Cayman Islands Dollar", value: "KYD" },
    { label: "CFA Franc BCEAO", value: "XOF" },
    { label: "CFA Franc BEAC", value: "XAF" },
    { label: "CFP Franc", value: "XPF" },
    { label: "Chilean Peso", value: "CLP" },
    { label: "Chilean Unit of Account", value: "CLF" },
    { label: "Chinese Yuan", value: "CNY" },
    { label: "Colombian Peso", value: "COP" },
    { label: "Comorian Franc", value: "KMF" },
    { label: "Congolese Franc", value: "CDF" },
    { label: "Costa Rican Colón", value: "CRC" },
    { label: "Croatian Kuna", value: "HRK" },
    { label: "Cuban Convertible Peso", value: "CUC" },
    { label: "Czech Republic Koruna", value: "CZK" },
    { label: "Danish Krone", value: "DKK" },
    { label: "Djiboutian Franc", value: "DJF" },
    { label: "Dominican Peso", value: "DOP" },
    { label: "East Caribbean Dollar", value: "XCD" },
    { label: "Egyptian Pound", value: "EGP" },
    { label: "Eritrean Nakfa", value: "ERN" },
    { label: "Estonian Kroon", value: "EEK" },
    { label: "Ethiopian Birr", value: "ETB" },
    { label: "Euro", value: "EUR" },
    { label: "Falkland Islands Pound", value: "FKP" },
    { label: "Fijian Dollar", value: "FJD" },
    { label: "Gambian Dalasi", value: "GMD" },
    { label: "Georgian Lari", value: "GEL" },
    { label: "German Mark", value: "DEM" },
    { label: "Ghanaian Cedi", value: "GHS" },
    { label: "Gibraltar Pound", value: "GIP" },
    { label: "Greek Drachma", value: "GRD" },
    { label: "Guatemalan Quetzal", value: "GTQ" },
    { label: "Guinean Franc", value: "GNF" },
    { label: "Guyanaese Dollar", value: "GYD" },
    { label: "Haitian Gourde", value: "HTG" },
    { label: "Honduran Lempira", value: "HNL" },
    { label: "Hong Kong Dollar", value: "HKD" },
    { label: "Hungarian Forint", value: "HUF" },
    { label: "Icelandic Króna", value: "ISK" },
    { label: "Indian Rupee", value: "INR" },
    { label: "Indonesian Rupiah", value: "IDR" },
    { label: "Iranian Rial", value: "IRR" },
    { label: "Iraqi Dinar", value: "IQD" },
    { label: "Israeli New Sheqel", value: "ILS" },
    { label: "Italian Lira", value: "ITL" },
    { label: "Jamaican Dollar", value: "JMD" },
    { label: "Japanese Yen", value: "JPY" },
    { label: "Jordanian Dinar", value: "JOD" },
    { label: "Kazakhstani Tenge", value: "KZT" },
    { label: "Kenyan Shilling", value: "KES" },
    { label: "Kuwaiti Dinar", value: "KWD" },
    { label: "Kyrgystani Som", value: "KGS" },
    { label: "Laotian Kip", value: "LAK" },
    { label: "Latvian Lats", value: "LVL" },
    { label: "Lebanese Pound", value: "LBP" },
    { label: "Lesotho Loti", value: "LSL" },
    { label: "Liberian Dollar", value: "LRD" },
    { label: "Libyan Dinar", value: "LYD" },
    { label: "Litecoin", value: "LTC" },
    { label: "Lithuanian Litas", value: "LTL" },
    { label: "Macanese Pataca", value: "MOP" },
    { label: "Macedonian Denar", value: "MKD" },
    { label: "Malagasy Ariary", value: "MGA" },
    { label: "Malawian Kwacha", value: "MWK" },
    { label: "Malaysian Ringgit", value: "MYR" },
    { label: "Maldivian Rufiyaa", value: "MVR" },
    { label: "Mauritanian Ouguiya", value: "MRO" },
    { label: "Mauritian Rupee", value: "MUR" },
    { label: "Mexican Peso", value: "MXN" },
    { label: "Moldovan Leu", value: "MDL" },
    { label: "Mongolian Tugrik", value: "MNT" },
    { label: "Moroccan Dirham", value: "MAD" },
    { label: "Mozambican Metical", value: "MZM" },
    { label: "Myanmar Kyat", value: "MMK" },
    { label: "Namibian Dollar", value: "NAD" },
    { label: "Nepalese Rupee", value: "NPR" },
    { label: "Netherlands Antillean Guilder", value: "ANG" },
    { label: "New Taiwan Dollar", value: "TWD" },
    { label: "New Zealand Dollar", value: "NZD" },
    { label: "Nicaraguan Córdoba", value: "NIO" },
    { label: "Nigerian Naira", value: "NGN" },
    { label: "North Korean Won", value: "KPW" },
    { label: "Norwegian Krone", value: "NOK" },
    { label: "Omani Rial", value: "OMR" },
    { label: "Pakistani Rupee", value: "PKR" },
    { label: "Panamanian Balboa", value: "PAB" },
    { label: "Papua New Guinean Kina", value: "PGK" },
    { label: "Paraguayan Guarani", value: "PYG" },
    { label: "Peruvian Nuevo Sol", value: "PEN" },
    { label: "Philippine Peso", value: "PHP" },
    { label: "Polish Zloty", value: "PLN" },
    { label: "Qatari Rial", value: "QAR" },
    { label: "Romanian Leu", value: "RON" },
    { label: "Russian Ruble", value: "RUB" },
    { label: "Rwandan Franc", value: "RWF" },
    { label: "Salvadoran Colón", value: "SVC" },
    { label: "Samoan Tala", value: "WST" },
    { label: "São Tomé and Príncipe Dobra", value: "STD" },
    { label: "Saudi Riyal", value: "SAR" },
    { label: "Serbian Dinar", value: "RSD" },
    { label: "Seychellois Rupee", value: "SCR" },
    { label: "Sierra Leonean Leone", value: "SLL" },
    { label: "Singapore Dollar", value: "SGD" },
    { label: "Slovak Koruna", value: "SKK" },
    { label: "Solomon Islands Dollar", value: "SBD" },
    { label: "Somali Shilling", value: "SOS" },
    { label: "South African Rand", value: "ZAR" },
    { label: "South Korean Won", value: "KRW" },
    { label: "South Sudanese Pound", value: "SSP" },
    { label: "Special Drawing Rights", value: "XDR" },
    { label: "Sri Lankan Rupee", value: "LKR" },
    { label: "St. Helena Pound", value: "SHP" },
    { label: "Sudanese Pound", value: "SDG" },
    { label: "Surilabelse Dollar", value: "SRD" },
    { label: "Swazi Lilangeni", value: "SZL" },
    { label: "Swedish Krona", value: "SEK" },
    { label: "Swiss Franc", value: "CHF" },
    { label: "Syrian Pound", value: "SYP" },
    { label: "Tajikistani Somoni", value: "TJS" },
    { label: "Tanzanian Shilling", value: "TZS" },
    { label: "Thai Baht", value: "THB" },
    { label: "Tongan Pa'anga", value: "TOP" },
    { label: "Trinidad & Tobago Dollar", value: "TTD" },
    { label: "Tunisian Dinar", value: "TND" },
    { label: "Turkish Lira", value: "TRY" },
    { label: "Turkmenistani Manat", value: "TMT" },
    { label: "Ugandan Shilling", value: "UGX" },
    { label: "Ukrainian Hryvnia", value: "UAH" },
    { label: "United Arab Emirates Dirham", value: "AED" },
    { label: "Uruguayan Peso", value: "UYU" },
    { label: "US Dollar", value: "USD" },
    { label: "Uzbekistan Som", value: "UZS" },
    { label: "Vanuatu Vatu", value: "VUV" },
    { label: "Venezuelan BolÃvar", value: "VEF" },
    { label: "Vietnamese Dong", value: "VND" },
    { label: "Yemeni Rial", value: "YER" },
    { label: "Zambian Kwacha", value: "ZMK" },
    { label: "Zimbabwean dollar", value: "ZWL" }
];