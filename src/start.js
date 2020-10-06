import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./pages/Welcome";
import App from "./pages/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "../src/socket";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    init(store);
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));
