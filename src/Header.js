import React from "react";
import "./header.css";
import { Link } from "@reach/router";

function Header() {
  return (
    <header>
      <div className="flex-box2">
        <div className="left-flex2">
          <Link style={{ textDecoration: "none" }} to="/"><h1 className="header-logo">Logo</h1></Link>
        </div>
        <div className="right-flex2">
          <Link to="/login"><button className="buttonHeader">Login</button></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;