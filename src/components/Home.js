import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import OffersList from "./OffersList";
import { Button, Typography, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home({ ...props }) {
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

    const [userInput, setUserInput] = useState("");
    // console.log(userInput);
    const allOffers = useSelector((state) => state && state.offers);
    const filteredOffers =
        allOffers && allOffers.filter((offer) => offer.creator_id != userId);

    const [offers, setOffers] = useState([]);
    // let offers =
    //     allOffers && allOffers.filter((offer) => offer.creator_id != userId);
    const users = useSelector((state) => state && state.users);
    const user = users && users.filter((user) => user.id == userId);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 0) {
            return;
        }
        if (filteredOffers) {
            setOffers(filteredOffers);
            setCount(1);
        }
    }, [filteredOffers]);

    console.log(offers);
    function handleChange(e) {
        // console.log("ss");
        // setUserInput(e.target.value);
        // offers = offers.filter((offer) => {
        //     return offer.title == userInput;
        // });
        setOffers(
            offers.map((offer) => {
                return offer.title == "s";
            })
        );
        // console.log(offers);
    }
    return (
        <>
            <div style={maintStyle}>
                <div style={style}>
                    <ProfilePicture
                        first={first}
                        last={last}
                        img_url={img_url}
                    />
                    <Typography
                        style={{ marginBottom: 5 }}
                        align="center"
                        variant="h5"
                    >
                        {first} {last}
                    </Typography>
                    <Typography
                        style={{ marginBottom: 20 }}
                        align="center"
                        variant="subtitle2"
                    >
                        credits balance: {user && user[0]["credits"]}
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
                <div>
                    {/* <TextField
                        fullWidth
                        id="standard-search"
                        label="Search offers"
                        type="search"
                        onChange={handleChange}
                    /> */}
                    <OffersList
                        actionCard={false}
                        offers={offers}
                        userId={userId}
                        userName={first}
                        credits={credits}
                    />
                </div>
            </div>
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

const maintStyle = {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    // alignItems: "center",
};
