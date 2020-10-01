import React, { useState } from "react";
import axios from "../axios";

export function useAuthSubmit(url, value) {
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        try {
            await axios.post(url, value);
            location.replace("/");
        } catch (e) {
            this.setState({ error: "something went wrong" });
        }
    };

    return [error, handleSubmit];
}
