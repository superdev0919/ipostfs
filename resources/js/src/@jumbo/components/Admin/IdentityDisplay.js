import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import { useApi } from "../context/ApiContext";

export const IdentityDisplay = (props) => {
    const [identity, setIdentity] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();

    const reload = () => {
        api.getId()
            .then(setIdentity)
            .catch((e) => {
                enqueueSnackbar(e, { variant: "error" });
            });
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(reload, []);

    return identity ? (
        <Card>
            <CardHeader title={identity.id} />
            <CardActions>
                <IconButton onClick={reload}>
                    <ReplayIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={"Addresses"}
                            secondary={
                                <List>
                                    {identity.addresses.map((v, k) => (
                                        <ListItem key={k}>{v}</ListItem>
                                    ))}
                                </List>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"Peers"}
                            secondary={
                                <List>
                                    {identity.cluster_peers.map((v, k) => (
                                        <ListItem key={k}>{v}</ListItem>
                                    ))}
                                </List>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"IPFS ID"}
                            secondary={identity.ipfs.id}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"IPFS addresses"}
                            secondary={
                                <List>
                                    {identity.ipfs.addresses.map((v, k) => (
                                        <ListItem key={k}>{v}</ListItem>
                                    ))}
                                </List>
                            }
                        />
                    </ListItem>
                </List>
                {/*<pre>{JSON.stringify(identity, null, 2)}</pre>*/}
            </CardContent>
        </Card>
    ) : (
        <CircularProgress />
    );
};
