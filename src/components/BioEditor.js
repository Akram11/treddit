import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core/";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textFieldVisible: false,
            bio: props.bio,
        };
    }

    render() {
        return (
            <>
                {this.props.bio ? (
                    <h2>{bio}</h2>
                ) : (
                    <>
                        <TextField
                            id="filled-full-width"
                            label="Bio"
                            style={{ margin: 0 }}
                            placeholder="Tell us more about yourself!"
                            // helperText="Tell us more about yourself!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            // component="span"
                        >
                            Add Bio
                        </Button>
                    </>
                )}
            </>
        );
    }
}
