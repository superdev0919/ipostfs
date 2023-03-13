import axios, { AxiosInstance } from "axios";
// import {PinOptions} from '../../../types/PinOptions';
import { base_ipfs_api_url } from "../../../config";
import { IApiContext } from "./ApiContext";

export class ApiService {
    // let api;

    constructor() {
        this.api = axios.create({
            baseURL: base_ipfs_api_url,
        });
    }

    get apiUrl() {
        return this.api.defaults.baseURL ?? "";
    }

    set apiUrl(url) {
        localStorage.setItem("apiUrl", url);
        this.api = axios.create({
            baseURL: url,
        });
    }

    getList() {
        return this.api.get("/allocations?filter=all").then((r) => {
            let jsonData = [];
            try {
                r.data = r.data.split("\n");
                // Iterate over the array, parsing each line
                r.data.forEach((el) => {
                    // Skip empty lines
                    if (el.length !== 0) {
                        jsonData.push(JSON.parse(el));
                    }
                });
                // Process array of JSON data here.
                // console.log(jsonData);

                // res = JSON.parse(data)
            } catch (err) {
                console.log("err", err);
            }

            return jsonData;
        });
    }

    getId() {
        return this.api.get("/id").then((r) => r.data);
    }

    update(from, to, options) {
        return this.api
            .post(
                `/pins/ipfs/${to}?mode=recursive&pin-update=${from}&${this.mapOptions(
                    options
                )}`
            )
            .then((r) => {});
    }

    add(cid, options) {
        return this.api.post(`/pins/ipfs/${cid}?${this.mapOptions(options)}`);
    }

    remove(cid) {
        return this.api.delete(`/pins/${cid}`).then((r) => {});
    }

    status(cid) {
        return this.api.get(`/pins/${cid}?local=false`).then((r) => r.data);
    }

    getPeers() {
        return this.api.get("/peers").then((r) => r.data);
    }

    mapOptions(o) {
        const pairs = [];
        if (o.name) pairs.push(`name=${o.name}`);
        if (o.maxReplication) pairs.push(`replication-max=${o.maxReplication}`);
        if (o.minReplication) pairs.push(`replication-min=${o.minReplication}`);
        if (o.shardSize) pairs.push(`shard-size=${o.shardSize}`);
        return pairs.join("&");
    }
}
