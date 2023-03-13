import React from "react";
import { PostAdd } from "@material-ui/icons";
import IntlMessages from "../../../utils/IntlMessages";
import {
    ArrowForward,
    CloudUpload,
    Colorize,
    DragIndicator,
    Edit,
    NotificationImportant,
    Notifications,
    VpnKey,
} from "@material-ui/icons";

const editorsMenus = {
    name: <IntlMessages id={"sidebar.extensions.editors"} />,
    icon: <Edit />,
    type: "collapse",
    children: [
        {
            name: <IntlMessages id={"sidebar.extensions.editors.ckEditor"} />,
            icon: <ArrowForward />,
            type: "item",
            link: "/extensions/editors/ck",
        },
        {
            name: (
                <IntlMessages id={"sidebar.extensions.editors.wysiwygEditor"} />
            ),
            icon: <ArrowForward />,
            type: "item",
            link: "/extensions/editors/wysiwyg",
        },
    ],
};

export const sidebarNavs = [
    {
        name: <IntlMessages id={"sidebar.extensions"} />,
        type: "section",
        children: [editorsMenus],
    },
    {
        name: <IntlMessages id={"sidebar.pins"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/user-pins",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.buy"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/user-pins",
            },
        ],
    },
];

export const horizontalDefaultNavs = [
    {
        name: <IntlMessages id={"sidebar.extensions"} />,
        type: "collapse",
        children: [editorsMenus],
    },
    {
        name: <IntlMessages id={"sidebar.pins"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/user-pins",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.buy"} />,
        type: "section",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/user-pins",
            },
        ],
    },
];

export const minimalHorizontalMenus = [
    {
        name: <IntlMessages id={"sidebar.extensions"} />,
        type: "collapse",
        children: [editorsMenus],
    },
    {
        name: <IntlMessages id={"sidebar.pins"} />,
        type: "collapse",
        children: [
            {
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <PostAdd />,
                link: "/user-pins",
            },
        ],
    },
    {
        name: <IntlMessages id={"sidebar.buy"} />,
        type: "collapse",
        children: [
            {
                
                name: <IntlMessages id={"pages.mainPage.pins"} />,
                type: "item",
                icon: <CloudUpload />,
                link: "/user-pins",
            },
        ],
    },
];
