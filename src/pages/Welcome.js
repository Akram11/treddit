import React from "react";
import Register from "../components/Register";
import { HashRouter, Route } from "react-router-dom";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";

export default function Welcome(props) {
    return (
        <>
            <p>Hello from the welcome page</p>
            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/reset" component={ResetPassword} />
            </HashRouter>
        </>
    );
}
