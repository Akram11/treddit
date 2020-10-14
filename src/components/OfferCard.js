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
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
}) {
    const users = useSelector((state) => state && state.users);
    const buyer =
        users && buyerId && users.filter((user) => user.id == buyerId);
    console.log(buyer);
    const classes = useStyles();
    const handleRequest = () => {
        if (credits >= treddits) {
            socket.emit(
                "make an offer request",
                offerId,
                creatorId,
                userId,
                treddits,
                "done"
            );
        }
    };

    const handleBooking = () => {
        if (credits >= treddits && status == "available") {
            console.log("you can book");
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
                    disabled={credits >= treddits ? false : true}
                    onClick={handleBooking}
                >
                    <PanToolIcon
                        color={credits >= treddits ? "secondary" : "disabled"}
                    />
                </IconButton>
                <Typography>{status}</Typography>
                <LocationOnIcon className={classes.locaionIcon} />
                <Typography className={classes.locaiontxt}>
                    {location}
                </Typography>
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
        marginLeft: 15,
        marginRight: 2,
        color: "orange",
    },
    name: {
        color: "grey",
        // color: theme.palette.secondary.dark,
    },
    locaionIcon: { color: "grey", marginLeft: "auto" },
    locaiontxt: { color: "grey", fontSize: 14 },
}));
