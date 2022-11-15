import React from 'react'
import OffersPagination from "../components/OffersPagination";
import OffersPreview from "../components/OffersPreview";
import { useFeedContext } from "../context/FeedContext";
import useOfferList from "../hooks/useOffers";

function HomeOffers() {
  const { tabName, tagName } = useFeedContext();

  const { offers, offersCount, loading, setOffersData } = useOfferList({
    location: tabName,
    tabName,
    tagName,
  });

  return loading ? (
    <div className="article-preview">
      <em>Loading offers list...</em>
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
        location={tabName}
        tagName={tagName}
        updateOffers={setOffersData}
      />
    </>
  ) : (
    <div className="article-preview">offers not available.</div>
  );
}

export default HomeOffers;
