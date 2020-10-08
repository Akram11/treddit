import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root .MuiOutlinedInput-root": {
            margin: theme.spacing(1),
            width: 500,
            // alignItems: "center",
        },
        "& .MuiOutlinedInput-root": {
            margin: theme.spacing(1),
            width: 500,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    formContainer: {
        width: 500,
        padding: "50px",
        alignItems: "center",
        justifyContent: "center",
    },
}));
