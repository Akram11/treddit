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
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ProfilePicture from "./ProfilePicture";
import { useSelector } from "react-redux";
import { socket } from "../socket";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@material-ui/core/Button";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { Link } from "react-router-dom";

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
    buyerId,
    userName,
    location,
    actionCard,
}) {
    // const users = useSelector((state) => state && state.users);
    // console.log(status == "exchanged");
    var color = status == "exchanged" ? "#E8E8E8" : "white";
    const classes = useStyles();
    const handleAccept = () => {
        socket.emit("accept offer", offerId, "exchanged");
    };

    const handleReject = () => {
        socket.emit("reject offer", offerId, "available");
    };

    const handleBooking = () => {
        if (credits >= treddits && status == "available") {
            socket.emit(
                "make an offer booking",
                offerId,
                creatorId,
                userId,
                treddits,
                `pending booked by ${userName}`
            );
        }
    };

    return (
        <Card
            style={{
                backgroundColor: color,
                padding: 5,
                margin: 5,
            }}
        >
            <CardHeader
                avatar={
                    <Link to={`/user/${creatorId}`}>
                        <ProfilePicture
                            first={first}
                            last={last}
                            radius={50}
                            width={45}
                            height={45}
                            img_url={imgUrl}
                            className={classes.avatar}
                            email={email}
                        />
                    </Link>
                }
                title={
                    <>
                        <Typography color="textPrimary" variant="h6">
                            {title}
                        </Typography>
                        <Typography className={classes.name}>
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
                {actionCard ? (
                    <>
                        {status.includes("pending") && (
                            <>
                                <Button
                                    className={classes.actionButton}
                                    color="secondary"
                                    onClick={handleAccept}
                                >
                                    accept
                                </Button>
                                <Button
                                    className={classes.actionButton}
                                    color="primary"
                                    onClick={handleReject}
                                >
                                    reject
                                </Button>
                            </>
                        )}
                        <Typography className={classes.status}>
                            {status}
                        </Typography>
                    </>
                ) : (
                    <>
                        <Link to={`/chat/${creatorId}`}>
                            <IconButton>
                                <ChatBubbleIcon color="primary" />
                            </IconButton>
                        </Link>
                        <IconButton
                            disabled={
                                status == "available" && credits >= treddits
                                    ? false
                                    : true
                            }
                            onClick={handleBooking}
                        >
                            <EmojiPeopleIcon
                                color={
                                    status == "available" && credits >= treddits
                                        ? "secondary"
                                        : "disabled"
                                }
                            />
                        </IconButton>
                        <Typography className={classes.locaiontxt}>
                            {status}
                        </Typography>

                        <LocationOnIcon className={classes.locaionIcon} />
                        <Typography className={classes.locaiontxt}>
                            {location}
                        </Typography>

                        <Typography className={classes.cost}>
                            {treddits}
                        </Typography>
                        <AvTimerIcon className={classes.treddit} />
                    </>
                )}
            </CardActions>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // width: 600,
        padding: 5,
        margin: 5,
        // height: 225,
    },
    treddit: {
        color: "orange",
    },
    cost: {
        marginLeft: 15,
        marginRight: 2,
        color: "orange",
    },
    name: {
        fontSize: 20,
        fontWeight: 500,
        color: theme.palette.secondary.dark,
    },
    locaionIcon: { color: "grey", marginLeft: "auto" },
    locaiontxt: { color: "grey", fontSize: 14 },
    actionButton: { marginLeft: 5, marginRight: 5 },
    status: { marginLeft: "auto", paddingBottom: 10 },
}));
