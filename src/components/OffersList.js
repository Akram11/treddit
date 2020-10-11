import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function OffersList() {
    const offers = useSelector((state) => state && state.offers);
    console.log(offers && `offers from offersList ${offers[0].creator_id}`);

    return <div>this is offerslist</div>;
}
