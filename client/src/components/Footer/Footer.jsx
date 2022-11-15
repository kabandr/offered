import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="/" className="logo-font">
        Offered
      </Link>
      <span className="attribution">
        Making your job offers manageable
      </span>
    </div>
  );
}

export default Footer;
