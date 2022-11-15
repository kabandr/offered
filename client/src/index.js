import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Offer from "./routes/Offer/Offer";
import CommentsSection from "./routes/Offer/CommentsSection";
import OfferEditor from "./routes/OfferEditor";
import Home from "./routes/Home";
import HomeOffers from "./routes/HomeOffers";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile/Profile";
import ProfileOffers from "./routes/Profile/ProfileOffers";
import ProfileFavOffers from "./routes/Profile/ProfileFavOffers";
import Settings from "./routes/Settings";
import SignUp from "./routes/SignUp";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeOffers />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />

            <Route path="settings" element={<Settings />} />

            <Route path="editor" element={<OfferEditor />}>
              <Route path=":slug" element={<OfferEditor />} />
            </Route>

            <Route path="offer/:slug" element={<Offer />}>
              <Route index element={<CommentsSection />} />
            </Route>

            <Route path="profile/:username" element={<Profile />}>
              <Route index element={<ProfileOffers />} />
              <Route path="favorites" element={<ProfileFavOffers />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
