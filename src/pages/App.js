import React, { Component } from "react";
import axios from "../axios";
import Uploader from "../components/Uploader";
import Profile from "../components/Profile";
import { Button } from "@material-ui/core/";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "../components/OtherProfile.js";
import FindPeople from "../components/FindPeople";

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
        this.setState({
            ...data,
            img_url:
                data.img_url ||
                `https://api.adorable.io/avatars/229/${data.email}@adorable.io.png`,
        });
    }

    setImage(image) {
        this.setState({
            img_url: image,
            showModal: false,
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio,
        });
        console.log("from app", this.state);
    }

    render() {
        let state = this.state;

        if (this.state.id) {
            return (
                <BrowserRouter>
                    <>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={state.id}
                                    first={state.first}
                                    last={state.last}
                                    img_url={state.img_url}
                                    bio={state.bio}
                                    showModal={() =>
                                        this.setState({ showModal: true })
                                    }
                                    setBio={(bio) => this.setBio(bio)}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route path="/users">
                            <FindPeople />
                        </Route>
                    </>
                </BrowserRouter>
            );
        } else {
            return <p>loading </p>;
        }
    }
}
{
    /* <>
    <div className="">welcome to app</div>
    <Profile
        bio={this.state.bio}
        first={state.first}
        last={state.last}
        img_url={this.state.img_url}
        showModal={() => this.setState({ showModal: true })}
        setBio={(bio) => this.setBio(bio)}
    />

    {state.showModal && (
        <Uploader
            changeImg={(image) => this.setImage(image)}
            close={() => this.setState({ showModal: false })}
        />
    )}
</>; */
}
