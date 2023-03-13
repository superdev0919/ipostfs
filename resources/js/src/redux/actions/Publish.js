import {
    UPDATE_PUBLISH_DATA,
    UPDATE_LOAD_PUBLISH_DATA,
} from "../../@jumbo/constants/ActionTypes";

export const setPublishData = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PUBLISH_DATA,
            payload: data,
        });
    };
};

export const updatePublishData = (loading) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_LOAD_PUBLISH_DATA,
            payload: loading,
        });
    };
};
