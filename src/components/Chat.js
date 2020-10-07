import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.messages);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

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
            <p>chat boards here</p>
            <div
                className="chat-container"
                ref={elemRef}
                onScroll={() =>
                    console.log(
                        elemRef.current.scrollHeight,
                        elemRef.current.scrollHeight
                    )
                }
            >
                {chatMessages &&
                    chatMessages.map((message) => (
                        <div key={message.id}>
                            {message.first}
                            <p className="talk-bubble">{message.text}</p>
                        </div>
                    ))}
            </div>
            <TextField onKeyDown={keyCheck}></TextField>
        </>
    );
}
