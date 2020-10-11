import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function OffersList() {
    const offers = useSelector((state) => state && state.offers);
    console.log(offers && `offers from offersList ${offers}`);

    return (
        <>
            <div>
                this is offers
                {offers &&
                    offers.map((offer) => {
                        return <h1> {offer.title}</h1>;
                    })}
            </div>
        </>
    );
}
