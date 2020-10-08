import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core/";
import axios from "../axios";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textFieldVisible: false,
            bio: props.bio || "No Bio yet",
            setBio: props.setBio,
            showTextField: false,
        };
    }

    setBio(bio) {
        this.props.setBio(bio);
    }

    handleChange(e) {
        let { value } = e.target;
        this.setState({
            newBio: value,
        });
    }

    async handleSubmit(e) {
        let newBio = { newBio: this.state.newBio };
        e.preventDefault();
        let res = await axios.post("/bio", newBio);
        console.log(res);
        this.setState({
            bio: res.data.bio,
            showTextField: false,
        });
        this.setBio(this.state.bio);
    }

    render() {
        return (
            <div style={styles.main}>
                <div>{this.state.bio}</div>
                {this.props.bio ? (
                    <>
                        <Button
                            color="primary"
                            onClick={(e) =>
                                this.setState({ showTextField: true })
                            }
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            color="primary"
                            onClick={(e) =>
                                this.setState({ showTextField: true })
                            }
                        >
                            Add a Bio
                        </Button>
                    </>
                )}
                {this.state.Bio}
                {this.state.showTextField && (
                    <div>
                        <TextField
                            name="newBio"
                            rows="3"
                            spellCheck="true"
                            multiline={true}
                            type="string"
                            id="filled-full-width"
                            label="Bio"
                            style={{ margin: 0 }}
                            placeholder={
                                "Tell us more about yourself!" || this.state.bio
                            }
                            // helperText="Tell us more about yourself!"
                            fullWidth
                            display="none"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            save
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

const styles = {
    main: {
        // backgroundColor: "red",
        padding: 20,
        width: "70%",
        display: "flex",
        flexDirection: "column",
    },
};
