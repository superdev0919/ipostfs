import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Error404 from "./Pages/404";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPasswordPage from "./Auth/ForgotPassword";
import SamplePage from "./Pages/SamplePage";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Extensions from "./Extensions";
import AdminPins from "./Pages/Admin/AdminPins";
import UsersLimits from "./Pages/Admin/UsersLimits";
import UserPins from "./Pages/User";
import { IdentityDisplay } from "../@jumbo/components/Admin/IdentityDisplay";
import { PeerList } from "../@jumbo/components/Admin/PeerList";

const RestrictedRoute = ({ component: Component, ...rest }) => {
    const { authUser } = useSelector(({ auth }) => auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const RestrictedAdminRoute = ({ component: Component, ...rest }) => {
    const { authUser } = useSelector(({ auth }) => auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                authUser && authUser.role == "admin" ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const Routes = () => {
    const { authUser } = useSelector(({ auth }) => auth);
    const location = useLocation();

    if (location.pathname === "" || location.pathname === "/") {
        return <Redirect to={"/dashboard"} />;
    } else if (
        authUser &&
        (location.pathname === "/signin" ||
            location.pathname === "/signup" ||
            location.pathname === "/forgot-password")
    ) {
        return <Redirect to={"/dashboard"} />;
    }

    return (
        <React.Fragment>
            <Switch>
                <RestrictedAdminRoute path="/pins" component={AdminPins} />
                <RestrictedAdminRoute path="/peers" component={PeerList} />
                <RestrictedAdminRoute
                    path="/identity"
                    component={IdentityDisplay}
                />
                <RestrictedAdminRoute path="/limits" component={UsersLimits} />

                <RestrictedRoute path="/sample-page" component={SamplePage} />
                <RestrictedRoute path="/extensions" component={Extensions} />
                <RestrictedRoute path="/dashboard" component={Dashboard} />
                <RestrictedRoute path="/profile" component={Profile} />
                <RestrictedRoute path="/user-pins" component={UserPins} />

                <Route path="/signin" component={Login} />
                <Route path="/signup" component={Register} />
                <Route path="/forgot-password" component={ForgotPasswordPage} />

                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
