import { navigate } from '@reach/router';
import React, { useContext, useState, useEffect } from 'react'
import { DetailsContext } from "./DetailsContext"
import "./login.css";
import './Spinner.css';
import img_Login from "./images/otpImg.jpg";
import axios from "axios";
import qs from "qs";


function Otp() {
  //const [details, setDetails] = useContext(DetailsContext);
  let obj = window.localStorage.getItem('user_login');
  if (typeof (obj) == "string") {
      obj = JSON.parse(obj);
  } else {
      obj = {};
  }
  async function getQueries(obj1) {
    document.querySelector('.cont').style.display = 'block';
    var data = qs.stringify({ email: obj1.email });
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
          // let data2 = JSON.parse(data1.body).map((td)=>{
          //   let temp = td['image_url_api'];
          //   delete temp['image_url_api'];
          //   return temp;
          // })
          delete data1.body['image_url_api'];
          obj1.data = data1.body;
          // obj1.data = data2;
          window.localStorage.setItem('user_login', JSON.stringify(obj1));
          navigate('/dashboard');
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
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let user_otp = document.querySelector('#otp').value;
    // let org_otp = location ? location.state.otp : '';
    if (user_otp != '') {
      var data = qs.stringify({
        'email': obj.email
      });
      var config = {
        method: 'post',
        url: process.env.GATSBY_APP_HEROKU + '/verifyOtp',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      console.log(data);
      axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          let data1 = JSON.stringify(response.data);
          console.log(data1);
          data1 = JSON.parse(data1);
          let org_otp = data1.body;
          if(org_otp == user_otp){
            getQueries(obj);
          }else{
            alert('Wrong OTP');
          }
        })
        .catch(function (error) {
          console.log(error)
          alert('Something went wrong, Please try Again')
          document.querySelector('.cont').style.display = 'none';
          //navigate('/selectArea')
        });
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