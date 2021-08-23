import React, { useContext, useState, useEffect } from 'react'
import { DetailsContext } from "./DetailsContext"
import { navigate } from "@reach/router";
import axios from "axios";
import "./PersonalDetails.css";
import topImg from "./images/Img_3.jpg";
import { window, document } from "browser-monads";
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { SiGooglestreetview } from 'react-icons/si';
import { MdLocationCity } from 'react-icons/md';
import { MdLocalPostOffice } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import qs from "qs";

function SiteDetails() {
    var [error, setError] = useState({
        post_code: ''
    })

    // const [details, setDetails] = useContext(DetailsContext);
    //let obj = window.localStorage.getItem('constructionUser') ? JSON.parse(window.localStorage.getItem('constructionUser')) : {};
    let obj = window.localStorage.getItem('constructionUser');
    if (typeof (obj) == "string") {
        obj = JSON.parse(obj);
    } else {
        obj = {};
    }
    const [details, setDetails] = useState(obj);

    // useEffect(()=>{
    //     localStorage.setItem('constructionUser', JSON.stringify(details));
    // }, [details]);

    function handleChange(e) {
        setDetails({
            ...details, [e.target.name]: e.target.value
        });
    }

    //Send to map page
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(error.post_code);
        if (error.post_code == '') {
            console.log('In no error');
            let houseNumber = document.querySelector("#house_number").value;
            let streetName = document.querySelector("#street_name").value;
            let townName = document.querySelector("#town_name").value;

            if (streetName != "") {
                //console.log(details);
                var postcode = details.postcode ? details.postcode : 'MK10 9RP';
                var data = qs.stringify({

                });
                var config = {
                    method: 'get',
                    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`,
                    headers: {},
                    data: data
                };
                //let { isLoaded, loadError } = {isLoaded: null, loadError: null};

                axios(config)
                    .then(function (response) {
                        console.log(response.data)
                        // console.log(JSON.stringify(response.data));
                        console.log(response.data)
                        if (response.data.results.length > 0) {
                            let result = response.data.results[0].geometry.location;
                            let place = response.data.results[0].formatted_address;
                            // setDetails({
                            //     ...details, postcode_center: '847301'
                            // });
                            var obj1 = details;
                            obj1.postcode_center = result;
                            obj1.place = place;
                            // console.log(result)
                            console.log(obj1);
                            window.localStorage.setItem('constructionUser', JSON.stringify(obj1));
                            navigate("/selectArea")
                        }else{
                            alert('Please fill valid postcode');
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log('Some Inputs are not filled');
                alert('Please fill all required inputs');
            }
        } else {
            console.log('Inputs are not correct');
            alert('Please check inputs and fill properly')
        }
    }

    return (
        <div className="flex-box">
            <div className="flex-left">
                <h2 className="topHeading">Enter Site Details:</h2>
                <div className="circle"></div>
                <div className="secondForm">

                    {/* <h4>Property/House Number or Name:</h4> */}
                    <BsFillHouseDoorFill className="textBox_icons" /><input type="text" placeholder="Enter the house number or name" id="house_number" className="topInput" value={details.house_number} name="house_number" onChange={handleChange}></input>

                    {/* <h4>Street Name:</h4> */}
                    <SiGooglestreetview className="textBox_icons" />*<input type="text" placeholder="Enter the street name" id="street_name" className="topInput" value={details.street_name} name="street_name" onChange={handleChange}></input>

                    {/* <h4>Town:</h4> */}
                    <br></br>
                    <MdLocationCity className="textBox_icons" /><input type="text" placeholder="Enter town" id="town_name" className="topInput" value={details.town_name} name="town_name" onChange={handleChange}></input>

                    {/* <h4>Enter the PostCode of area:</h4> */}
                    <MdLocalPostOffice className="textBox_icons" />*<input type="text" placeholder="Enter the PostCode" id="postcode" className="topInput" value={details.postcode} name="postcode" onChange={
                        (e) => {
                            setDetails({
                                ...details, [e.target.name]: e.target.value
                            });
                            var name_regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/
                            if (e.target.value != null) {
                                if (!(e.target.value.match(name_regex))) {
                                    setError({
                                        ...error, post_code: 'PostCode not correct'
                                    })
                                    console.log("Here")
                                    document.getElementById('invalid_post_code').style.display = "inline-block"
                                    console.log(error.post_code)
                                }
                                else {
                                    document.getElementById('invalid_post_code').style.display = "none"
                                    setError({
                                        ...error, post_code: ''
                                    })
                                }

                            }
                            else
                                document.getElementById('invalid_post_code').style.display = "none"
                        }
                    }></input>
                    <span id="invalid_post_code" className="inavlid_input" style={{ display: "none" }}>Not a valid Post Code</span>
                </div>
                <button className="btn_submit construct" type="submit" onClick={handleSubmit}><AiOutlineArrowRight /></button>
                {/* <button className="btn_submit construct" type="submit" onClick={() => { navigate('/') }}>Back</button> */}
            </div>
            <div className="flex-right">
                <img src={topImg} className="topImgSite"></img>
            </div>

        </div>
    )
}

export default SiteDetails
