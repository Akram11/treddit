import React from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core/";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "../axios";

export default class Uploader extends React.Component {
    // const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(true);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }

    handleChange(e) {
        this.setState({
            selectedFile: e.target.files[0],
        });
    }

    changeImg(img) {
        this.props.changeImg(img);
    }

    async fileUpload(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", this.state.selectedFile);
        try {
            let response = await axios.post("/upload", formData);
            this.setState({
                newImg: response.data.image,
            });
            this.changeImg(this.state.newImg);
        } catch (e) {
            this.setState({ error: "something went wrong" });
        }
    }

    render() {
        return (
            <div>
                <Modal open={true} onClose={this.props.close}>
                    <div style={getModalStyle()}>
                        <h2>Upload a new profile image:</h2>
                        <input
                            id="contained-button-file"
                            // style={{ display: "none" }}
                            accept="image/*"
                            type="file"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Button
                            startIcon={<CloudUploadIcon />}
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={(e) => this.fileUpload(e)}
                        >
                            Upload Image
                        </Button>
                        <p>{this.state.error}</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: "absolute",
        width: `50%`,
        backgroundColor: "white",
        // border: "1px solid #000",
        padding: `10px`,
    };
}
