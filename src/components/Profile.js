import React from "react";
import Logo from "./logo";
import TextField from "@material-ui/core/TextField";
import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor.js";
import { Button } from "@material-ui/core/";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.setState = { ...props };
    }

    render() {
        let { first, last, img_url, bio } = this.props;

        return (
            <>
                <Logo />
                <ProfilePicture
                    first={first}
                    last={last}
                    img_url={img_url}
                    showModal={this.props.showModal}
                    // setBio={this.setBio}
                />
                <BioEditor bio={bio} />
            </>
        );
    }
}
