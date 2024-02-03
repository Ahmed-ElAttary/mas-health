"use client";
import { GeoJsonDataSource } from "resium";
import Controls from "../components/HomeControls/Controls.jsx";
import Markers from "../components/Markers/Markers.jsx";
import ViewerContainer from "../components/ViewerContainer.component.jsx";


import { useEffect, useState } from "react";
import { Color } from "cesium";

export default function Home() {

  const [features,setFeatures] =useState([])

  return (
    <ViewerContainer>
            <GeoJsonDataSource
         data= "/shapefile.geojson"

stroke={Color.RED}

     fill={Color.YELLOW.withAlpha(0.1)}
    
 
         />
      <Markers />

      <Controls />
    </ViewerContainer>
  );
}
