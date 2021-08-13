import { navigate } from '@reach/router';
import React, { useContext, useState, useEffect } from 'react'
import { DetailsContext } from "./DetailsContext"
import "./login.css";
import './Spinner.css';
import img_Login from "./images/otpImg.jpg";
import axios from "axios";
import qs from "qs";


function Otp({ location }) {
  const [details, setDetails] = useContext(DetailsContext);

  async function handleSubmit(e) {
    e.preventDefault();
    let user_otp = document.querySelector('#otp').value;
    let org_otp = location ? location.state.otp : '';
    if (user_otp != '') {
      if (user_otp == org_otp) {
        //alert('Correct OTP');
        // document.querySelector('.cont').style.display = 'block';
        // fetch(process.env.REACT_APP_ROUTE + '/getDetails', {
        //   method: 'POST',
        //   body: JSON.stringify({ email: details.email }),
        //   headers: {
        //     'Content-type': 'application/json'
        //   }
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //     if ((data['statusCode'] == 200)) {
        //       console.log(data);
        //       //navigate('/', { state: { user: data } });
        //     }
        //     else {
        //       //console.log(data);
        //       document.querySelector('.cont').style.display = 'none';
        //       alert('Something went wrong, Please try Again')
        //       navigate('/otp')
        //     }

        //   });
        document.querySelector('.cont').style.display = 'block';
        var data = qs.stringify({ email: details.email });
        var config = {
            method: 'post',
            url: process.env.GATSBY_APP_HEROKU + '/getDetails',
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
                  console.log(data1);
                  navigate('/dashboard', { state: { data: data1.body } });
                }
                else {
                  document.querySelector('.cont').style.display = 'none';
                  alert('Something went wrong, Please try Again')
                  navigate('/otp')
                }
            })
            .catch(function (error) {
                console.log(error)
                document.querySelector('.cont').style.display = 'none';
                alert('Something went wrong, Please try Again')
                navigate('/otp')
            });
      } else {
        alert('Wrong OTP');
      }
    } else {
      alert('Please fill input');
    }
  }
  return (
    <div className="login">
      <h1 className="loginTopHeading">Enter  <span> OTP</span></h1>
      <img src={img_Login} className="loginImg"></img>
      <hr className="login_Line"></hr>
      <div className="loginSection">
        <input type="text" placeholder="Enter OTP" className="emailInput" id="otp"></input>
        <button className="login_Otp" type="submit" onClick={handleSubmit}>Submit OTP</button>

      </div>
      {/* Spinner */}
      <div className="cont" style={{ display: 'none' }}>
        <div className="loader"></div>
        <h2>Please Hold On, Redirecting you to dashboard...</h2>
      </div>

    </div>
  );
}

export default Otp;