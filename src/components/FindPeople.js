import React, { useState, useEffect } from "react";
import axios from "../axios";
import { TextField, Typography } from "@material-ui/core/";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (userInput != "") {
            (async () => {
                try {
                    const { data } = await axios.get("/search-users", {
                        params: { q: userInput },
                    });
                    setUsers(data);
                } catch (err) {
                    console.log("err: ", err);
                }
            })();
        } else {
            (async () => {
                try {
                    const { data } = await axios.get("/get-people");
                    setUsers(data);
                } catch (err) {
                    console.log("err: ", err);
                }
            })();
        }
    }, [userInput]);

    function handleChange(e) {
        setUserInput(e.target.value);
    }

    return (
        <>
            <TextField
                id="standard-search"
                label="Search people"
                type="search"
                onChange={handleChange}
            />
            <h1>find peope</h1>
            {users.length < 1 ? (
                <h1>No results</h1>
            ) : (
                users.map((user, i) => {
                    return (
                        <UserCard
                            key={i}
                            id={user.id}
                            first={user.first}
                            last={user.last}
                            email={user.email}
                            img_url={user.img_url}
                            bio={user.bio}
                        />
                    );
                })
            )}
        </>
    );
}

function UserCard({ id, first, last, img_url, bio, email }) {
    return (
        <>
            <Link to={`/user/${id}`}>
                <ProfilePicture
                    first={first}
                    last={last}
                    img_url={
                        img_url ||
                        ` https://api.adorable.io/avatars/229/${email}@adorable.io.png`
                    }
                />
            </Link>
            <Typography align="left" variant="h5">
                {first} {last}
            </Typography>

            {/* <p>{bio}</p> */}
        </>
    );
}
