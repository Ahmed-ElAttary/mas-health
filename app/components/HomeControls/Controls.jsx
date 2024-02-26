import React, { useState, useEffect, Children, useRef } from "react";
import { Sidebar } from "primereact/sidebar";

import BasicDemo from "./Dock/Dock";
import RightSidebar from "./RightSidebar/RightSidebar";
import BottomSidebar from "./BottomSidebar/BottomSidebar";
import FlyHomeBtn from "./FlyHomeBtn/FlyHomeBtn";
import ZoomBtn from "./ZoomBtn/ZoomBtn";
import "./Controls.styles.css";
import Legend from "./Legend/Legend";
const Controls = ({}) => {
  return (
    <div>
      <div className="control right top">
        <RightSidebar />
      </div>

      <div className="control left top">
        <FlyHomeBtn />
      </div>
      <div className="control right bottom">
        <ZoomBtn />
      </div>
      <div className="control left bottom">
        <Legend />
      </div>
      <BottomSidebar />
      {/* <BasicDemo/> */}
    </div>
  );
};

export default Controls;
