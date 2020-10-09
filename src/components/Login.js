import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";

import {
    TextField,
    Typography,
    FormHelperText,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../styles.js";
// import { useAuthSubmit } from "../hooks/useAuthSubmit";
// import { useStatefulFields } from "../hooks/useStatefulFields";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "a@b.com",
            password: "123456",
            error: "",
        };
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    async handleSubmit() {
        let state = this.state;
        try {
            await axios.post("/login", state);
            location.replace("/");
        } catch (e) {
            this.setState({ error: "something went wrong" });
        }
    }

    render() {
        let { email, password } = this.state;

        return (
            <div
                style={{
                    width: 500,
                    padding: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography align="center" variant="h4">
                    Log in
                </Typography>
                {this.state.error && (
                    <p className="error">something went wrong!</p>
                )}
                <TextField
                    size="small"
                    type="email"
                    value={email}
                    label="email"
                    variant="outlined"
                    required
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                />
                <TextField
                    size="small"
                    value={password}
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => this.handleChange(e)}
                />
                <Button
                    onClick={(e) => this.handleSubmit(e)}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <Link to="/">Click here to register!</Link>
                <Link to="/reset">Forgot password?</Link>
            </div>
        );
    }
}
