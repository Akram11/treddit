import * as io from "socket.io-client";
import {
    receiveMessages,
    AddchatMessage,
    AddchatUserMessage,
    receiveOffer,
    addOffer,
    receiveUsers,
    makeOfferRequest,
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

        socket.on("make an offer request", (offerId, creatorId, userId) => {
            console.log("made it to sockets", offerId, creatorId, userId);
            store.dispatch(makeOfferRequest(offerId));
        });
    }
};
