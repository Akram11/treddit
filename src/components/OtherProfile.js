import React from "react";
import axios from "../axios";
import FriendButton from "./FriendButton";
import ProfilePicture from "./ProfilePicture";
import { Button, Typography, Paper } from "@material-ui/core";
import BioEditor from "./BioEditor.js";

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
                img_url: data.img_url,
            });
        }
    }

    render() {
        if (this.state.id) {
            let { first, last, img_url, bio } = this.state;
            return (
                <>
                    <div style={maintStyle}>
                        <div style={style}>
                            <ProfilePicture
                                first={first}
                                last={last}
                                img_url={img_url}
                            />
                            <Typography align="center" variant="h5">
                                {this.state.first} {this.state.last}
                            </Typography>

                            <FriendButton
                                text={"send friend request!"}
                                otherID={this.state.id}
                            />
                        </div>
                        <BioEditor bio={bio} showEdit={false} />
                    </div>
                </>
            );
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

const style = {
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const maintStyle = {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    // alignItems: "center",
};
