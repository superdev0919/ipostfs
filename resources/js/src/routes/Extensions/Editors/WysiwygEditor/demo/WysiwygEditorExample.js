import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Fade, TextField, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/styles";

import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MediaUploadComponent from "./MediaUploadComponent";
import { useDispatch } from "react-redux";
import Upload from "../../../../../services/upload";
import { base_upload_url } from "../../../../../config";

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

let Editor = () => <React.Fragment />;

const CopyShareLink = ({ value, title }) => {
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
        setLinkStr(base_upload_url + value);
    }, [value]);

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

const WysiwygEditorExample = ({ setPublishData }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedFileName, setUploadedFileName] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        Editor = require("react-draft-wysiwyg").Editor;
        setEditorState(EditorState.createEmpty());
    }, []);

    function uploadImageCallBack(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader(); // eslint-disable-line no-undef
            reader.onload = (e) => resolve({ data: { link: e.target.result } });
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
            console.log("reader: ", reader);
        });
    }

    const uploadMediaFile = (event) => {
        let file = event.target.files[0];
        dispatch(Upload(file, setUploadedFileName));
    };

    return (
        <React.Fragment>
            <Editor
                editorStyle={{
                    width: "100%",
                    minHeight: 385,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "lightgray",
                }}
                editorState={editorState}
                toolbar={{
                    image: {
                        previewImage: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                    },
                }}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(editorState) => {
                    setEditorState(editorState);
                    setPublishData(
                        draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                        )
                    );
                }}
                toolbarCustomButtons={[
                    <MediaUploadComponent uploadMediaFile={uploadMediaFile} />,
                ]}
            />
            {uploadedFileName ? (
                <CopyShareLink value={uploadedFileName} title="Uploaded URL:" />
            ) : // <div style={{ width: "100%", height: 100 }}>
            //      {}
            // </div>
            null}
        </React.Fragment>
    );
};

export default WysiwygEditorExample;
