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
import { MicNone } from '@material-ui/icons';

function Summary() {
    const [details, setDetails] = useContext(DetailsContext);

    function post_data(e) {
        // document.querySelector('.cont').style.display = 'block';
        // fetch(process.env.REACT_APP_ROUTE, {
        //     method: 'POST',
        //     body: JSON.stringify(details),
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if ((data['statusCode'] == 200)) {
        //             navigate('/complete')
        //         }
        //         else {
        //             //console.log(data);
        //             navigate('/')
        //             alert('Something went wrong, Please try Again')
        //         }

        //     });
        e.preventDefault();
        document.querySelector('.cont').style.display = 'block';
        var data = qs.stringify(details);
        var config = {
            method: 'post',
            url: process.env.GATSBY_APP_HEROKU + '/storeDetails',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                let data1 = JSON.stringify(response.data);
                data1 = JSON.parse(data1);
                console.log(data1);
                if (data1.statusCode == 200) {
                    navigate('/complete')
                }
                else {
                    //console.log(data);
                    navigate('/selectArea')
                    alert('Something went wrong, Please try Again')
                }
            })
            .catch(function (error) {
                console.log(error)
                document.querySelector('.cont').style.display = 'none';
                alert('Something went wrong, Please try Again')
                navigate('/selectArea')
            });
    }
    return (
        <div className="flex-box">
            <div className="flex-left summary">


                <h1 className="topHeading">Summary</h1>
                <h4>Personal Name:   {details.full_name}</h4>

                <h4>Company Name:   {details.company_name}</h4>

                <h4>Email Id:   {details.email}</h4>

                <h4>Phone:   {details.phone}</h4>

                <h4>Property/House Number or Name:   {details.house_number}</h4>

                <h4>Street name:   {details.street_name}</h4>

                <h4>Town:   {details.town_name}</h4>

                <h4>Postcode:   {details.postcode}</h4>

                <h4>Map Coordinates:
                    <ul>
                        {details.map_coordinates != null && details.map_coordinates.map((e) => {
                            return (<li>
                                lat : {e.lat}<br></br>
                                lng : {e.lng}
                            </li>)
                        })}
                    </ul>
                </h4>

                <h4>Area: {details.area}</h4>

                <h4>Image Url: <a href={details.image_url} target="_blank">Click Here</a> </h4>

                <button className="btn_submit construct btn_summary" type="submit" onClick={post_data}>Confirm</button>

                {/* Spinner */}
                <div className="cont" style={{ display: 'none' }}>
                    <div className="loader"></div>
                    <h2>Please Hold On, Submitting your details...</h2>
                </div>
            </div>
            <div className="flex-right">
                <img src={img_2} className="img_2"></img>

                <img src={topImg} className="topImg"></img>
            </div>
        </div>
    )
}

export default Summary
