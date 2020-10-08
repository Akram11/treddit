import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core/";
import axios from "../axios";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textFieldVisible: false,
            bio: props.bio,
            setBio: props.setBio,
            showTextField: false,
            buttonText: props.bio ? "Edit Bio" : "Add Bio",
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
            buttonText: "Edit Bio",
            showTextField: false,
        });
        this.setBio(this.state.bio);
    }

    render() {
        const bio = this.props.bio;
        return (
            <div style={styles.main}>
                <div>
                    <Typography>{this.state.bio || "No Bio yet"}</Typography>
                    {this.props.showEdit && (
                        <Button
                            size="small"
                            color="primary"
                            onClick={(e) =>
                                this.setState({ showTextField: true })
                            }
                        >
                            {this.state.buttonText}
                        </Button>
                    )}
                </div>
                {/* {this.state.Bio} */}
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
                                "Say Something about yourself!" ||
                                this.state.bio
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
                            // variant="contained"
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
        alightItems: "space-between",
        justifyContent: "space-between",
    },
};
