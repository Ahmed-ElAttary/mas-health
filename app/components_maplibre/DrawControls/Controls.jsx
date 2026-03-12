import React, { useState, useEffect, Children, useRef } from "react";

import DrawBtn from "./DrawBtn/DrawBtn" 
import "./Controls.styles.css"

const Controls = ({}) => {

  return (
    <div >


      <div className="control left top">

      <DrawBtn/>
   </div> 

    </div>
  )
}

export default Controls;
