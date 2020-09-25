import React from "react";
import axios from "../axios";
import ProfilePicture from "../components/ProfilePicture";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let { data } = await axios.get("/user");
        // console.log(data.rows);
        this.setState({
            ...data.rows[0],
            img_url:
                data.rows[0].img_url ||
                `https://api.adorable.io/avatars/229/${data.rows[0].email}@adorable.io.png`,
        });
        console.log("satteat", this.state);
        // axios.get("/user").then(({ data }) =>
        //     this.setState({
        //         ...data,
        //         image: data.image || "/default.jpg",
        //     })
        // );
    }

    render() {
        return (
            <>
                <div className="">welcome to app</div>
                <ProfilePicture img_url={this.state.img_url} />
            </>
        );
    }
}
