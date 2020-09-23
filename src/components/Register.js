import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "default name",
            last: "default last",
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
        // console.log(state);
        axios.post("/registration", state).then((response) => {
            console.log(response);
            location.replace("/");
        });
    }

    render() {
        let { first, last, email, password } = this.state;
        return (
            <div>
                <h3>Register here:</h3>
                {this.state.error && (
                    <p className="error">something went wrong!</p>
                )}
                <TextField
                    type="text"
                    value={first}
                    label="First Name"
                    variant="outlined"
                    required
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                />
                <TextField
                    type="text"
                    value={last}
                    label="Last Name"
                    variant="outlined"
                    required
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                />

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
                    Register
                </Button>
                <p>
                    <Link to="/login">Click here to Log in!</Link>
                    {first} {last} {email} {password}
                </p>
            </div>
        );
    }
}
