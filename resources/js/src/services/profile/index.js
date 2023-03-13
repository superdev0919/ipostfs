import { fetchError, fetchStart, fetchSuccess } from "../../redux/actions";
import React from "react";
import axios from "./config";
import {
    setAuthUser,
    updateLoadUser,
} from "../../redux/actions/Auth";
const Profile = {
    onProfile: ({ name, email, password }) => {
        return (dispatch) => {
            dispatch(fetchStart());
            const token = localStorage.getItem("token");
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + token;
            axios
                .post("auth/profile", {
                    email: email,
                    password: password,
                    name: name,
                })
                .then(({ data }) => {
                    if (data.result) {
                        localStorage.setItem("token", data.token.access_token);
                        axios.defaults.headers.common["Authorization"] =
                            "Bearer " + data.token.access_token;
                        dispatch(fetchSuccess());
                        const token = data.token.access_token;
                        axios.defaults.headers.common["Authorization"] =
                            "Bearer " + token;
                        dispatch(fetchStart());
                        axios
                        .post("auth/me")
                        .then(({ data }) => {
                            if (data.result) {
                                dispatch(fetchSuccess("Save Success!"));
                                dispatch(setAuthUser(data.user));
                            } else {
                            }
                        })
                        .catch(function (error) {
                        });
                    } else {
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    dispatch(fetchError(error.message));
                });
        };
    }
};

export default Profile;
