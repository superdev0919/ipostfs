import axios from "axios";
import { base_url } from "../../config";

export default axios.create({
    // baseURL: `http://g-axon.work/jwtauth/api/`, //YOUR_API_URL HERE
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});
