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
                getArtistData: action.payload,
                error: false
            }
        case "LIST_MATERIAL_POST_FAILED":
            return {
                ...state,
                loading: false,
                getArtistData: null,
                error: action.payload
            }
        default:
            return state
    }
}