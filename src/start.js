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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff4400",
            light: "#ff7a3a",
            dark: "#c30000",
        },
        secondary: {
            main: "#00bbff",
            light: "#6aedff",
            dark: "#008bcc",
        },
    },
});

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    init(store);
    component = (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));
