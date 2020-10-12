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

export default function OfferCard({
    first,
    last,
    title,
    text,
    img_url,
    date,
    treddits,
    email,
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <ProfilePicture
                        radius={50}
                        width={45}
                        height={45}
                        img_url={img_url}
                        className={classes.avatar}
                        email={email}
                    />
                }
                title={
                    <>
                        <Typography variant="h6">{title}</Typography>
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
                <IconButton aria-label="add to favorites">
                    <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <PanToolIcon />
                </IconButton>
                <Typography className={classes.cost}>
                    treddits: {treddits}
                </Typography>
            </CardActions>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // width: 600,
        margin: 5,
        // height: 225,
    },
    cost: {
        marginLeft: "auto",
        marginRight: 10,
        color: "orange",
    },
    name: {
        color: "grey",
    },
}));
