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

export default function Registration() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", value);
    return (
        <div className={classes.formContainer}>
            <Typography align="center" variant="h4">
                create a new account
            </Typography>
            <form className={classes.root} autoComplete="off">
                <TextField
                    size="small"
                    type="text"
                    // value={first}
                    label="First Name"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    name="first"
                />
                <TextField
                    size="small"
                    type="text"
                    // value={last}
                    label="Last Name"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    name="last"
                />
                <TextField
                    size="small"
                    type="email"
                    // value={email}
                    label="email"
                    variant="outlined"
                    required={true}
                    error={false}
                    onChange={handleChange}
                    name="email"
                />
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
                <FormControl size="small" variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={show ? "text" : "password"}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShow(!show)}
                                    edge="end"
                                >
                                    {show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={90}
                    />
                </FormControl>

                <FormHelperText id="my-helper-text">*required</FormHelperText>
                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Register
                </Button>
            </form>
            {error}
            <p>
                <Link to="/login">
                    Already have an account? Click here to Log in!
                </Link>
            </p>
        </div>
    );
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& .MuiTextField-root": {
//             margin: theme.spacing(1),
//             width: "50%",
//             display: "flex",
//             // alignItems: "center",
//         },
//     },
//     button: {
//         margin: theme.spacing(1),
//     },
//     formContainer: {
//         width: "100%",
//         height: "100%",
//         padding: "50px",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// }));
