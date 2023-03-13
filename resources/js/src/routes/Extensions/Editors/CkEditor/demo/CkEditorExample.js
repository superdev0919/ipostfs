import React, { useState } from "react";
import CKEditor from "react-ckeditor-component";

const textContent = "";

const CkEditorExample = ({ setPublishData }) => {
    const [content, setContent] = useState(textContent);

    const onChange = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent);
        setPublishData(
            evt.editor.document.$.documentElement.children[1].innerHTML
        );
    };

    const onBlur = (evt) => {
        // console.log(
        //     "onBlur event called with event info: ",
        //     evt.editor.document.$.documentElement.children[1].innerHTML
        // );
        setPublishData(
            evt.editor.document.$.documentElement.children[1].innerHTML
        );
    };

    const afterPaste = (evt) => {
        console.log("afterPaste event called with event info: ", evt);
    };

    return (
        <React.Fragment>
            <CKEditor
                activeClass="p10"
                content={content}
                events={{
                    blur: onBlur,
                    afterPaste: afterPaste,
                    change: onChange,
                }}
            />
        </React.Fragment>
    );
};

export default CkEditorExample;
