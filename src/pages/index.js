import React from "react";
import { Router } from "@reach/router";
import "./index.css";
import Footer from "../Footer";
import Header from "../Header";
import PersonalDetails from "../PersonalDetails";
import SiteDetails from "../SiteDetails";
import Summary from "../Summary";
import GoogleMap from "../GoogleMap";
import { DetailsProvider } from "../DetailsContext";
import Thanks from "../Thanks";
import Login from "../Login";
import Otp from "../Otp";
import Dashboard from "../Dashboard"
import Details from "../Details"
import Gif from "../Gif"

function PersonalDetails1() {
  return (
    <div className="details">
      <Header />
      <PersonalDetails />
      <Footer />
    </div>
  )
}
function SiteDetails1() {
  return (
    <div className="details">
      <Header />
      <SiteDetails />
      <Footer />
    </div>
  )
}
function GoogleMap1() {
  return (
    <div className="details">
      <Header />
      <GoogleMap />
      <Footer />
    </div>
  )
}
function Summary1() {
  return (
    <div className="details">
      <Header />
      <Summary />
      <Footer />
    </div>
  )
}
function Login1() {
  return (
    <div className="details">
      <Header />
      <Login />
      <Footer />
    </div>
  )
}
function Otp1() {
  return (
    <div className="details">
      <Header />
      <Otp/>
      <Footer />
    </div>
  )
}
function Dashboard1() {
  return (
    <div className="details">
      <Header />
      <Dashboard/>
      <Footer />
    </div>
  )
}
function Details1({location}) {
  return (
    <div className="details">
      <Header />
      <Details location={location}/>
      <Footer />
    </div>
  )
}
function Thanks1() {
  return (
    <div className="details">
      <Header />
      <Thanks />
      <Footer />
    </div>
  )
}
function Gif1() {
  return (
    <div className="details">
      <Header />
      <Gif />
      <Footer />
    </div>
  )
}
function App() {
  return (
    <DetailsProvider>
      <div className="app">
        <Router>
          <SiteDetails1 path="/siteDetails" />
          <Summary1 path="/confirmDetails" />
          <GoogleMap1 path="selectArea" />
          <Thanks1 path="/complete" />
          <Login1 path="/login" />
          <Otp1 path="/otp" />
          <Dashboard1 path="/dashboard" />
          <Details1 path="/fulldetails" />
          <Gif1 path="/gif" />
          <PersonalDetails1 path="/" />
        </Router>
      </div>
    </DetailsProvider>
  );
}

export default App;
