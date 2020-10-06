import * as io from "socket.io-client";
import { receiveMessages, chatMessage } from "./redux/actions";
export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", (msgs) => {
            console.log("msgs from server insdie socket", msgs);
            store.dispatch(receiveMessages(msgs));
        });
        //socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
        // socket.on("addMessage", (msg) => {
        //     console.log(msg);
        //     // store.dispatch();
        // });
    }
};
