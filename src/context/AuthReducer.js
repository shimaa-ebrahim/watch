// AuthReducer.js
const initialState = {
    user: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default AuthReducer; // Ensure you're exporting it correctly
