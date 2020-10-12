import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import OfferCard from "./OfferCard";

export default function OffersList() {
    const offers = useSelector((state) => state && state.offers);
    console.log(offers && `offers from offersList ${offers[0].img_url}`);

    return (
        <>
            <div>
                this is offers
                {offers &&
                    offers.map((offer, i) => {
                        return (
                            <OfferCard
                                key={i}
                                email={offer.email}
                                date={offer.created_at}
                                first={offer.first}
                                last={offer.last}
                                title={offer.title}
                                text={offer.text}
                                img_url={offer.img_url}
                                treddits={offer.price}
                            />
                        );
                    })}
            </div>
        </>
    );
}
