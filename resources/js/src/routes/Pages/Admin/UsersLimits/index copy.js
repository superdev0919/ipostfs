import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import Pins from "../../../../services/pins";
import { useSelector } from "react-redux";
import PinsByUser from "../PinsByUser";

const UsersLimits = () => {
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

export default UsersLimits;
