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
            <div className="chat-area">
                <div className=" chat-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message) => (
                            <div key={message.id}>
                                <p className="talk-bubble">
                                    {message.first}:{message.text}
                                </p>
                            </div>
                        ))}

                    <div className="chat-input">
                        <TextField
                            size={"medium"}
                            autoFocus
                            // margin={"dense"}
                            // variant={fill}
                            fullWidth
                            variant="outlined"
                            onKeyDown={keyCheck}
                        ></TextField>
                    </div>
                </div>
            </div>
        </>
    );
}
