import React from "react";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";

const MediaUploadComponent = ({ uploadMediaFile }) => {
    const addMediaFile = () => {
        document.getElementById("upload_media").click();
    };

    return (
        <div onClick={addMediaFile} style={{ cursor: "pointer" }}>
            <VideocamOutlinedIcon />
            <input
                type="file"
                id="upload_media"
                accept="video/*"
                style={{ display: "none" }}
                onChange={uploadMediaFile}
            />
        </div>
    );
};

export default MediaUploadComponent;
