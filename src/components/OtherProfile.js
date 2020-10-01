import React from "react";
import axios from "../axios";
import FriendButton from "./FriendButton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
        };
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let { data } = await axios.get(`/user/${id}.json`);
        if (data.redirect) {
            this.props.history.push("/");
        } else {
            this.setState({
                ...data,
                img_url:
                    data.img_url ||
                    `https://api.adorable.io/avatars/200/${data.email}@adorable.io.png`,
            });
        }
    }

    render() {
        // console.log("render", this.states);
        if (this.state.id) {
            return (
                <>
                    <p>
                        Hey,
                        {this.state.first} {this.state.last}
                    </p>
                    <img src={this.state.img_url} alt="${first}${last}" />
                    <FriendButton
                        text={"send friend request!"}
                        otherID={this.state.id}
                    />
                    <p>{this.state.bio}</p>
                </>
            );
        } else {
            return <h1>Loading...</h1>;
        }
    }
}
