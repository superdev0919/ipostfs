import {
    UPDATE_PUBLISH_DATA,
    UPDATE_LOAD_PUBLISH_DATA,
} from "../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
    publishData: null,
    loadPublishData: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_PUBLISH_DATA: {
            return {
                ...state,
                publishData: action.payload,
                loadPublishData: true,
            };
        }
        case UPDATE_LOAD_PUBLISH_DATA: {
            return {
                ...state,
                loadPublishData: action.payload,
            };
        }
        default:
            return state;
    }
};
