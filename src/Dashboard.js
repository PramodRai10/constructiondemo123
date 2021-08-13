import React from "react";
import "./dashboard.css";
import Card from "./Card";
import "./card.css";

function CreateCard(user) {

  return <Card
    status={user.status}
    companyname={user.company_name}
    address={user.house_number}
    DateOfSubmissoin={user.DateOfSubmissoin}
    viewDetails={user.viewDetails}
  />

}

function Dashboard({ location }) {
  return (
    <div>
      <div className="topHead">
        <h1 className="TopHeading">Find all Your Queries Here!</h1>

      </div>
      {/* {UserDetails.map(CreateCard)} */}
      <div>
           <dl className="bodyCard"> {location && location.state.data.map(CreateCard)}</dl>
      </div>
    </div>
  );
}
export default Dashboard;