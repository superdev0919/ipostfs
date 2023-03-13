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
import { fetchError, fetchStart, fetchSuccess } from "../../../redux/actions";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "../context/ApiContext";
import { PeerMap } from "./PeerMap";
import { PinDialog } from "./PinDialog";
import { useLoading } from "../../../hooks/UseLoading";
import Pins from "../../../services/pins";
import { Pinterest } from "@material-ui/icons";

export const PinListByUser = ({ cids }) => {
    const [pins, setPins] = useState([]);
    const [editing, setEditing] = useState();

    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();
    const [isLoading, load] = useLoading();
    const dispatch = useDispatch();

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

    return (
        <>
            <Card style={{ minWidth: 700 }}>
                <CardHeader
                    title={"Pins"}
                    subheader={`${
                        isLoading
                            ? "?"
                            : pins.filter((pin) =>
                                  cids.find((item) => item.cid == pin.cid)
                              ).length
                    } pins`}
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
                            height={
                                (pins.filter((pin) =>
                                    cids.find((item) => item.cid == pin.cid)
                                ).length +
                                    1) *
                                50
                            }
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
                                {pins
                                    .filter((pin) =>
                                        cids.find((item) => item.cid == pin.cid)
                                    )
                                    .map((pin, k) => (
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
                                                <ButtonGroup
                                                    variant={"outlined"}
                                                >
                                                    <IconButton
                                                        color={"secondary"}
                                                        onClick={() => {
                                                            dispatch(
                                                                fetchStart()
                                                            );
                                                            load(
                                                                api.remove(
                                                                    pin.cid
                                                                )
                                                            )
                                                                .then(() => {
                                                                    dispatch(
                                                                        fetchSuccess(
                                                                            "Successfully unpined"
                                                                        )
                                                                    );
                                                                    return reload();
                                                                })
                                                                .catch(
                                                                    function (
                                                                        error
                                                                    ) {
                                                                        dispatch(
                                                                            fetchError(
                                                                                error.message
                                                                            )
                                                                        );
                                                                    }
                                                                );

                                                            dispatch(
                                                                Pins.deletePin(
                                                                    pin.cid
                                                                )
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
