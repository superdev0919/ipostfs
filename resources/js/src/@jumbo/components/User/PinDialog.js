import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useApi } from "../context/ApiContext";
import { PinForm } from "./PinForm";

// export interface PinDialogProps {
// 	pin?: PinType;
// 	onClose?: () => void;
// }

export const PinDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const api = useApi();
    const updatePin = (pin) => {
        const { cid, ...pinOptions } = pin;
        api.update(props.pin?.cid, cid, pinOptions)
            .then((r) => {
                props.onClose && props.onClose();
                enqueueSnackbar(`Pin updated`, { variant: "success" });
            })
            .catch((e) => {
                enqueueSnackbar(`Error: ${e}`, { variant: "error" });
            });
    };

    return (
        <Dialog open={!!props.pin} onClose={props.onClose}>
            <DialogTitle>Edit Pin</DialogTitle>
            <DialogContent>
                Editing {props.pin?.cid}
                <div style={{ height: 17 }} />
                <PinForm
                    values={props.pin}
                    onSubmit={(pin) => {
                        updatePin(pin);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};
