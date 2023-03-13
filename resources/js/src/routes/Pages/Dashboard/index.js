import React from "react";
import { useSelector } from "react-redux";
import GridContainer from "../../../@jumbo/components/GridContainer";
import PageContainer from "../../../@jumbo/components/PageComponents/layouts/PageContainer";
import IntlMessages from "../../../@jumbo/utils/IntlMessages";
import Grid from "@material-ui/core/Grid";
import SidebarButtons from "../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons";
import Divider from "@material-ui/core/Divider";

const breadcrumbs = [
    { label: <IntlMessages id={"sidebar.main"} />, link: "/" },
    { label: <IntlMessages id={"pages.samplePage"} />, isActive: true },
];

const Dashboard = () => {
    const { authUser } = useSelector(({ auth }) => auth);
    return (
        <PageContainer
            heading={
                authUser.role == "admin" ? (
                    <IntlMessages id="pages.dashboard.admin" />
                ) : (
                    <IntlMessages id="pages.dashboard.user" />
                )
            }
            breadcrumbs={breadcrumbs}
        >
            <GridContainer>
                <Grid item xs={12}>
                    <div style={{ marginBottom: 10 }}>
                        <IntlMessages id="pages.dashboard.description" />
                    </div>
                    <Divider />
                    <div style={{ marginTop: 24 }}>
                        {/* <h3>Knowledge Base and Support</h3> */}
                        {/* <SidebarButtons /> */}
                    </div>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
};

export default Dashboard;
