import React from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import OffersList from "./OffersList";
import { Button, Typography, Paper } from "@material-ui/core";

export default function Profile({ ...props }) {
    let { first, last, bio, img_url, showModal, setBio, credits } = props;
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
                            Credits-balance: {credits}
                        </Typography>
                        <BioEditor bio={bio} setBio={setBio} showEdit={true} />
                    </div>

                    <OffersList credits={credits} />
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
