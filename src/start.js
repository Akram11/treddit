import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./pages/Welcome";
import App from "./pages/App";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <App />;
}

ReactDOM.render(component, document.querySelector("main"));
