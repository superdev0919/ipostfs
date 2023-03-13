import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
// import CodeViewerCard from "../../../../@jumbo/components/Common/CodeViewerCard";
import WysiwygEditorExample from "./demo/WysiwygEditorExample";
import ComponentsDemo from "../../../../@jumbo/components/PageComponents/layouts/ComponentsDemo";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IntlMessages from "../../../../@jumbo/utils/IntlMessages";
import Publish from "../../../../services/publish";
import CmtRevealCard from "../../../../@coremat/CmtRevealCard";
import ShareWithFriendForm from "../../../../@jumbo/components/Common/ShareWithFriendForm";
import CmtAdvCardContent from "../../../../@coremat/CmtAdvCard/CmtAdvCardContent";
import clsx from "clsx";
const cardLogo = "/images/dashboard/Friend-icon.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 500,
        margin: "0 auto",
    },
    section: {
        "&:not(:last-child)": {
            marginBottom: theme.typography.pxToRem(32),
        },
    },
    sectionHeading: {
        marginBottom: theme.typography.pxToRem(16),
    },
    buttonBox: {
        margin: theme.typography.pxToRem(32),
    },
    primaryButton: {
        position: "relative",
        paddingLeft: theme.typography.pxToRem(28),
        paddingRight: theme.typography.pxToRem(28),
        paddingTop: theme.typography.pxToRem(16),
        paddingBottom: theme.typography.pxToRem(16),
        top: "50%",
        left: "60%",
    },
    revealCard: {
        height: 350,
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
            paddingLeft: 24,
            paddingRight: 24,
        },
        "& .Cmt-content-head": {
            paddingBottom: 18,
        },
    },
    titleRoot: {
        marginBottom: 16,
    },
    subTitileRoot: {
        fontSize: 14,
        marginBottom: 16,
        letterSpacing: 0.25,
    },
    textWhite: {
        color: theme.palette.common.white,
        "& $cardLogo": {
            backgroundColor: theme.palette.common.white,
        },
    },
    cardLogo: {
        mask: `URL(${cardLogo})`,
        backgroundColor: theme.palette.primary.main,
        width: 70,
        height: 70,
    },
}));

// const requireRaw = require.context(
//     "!raw-loader!../../../../@fake-db/extensions/editors",
//     false,
//     /\.(txt|js|md|tsx)$/
// );

const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Choose Your Editor", link: "/extensions" },
    { label: "Editors", link: "/extensions/editors" },
    { label: "Wysiwyg", isActive: true },
];

export default function WysiswygEditor() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [publishData, setPublishData] = useState();

    const [revealed, setRevealed] = useState(false);
    const [currentCID, setCurrentCID] = useState("Not published yet.");
    const [wholeCID, setWholeCID] = useState("Not published yet.");
    const ChildrenComponent = ({
        revelCard,
        showBackground,
        backgroundStyle,
        showOverlay,
        overlayOpacity,
    }) => {
        const classes = useStyles();

        const textDyanimicClass = () => {
            if (
                (showBackground && backgroundStyle !== "color") ||
                (showOverlay && overlayOpacity > 0.5)
            ) {
                return classes.textWhite;
            }
        };

        return (
            <CmtAdvCardContent
                className={clsx(classes.revealCard, textDyanimicClass())}
                avatar={<Box className={classes.cardLogo} />}
                title="CID of just published page"
                titleProps={{
                    variant: "h3",
                    component: "div",
                    className: classes.titleRoot,
                }}
                subTitle={currentCID}
                subTitleProps={{
                    component: "p",
                    variant: "subtitle1",
                    className: classes.subTitileRoot,
                }}
                extraContent={
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={revelCard}
                    >
                        Share with your friends
                    </Button>
                }
                alignCenter
            />
        );
    };

    const demos = [
        {
            label: "Wysiwyg Editor",
            link: "wysiwyg-editor",
            component: <WysiwygEditorExample setPublishData={setPublishData} />,
            filename: "./WysiwygEditorExample.txt",
        },
    ];
    const handlePublish = () => {
        dispatch(Publish.onPublish(publishData, setCurrentCID, setWholeCID));
    };

    const handleOnClose = () => {
        setRevealed(false);
    };

    const revelCard = () => {
        setRevealed(true);
    };

    return (
        <ComponentsDemo
            pageTitle="Editors"
            menus={demos}
            breadcrumbs={breadcrumbs}
        >
            {demos.map((menu, index) => (
                <Box key={index} id={menu.link} className={classes.section}>
                    <Typography
                        component="h3"
                        variant="inherit"
                        className={classes.sectionHeading}
                    >
                        {menu.label}
                    </Typography>
                    {/* <CodeViewerCard
                        code={requireRaw(menu.filename).default}
                        language="jsx"
                    > */}
                    <Card className={classes.root}>
                        <CardContent>{menu.component}</CardContent>
                    </Card>
                    {/* </CodeViewerCard> */}
                </Box>
            ))}
            <Box className={classes.buttonBox}>
                <Button
                    className={classes.primaryButton}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    color="primary"
                    onClick={handlePublish}
                >
                    <IntlMessages id={"publish.edit.publishButton"} />
                </Button>
            </Box>

            <CmtRevealCard
                revealComponentTitle="Share with your friend"
                revealComponent={
                    <ShareWithFriendForm
                        currentCID={currentCID}
                        wholeCID={wholeCID}
                    />
                }
                revealed={revealed}
                onClose={handleOnClose}
            >
                <ChildrenComponent revelCard={revelCard} />
            </CmtRevealCard>
        </ComponentsDemo>
    );
}
