import React, { Component } from "react";
import axios from "../axios";
import Uploader from "../components/Uploader";
import Profile from "../components/Profile";
import { Button } from "@material-ui/core/";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "../components/OtherProfile.js";
import FindPeople from "../components/FindPeople";
import Friends from "../components/Friends";
import Chat from "../components/Chat";
import PrimaryAppBar from "../components/AppBar";
import UserChat from "../components/UserChat";
import AddOffer from "../components/AddOffer";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
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
    }

    render() {
        let state = this.state;

        if (this.state.id) {
            return (
                <>
                    <BrowserRouter>
                        <>
                            <PrimaryAppBar img_url={state.img_url} />
                            {/* <Bar /> */}
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        userId={state.id}
                                        first={state.first}
                                        last={state.last}
                                        img_url={state.img_url}
                                        bio={state.bio}
                                        credits={state.credits}
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
                            <Route
                                exact
                                path="/chat/:id"
                                render={(props) => (
                                    <UserChat
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route path="/users">
                                <FindPeople />
                            </Route>
                            <Route path="/add-offer">
                                <AddOffer />
                            </Route>
                            <Route path="/friends">
                                <Friends />
                            </Route>
                            <Route exact path="/chat">
                                <Chat />
                            </Route>
                        </>
                        {state.showModal && (
                            <Uploader
                                changeImg={(image) => this.setImage(image)}
                                close={() =>
                                    this.setState({ showModal: false })
                                }
                            />
                        )}
                    </BrowserRouter>
                </>
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
