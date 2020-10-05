import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    recieveFriends,
    acceptFriendRequest,
    unfriend,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Friends() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    console.log("users", users);
    let friends = users && users.filter((user) => user.accepted);
    let wannabes = users && users.filter((user) => !user.accepted);

    console.log("friends", friends);
    console.log("wannabes", wannabes);

    useEffect(() => {
        dispatch(recieveFriends());
    }, []);

    // if (users) {

    return (
        <>
            <div>
                <p>Friends:</p>
                {friends &&
                    // friends.length > 0 &&
                    friends.map((friend) => (
                        <>
                            <UserCard
                                key={friend.id}
                                id={friend.id}
                                first={friend.first}
                                last={friend.last}
                                img_url={friend.img_url}
                                email={friend.email}
                            />

                            <Button variant="contained" color="primary">
                                unfriend {friend.id}
                            </Button>
                        </>
                    ))}
            </div>
            <div>
                <p>These people sent you a friend a friend request</p>
                {wannabes &&
                    // wannabes.length > 0 &&
                    wannabes.map((wannabe) => (
                        <>
                            <UserCard
                                key={wannabe.id}
                                id={wannabe.id}
                                first={wannabe.first}
                                last={wannabe.last}
                                img_url={wannabe.img_url}
                                email={wannabe.email}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    dispatch(acceptFriendRequest(wannabe.id))
                                }
                            >
                                accept request
                            </Button>
                        </>
                    ))}
            </div>
        </>
    );
    // }
    // else {
    //     return <h1>is this working</h1>;
    // }
}

function UserCard({ id, first, last, img_url, bio, email }) {
    return (
        <div>
            <Link to={`/user/${id}`}>
                <img
                    src={
                        img_url ||
                        `https://api.adorable.io/avatars/229/${email}@adorable.io.png`
                    }
                />
            </Link>
            <h2>
                {first}
                {last}
            </h2>
        </div>
    );
}
