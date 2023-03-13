import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { useLoading } from "../../../hooks/UseLoading";

export const PeerList = (props) => {
    const [peers, setPeers] = useState([]);
    const [isLoading, load] = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();

    const reload = () => {
        load(api.getPeers())
            .then(setPeers)
            .catch((e) => {
                enqueueSnackbar(`Error: ${e}`, { variant: "error" });
            });
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(reload, []);

    let jsonData = [];

    try {
        if (peers.length > 0) {
            let spilt_peers = peers.split("\n");

            // Iterate over the array, parsing each line
            spilt_peers.forEach((el) => {
                // Skip empty lines
                if (el.length !== 0) {
                    jsonData.push(JSON.parse(el));
                }
            });
        }
    } catch (err) {
        console.log(err);
    }

    return (
        <Card>
            <CardHeader
                title={"Peers"}
                subheader={`${isLoading ? "?" : jsonData.length} peers`}
            />
            <CardActions>
                <IconButton onClick={reload}>
                    <ReplayIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Table width={"100%"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>IPFS ID</TableCell>
                            <TableCell>Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            jsonData.map(
                                (peer, k) =>
                                    peer.id && (
                                        <TableRow>
                                            <TableCell>
                                                {peer.peername}
                                            </TableCell>
                                            <TableCell>{peer.id}</TableCell>
                                            <TableCell>
                                                {peer.ipfs.id}
                                            </TableCell>
                                            <TableCell>
                                                {peer.version}
                                            </TableCell>
                                        </TableRow>
                                    )
                            )
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
