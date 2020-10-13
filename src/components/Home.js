import React from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import OffersList from "./OffersList";
import { Button, Typography, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile({ ...props }) {
    let {
        first,
        last,
        bio,
        img_url,
        // showModal,
        // setBio,
        credits,
        userId,
    } = props;
    const allOffers = useSelector((state) => state && state.offers);
    let offers =
        allOffers && allOffers.filter((offer) => offer.creator_id != userId);
    console.log("OFFERs", offers);
    console.log("ALLOFFERS", allOffers);

    return (
        <>
            <Paper>
                <div style={maintStyle}>
                    <div style={style}>
                        <ProfilePicture
                            first={first}
                            last={last}
                            img_url={img_url}
                        />
                        <Typography align="center" variant="h5">
                            {first} {last}
                        </Typography>
                        <Typography align="center" variant="subtitle2">
                            Credits-balance: {credits}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={() => location.replace("/add-offer")}
                        >
                            <Link
                                to="/add-offer"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                add an offer
                            </Link>
                        </Button>
                    </div>

                    <OffersList
                        offers={offers}
                        userId={userId}
                        credits={credits}
                    />
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
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    // alignItems: "center",
};
