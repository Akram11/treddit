import React from "react";
import Logo from "./logo";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import { Button } from "@material-ui/core/";

export default function Profile({ ...props }) {
    let { first, last, bio, img_url, showModal, setBio } = props;
    console.log("from profile", bio);
    return (
        <>
            <Logo />
            <p>
                Hey, {first} {last}
            </p>
            <ProfilePicture
                first={first}
                last={last}
                img_url={img_url}
                showModal={showModal}
            />
            <BioEditor bio={bio} setBio={setBio} />
        </>
    );
}
