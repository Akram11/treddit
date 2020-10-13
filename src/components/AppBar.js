import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import AvTimerIcon from "@material-ui/icons/AvTimer";

export default function PrimaryAppBar({ img_url }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link className={classes.links} to={"/profile"}>
                    Profile
                </Link>
            </MenuItem>
            <MenuItem className={classes.links} onClick={handleMenuClose}>
                My account
            </MenuItem>
            <MenuItem>
                <a
                    className={classes.links}
                    style={{ textDecoration: "none" }}
                    href="/logout"
                >
                    Log out
                </a>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <AvTimerIcon
                        style={{
                            fontSize: 40,
                        }}
                    />
                    <Typography className={classes.title} variant="h4" noWrap>
                        <Link className={classes.logo} to="/">
                            Treddit
                        </Link>
                    </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <Link
                                    style={{
                                        color: "inherit",
                                    }}
                                    to="/users"
                                >
                                    <PeopleIcon />
                                </Link>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <Link
                                    style={{
                                        color: "inherit",
                                    }}
                                    to=""
                                >
                                    <NotificationsIcon />
                                </Link>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                    to="/chat"
                                >
                                    <QuestionAnswerIcon />
                                </Link>
                            </Badge>
                        </IconButton>

                        <IconButton
                            edge="end"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <img
                                src={img_url}
                                height="40"
                                width="40"
                                style={profPic}
                            />
                            {/* <AccountCircle /> */}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

const profPic = {
    borderRadius: 50,
};

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    title: {
        display: "none",
        marginLeft: 10,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    links: {
        textDecoration: "none",
        color: theme.palette.secondary.dark,
    },
    logo: {
        textDecoration: "none",
        color: "#FFF",
        fontWeight: "bold",
    },
    // sectionDesktop: {
    //     display: "none",
    //     [theme.breakpoints.up("md")]: {
    //         display: "flex",
    //     },
    // },
}));
