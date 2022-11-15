import React from "react";

function OfferTags({ tagList }) {
  return (
    tagList?.length > 0 && (
      <ul className="tag-list">
        {tagList.map((tag) => (
          <li key={tag} className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        ))}
      </ul>
    )
  );
}

export default OfferTags;
