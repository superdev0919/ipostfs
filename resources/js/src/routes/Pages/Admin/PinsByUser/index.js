import React, { useState } from "react";
import CmtBackDrop from "../../../../@coremat/CmtBackDrop";
import { intranet } from "../../../../@fake-db";
import PerfectScrollbar from "react-perfect-scrollbar";
import TuneIcon from "@material-ui/icons/Tune";
import Notifications from "./Notifications";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    scrollbarRoot: {
        height: 368,
    },
}));

const title = "Pins By Users";
const PinsByUser = ({ cids, userData }) => {
    const classes = useStyles();

    return (
        <CmtBackDrop concealedIcon={<TuneIcon />} backLayerConcealed={title}>
            <Box pb={4}>
                <PerfectScrollbar className={classes.scrollbarRoot}>
                    <Notifications cids={cids} userData={userData} />
                </PerfectScrollbar>
            </Box>
        </CmtBackDrop>
    );
};

export default PinsByUser;
