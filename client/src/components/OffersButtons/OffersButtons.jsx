import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OfferAuthorButtons from "../OfferAuthorButtons";
import OfferDecision from "../OfferDecision";

function OffersButtons({ offer, setOffer }) {
  const { author: { username } = {}, author } = offer || {};
  const { loggedUser } = useAuth();
  const { slug } = useParams();

  const decisionHandler = (author) => {
    setOffer((prev) => ({ ...prev, author }));
  };

  // const handleFav = ({ favorited, favoritesCount }) => {
  //   setOffer((prev) => ({ ...prev, favorited, favoritesCount }));
  // };

  return loggedUser.username === username ? (
    <OfferAuthorButtons {...offer} slug={slug} />
  ) : (
    <>
      <OfferDecision {...author} handler={decisionHandler} />
      {/* <FavButton {...offer} handler={handleFav} text /> */}
    </>
  );
}

export default OffersButtons;
