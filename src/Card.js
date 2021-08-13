import React from "react";
import "./card.css";

function Card(props) {
    return (
        <div className="cardTop">
            <div className="cardBody">
                <p className="status">{props.status}</p>
                <p className="companyNAme">{props.companyname}</p>
                <h2 className="address">{props.address}</h2>
                <p className="DateOfSubmissoin">{props.DateOfSubmissoin}</p>
                <a href="#" class="btn btn-primary" id="viewDetails">View Details</a>
            </div>
        </div>
    );
}
export default Card;