import axios from "axios";

export const ListMaterialPost = () => async (dispatch) => {
    try {
        dispatch({
            type: "LIST_MATERIAL_POST_REQUEST",
        });

        const { data } = await axios.post("material/post");

        dispatch({
            type: "LIST_MATERIAL_POST_SUCCESS",
            payload: data,
            success: true,
        });
    }

    catch (e) {
        dispatch({
            type: "LIST_MATERIAL_POST_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};