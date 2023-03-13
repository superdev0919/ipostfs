import React from "react";
import IntlMessages from "../../../utils/IntlMessages";
import {
    PostAdd,
    ArrowForward,
    CloudUpload,
    Colorize,
    DragIndicator,
    Edit,
    NotificationImportant,
    Notifications,
    VpnKey,
} from "@material-ui/icons";

export const sidebarNavsAdmin = [
    {
        name: <IntlMessages id={"sidebar.main"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/pins",
            },
            {
                name: <IntlMessages id={"pages.mainPage.peers"} />,
                type: "item",
                icon: <VpnKey />,
                link: "/peers",
            },
            {
                name: <IntlMessages id={"pages.mainPage.identity"} />,
                type: "item",
                icon: <Notifications />,
                link: "/identity",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.users"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.usersPage.limitations"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/limits",
            },
        ],
    },
];

export const horizontalDefaultNavsAdmin = [
    {
        name: <IntlMessages id={"sidebar.main"} />,
        type: "collapse",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/pins",
            },
            {
                name: <IntlMessages id={"pages.mainPage.peers"} />,
                type: "item",
                icon: <VpnKey />,
                link: "/peers",
            },
            {
                name: <IntlMessages id={"pages.mainPage.identity"} />,
                type: "item",
                icon: <Notifications />,
                link: "/identity",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.users"} />,
        type: "collapse",
        children: [
            {
                name: <IntlMessages id={"pages.usersPage.limitations"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/limits",
            },
        ],
    },
];

export const minimalHorizontalMenus = [
    {
        name: <IntlMessages id={"sidebar.main"} />,
        type: "collapse",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/pins",
            },
            {
                name: <IntlMessages id={"pages.mainPage.peers"} />,
                type: "item",
                icon: <VpnKey />,
                link: "/peers",
            },
            {
                name: <IntlMessages id={"pages.mainPage.identity"} />,
                type: "item",
                icon: <Notifications />,
                link: "/identity",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.users"} />,
        type: "collapse",
        children: [
            {
                name: <IntlMessages id={"pages.usersPage.limitations"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/limits",
            },
        ],
    },
];
