import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";

// console.log(socket);

export default function Chat() {
    const elemRef = useRef();
    // const chatMessages = useSelector((state) => state && state.chatMessages);

    useEffect(() => {
        // console.log(elemRef);
        // console.log(elemRef.current.scrollTop);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.scrollHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new msg", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <p>this is chat component</p>
            <div className="chat-container" ref={elemRef}>
                <p>chat boards here</p>
            </div>
            <TextField onKeyDown={keyCheck}></TextField>
        </>
    );
}
