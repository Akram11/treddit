import axios from "../axios";
const RECEIVE_FRIENDS = "RECIEVE_FRIENDS";
const ACCEPT_REQUEST = "ACCEPT_REQUEST";
const UNFRIEND = "UNFRIEND";
const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";
const RECEIVE_USER_CHAT = "RECEIVE_USER_CHAT";
const ADD_CHAT_USER_MESSAGE = "ADD_CHAT_USER_MESSAGE";
const RECEIVE_OFFERS = "RECEIVE_OFFERS";
const ADD_OFFER = "ADD_OFFER";
const RECEIVE_USERS = "RECEIVE_USERS";
const MAKE_OFFER_REQUEST = "MAKE_OFFER_REQUEST";

export async function recieveFriends() {
    try {
        const { data } = await axios.get("/get-friends");
        return {
            type: RECEIVE_FRIENDS,
            users: data.users,
        };
    } catch (e) {
        console.log(e);
    }
}
export async function acceptFriendRequest(otherID) {
    try {
        const { data } = await axios.post(`/accept-request`, {
            otherID,
        });
        return {
            type: ACCEPT_REQUEST,
            // accepted: data.accepted,
            id: otherID,
        };
    } catch (e) {
        console.log(e);
    }
}

export async function unfriend(otherID) {
    try {
        const { data } = await axios.post(`/unfriend`, {
            otherID,
        });

        return {
            type: UNFRIEND,
            id: otherID,
        };
    } catch (e) {
        console.log(e);
    }
}

export async function receiveMessages(msgs) {
    return {
        type: RECEIVE_MESSAGES,
        msgs,
    };
}

export async function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export function receiveOffer(offers) {
    return {
        type: RECEIVE_OFFERS,
        offers,
    };
}

export async function AddchatMessage(msg) {
    return {
        type: ADD_MESSAGE,
        msg,
    };
}

export async function addOffer(offer) {
    return {
        type: ADD_OFFER,
        offer,
    };
}

export async function recieveUserChat(id) {
    try {
        const { data } = await axios.get(`/chat/${id}.json`);
        console.log(data);
        return {
            type: RECEIVE_USER_CHAT,
            id,
            data,
        };
    } catch (e) {
        console.error(e);
    }
}

export async function AddchatUserMessage(id, text) {
    return {
        type: ADD_CHAT_USER_MESSAGE,
        id,
        data,
    };
}

export async function makeOfferRequest(offerId, creatorId, userId) {
    console.log("made it to acitons", offerId, creatorId, userId);
    return {
        type: MAKE_OFFER_REQUEST,
        offerId,
        creatorId,
        userId,
    };
}
