import { fetchError, fetchStart, fetchSuccess } from "../../redux/actions";
import { setPublishData, updatePublishData } from "../../redux/actions/Publish";
import axios from "./config";
import { base_ipfs_server_url } from "../../config";

const ipfsCluster = require("ipfs-cluster-api");

const Publish = {
    onPublish: (publishData, setCurrentCID, setWholeCID) => {
        return async (dispatch) => {
            const cluster = ipfsCluster({
                host: base_ipfs_server_url,
                port: 9094,
                protocol: "https",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            // Publishing
            var current_buffer = {
                // path: "user.txt",
                content: Buffer.from(publishData),
            };
            var option = {
                "replication-min": 0,
            };

            console.log("buffersize: ", Buffer.byteLength(publishData));
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            dispatch(fetchStart());
            await axios
                .post("publish/checkLimit", {
                    data: Buffer.byteLength(publishData),
                })
                .then(async ({ data }) => {
                    if (data.result) {
                        await cluster.add(
                            current_buffer,
                            option,
                            async (err, res) => {
                                if (err) {
                                    dispatch(fetchError(err));
                                } else {
                                    // API call for store cid and content
                                    setCurrentCID(res[0].hash);
                                    await axios
                                        .post("publish/publishData", {
                                            data: publishData,
                                            cid: res[0].hash,
                                            size: Buffer.byteLength(
                                                publishData
                                            ),
                                        })
                                        .then(async ({ data }) => {
                                            if (data.result) {
                                                var whole_buffer = {
                                                    // path: "user.txt",
                                                    content: Buffer.from(
                                                        data.data
                                                    ),
                                                };
                                                // publishing for whole page
                                                await cluster.add(
                                                    whole_buffer,
                                                    option,
                                                    async (err, res) => {
                                                        if (err) {
                                                            dispatch(
                                                                fetchError(err)
                                                            );
                                                        } else {
                                                            // API call for store whole page cid
                                                            setWholeCID(
                                                                res[0].hash
                                                            );
                                                            await axios
                                                                .post(
                                                                    "publish/publishWholeData",
                                                                    {
                                                                        cid: res[0]
                                                                            .hash,
                                                                    }
                                                                )
                                                                .then(() => {
                                                                    dispatch(
                                                                        fetchSuccess(
                                                                            "Successfully published all data"
                                                                        )
                                                                    );
                                                                })
                                                                .catch(() => {
                                                                    dispatch(
                                                                        fetchError(
                                                                            "Register cid of whole page is failed"
                                                                        )
                                                                    );
                                                                });
                                                        }
                                                    }
                                                );
                                            } else {
                                                dispatch(
                                                    fetchError(data.error)
                                                );
                                            }
                                        })
                                        .catch(function (error) {
                                            dispatch(fetchError(error.message));
                                        });
                                }
                            }
                        );
                    } else {
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    dispatch(fetchError(error.message));
                });

            // await cluster.peers.ls((err, res) => {
            //     err
            //         ? console.error("err", err)
            //         : console.log("This is the peer list", res);
            // });

            // await cluster.pin.ls({ filter: "all" }, (err, pins) => {
            //     err
            //         ? console.error(err)
            //         : console.log("This is the pins list", pins);
            // });
        };
    },
};

export default Publish;
