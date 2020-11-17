import React from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import OffersList from "./OffersList";
import { Button, Typography, Paper, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    const users = useSelector((state) => state && state.users);
    const user = users && users.filter((user) => user.id == userId);

    return (
        <>
            {user && (
                <div style={mainStyle}>
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
                            credits balance: {user && user[0]["credits"]}
                        </Typography>

                        <BioEditor bio={bio} setBio={setBio} showEdit={true} />
                    </div>
                    <div>
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

                        <Typography
                            align="center"
                            variant="h4"
                            style={{ marginBottom: 40, paddingTop: 40 }}
                        >
                            {offers.length > 0
                                ? "My offers"
                                : "you haven't created any offer yet"}
                        </Typography>
                        <Divider />
                        <div style={{ width: 700 }}>
                            <OffersList
                                actionCard={true}
                                offers={offers}
                                userId={userId}
                                credits={credits}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const style = {
    width: 300,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
};

const mainStyle = {
    display: "flex",
    flexDirection: "row",
    padding: 10,
};
