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