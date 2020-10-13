import React from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import OffersList from "./OffersList";
import { Button, Typography, Paper, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Profile({ ...props }) {
    let {
        first,
        last,
        bio,
        img_url,
        showModal,
        setBio,
        credits,
        userId,
    } = props;
    const allOffers = useSelector((state) => state && state.offers);
    let offers =
        allOffers && allOffers.filter((offer) => offer.creator_id == userId);
    // const users = useSelector((state) => state && state.users);
    // const user = users && users.filter((user) => user.id == userId);
    // let currentUser = user && user[0];
    // console.log("USER", userId, currentUser && currentUser);
    return (
        <>
            <Paper>
                <div style={maintStyle}>
                    <div style={style}>
                        <ProfilePicture
                            first={first}
                            last={last}
                            img_url={img_url}
                            showModal={showModal}
                        />
                        <Typography align="center" variant="h5">
                            {first} {last}
                        </Typography>
                        <Typography align="center" variant="subtitle2">
                            credits balance: {credits}
                        </Typography>
                    </div>
                    <div>
                        <BioEditor bio={bio} setBio={setBio} showEdit={true} />
                        <Typography align="center" variant="h4">
                            My Offers
                        </Typography>
                        <Divider />
                        <OffersList
                            offers={offers}
                            userId={userId}
                            credits={credits}
                        />
                    </div>
                </div>
            </Paper>
        </>
    );
}

const style = {
    width: 250,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
};

const maintStyle = {
    display: "flex",
    flexDirection: "row",
    padding: 10,
};
