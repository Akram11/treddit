import React from "react";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import { Button, Typography } from "@material-ui/core";

export default function Profile({ ...props }) {
    let { first, last, bio, img_url, showModal, setBio } = props;
    return (
        <>
            <div style={maintStyle}>
                <div style={style}>
                    <ProfilePicture
                        first={first}
                        last={last}
                        img_url={img_url}
                        showModal={showModal}
                    />
                    <Typography variant="h5">
                        {first} {last}
                    </Typography>
                </div>
                <BioEditor bio={bio} setBio={setBio} />
            </div>
        </>
    );
}

// function ProfileContent() {}
const style = {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const maintStyle = {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    // alignItems: "center",
};
