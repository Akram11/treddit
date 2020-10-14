import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";

export default function OffersList({ credits, userId, offers, userName }) {
    return (
        <>
            <div>
                {offers &&
                    offers.map((offer, i) => {
                        return (
                            <OfferCard
                                userId={userId}
                                credits={credits}
                                key={i}
                                offerId={offer.id}
                                creatorId={offer.creator_id}
                                status={offer.status}
                                email={offer.email}
                                date={offer.created_at}
                                first={offer.first}
                                last={offer.last}
                                title={offer.title}
                                text={offer.text}
                                imgUrl={offer.img_url}
                                treddits={offer.price}
                                buyerId={offer.buyer_id}
                                userName={userName}
                                location={offer.location}
                            />
                        );
                    })}
            </div>
        </>
    );
}
