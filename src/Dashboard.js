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
  let arr = JSON.parse(location.state.data);
  return (
    <div>
      <div className="topHead">
        <h1 className="TopHeading">Find all Your Queries Here!</h1>

      </div>
      {/* {UserDetails.map(CreateCard)} */}
      <div>
           <div className="bodyCard"> {arr.map(CreateCard)} </div>
      </div>
    </div>
  );
}
export default Dashboard;