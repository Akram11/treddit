import * as io from "socket.io-client";
import { receiveMessages, AddchatMessage } from "./redux/actions";
export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", (msgs) => {
            store.dispatch(receiveMessages(msgs));
        });
        socket.on("addChatMsg", (msg) => {
            console.log("this is the new msg in socket", msg);
            store.dispatch(AddchatMessage(msg));
        });
    }
};
