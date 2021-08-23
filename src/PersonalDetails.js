import React, { useContext, useState, useEffect } from 'react'
import { DetailsContext } from "./DetailsContext"
import { navigate } from "@reach/router";
import axios from "axios";
import "./PersonalDetails.css";
import topImg from "./images/topImg.jpg";
import img_2 from "./images/img_2.jpg";
import { window, document } from "browser-monads";
import {FaUserCheck} from 'react-icons/fa';
import {AiFillTool} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';
import {FaPhoneAlt} from 'react-icons/fa';
import {AiOutlineArrowRight} from 'react-icons/ai';


const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_ROUTE
});

function PersonalDetails() {
    var [error, setError] = useState({
        full_name: '',
        compnay_name: '',
        email_id: '',
        tel: '',
    })

    // const [details, setDetails] = useContext(DetailsContext)
    // let obj = window.localStorage.getItem('constructionUser') ? JSON.parse(window.localStorage.getItem('constructionUser')) : {};
    let obj = window.localStorage.getItem('constructionUser');
    if(typeof(obj)=="string"){
        obj = JSON.parse(obj);
    }else{
        obj = {};
    }
    const [details, setDetails] = useState(obj);
    // useEffect(()=>{
    //     localStorage.setItem('constructionUser', JSON.stringify(details));
    // }, [details])

    //Send to site details page
    async function handleSubmit(e) {
        e.preventDefault();
        if ((error.full_name == '') & (error.tel == '') & (error.email_id == '') & (error.compnay_name == '')) {
            let fullName = document.querySelector("#full_name").value;
            let companyName = document.querySelector("#company_name").value;
            let emailId = document.querySelector("#email_id").value;
            let phone = document.querySelector("#phone").value;

            if (fullName != "" && companyName != "" && emailId != "" && phone != "" && phone.length == 11) {
                window.localStorage.setItem('constructionUser', JSON.stringify(details));
                navigate("/siteDetails")
            } else {
                console.log('Some Inputs are not filled');
                alert('Please fill all inputs')
            }
        } else {
            console.log('Inputs are not correct');
            alert('Please check inputs and fill properly')
        }
    }
   

    return (
        <div className="flex-box">
            <div className="flex-left">
                <h1 className="topHeading1">Lets Get Started</h1>
                <div className="circle"></div>

                {/* <h4>Enter your full name</h4> */}
                <div className="secondForm">
                <FaUserCheck className="textBox_icons"/>*<input type="text" placeholder="Full Name" id="full_name" className="topInput" name="full_name" value={details.full_name} onChange={
                        (e) => {
                            setDetails({
                                ...details, [e.target.name]: e.target.value
                            });
                            var name_regex = /^[a-z ,.'-]+$/i
                            if (e.target.value != null) {
                                if (!(e.target.value.match(name_regex))) {
                                    document.getElementById('invalid_name').style.display = "inline-block"
                                    setError({
                                        ...error, full_name: 'Name not correct'
                                    })
                                }
                                else {
                                    document.getElementById('invalid_name').style.display = "none"
                                    setError({
                                        ...error, full_name: ''
                                    })
                                }

                            }
                            else
                                document.getElementById('invalid_name').style.display = "none"
                        }
                    }></input>
                    <span id="invalid_name" className="inavlid_input" style={{ display: "none" }}>Not a valid name</span>

                    {/* <h4>Enter your company name</h4> */}
                    <AiFillTool className="textBox_icons"/>*<input type="text" placeholder="Company Name" id="company_name" className="topInput" name="company_name" value={details.company_name} onChange={
                        (e) => {
                            setDetails({
                                ...details, [e.target.name]: e.target.value
                            });
                            var name_regex = /^[a-z ,.'-]+$/i
                            if (e.target.value != null) {
                                if (!(e.target.value.match(name_regex))) {
                                    document.getElementById('invalid_company_name').style.display = "inline-block"
                                    setError({
                                        ...error, compnay_name: 'Name not correct'
                                    })
                                }
                                else {
                                    document.getElementById('invalid_company_name').style.display = "none"
                                    setError({
                                        ...error, compnay_name: ''
                                    })
                                }

                            }
                            else
                                document.getElementById('invalid_company_name').style.display = "none"


                        }
                    }></input>
                    <span id="invalid_company_name" className="inavlid_input" style={{ display: "none" }}>Not a valid name</span>
                
                    {/* <h4>Enter your email id</h4> */}
                    <br></br>
                    <MdEmail className="textBox_icons"/>*<input type="email" placeholder="Your mail" id="email_id" className="topInput" name="email" value={details.email} onChange={
                        (e) => {
                            setDetails({
                                ...details, [e.target.name]: e.target.value
                            });
                            var mail_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if (e.target.value != null) {
                                if (!(e.target.value.match(mail_regex))) {
                                    document.getElementById('invalid_mail').style.display = "inline-block";
                                    setError({
                                        ...error, email_id: 'Mail not correct'
                                    })
                                }
                                else {
                                    document.getElementById('invalid_mail').style.display = "none"
                                    setError({
                                        ...error, email_id: ''
                                    })
                                }

                            }
                            else
                                document.getElementById('invalid_mail').style.display = "none"

                        }
                    }></input>
                    <span id="invalid_mail" className="inavlid_input" style={{ display: "none" }}>Not a valid mail</span>

                    {/* <h4>Enter your phone number</h4> */}
                    <FaPhoneAlt className="textBox_icons"/>*<input type="text" placeholder="Your Phone" id="phone" className="topInput" name="phone" value={details.phone} onChange={
                        (e) => {
                            setDetails({
                                ...details, [e.target.name]: e.target.value
                            });
                            // console.log("In this")
                            var phone_regex = /^([0-9]{11})$/
                            if (e.target.value != null) {
                                // console.log("In this")
                                if (!(e.target.value.match(phone_regex))) {
                                    document.getElementById('invalid_phone').style.display = "inline-block";
                                    setError({
                                        ...error, tel: 'Telephone not correct'
                                    })
                                }
                                else {
                                    document.getElementById('invalid_phone').style.display = "none"
                                    setError({
                                        ...error, tel: ''
                                    })
                                }
                            }
                            else
                                document.getElementById('invalid_phone').style.display = "none"
                        }
                    }></input>
                    <span className="inavlid_input" id="invalid_phone" style={{ display: "none"}}>Phone Number should be all digits and 11 character long</span>
                </div>

                <button className="btn_submit construct" type="submit" onClick={handleSubmit}><AiOutlineArrowRight /></button>
            </div>
            <div className="flex-right">
                <img src={img_2} className="img_2"></img>

                <img src={topImg} className="topImg"></img>
            </div>
        </div>
    )
}

export default PersonalDetails
