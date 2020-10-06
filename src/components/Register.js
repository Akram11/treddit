import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../axios";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

export default function Registration() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", value);
    return (
        <div>
            <h3>Register here:</h3>
            <TextField
                size="small"
                type="text"
                // value={first}
                label="First Name"
                variant="outlined"
                required
                onChange={handleChange}
                name="first"
            />
            <TextField
                size="small"
                type="text"
                // value={last}
                label="Last Name"
                variant="outlined"
                required
                onChange={handleChange}
                name="last"
            />

            <TextField
                size="small"
                type="email"
                // value={email}
                label="email"
                variant="outlined"
                required
                onChange={handleChange}
                name="email"
            />
            <TextField
                size="small"
                // value={password}
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                required
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Register
            </Button>
            {error}
            <p>
                <Link to="/login">Click here to Log in!</Link>
            </p>
        </div>
    );
}

// export default class Registration extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             first: "default name",
//             last: "default last",
//             email: "a@b.com",
//             password: "123456",
//             error: "",
//         };
//     }

//     handleChange(e) {
//         const name = e.target.name;
//         this.setState({
//             [name]: e.target.value,
//         });
//     }

//     async handleSubmit() {
//         let state = this.state;
//         try {
//             await axios.post("/registration", state);
//             location.replace("/");
//         } catch (e) {
//             this.setState({ error: "something went wrong" });
//         }
//     }

//     render() {
//         let { first, last, email, password } = this.state;
//         return (
//             <div>
//                 <h3>Register here:</h3>

//                 <TextField
//                     size="small"
//                     type="text"
//                     value={first}
//                     label="First Name"
//                     variant="outlined"
//                     required
//                     onChange={(e) => this.handleChange(e)}
//                     name="first"
//                 />
//                 <TextField
//                     size="small"
//                     type="text"
//                     value={last}
//                     label="Last Name"
//                     variant="outlined"
//                     required
//                     onChange={(e) => this.handleChange(e)}
//                     name="last"
//                 />

//                 <TextField
//                     size="small"
//                     type="email"
//                     value={email}
//                     label="email"
//                     variant="outlined"
//                     required
//                     onChange={(e) => this.handleChange(e)}
//                     name="email"
//                 />
//                 <TextField
//                     size="small"
//                     value={password}
//                     label="Password"
//                     variant="outlined"
//                     name="password"
//                     type="password"
//                     required
//                     onChange={(e) => this.handleChange(e)}
//                 />
//                 <Button
//                     onClick={(e) => this.handleSubmit(e)}
//                     variant="contained"
//                     color="primary"
//                 >
//                     Register
//                 </Button>
//                 {this.state.error}
//                 <p>
//                     <Link to="/login">Click here to Log in!</Link>
//                 </p>
//             </div>
//         );
//     }
// }
