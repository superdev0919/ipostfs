import React from "react";
import { Box } from "@material-ui/core";
import CmtList from "../../../../@coremat/CmtList";
import { alpha, makeStyles } from "@material-ui/core/styles";
import ProjectInvitation from "./ProjectInvitation";

const useStyles = makeStyles((theme) => ({
    subHeaderTitle: {
        color: theme.palette.text.secondary,
        fontSize: 10,
        letterSpacing: 1.5,
    },
    feedItemView: {
        borderBottom: `1px solid ${alpha(theme.palette.common.dark, 0.1)}`,
    },
    listHeaderRoot: {
        display: "flex",
        alignItems: "center",
        padding: "16px 24px 10px",
    },
    listBtnRoot: {
        fontSize: 10,
        letterSpacing: 1.5,
    },
}));

const Notifications = ({ cids, userData }) => {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.feedItemView}>
                <Box display="flex" flexDirection="column">
                    <CmtList
                        data={userData}
                        renderRow={(item, index) => (
                            <ProjectInvitation
                                key={index}
                                item={item}
                                cids={cids}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Notifications;
