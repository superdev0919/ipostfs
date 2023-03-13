import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { PinList } from "../../../@jumbo/components/User/PinList";
import { useApi } from "../../../@jumbo/components/context/ApiContext";
import { base_ipfs_api_url } from "../../../config";
import Pins from "../../../services/pins";
import { useSelector } from "react-redux";

const UserPins = () => {
    const api = useApi();
    const apiUrl = base_ipfs_api_url;
    api.apiUrl = apiUrl;
    const { authUser } = useSelector(({ auth }) => auth);

    const dispatch = useDispatch();
    const [cids, setCids] = useState([]);

    useEffect(() => {
        dispatch(Pins.pins(authUser.id, authUser.role, setCids));
    }, []);

    return (
        <>
            <div style={{ height: 80 }} />
            <Container>
                <PinList cids={cids} />
            </Container>
            <div style={{ height: 15 }} />
        </>
    );
};

export default UserPins;
