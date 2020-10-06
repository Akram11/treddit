import * as io from "socket.io-client";
//import { chatMessages, chatMessage } from "./actions";
export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", (msgs) => {
            console.log("msgs from server", msgs);
            // store.dispatch(chatMessages(msgs));
        });
        //socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
        socket.on("addMessage", (msg) => {
            console.log(msg);
            // store.dispatch();
        });
    }
};
