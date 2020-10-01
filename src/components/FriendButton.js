import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";

export default function FriendButton({ otherID }) {
    console.log(otherID);
    const [text, setText] = useState("send friend request");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/friend-relation/${otherID}`);
            setText(data.msg || text);
            console.log(data, text);
        })();
    }, [text]);

    const handleClick = async (e) => {
        if (text[0] == "s") {
            try {
                e.preventDefault();
                const { data } = await axios.post(`/friend-request`, {
                    otherID,
                });
                setText("CANCEL FRIEND REQUEST");
            } catch (e) {
                console.log(e);
            }
        } else if (text[0] == "c") {
            console.log("inside cancel", text[0]);
            try {
                e.preventDefault();
                const { data } = await axios.post(`/cancel-request`, {
                    otherID,
                });
                console.log("dafdfe", data.msg);
                setText(data.msg);
                console.log("state", text);
            } catch (e) {
                console.log(e);
            }
        } else if (text[0] == "a") {
            try {
                e.preventDefault();
                const { data } = await axios.post(`/accept-request`, {
                    otherID,
                });
                setText(data.msg);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClick}>
                {text}
            </Button>
        </>
    );
}
