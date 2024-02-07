"use client";
import { GeoJsonDataSource, useCesium } from "resium";
import Controls from "../components/HomeControls/Controls.jsx";
import Markers from "../components/Markers/Markers.jsx";
import ViewerContainer from "../components/ViewerContainer.component.jsx";
import { Color } from "cesium";
// import GeojsonComp from "../components/GeojsonComp/GeojsonComp.jsx"


export default function Home() {

  return (
    <ViewerContainer>
            <GeoJsonDataSource
         data= "/shapefile.geojson"
// clampToGround
// ref={geojsonRef}

stroke={Color.RED}
strokeWidth={10}
     fill={Color.WHEAT.withAlpha(0.3)}
   
         />
         {/* <GeojsonComp/> */}
      <Markers />

      <Controls />
    </ViewerContainer>
  );
}
