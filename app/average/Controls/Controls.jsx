"use client";
import React from "react";


import BottomSidebar from "./BottomSidebar/BottomSidebar";
import FlyHomeBtn from "./FlyHomeBtn/FlyHomeBtn";
import PrintBtn from "./PrintBtn/PrintBtn";
import ZoomBtn from "./ZoomBtn/ZoomBtn";
import BaseLayerBtn from "./BaseLayerBtn/BaseLayerBtn";
import "./Controls.styles.css";
import Legend from "./Legend/Legend";
const Controls = ({}) => {
  return (
    <div>


      <div className="control left top">
        <FlyHomeBtn />
        <PrintBtn/>
        <BaseLayerBtn/>
      </div>
      <div className="control right bottom">
        <ZoomBtn />
      </div>
      <div className="control left bottom">
        <Legend />
      </div>
      {/* <BottomSidebar /> */}
      {/* <BasicDemo/> */}
    </div>
  );
};

export default Controls;
