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
    return state;
}
