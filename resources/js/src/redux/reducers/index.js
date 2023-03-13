import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Common from "./Common";
import Auth from "./Auth";
import Publish from "./Publish";

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        common: Common,
        auth: Auth,
        publish: Publish,
    });
