import React from 'react';
import gif_img from "./images/gif.gif";
import "./login.css";

function Gif() {
    return (
        <div id="gif_page">
            <img src={gif_img} className="gifImg"></img>
        </div>
    )
}

export default Gif
