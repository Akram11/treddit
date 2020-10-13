import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ProfilePicture from "./ProfilePicture";
import PanToolIcon from "@material-ui/icons/PanTool";
import { useSelector } from "react-redux";
import { socket } from "../socket";
import AvTimerIcon from "@material-ui/icons/AvTimer";

export default function OfferCard({
    offerId,
    first,
    last,
    title,
    status,
    text,
    imgUrl,
    date,
    treddits,
    email,
    creatorId,
    credits,
    userId,
}) {
    const users = useSelector((state) => state && state.users);

    const classes = useStyles();
    const handleRequest = () => {
        if (treddits > 0) {
            socket.emit(
                "make an offer request",
                offerId,
                creatorId,
                userId,
                "done"
            );
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <ProfilePicture
                        radius={50}
                        width={45}
                        height={45}
                        img_url={imgUrl}
                        className={classes.avatar}
                        email={email}
                    />
                }
                title={
                    <>
                        <Typography color="textPrimary" variant="h6">
                            {title}
                        </Typography>
                        <Typography
                            className={classes.name}
                            variant="subtitle1"
                        >
                            {first} {last}
                        </Typography>
                    </>
                }
                subheader={date}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <ChatBubbleIcon color="primary" />
                </IconButton>
                <IconButton
                    disabled={credits > 0 ? false : true}
                    onClick={handleRequest}
                >
                    <PanToolIcon
                        color={credits > 0 ? "secondary" : "disabled"}
                    />
                </IconButton>
                <Typography> {status}</Typography>

                <Typography className={classes.cost}>{treddits}</Typography>
                <AvTimerIcon className={classes.treddit} />
            </CardActions>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // width: 600,
        margin: 5,
        // height: 225,
        // backgroundColor: theme.palette.primary.light,
    },
    treddit: {
        color: "orange",
    },
    cost: {
        marginLeft: "auto",
        marginRight: 2,
        color: "orange",
    },
    name: {
        color: "grey",
        // color: theme.palette.secondary.dark,
    },
}));
