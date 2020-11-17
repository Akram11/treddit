export default function (state = {}, action) {
    if (action.type == "RECIEVE_FRIENDS") {
        state = {
            ...state,
            users: action.users,
        };
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (action.id === user.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => action.id != user.id),
        };
    }

    if (action.type == "RECEIVE_MESSAGES") {
        state = {
            ...state,
            messages: action.msgs,
        };
    }

    if (action.type == "RECEIVE_USERS") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type == "RECEIVE_OFFERS") {
        state = {
            ...state,
            offers: action.offers,
        };
    }

    if (action.type == "ADD_OFFER") {
        state = {
            ...state,
            offers: [action.offer, ...state.offers],
        };
    }

    if (action.type == "ADD_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.msg],
        };
    }

    if (action.type == "RECEIVE_USER_CHAT") {
        state = {
            ...state,
            chats: {
                [action.id]: [...action.data],
            },
        };
    }
    if (action.type === "BOOK_OFFER") {
        state = {
            ...state,
            offers: state.offers.map((offer) => {
                if (action.offerId == offer.id) {
                    return {
                        ...offer,
                        status: action.status,
                        buyer_id: action.buyerId,
                    };
                } else {
                    return offer;
                }
            }),
        };
    }
    if (action.type === "MAKE_OFFER_REQUEST") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.buyerId) {
                    return {
                        ...user,
                        credits: user.credits - action.treddits,
                    };
                } else if (user.id == action.creatorId) {
                    return {
                        ...user,
                        credits: user.credits + action.treddits,
                    };
                }
                return user;
            }),
            offers: state.offers.map((offer) => {
                if (action.offerId == offer.id) {
                    return {
                        ...offer,
                        status: action.status,
                        buyer_id: action.buyerId,
                    };
                } else {
                    return offer;
                }
            }),
        };
    }

    if (action.type == "REJECT_REQUEST") {
        state = {
            ...state,
            offers: state.offers.map((offer) => {
                if (action.offerId == offer.id) {
                    return {
                        ...offer,
                        status: action.status,
                        buyer_id: null,
                    };
                } else {
                    return offer;
                }
            }),
        };
    }

    return state;
}
