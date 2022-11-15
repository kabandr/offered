import React from "react";
import { Link } from "react-router-dom";

function OfferMeta({ offer, children }) {
  const { candidate, role, compensation, equity, benefits, terms, slug } = offer || {};

  return (
    <div className="article-meta">
      <Link
        state={{ candidate, role, compensation, equity, benefits, terms }}
        to={`/profile/${slug}`}
      >
      </Link>
      <div className="info">
        <Link
          className="author"
          to={`/profile/${slug}`}
        >
          {slug}
        </Link>
      </div>
      {children}
    </div>
  );
}

export default OfferMeta;
