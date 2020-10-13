import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, Typography, FormHelperText } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useStyles } from "../styles.js";
import { socket } from "../socket";

export default function AddOffer() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [value, handleChange] = useStatefulFields();
    // const [error, handleSubmit] = useAuthSubmit("/add-offer", value);

    const handleSubmit = () => {
        socket.emit("new offer", value);
        location.replace("/");
    };
    return (
        <div className={classes.formContainer}>
            <Typography align="center" variant="h4">
                Create an offer
            </Typography>
            <form className={classes.root} autoComplete="off">
                <TextField
                    size="small"
                    type="text"
                    label="What would you like to offer?"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    name="title"
                />

                <TextField
                    multiline
                    size="medium"
                    type="text"
                    label="Please explain in few words what is you wanna offer"
                    variant="outlined"
                    onChange={handleChange}
                    name="text"
                />
                <TextField
                    id="outlined-number"
                    size="small"
                    label="how many credits would it cost?"
                    type="number"
                    variant="outlined"
                    onChange={handleChange}
                    name="price"
                />
                <TextField
                    size="small"
                    type="text"
                    label="location"
                    variant="outlined"
                    onChange={handleChange}
                    name="location"
                />

                <FormHelperText>*required</FormHelperText>
                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    ADD
                </Button>
            </form>
        </div>
    );
}
