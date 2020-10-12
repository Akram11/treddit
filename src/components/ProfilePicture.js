import React from "react";
import { Button, Paper } from "@material-ui/core/";

export default function ProfilePicture({
    first,
    last,
    img_url,
    // handleChildSubmit,
    showModal,
    width,
    height,
    radius,
    email,
}) {
    console.log(email);
    img_url =
        img_url ||
        `https://api.adorable.io/avatars/200/${email}@adorable.io.png`;
    return (
        <>
            <div style={{ margin: 10 }}>
                <img
                    // width={width || 400}
                    style={{
                        width: width || 200,
                        height: height || 200,
                        borderRadius: radius || 10,
                    }}
                    src={img_url}
                    alt={`${first} ${last}`}
                    onClick={showModal}
                />
            </div>
        </>
    );
}
