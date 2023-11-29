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

export const materialColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "8px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#bec0c3',
        },
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        marginTop: '-1px', // Set a negative margin to move the dropdown upwards
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
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