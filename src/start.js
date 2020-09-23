import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./pages/Welcome";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <p>nothing here</p>;
}

ReactDOM.render(component, document.querySelector("main"));
