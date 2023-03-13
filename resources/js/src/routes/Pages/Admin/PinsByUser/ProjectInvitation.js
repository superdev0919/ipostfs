import React from "react";
import useStyles from "./BaseItem.style";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BaseItem from "./BaseItem";
import { PinListByUser } from "../../../../@jumbo/components/Admin/PinListByUser";

const ProjectInvitation = ({ item, cids }) => {
    const classes = useStyles();

    const getTitle = () => {
        return (
            <Typography
                component="div"
                variant="h5"
                className={classes.titleRoot}
            >
                <Box component="span" ml={1}>
                    User Name:
                </Box>
                <Box component="span" color="primary.main">
                    {item.name}
                </Box>
                <Box component="span" ml={1}>
                    Email:
                </Box>
                <Box component="span" color="primary.main" ml={1}>
                    {item.email}
                </Box>
            </Typography>
        );
    };

    return (
        <React.Fragment>
            <BaseItem
                item={item}
                title={getTitle()}
                // avatar={[]}
                username={item.name}
            >
                <PinListByUser
                    cids={cids.filter((cid) => cid.user_id == item.id)}
                />
            </BaseItem>
        </React.Fragment>
    );
};

export default ProjectInvitation;
