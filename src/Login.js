import React, { useContext, useState } from 'react'
import { DetailsContext } from "./DetailsContext"
import "./login.css";
import './Spinner.css';
import { navigate } from "@reach/router";
import otpGenerator from 'otp-generator';
import img_Login from "./images/loginImg.jpg";
import axios from "axios";
import qs from "qs";


function Login() {
  var [error, setError] = useState({
    email_id: ''
  })
  const [details, setDetails] = useContext(DetailsContext);

  async function handleClick(e) {
    e.preventDefault();
    let email = document.querySelector('.emailInput').value;
    if (error.email_id == '' && email != '') {
      let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      console.log(otp);
      // document.querySelector('.cont').style.display = 'block';
      // fetch(process.env.REACT_APP_ROUTE + '/otp', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, otp }),
      //   headers: {
      //     'Content-type': 'application/json'
      //   }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     if ((data['statusCode'] == 200)) {
      //       setDetails({
      //         email: email,
      //         otp: otp
      //       });
      //       navigate('/otp', { state: { otp: otp } })
      //     }
      //     else {
      //       //console.log(data);
      //       document.querySelector('.cont').style.display = 'none';
      //       alert('Something went wrong, Please try Again')
      //       navigate('/login')
      //     }

      //   });
        document.querySelector('.cont').style.display = 'block';
        var data = qs.stringify({ email, otp });
        var config = {
            method: 'post',
            url: process.env.GATSBY_APP_HEROKU + '/otp',
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
                  setDetails({
                      email: email,
                      otp: otp
                  });
                  navigate('/otp', { state: { otp: otp } })
                }
                else {
                  document.querySelector('.cont').style.display = 'none';
                  alert('Something went wrong, Please try Again')
                  navigate('/login')
                }
            })
            .catch(function (error) {
              document.querySelector('.cont').style.display = 'none';
              alert('Something went wrong, Please try Again')
              navigate('/login')
            });
    } else {
      alert('Please fill input');
    }
  }
  return (
    <div className="login">
      <h1 className="loginTopHeading">Log  <span> in</span></h1>
      <img src={img_Login} className="loginImg"></img>
      <hr className="login_Line"></hr>
      <div className="loginSection">
        <input type="email" placeholder="Enter your email" name="login_email" className="emailInput" value={details.login_email} onChange={
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

        <button className="login_Otp" type="submit" onClick={handleClick}>Send me a login OTP</button>
        {/* Spinner */}
        <div className="cont" style={{ display: 'none' }}>
          <div className="loader"></div>
          <h2>Please Hold On, Sending you OTP...</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;