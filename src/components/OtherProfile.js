import React from "react";
import axios from "../axios";

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
            this.setState(
                {
                    ...data,
                },
                () => {
                    console.log("thisState", this.state);
                }
            );
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
                    <p>{this.state.bio}</p>
                </>
            );
        } else {
            return <h1>Loading...</h1>;
        }

        // let { id, first, last, img_url, bio } = this.state;
        // if (this.state.id) {

        // } else {
        //     <>Loading...</>;
        // }
    }
}
