import React from 'react';
import { Outlet } from "react-router-dom";
import BannerContainer from "../components/BannerContainer";
import ContainerRow from "../components/ContainerRow";
import FeedToggler from "../components/FeedToggler";
import { useAuth } from "../context/AuthContext";
import FeedProvider from "../context/FeedContext";
import PopularTags from "./../components/PopularTags";

function Home() {
  const { isAuth } = useAuth();

  return (
    <div className="home-page">
      <BannerContainer>
        <h1 className="logo-font">Offered</h1>
        <p className="slogan">Your job offers management made easier</p>
      </BannerContainer>

      {isAuth && (
        <ContainerRow type="page">
          <FeedProvider>
            <div className="col-md-9">
              <FeedToggler />
              <Outlet />
            </div>
            <PopularTags />
          </FeedProvider>
        </ContainerRow>
      )}
    </div>
  );
}

export default Home;
