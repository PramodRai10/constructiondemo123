import React from "react";
import "./dashboard.css";
import Card from "./Card";
import "./card.css";
import moment from "moment";

function CreateCard(user) {
  let address = `House Number/Name: ${user.house_number}, Street Name: ${user.street_name}, Town Name: ${user.town_name}, PostCode: ${user.postcode}`;
  console.log(user)
  return <Card
    status={user.status}
    companyname={user.company_name}
    address={address}
    DateOfSubmissoin={moment(user.createdAt).format('MM-DD-YYYY')}
    viewDetails={user}
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