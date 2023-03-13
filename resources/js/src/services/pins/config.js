import axios from "axios";
import { base_url } from "../../config";

export default axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});
