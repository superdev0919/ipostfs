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

const SamplePage = () => {
    const { authUser } = useSelector(({ auth }) => auth);
    console.log("user", authUser);
    return (
        <PageContainer
            heading={<IntlMessages id="pages.samplePage" />}
            breadcrumbs={breadcrumbs}
        >
            <GridContainer>
                <Grid item xs={12}>
                    <div style={{ marginBottom: 10 }}>
                        <IntlMessages id="pages.samplePage.description" />
                    </div>
                    <Divider />
                    <div style={{ marginTop: 24 }}>
                        {/* <h3>Knowledge Base and Support</h3> */}
                        <SidebarButtons />
                    </div>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
};

export default SamplePage;
