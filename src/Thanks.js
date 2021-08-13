import React from 'react'
import {navigate} from "@reach/router"
import "./success.css"

export default function Thanks(){
    return(
        <div className="successText">
            <h1>Your registration is successful</h1>
            <button className="btn_home" onClick={()=>{navigate('/')}}>Home</button>
            {/* <p>Your registration is successful</p> */}
        </div>
    )
}