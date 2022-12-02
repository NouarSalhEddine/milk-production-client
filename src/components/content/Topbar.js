import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import logo from './milk.jpg'



const Topbar = () => {

  return (
    <div>
    <img style={{height:"100px",width:"100%",margin:"0",padding:"0"}} src={logo}  alt="milk" /> 
   </div>
     
   
  );
};

export default Topbar;
