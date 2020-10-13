import * as io from "socket.io-client";
import {
    receiveMessages,
    AddchatMessage,
    AddchatUserMessage,
    receiveOffer,
    addOffer,
    receiveUsers,
    changeOffer,
} from "./redux/actions";
export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", (msgs) => {
            store.dispatch(receiveMessages(msgs));
        });

        socket.on("offers", (offers) => {
            store.dispatch(receiveOffer(offers));
        });
        socket.on("addChatMsg", (msg) => {
            store.dispatch(AddchatMessage(msg));
        });

        socket.on("receiveUsers", (users) => {
            store.dispatch(receiveUsers(users));
        });

        socket.on("new chat message", (msg) => {
            store.dispatch(AddchatUserMessage(msg));
        });

        socket.on("addOffer", (offer) => {
            store.dispatch(addOffer(offer));
        });

        socket.on("changeOffer", (offerId, buyer_id, status) => {
            console.log("made it to sockets", offerId, buyer_id, status);
            store.dispatch(changeOffer(offerId, buyer_id, status));
        });
    }
};
