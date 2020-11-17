import * as io from "socket.io-client";
import {
    receiveMessages,
    AddchatMessage,
    AddchatUserMessage,
    receiveOffer,
    addOffer,
    receiveUsers,
    changeOffer,
    bookOffer,
    rejectOffer,
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

        socket.on("BookOffer", (offerId, buyerId, status, creatorId) => {
            store.dispatch(bookOffer(offerId, buyerId, status));
        });

        socket.on("reject action", (offerId, status) => {
            console.log("action", offerId, status);
            store.dispatch(rejectOffer(offerId, status));
        });

        socket.on(
            "changeOffer",
            (offerId, buyerId, status, treddits, creatorId) => {
                store.dispatch(
                    changeOffer(offerId, buyerId, status, treddits, creatorId)
                );
            }
        );
    }
};
