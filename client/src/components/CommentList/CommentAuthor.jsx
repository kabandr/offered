import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

function CommentAuthor({ bio, image, username }) {
  return (
    <>
      <Link
        className="comment-author"
        state={{ bio, image }}
        to={`/profile/${username}`}
      >
        <Avatar alt={username} className="comment-author-img" src={image} />
      </Link>{" "}
      <Link
        className="comment-author"
        state={{ bio, image }}
        to={`/profile/${username}`}
      >
        {username}
      </Link>
    </>
  );
}
export default CommentAuthor;
