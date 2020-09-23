import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "a@b.com",
            password: "123456",
            error: false,
        };
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    handleSubmit() {
        let state = this.state;
        axios.post("/login", state).then(() => {
            location.replace("/");
        });
    }

    render() {
        let { email, password } = this.state;
        return (
            <div>
                <h3>Register here:</h3>
                {this.state.error && (
                    <p className="error">something went wrong!</p>
                )}
                <TextField
                    type="email"
                    value={email}
                    label="email"
                    variant="outlined"
                    required
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                />
                <TextField
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
            </div>
        );
    }
}
