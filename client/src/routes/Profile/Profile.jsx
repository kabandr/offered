import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";

function Profile() {
  const { state } = useLocation();

  return (
    <div className="profile-page">
      <div className="user-info">
        <ContainerRow>
          <AuthorInfo />
        </ContainerRow>
      </div>

      <ContainerRow>
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="offers-toggle">
            <ul className="nav nav-pills outline-active">
              <NavItem text="My Offers" url="" state={state} />
              <NavItem text="Favourite Offers" url="favorites" state={state} />
            </ul>
          </div>
          <Outlet />
        </div>
      </ContainerRow>
    </div>
  );
}

export default Profile;
