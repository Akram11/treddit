import React from "react";
import Register from "../components/Register";
import { HashRouter, Route } from "react-router-dom";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
import SignIn from "../components/SignIn";

export default function Welcome(props) {
    return (
        <>
            <HashRouter>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={SignIn} />
                <Route path="/reset" component={ResetPassword} />
            </HashRouter>
        </>
    );
}
