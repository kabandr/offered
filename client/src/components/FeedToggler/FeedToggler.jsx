import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFeedContext } from "../../context/FeedContext";
import FeedNavLink from "./FeedNavLink";

function FeedToggler() {
  const { isAuth } = useAuth();
  const { tabName, tagName } = useFeedContext();

  return (
    <div className="feed-toggle">
      <ul className="nav">
        {isAuth &&  <FeedNavLink name="global" text="All Offers" />}
        {tabName === "tag" && <FeedNavLink icon name="tag" text={tagName} />}
      </ul>
    </div>
  );
}

export default FeedToggler;
