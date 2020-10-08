import React from "react";
import { Button } from "@material-ui/core/";

export default function ProfilePicture({
    first,
    last,
    img_url,
    // handleChildSubmit,
    showModal,
    width,
    height,
    radius,
}) {
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
