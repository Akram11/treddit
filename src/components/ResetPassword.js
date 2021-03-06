import React from "react";
import { TextField, Button } from "@material-ui/core/";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            currentDisplay: 1,
            code: "",
            password: "",
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
        try {
            await axios.post("/reset", { email: this.state.email });
            this.setState({ currentDisplay: this.state.currentDisplay + 1 });
        } catch (e) {
            this.setState({ error: "something went wrong" });
        }
    }

    async handleVerify() {
        let { code, email, password } = this.state;
        await axios.post("/verify", { code, email, password });
        this.setState({ currentDisplay: this.state.currentDisplay + 1 });
    }
    render() {
        let { code, currentDisplay, email, password, error } = this.state;
        console.log(currentDisplay);

        return (
            <>
                <h2>
                    To Reset your password, enter the email address that you
                    have registered with
                </h2>
                {currentDisplay == 1 && (
                    <>
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
                        <Button
                            onClick={(e) => this.handleSubmit("email")}
                            variant="contained"
                            color="primary"
                            name="value"
                        >
                            submit
                        </Button>
                    </>
                )}
                {currentDisplay == 2 && (
                    <>
                        <TextField
                            size="small"
                            type="text"
                            value={code}
                            label="code"
                            variant="outlined"
                            required
                            onChange={(e) => this.handleChange(e)}
                            name="code"
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
                            onClick={(e) => this.handleVerify()}
                            variant="contained"
                            color="primary"
                            name="value"
                        >
                            submit
                        </Button>
                    </>
                )}
                {currentDisplay == 3 && (
                    <>
                        <h2>password was reset successfully</h2>
                        <p>
                            now you can <Link to="/login">login</Link> your
                            account.
                        </p>
                    </>
                )}
                {error}
            </>
        );
    }
}
