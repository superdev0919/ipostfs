import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import { SyntheticEvent, useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { useLoading } from "../../../hooks/UseLoading";

export const PeerMap = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState();
    const [isLoading, load] = useLoading();
    const api = useApi();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const reload = () => {
        load(api.status(props.cid)).then(setStatus).catch(console.error);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(reload, []);

    const getStatusColor = (peer) =>
        peer.error !== ""
            ? "r#ff0000de"
            : peer.status === "pinned"
            ? "#00ff00de"
            : "#0000ffde";

    return isLoading ? (
        <CircularProgress />
    ) : (
        <>
            {Object.entries(status?.peer_map ?? {}).map(([id, peer], k) => (
                <Accordion
                    key={k}
                    expanded={expanded === id}
                    onChange={handleChange(id)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={getStatusColor(peer)}>
                            {peer.peername}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <table>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{peer.status}</td>
                                </tr>
                                <tr>
                                    <th>Priority</th>
                                    <td>{peer.priority_pin.toString()}</td>
                                </tr>
                                {peer.error !== "" && (
                                    <>
                                        <tr style={{ color: "red" }}>
                                            <th>Error</th>
                                            <td>{peer.error}</td>
                                        </tr>
                                        <tr>
                                            <th>Attempts</th>
                                            <td>{peer.attempt_count}</td>
                                        </tr>
                                        <tr>
                                            <th>Timestamp</th>
                                            <td>{peer.timestamp}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};
