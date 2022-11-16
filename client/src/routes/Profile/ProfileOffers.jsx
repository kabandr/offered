import React from "react";
import { useParams } from "react-router-dom";
import OffersPagination from "../../components/OffersPagination";
import OffersPreview from "../../components/OffersPreview";
import useOfferList from "../../hooks/useOffers";

function ProfileOffers() {
  const { username } = useParams();

  const { offers, offersCount, loading, setOffersData } = useOfferList({
    location: "profile",
    username,
  });

  return loading ? (
    <div className="article-preview">
      <em>Loading {username} Offers...</em>
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
        location="profile"
        updateOffers={setOffersData}
        username={username}
      />
    </>
  ) : (
    <div className="article-preview">{username} doesn&apos;t have Offers.</div>
  );
}

export default ProfileOffers;
