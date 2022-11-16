import React from "react";
import { useParams } from "react-router-dom";
import OffersPagination from "../../components/OffersPagination";
import OffersPreview from "../../components/OffersPreview";
import useOfferList from "../../hooks/useOffers";

function ProfileFavOffers() {
  const { username } = useParams();

  const { offers, offersCount, loading, setOffersData } = useOfferList({
    location: "favorites",
    username,
  });

  return loading ? (
    <div className="article-preview">
      <em>Loading {username} favorites offers...</em>
    </div>
  ) : offers.length > 0 ? (
    <>
      <OffersPreview
        offers={offers}
        loading={loading}
        updateOffers={setOffersData}
      />

      <OffersPagination
        offersCount={offersCount}
        location="favorites"
        updateOffers={setOffersData}
        username={username}
      />
    </>
  ) : (
    <div className="article-preview">{username} doesn&apos;t have favorites.</div>
  );
}

export default ProfileFavOffers;
