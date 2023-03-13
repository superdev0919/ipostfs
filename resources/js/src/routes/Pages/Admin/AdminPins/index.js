import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { useApi } from "../../../../@jumbo/components/context/ApiContext";
import { base_ipfs_api_url } from "../../../../config";
import Pins from "../../../../services/pins";
import { useSelector } from "react-redux";
import PinsByUser from "../PinsByUser";

const AdminPins = () => {
    const api = useApi();
    const apiUrl = base_ipfs_api_url;
    api.apiUrl = apiUrl;
    const { authUser } = useSelector(({ auth }) => auth);

    const dispatch = useDispatch();
    const [cids, setCids] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        dispatch(Pins.pins(authUser.id, authUser.role, setCids, setUserData));
    }, []);

    return (
        <>
            <div style={{ height: 30 }} />
            <Container>
                <PinsByUser cids={cids} userData={userData} />
            </Container>
            <div style={{ height: 15 }} />
        </>
    );
};

export default AdminPins;
