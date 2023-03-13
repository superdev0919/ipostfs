import { fetchError, fetchStart, fetchSuccess } from "../../redux/actions";
import axios from "./config";

const Limits = {
    limits: (user_id, user_role, setUserData) => {
        return async (dispatch) => {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            dispatch(fetchStart());
            await axios
                .post("limits/limits", {
                    user_id: user_id,
                    user_role: user_role,
                })
                .then(({ data }) => {
                    if (data.result) {
                        data.user_data ? setUserData(data.user_data) : [];
                        dispatch(fetchSuccess("Successfully loaded limits"));
                    } else {
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    dispatch(fetchError(error.message));
                });
        };
    },

    updateLimit: (user_id, limit) => {
        return async (dispatch) => {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            dispatch(fetchStart());
            await axios
                .post("limits/updateLimit", {
                    user_id: user_id,
                    limit: limit,
                })
                .then(({ data }) => {
                    if (data.result) {
                        dispatch(
                            fetchSuccess(
                                "Successfully updated space limitation"
                            )
                        );
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
export default Limits;
