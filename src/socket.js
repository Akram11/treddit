import * as io from "socket.io-client";
import {
    receiveMessages,
    AddchatMessage,
    AddchatUserMessage,
} from "./redux/actions";
export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", (msgs) => {
            store.dispatch(receiveMessages(msgs));
        });
        socket.on("addChatMsg", (msg) => {
            store.dispatch(AddchatMessage(msg));
        });

        socket.on("new chat message", (msg) => {
            store.dispatch(AddchatUserMessage(msg));
        });
    }
};
