import React from "react";
import { Button } from "@material-ui/core/";

export default function ProfilePicture({
    first,
    last,
    img_url,
    handleChildSubmit,
    showModal,
}) {
    return (
        <>
            <img src={img_url} alt={`${first} ${last}`} onClick={showModal} />
        </>
    );
}
