import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link , navigate} from "@reach/router";
import axios from "axios";
import qs from "qs";
import { window, document } from "browser-monads";
import "./header.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  let obj = window.localStorage.getItem('user_login');
  if (typeof (obj) == "string") {
    obj = JSON.parse(obj);
  } else {
    obj = {};
  }
  async function getQueries() {
    //document.querySelector('.cont').style.display = 'block';
    document.getElementById("redirect-dash").disabled = true; 
    var data = qs.stringify({ email: obj.email });
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
        if (data1.statusCode == 200) {
          var updatedData = JSON.parse(data1.body).map((e)=>{
              delete e['image_url_api'];
              return e;
          })
          //console.log(updatedData)
          obj.data = JSON.stringify(updatedData);
          window.localStorage.setItem('user_login', JSON.stringify(obj));
          document.getElementById("redirect-dash").disabled = false; 
          navigate('/dashboard');
        }
        else {
          //document.querySelector('.cont').style.display = 'none';
          document.getElementById("redirect-dash").disabled = false; 
          alert('Something went wrong, Please try Again')
          //navigate('/otp')
        }
      })
      .catch(function (error) {
        console.log(error)
        document.getElementById("redirect-dash").disabled = false; 
        //document.querySelector('.cont').style.display = 'none';
        alert('Something went wrong, Please try Again')
        //navigate('/otp')
      });
  }
  const classes = useStyles();

  return (
    // <header>
    //   <div className="flex-box2">
    //     <div className="left-flex2">
    //       <Link style={{ textDecoration: "none" }} to="/"><h1 className="header-logo">Logo</h1></Link>
    //     </div>
    //     <div className="right-flex2">
    //       {Object.keys(obj).length > 1 && obj.constructor === Object && <button id="redirect-dash" className="buttonHeader" onClick={getQueries}>Dashboard</button>}
    //       {Object.keys(obj).length > 1 && obj.constructor === Object && <Link to="/"><button className="buttonHeader" id="logoutBtn" onClick={() => window.localStorage.removeItem('user_login')}>Logout</button></Link>}
    //       {Object.keys(obj).length <= 1 && obj.constructor === Object && <Link to="/login"><button className="buttonHeader" id="loginbtn">Login</button></Link>}
    //     </div>
    //   </div>
    // </header>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar id="navbarFull">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{textDecoration: "none"}}><h3 className="logoText">Logo</h3></Link>
          </Typography>
          {Object.keys(obj).length > 1 && <button color="inherit" className="dashboardBtn" id="redirect-dash" onClick={getQueries}>Dashboard</button>}
          {Object.keys(obj).length > 1 && <Link to="/"><button color="inherit" className="dashboardBtn" onClick={() => window.localStorage.removeItem('user_login')}>Logout</button></Link>}
          {Object.keys(obj).length <= 1 && <Link to="/login"><button color="inherit" id="loginBtn">Login</button></Link>}
          

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;