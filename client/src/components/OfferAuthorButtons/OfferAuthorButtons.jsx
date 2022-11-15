import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import deleteOffer from "../../services/deleteOffer";

function OfferAuthorButtons({ candidate, role, compensation, equity, benefits, terms, slug, tagList }) {
  const { headers, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuth) return alert("You need to login first");

    const confirmation = window.confirm("Want to delete the offer?");
    if (!confirmation) return;

    deleteOffer({ headers, slug })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <>
      <button
        className="btn"
        style={{ color: "#d00" }}
        onClick={handleClick}
      >
        <i className="ion-trash-a"></i> Delete Offer
      </button>{" "}
      <button className="btn">
        <Link
          className="nav-link"
          state={{ candidate, role, compensation, equity, benefits, terms, slug, tagList }}
          to={`/editor/${slug}`}
        >
          <i className="ion-edit"></i> Update Offer
        </Link>
      </button>{" "}

      <label className="offer-status">Status</label>
    </>
  );
}

export default OfferAuthorButtons;
