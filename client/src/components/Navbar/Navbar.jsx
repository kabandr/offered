import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavItem from "../NavItem";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const { isAuth } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="app-name" to="/">
          Offered
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <NavItem text="Home" icon="ion-compose" url="/" />

          {isAuth && (
            <>
              <NavItem text="New Offer" icon="ion-compose" url="/editor" />
              <DropdownMenu />
            </>
          )}

          {!isAuth && (
            <>
              <NavItem text="Login" icon="ion-log-in" url="/login" />
              <NavItem text="Sign up" url="/register" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
