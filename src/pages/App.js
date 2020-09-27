import React, { Component } from "react";
import axios from "../axios";
import ProfilePicture from "../components/ProfilePicture";
import Logo from "../components/logo";
import Uploader from "../components/Uploader";
import Profile from "../components/Profile";
import { Button } from "@material-ui/core/";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let { data } = await axios.get("/user");
        // console.log(data.rows);
        this.setState({
            ...data,
            img_url:
                data.img_url ||
                `https://api.adorable.io/avatars/229/${data.email}@adorable.io.png`,
        });
    }

    setStateFunction(state, props) {
        const newState = { ...state, showModal: true };
        return newState;
    }

    setImage(image) {
        this.setState({
            img_url: image,
            showModal: false,
        });
    }

    render() {
        let state = this.state;
        return (
            <>
                <div className="">welcome to app</div>
                <Profile
                    Bio={state.bio}
                    first={state.first}
                    last={state.last}
                    img_url={this.state.img_url}
                    showModal={() => this.setState({ showModal: true })}
                    setBio={() =>
                        this.setState((state, bio) => {
                            bio;
                        })
                    }
                />

                {state.showModal && (
                    <Uploader
                        changeImg={(image) => this.setImage(image)}
                        close={() => this.setState({ showModal: false })}
                    />
                )}
            </>
        );
    }
}
