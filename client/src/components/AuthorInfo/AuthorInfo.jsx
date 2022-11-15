import React from "react";
import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getProfile from "../../services/getProfile";
import Avatar from "../Avatar";
import OfferDecision from "../OfferDecision";

function AuthorInfo() {
  const { state } = useLocation();
  const [{ bio, decision, image }, setAuthor] = useState(
    state || {},
  );
  const { headers, loggedUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) return;

    getProfile({ headers, username })
      .then(setAuthor)
      .catch((error) => {
        console.error(error);
        navigate("/not-found", { replace: true });
      });
  }, [username, headers, state, navigate]);

  const decisionHandler = ({ decision }) => {
    setAuthor((prev) => ({ ...prev, decision }));
  };

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <Avatar alt={username} className="user-img" src={image} />
      <h4>{username}</h4>

      {bio && <Markdown options={{ forceBlock: true }}>{bio}</Markdown>}

      {username === loggedUser.username ? (
        <Link
          className="btn btn-outline-secondary action-btn"
          to="/settings"
        >
          <i className="ion-gear-a"></i> Edit Profile Settings
        </Link>
      ) : (
        <OfferDecision
          decision={decision}
          handler={decisionHandler}
          username={username}
        />
      )}
    </div>
  );
}

export default AuthorInfo;
