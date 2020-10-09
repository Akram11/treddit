import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { recieveUserChat } from "../redux/actions.js";

export default function Chat({ match }) {
    const dispatch = useDispatch();
    const elemRef = useRef();
    let otherID = match.params.id;
    const chats = useSelector((state) => state && state.chats);
    const chatMessages = chats && chats[otherID];

    useEffect(() => {
        dispatch(recieveUserChat(otherID));
    }, []);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("new chat msg", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            thisis user chat
            <div className="area chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message) => (
                        <div key={message.id}>
                            <p className="talk-bubble">{message.text}</p>
                        </div>
                    ))}
            </div>
            <TextField fullWidth onKeyDown={keyCheck}></TextField>
        </>
    );
}
