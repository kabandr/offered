import React from "react";
import { Link } from "react-router-dom";
import OfferTags from "../OfferTags";
import FavButton from "../FavButton";

function OffersPreview({ offers, loading, updateOffers }) {
  const handleFav = (offer) => {
    const items = [...offers];

    const updatedOffers = items.map((item) =>
      item.slug === offer.slug ? { ...item, ...offer } : item,
    );

    updateOffers((prev) => ({ ...prev, offers: updatedOffers }));
  };

  return offers?.length > 0 ? (
    offers.map((offer) => {
      return (
        <div className="article-preview" key={offer.slug}>
          <FavButton
              favorited={offer.favorited}
              handler={handleFav}
              right
              slug={offer.slug}
            />
          <Link
            to={`/offer/${offer.slug}`}
            state={offer}
            className="preview-link"
          >
            <h1>{offer.candidate}</h1>
            <p>{offer.role}</p>
            <span>Read more...</span>
            <OfferTags tagList={offer.tagList} />
          </Link>
        </div>
      );
    })
  ) : loading ? (
    <div className="article-preview">Loading offer...</div>
  ) : (
    <div className="article-preview">No offers available.</div>
  );
}

export default OffersPreview;
