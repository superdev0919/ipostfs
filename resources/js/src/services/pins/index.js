import { fetchError, fetchStart, fetchSuccess } from "../../redux/actions";
import axios from "./config";

const Pins = {
    pins: (user_id, user_role, setCids, setUserData) => {
        return async (dispatch) => {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            dispatch(fetchStart());
            await axios
                .post("pins/pins", {
                    user_id: user_id,
                    user_role: user_role,
                })
                .then(({ data }) => {
                    if (data.result) {
                        setCids(data.data);
                        data.user_data ? setUserData(data.user_data) : [];
                        dispatch(fetchSuccess("Successfully loaded pins"));
                    } else {
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    dispatch(fetchError(error.message));
                });
        };
    },

    deletePin: (cid) => {
        return async (dispatch) => {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            dispatch(fetchStart());
            await axios
                .post("pins/deletePin", {
                    cid: cid,
                })
                .then(({ data }) => {
                    if (data.result) {
                        dispatch(fetchSuccess("Successfully deleted pin"));
                    } else {
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    dispatch(fetchError(error.message));
                });
        };
    },
};
export default Pins;
