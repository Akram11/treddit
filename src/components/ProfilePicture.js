import React from "react";
import { Button } from "@material-ui/core/";

export default function ProfilePicture({
    first,
    last,
    img_url,
    handleChildSubmit,
    clickHandler,
}) {
    // <img src={img_url} />;

    return (
        <>
            <img
                src={img_url}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            />
            {/* <Button variant="contained" color="primary" name="value">
                change picture
            </Button> */}
        </>
    );
}

// import React, { Component } from "react";
// // import "./styles.css";
// export default function Child({ data, onChildClick }) {
//     return (
//         <div>
//             <button onClick={(e) => onChildClick(e)}>{data}</button>
//         </div>
//     );
// }
