import { navigate } from "@reach/router";
import React from "react";
import "./card.css";

function Card(props) {
    function fullDetails(e) {
        e.preventDefault();
        navigate('/fulldetails', { state: { user: props.viewDetails } })
    }
    return (
        <div className="cardTop">
            <div className="cardBody">
                <p className="status">{props.status}</p>
                <h2 className="companyNAme">{props.companyname}</h2>
                <h2 className="address">{props.address}</h2>
                <p className="DateOfSubmissoin">{props.DateOfSubmissoin}</p>
                {/* <a href="#" class="btn btn-primary" id="viewDetails">View Details</a> */}
                <button className="btn btn-primary" id="viewDetails" type="submit" onClick={fullDetails}>View Details</button>
            </div>
        </div>
    );
}
export default Card;