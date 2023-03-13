import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReplayIcon from "@material-ui/icons/Replay";
import {
    ButtonGroup,
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
import Skeleton from "@material-ui/lab/Skeleton";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { PeerMap } from "./PeerMap";
import { PinDialog } from "./PinDialog";
import { useLoading } from "../../../hooks/UseLoading";

export const PinList = (props) => {
    const [pins, setPins] = useState([]);
    const [editing, setEditing] = useState();

    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();
    const [isLoading, load] = useLoading();

    const reload = () => {
        load(api.getList())
            .then((r) => {
                setPins(r);
            })
            .catch((e) => {
                enqueueSnackbar(`Error: ${e}`, { variant: "error" });
            });
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(reload, []);
    console.log("PIN test", pins);

    return (
        <>
            <Card>
                <CardHeader
                    title={"Pins"}
                    subheader={`${isLoading ? "?" : pins.length} pins`}
                />
                <CardActions>
                    <IconButton onClick={reload}>
                        <ReplayIcon />
                    </IconButton>
                </CardActions>
                <CardContent style={{ overflowY: "auto" }}>
                    {isLoading ? (
                        <Skeleton
                            // variant="rectangular"
                            width={"100%"}
                            height={(pins.length + 1) * 50}
                        />
                    ) : (
                        <Table width={"100%"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Cid</TableCell>
                                    <TableCell>Peers</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pins.map((pin, k) => (
                                    <TableRow key={k}>
                                        <TableCell align={"center"}>
                                            {pin.name && pin.name !== ""
                                                ? pin.name
                                                : "-"}
                                        </TableCell>
                                        <TableCell>{pin.cid}</TableCell>
                                        <TableCell>
                                            {/* {JSON.stringify(pin)} */}
                                            <PeerMap cid={pin.cid} />
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup variant={"outlined"}>
                                                <IconButton
                                                    color={"secondary"}
                                                    onClick={() => {
                                                        load(
                                                            api.remove(pin.cid)
                                                        )
                                                            .then(() => {
                                                                console.log(
                                                                    "deleted"
                                                                );
                                                                return reload();
                                                            })
                                                            .catch(
                                                                console.error
                                                            );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    color={"primary"}
                                                    onClick={() => {
                                                        setEditing(pin);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
            <PinDialog onClose={() => setEditing(undefined)} pin={editing} />
        </>
    );
};
