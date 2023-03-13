import { fetchError, fetchStart, fetchSuccess } from "../../redux/actions";
import axios from "./config";

const Upload = (file, setUploadedFileName) => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        dispatch(fetchStart());
        const frmData = new FormData();
        frmData.append("data", file);
        await axios
            .post("upload/uploadMedia", frmData)
            .then(({ data }) => {
                if (data.result) {
                    setUploadedFileName(data.data);
                    dispatch(fetchSuccess("Successfully uploaded media files"));
                } else {
                    dispatch(fetchError(data.error));
                }
            })
            .catch(function (error) {
                dispatch(fetchError(error.message));
            });
    };
};

export default Upload;
