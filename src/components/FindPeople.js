import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("test");
    const [users, setUsers] = useState([]);

    console.log(userInput);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/get-people");
                setUsers(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);
    console.log("after request", users);
    return (
        <>
            <h1>find peope</h1>
            {users.map((user, i) => {
                return (
                    <UserCard
                        key={i}
                        first={user.first}
                        last={user.last}
                        email={user.email}
                        img_url={user.img_url}
                        bio={user.bio}
                    />
                );
            })}
        </>
    );
}

function UserCard({ first, last, img_url, bio, email }) {
    return (
        <>
            <img
                src={
                    img_url ||
                    `https://api.adorable.io/avatars/229/${email}@adorable.io.png`
                }
            />
            <h2>
                {first}
                {last}
            </h2>
            <p>{bio}</p>
        </>
    );
}
