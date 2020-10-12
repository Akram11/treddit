import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
    TextField,
    Typography,
    FormHelperText,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { useStyles } from "../styles.js";
import { FormControl } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { socket } from "../socket";

export default function AddOffer() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [value, handleChange] = useStatefulFields();
    // const [error, handleSubmit] = useAuthSubmit("/add-offer", value);

    const handleSubmit = () => {
        socket.emit("new offer", value);
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
                    // value={first}
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
                {/* <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    // value={selectedDate}
                    // onChange={handleDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                /> */}
                {/* <TextField
                    size="small"
                    type={show ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    name="password"
                    required
                    onChange={handleChange}
                >
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShow(!show)}
                    >
                        {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </TextField> */}

                <FormHelperText id="my-helper-text">*required</FormHelperText>
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
