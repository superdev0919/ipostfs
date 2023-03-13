import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import Limits from "../../../../services/limits";
import { useSelector } from "react-redux";

import { Table, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AuthWrapper from "../../../../@jumbo/components/Common/authComponents/AuthWrapper";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../@jumbo/utils/IntlMessages";

const useStyles = makeStyles((theme) => ({
    authThumb: {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        [theme.breakpoints.up("md")]: {
            width: "50%",
            order: 2,
        },
    },
    authContent: {
        padding: 30,
        [theme.breakpoints.up("md")]: {
            width: (props) => (props.variant === "default" ? "50%" : "100%"),
            order: 1,
        },
        [theme.breakpoints.up("xl")]: {
            padding: 50,
        },
    },
    textFieldRoot: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.common.dark, 0.12),
        },
    },
}));

const UsersLimits = ({ variant = "standard", wrapperVariant = "default" }) => {
    const { authUser } = useSelector(({ auth }) => auth);

    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    const { Column } = Table;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [selRecord, setSelRecord] = useState(undefined);
    const [updatedLimit, setUpdatedLimit] = useState();

    const classes = useStyles({ variant });

    const reload = () => {
        dispatch(Limits.limits(authUser.id, authUser.role, setUserData));
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(reload, []);

    const handleOK = () => {
        dispatch(Limits.updateLimit(selRecord.id, updatedLimit));
        setModalOpen(false);
        reload();
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleEditLimits = (record) => {
        setSelRecord(record);
        setUpdatedLimit(record.publish_data_size_limit);
        setModalTitle(`${record.name}'s Limits`);
        setModalOpen(true);
    };

    return (
        <>
            <AuthWrapper variant={wrapperVariant}>
                <Box className={classes.authContent} mt={3}>
                    <Table dataSource={userData} rowKey="_id">
                        <Column title="Name" dataIndex="name" key="name" />
                        <Column title="Email" dataIndex="email" key="email" />
                        <Column
                            title="Limit (Byte)"
                            dataIndex="publish_data_size_limit"
                            key="publish_data_size_limit"
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <>
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        className="text-primary mr-5"
                                        onClick={() => handleEditLimits(record)}
                                    />
                                </>
                            )}
                        />
                    </Table>
                </Box>
                <div style={{ height: 15 }} />
                <Modal
                    style={{ minWidth: "fit-content" }}
                    visible={modalOpen}
                    title={modalTitle}
                    onOk={handleOK}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="ok" onClick={handleOK}>
                            OK
                        </Button>,
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <TextField
                        label={<IntlMessages id="pages.limitsPage.limit" />}
                        fullWidth
                        onChange={(event) => {
                            setUpdatedLimit(event.target.value);
                        }}
                        value={updatedLimit == null ? "" : updatedLimit}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                    />
                </Modal>
            </AuthWrapper>
        </>
    );
};

export default UsersLimits;
