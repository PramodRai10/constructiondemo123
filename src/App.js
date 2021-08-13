import React from "react";
import Header from "./Header";
import Login from "./Login";
import Otp from "./Otp"
import Dashboard from "./Dashboard";
import UserDetails from "./MapDetails";
import Card from "./Card";
import Body from "./Body";
import SiteDetails from "./Sitedetail";
import SearchLocation from "./SearchLocation";
import Summary from "./Summary";
import Sucessful from "./Succes";
import "./card.css";
import Footer from "./Footer";

function CreateCard(UserDetails) {

  return <Card
    status={UserDetails.status}
    companyname={UserDetails.companyname}
    address={UserDetails.address}
    DateOfSubmissoin={UserDetails.DateOfSubmissoin}

    viewDetails={UserDetails.viewDetails}
  />

}
function App() {
  return (
    <div>
      <Header />
      <Dashboard />
        <div>
           <dl className="bodyCard"> {UserDetails.map(CreateCard)}</dl>
        </div>
      <Footer />
    </div>
  );
}

export default App;
