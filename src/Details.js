import { navigate } from '@reach/router';
import React, { useContext } from 'react';
import { DetailsContext } from "./DetailsContext";
import axios from "axios";
import qs from "qs";
import './Spinner.css';
import "./PersonalDetails.css";

import './success.css';
import topImg from "./images/topImg.jpg";
import img_2 from "./images/img_2.jpg";

function Details({ location }) {

    return (
        <div className="flex-box">
            <div className="flex-left summary">
                <h1 className="topHeading">Summary</h1>
                <h4>Personal Name:   {location && location.state.user.full_name}</h4>

                <h4>Company Name:   {location && location.state.user.company_name}</h4>

                <h4>Email Id:   {location && location.state.user.email}</h4>

                <h4>Phone:   {location && location.state.user.phone}</h4>

                <h4>Property/House Number or Name:   {location && location.state.user.house_number}</h4>

                <h4>Street name:   {location && location.state.user.street_name}</h4>

                <h4>Town:   {location && location.state.user.town_name}</h4>

                <h4>Postcode:   {location && location.state.user.postcode}</h4>

                {/* <h4>Center Coordinate: 
                        ( {JSON.parse(location.state.user.center_coordinate).lat},  {JSON.parse(location.state.user.center_coordinate).lng} )
                </h4> */}

                {/* <h4>Map Coordinates:
                    <ul>
                        {location && location.state.user.map_coordinates && JSON.parse(location.state.user.map_coordinates).map((e) => {
                            return (<li>
                                lat : {e.lat}<br></br>
                                lng : {e.lng}
                            </li>)
                        })}
                    </ul>
                </h4> */}

                <h4>Area: {location && location.state.user.area}</h4>

                <h4>Image Url: <a href={location && location.state.user.image_url} target="_blank">Click Here</a> </h4>

                <h4>Files:
                    <ul>
                        {location && location.state.user.files && location.state.user.files.map((e) => {
                            return (<li>
                                <a href={e.companyFolderUrl} target="_blank">{e.companyname}</a>
                            </li>)
                        })}
                    </ul>
                </h4>
            </div>
            <div className="flex-right">
                <img src={img_2} className="img_2"></img>

                <img src={topImg} className="topImg"></img>
            </div>
        </div>
    )
}

export default Details
