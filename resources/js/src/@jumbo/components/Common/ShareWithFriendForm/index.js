import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { Button, Fade, TextField, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/styles";

import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";

const useStyles = makeStyles((theme) => ({
    divider: {
        flex: 1,
    },
    noBorder: {
        "& fieldset": {
            border: 0,
        },
    },
    inputGroup: {
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        width: "100%",
        marginBottom: "50px",
    },
    textField: {
        position: "relative",
        flex: "1 1 auto",
        width: "1%",
        minWidth: 0,

        "&:not(:last-child) .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    inputGroupAppend: {
        marginRight: "-1px",
    },
    button: (props) => ({
        backgroundColor: props.linkCopy ? "#8DCD03" : "#6200EE",
        color: "#fff",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: "100%",

        "&:hover": {
            backgroundColor: props.linkCopy ? "#8DCD03" : "#6200EE",
        },
    }),
    successMsg: {
        color: "#8DCD03",
    },
    userIcon: {
        marginBottom: 2,
        "& > svg": {
            color: "#8DCD03",
            height: 55,
            width: 55,
        },
    },
    iconBlock: {
        display: "block",
    },
}));

const CopyShareLink = ({ cid, title }) => {
    const [linkCopy, setLinkCopy] = useState(false);
    const [linkStr, setLinkStr] = useState("https://ipfs.infura.com/ipfs/");
    const classes = useStyles({ linkCopy });

    const linkRef = useRef(null);

    const copyToClipboard = () => {
        linkRef.current.select();
        document.execCommand("copy");
        setLinkCopy(true);
        setTimeout(() => {
            setLinkCopy(false);
        }, 5000);
    };

    useEffect(() => {
        if (cid != "Not published yet.")
            setLinkStr("https://ipfs.infura.com/ipfs/" + cid);
    }, [cid]);

    return (
        <div>
            <Typography gutterBottom component="h6" variant="h6">
                {title}
            </Typography>
            <div className={classes.inputGroup}>
                <TextField
                    className={classes.textField}
                    size="small"
                    variant="outlined"
                    value={linkStr}
                    placeholder="Type name or email address..."
                    inputProps={{ ref: linkRef }}
                    onFocus={copyToClipboard}
                    readOnly
                />
                <div className={classes.inputGroupAppend}>
                    <Button
                        className={classes.button}
                        onClick={copyToClipboard}
                    >
                        {linkCopy ? <CheckCircleIcon /> : <FileCopyIcon />}
                    </Button>
                </div>
            </div>

            {linkCopy && (
                <Fade in={linkCopy}>
                    <div
                        style={{ display: "flex", alignItems: "center" }}
                        className={clsx(classes.successMsg, "mt-2")}
                    >
                        <span className={"mr-2"}>
                            <CheckCircleIcon className={classes.iconBlock} />
                        </span>
                        <Typography>Link copied!</Typography>
                    </div>
                </Fade>
            )}
        </div>
    );
};

const ShareWithFriendForm = ({ currentCID, wholeCID }) => {
    return (
        <CmtCardContent>
            <CopyShareLink
                cid={currentCID}
                title="Get link to share current page"
            />
            <CopyShareLink
                cid={wholeCID}
                title="Get link to share whole page"
            />
        </CmtCardContent>
    );
};

export default ShareWithFriendForm;
